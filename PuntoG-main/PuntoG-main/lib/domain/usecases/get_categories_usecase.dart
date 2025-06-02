import 'package:f_project_1/domain/entities/category.dart';
import 'package:f_project_1/domain/repositories/i_category_repository.dart';

class GetCategoriesUseCase {
  final ICategoryRepository repository;

  GetCategoriesUseCase({required this.repository});

  Future<List<Category>> call() {
    return repository.getCategories();
  }
}
