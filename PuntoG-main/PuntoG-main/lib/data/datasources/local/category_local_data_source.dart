
import 'package:f_project_1/data/models/category_hive_model.dart';
import 'package:f_project_1/data/models/category_model.dart';
import 'package:f_project_1/domain/datasources/i_category_local_data_source.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:loggy/loggy.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CategoryLocalDataSource implements ICategoryLocalDataSource {
  static const _boxName = 'categoryBox';
  static const _versionKey = 'category_version';

  Future<void> init() async {
    await Hive.initFlutter();
    if (!Hive.isAdapterRegistered(0)) {
      Hive.registerAdapter(CategoryHiveModelAdapter());
    }
    await Hive.openBox<CategoryHiveModel>(_boxName);
    logInfo("Hive box opened: $_boxName");
  }

  @override
  Future<List<CategoryModel>> getSavedCategories() async {
    final box = Hive.box<CategoryHiveModel>(_boxName);
    
    final categories = box.values.map((e) => CategoryModel.fromHive(e)).toList();
    return categories;
  }

  @override
  Future<void> saveCategories(List<CategoryModel> categories) async {
    
    final box = Hive.box<CategoryHiveModel>(_boxName);
    await box.clear();
    for (int i = 0; i < categories.length; i++) {
      await box.put(i, categories[i].toHiveModel());
    }
    logInfo("${categories.length} categories saved to Hive");
  }

  @override
  Future<int> getLocalVersion() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getInt(_versionKey) ?? 0;
  }

  @override
  Future<void> setLocalVersion(int version) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt(_versionKey, version);
  }

  @override
  bool hasCachedCategories() {
    final box = Hive.box<CategoryHiveModel>(_boxName);
    return box.isNotEmpty;
  }
}
