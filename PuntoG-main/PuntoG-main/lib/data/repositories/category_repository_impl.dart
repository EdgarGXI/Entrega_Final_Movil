import 'package:f_project_1/core/network/network_info.dart';
import 'package:f_project_1/data/models/category_model.dart';
import 'package:f_project_1/domain/datasources/i_category_local_data_source.dart';
import 'package:f_project_1/domain/datasources/i_category_remote_data_source.dart';
import 'package:f_project_1/domain/entities/category.dart';
import 'package:f_project_1/domain/repositories/i_category_repository.dart';
import 'package:loggy/loggy.dart';

class CategoryRepository implements ICategoryRepository {
  final ICategoryRemoteDataSource remoteDataSource;
  final ICategoryLocalDataSource localDataSource;
  final NetworkInfo networkInfo;

  CategoryRepository({
    required this.localDataSource,
    required this.remoteDataSource,
    required this.networkInfo,
  });

  @override
  Future<List<Category>> getCategories() async {
    List<Category> categories = [];

    if (await networkInfo.isConnected()) {
      logInfo('📡 Conectado a internet');
      try {
        // 1) Comparar versiones
        final remoteVersion = await remoteDataSource.fetchCategoryVersion();
        final localVersion  = await localDataSource.getLocalVersion();

        if (remoteVersion > localVersion) {
          logInfo('Nueva versión detectada, descargando categorías...');
          // 2) Traer de la API (lista de CategoryModel)
          final apiCategories = await remoteDataSource.fetchCategories();

          // 4) Persistir la lista completa en Hive y actualizar versión
          await localDataSource.saveCategories(apiCategories);
          await localDataSource.setLocalVersion(remoteVersion);
          logInfo('Nueva versión descargada: ${apiCategories.length} categorías');

          // 5) Asignar a la lista de retorno, casteando a Category para cumplir la firma
          categories = apiCategories.cast<Category>();
        } else {
          logInfo('Misma versión, usando datos de Hive');
          categories = (await localDataSource.getSavedCategories()).cast<Category>();
        }
      } catch (e) {
        logError('Error al descargar desde API: $e');
        categories = (await localDataSource.getSavedCategories()).cast<Category>();
      }
    } else {
      logInfo('Sin internet, usando datos de Hive');
      categories = (await localDataSource.getSavedCategories()).cast<Category>();
    }

    return categories;
  }

  @override
  Future<void> saveCategories(List<Category> categories) async {
    await localDataSource.saveCategories(categories.cast<CategoryModel>());
  }
}
