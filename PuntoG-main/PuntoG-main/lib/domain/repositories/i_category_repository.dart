import 'package:f_project_1/domain/entities/category.dart';

abstract class ICategoryRepository {
  Future<List<Category>> getCategories();
  Future<void> saveCategories(List<Category> categories);
}
