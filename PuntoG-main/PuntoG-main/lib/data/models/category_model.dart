import 'package:f_project_1/data/models/category_hive_model.dart';
import 'package:f_project_1/domain/entities/category.dart';

class CategoryModel extends Category {

  CategoryModel({required id, required label, required type})
      : super(id: id, label: label, type: type);

  factory CategoryModel.fromJson(Map<String, dynamic> json) {
    return CategoryModel(
      id: json['_id'] ?? '',
      label: json['label'] ?? '',
      type: json['type'] ?? '',
    );
  }

  factory CategoryModel.fromHive(CategoryHiveModel hiveModel) {
    return CategoryModel(
      id: hiveModel.id,
      label: hiveModel.label,
      type: hiveModel.type,
    );
  }

  CategoryHiveModel toHiveModel() {
    return CategoryHiveModel(
      id: id,
      label: label,
      type: type,
    );
  }
}
