import 'dart:async';

import 'package:f_project_1/data/usescases_impl/check_category_version_usecase_impl.dart';
import 'package:f_project_1/domain/entities/category.dart';
import 'package:f_project_1/domain/repositories/i_category_repository.dart';
import 'package:f_project_1/domain/usecases/i_check_version_usecase.dart';
import 'package:f_project_1/presentation/controllers/connectivity_controller.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:loggy/loggy.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:f_project_1/domain/usecases/get_categories_usecase.dart';
import 'package:f_project_1/data/models/category_model.dart';

class HomeController extends GetxController {
  final RxString name = ''.obs;
  final RxList<Category> categories =
      <Category>[].obs; // Lista reactiva para las categorías
  final RxBool isLoading = false.obs; // Estado para manejar la carga
  final GetCategoriesUseCase getCategoriesUseCase;
  final ICheckVersionUseCase _checkVersionUseCase;
  final ICategoryRepository _repository;

  Timer? _timer;
  bool _isSnackbarVisible = false;

  HomeController({
    required this.getCategoriesUseCase,
    required checkVersionUseCase,
    required ICategoryRepository repository,
  })  : _checkVersionUseCase = checkVersionUseCase,
        _repository = repository;

  @override
  void onInit() {
    super.onInit();
    _loadNameFromPrefs();
    loadCategoriesIntelligently();
    _startCategoryRefreshTimer();
  }

  void _startCategoryRefreshTimer() {
    logInfo("Inicia temporizador categorías");
    _timer?.cancel(); // por si ya estaba corriendo
    _timer = Timer.periodic(const Duration(seconds: 20), (timer) async {
      logInfo("Temporizador termina categorías");
      if (!_isSnackbarVisible) {
        final hasNewVersion = await _checkCategoryVersion();
        if (hasNewVersion) {
          _showRefreshSnackbar();
        }
      }
    });
  }

  @override
  void onClose() {
    _timer?.cancel(); // Cancela el temporizador al cerrar el controlador
    super.onClose();
  }

  Future<bool> _checkCategoryVersion() async {
    final connected = Get.find<ConnectivityController>().connection;

    try {
      final hasNewVersion =
          connected ? await _checkVersionUseCase.hasNewVersion() : false;
      return hasNewVersion;
    } catch (e) {
      logError('Error al cargar versión de categorías: $e');
      return false;
    }
  }

  void _showRefreshSnackbar() async {
    _isSnackbarVisible = true;
    _timer?.cancel();

    Get.snackbar(
      'Nuevas categorías disponibles',
      'Presiona para actualizar',
      snackPosition: SnackPosition.BOTTOM,
      isDismissible: true,
      mainButton: TextButton(
        onPressed: () {
          Get.back(); // Cierra el snackbar
          _isSnackbarVisible = false;
          loadCategoriesIntelligently();
          _startCategoryRefreshTimer();
        },
        child: Text(
          'Actualizar',
          style: TextStyle(color: Get.theme.colorScheme.primary),
        ),
      ),
      duration: const Duration(seconds: 20),
    );

    // Wait for snackbar duration to expire before restarting event timer
    await Future.delayed(const Duration(seconds: 20));
    _isSnackbarVisible = false;
    _startCategoryRefreshTimer();
  }

  Future<void> loadCategoriesIntelligently() async {
    try {
      final hasNewVersion = await _checkCategoryVersion();

      logInfo('Actualizando categorías...');

      await fetchCategories();

      if (hasNewVersion) {
        logInfo("Nueva versión detectada");
        await _repository.saveCategories(categories);
        final remoteVersion =
            await (_checkVersionUseCase as CheckCategoryVersionUseCaseImpl)
                .remote
                .fetchRemoteVersion();
        await (_checkVersionUseCase).local.setLocalVersion(remoteVersion);
      }
    } catch (e) {
      logError('Error al cargar categorías: $e');
    }
  }

  void setName(String newName) async {
    name.value = newName;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('user_name', newName);
  }

  void _loadNameFromPrefs() async {
    final prefs = await SharedPreferences.getInstance();
    final savedName = prefs.getString('user_name');
    if (savedName != null) name.value = savedName;
  }

  Future<void> clearName() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('user_name');
    name.value = '';
  }

  Future<void> fetchCategories() async {
    try {
      isLoading(true);
      final fetchedCategories = await getCategoriesUseCase.call();
      logInfo(
          "Fetched categories: ${fetchedCategories.map((e) => e.label)}"); // Muestra las categorías en la consola
      categories.value =
          fetchedCategories; // Asignamos las categorías obtenidas
    } catch (e) {
      logError('Failed to fetch categories: $e');
    } finally {
      isLoading(false);
    }
  }
}
