import 'dart:convert';
import 'package:f_project_1/data/models/category_model.dart';
import 'package:f_project_1/domain/datasources/i_category_remote_data_source.dart';
import 'package:http/http.dart' as http;

class CategoryRemoteDataSource implements ICategoryRemoteDataSource {
  static const String baseUrl = 'https://api-puntog-nfmr.onrender.com';

  @override
  Future<List<CategoryModel>> fetchCategories() async {
    final response = await http.get(Uri.parse('$baseUrl/categories'));

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((json) => CategoryModel.fromJson(json)).toList();
    } else {
      throw Exception('Failed to fetch categories');
    }
  }

  @override
  Future<int> fetchCategoryVersion() async {
    final url = Uri.parse('$baseUrl/categories/version');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      return data['version'] ?? 0;
    } else {
      throw Exception('Error al obtener versión remota de categorías');
    }
  }
}
