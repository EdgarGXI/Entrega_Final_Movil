import 'package:hive/hive.dart';

part 'category_hive_model.g.dart';

@HiveType(typeId: 0)
class CategoryHiveModel {
  @HiveField(0)
  final String id; // ← cambiado de int a String

  @HiveField(1)
  final String label;

  @HiveField(2)
  final String type;

  CategoryHiveModel({
    required this.id,
    required this.label,
    required this.type,
  });
}
