import 'package:f_project_1/data/models/category_model.dart';

abstract class ICategoryLocalDataSource {
  Future<int> getLocalVersion();
  Future<void> setLocalVersion(int version);
  Future<void> saveCategories(List<CategoryModel> categories);
  Future<List<CategoryModel>> getSavedCategories();
  bool hasCachedCategories();
}
