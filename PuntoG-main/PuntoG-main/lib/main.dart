import 'package:f_project_1/data/datasources/local/category_local_data_source.dart';
import 'package:f_project_1/data/datasources/remote/category_remote_data_source.dart';
import 'package:f_project_1/data/datasources/remote/category_version_remote_data_source.dart';
import 'package:f_project_1/data/repositories/category_repository_impl.dart';
import 'package:f_project_1/data/usescases_impl/check_category_version_usecase_impl.dart';
import 'package:f_project_1/domain/usecases/add_comment.dart';
import 'package:f_project_1/domain/usecases/get_categories_usecase.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:adaptive_theme/adaptive_theme.dart';
import 'package:loggy/loggy.dart';

import 'package:f_project_1/core/constants/app_colors.dart';
import 'package:f_project_1/core/constants/app_routes.dart';
import 'package:f_project_1/core/network/network_info.dart';

import 'package:f_project_1/data/datasources/local/event_local_data_source.dart';
import 'package:f_project_1/data/datasources/remote/event_remote_data_source.dart';
import 'package:f_project_1/data/datasources/remote/event_version_remote_data_source.dart';
import 'package:f_project_1/data/repositories/event_repository_impl.dart';
import 'package:f_project_1/data/usescases_impl/check_event_version_usecase_impl.dart'; // ruta corregida

import 'package:f_project_1/domain/usecases/filter_events.dart';
import 'package:f_project_1/domain/usecases/join_event.dart';
import 'package:f_project_1/domain/usecases/unjoin_event.dart';

import 'package:f_project_1/presentation/controllers/connectivity_controller.dart';
import 'package:f_project_1/presentation/controllers/event_controller.dart';
import 'package:f_project_1/presentation/controllers/home_controller.dart';
import 'package:f_project_1/presentation/controllers/top_nav_controller.dart';
import 'package:f_project_1/presentation/controllers/bottom_nav_controller.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Inicializar el logger
  Loggy.initLoggy(logPrinter: const PrettyPrinter(showColors: true));

  // Inicializar Hive
  final localDataSource = EventLocalDataSource();
  await localDataSource.init();
  final categoryLocalDataSource = CategoryLocalDataSource();
  await categoryLocalDataSource.init();

  // Fuentes remotas y network
  final remoteDataSource = EventRemoteDataSource();
  final eventVersionRemoteDataSource = EventVersionRemoteDataSource();
  final categoryVersionRemoteDataSource = CategoryVersionRemoteDataSource();
  final networkInfo = NetworkInfo();
  final categoryRemoteDataSource = CategoryRemoteDataSource();

  // Repositorio
  final eventRepo = EventRepositoryImpl(
    localDataSource: localDataSource,
    remoteDataSource: remoteDataSource,
    networkInfo: networkInfo,
  );
  final categoryRepository = CategoryRepository(
    localDataSource: categoryLocalDataSource,
    remoteDataSource: categoryRemoteDataSource,
    networkInfo: networkInfo,
  );

  // Casos de uso

  final addComment = AddComment(eventRepo);
  final joinEvent = JoinEvent(eventRepo);
  final unjoinEvent = UnjoinEvent(eventRepo);
  final filterEvents = FilterEvents();
  final checkVersionEvents = CheckEventVersionUseCaseImpl(
    local: localDataSource,
    remote: eventVersionRemoteDataSource,
  );
  final checkVersionCategory = CheckCategoryVersionUseCaseImpl(
    local: categoryLocalDataSource,
    remote: categoryVersionRemoteDataSource,
  );
  final getCategoriesUseCase =
      GetCategoriesUseCase(repository: categoryRepository);

  // Inyección de dependencias
  Get.put(BottomNavController());
  Get.put(TopNavController());
  Get.put(NetworkInfo());
  Get.put(ConnectivityController());
  Get.put(HomeController(
      getCategoriesUseCase: getCategoriesUseCase,
      checkVersionUseCase: checkVersionCategory,
      repository: categoryRepository));
  Get.put(EventController(
    repository: eventRepo,
    joinEventUseCase: joinEvent,
    unjoinEventUseCase: unjoinEvent,
    filterEventsUseCase: filterEvents,
    checkVersionUseCase: checkVersionEvents,
    addCommentUseCase: addComment,
  ));

  runApp(const MyApp(initialRoute: AppRoutes.splash));
}

class MyApp extends StatelessWidget {
  final String initialRoute;
  const MyApp({Key? key, required this.initialRoute}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AdaptiveTheme(
      light: ThemeData.light(useMaterial3: true),
      dark: ThemeData.dark(useMaterial3: true),
      initial: AdaptiveThemeMode.light,
      builder: (theme, darkTheme) {
        return GetMaterialApp(
          title: 'PuntoG',
          color: AppColors.primary,
          theme: theme.copyWith(
            textTheme: theme.textTheme.apply(fontFamily: 'Poppins'),
          ),
          darkTheme: darkTheme.copyWith(
            textTheme: darkTheme.textTheme.apply(fontFamily: 'Poppins'),
          ),
          debugShowCheckedModeBanner: false,
          initialRoute: initialRoute,
          getPages: AppRoutes.routes,
        );
      },
    );
  }
}
