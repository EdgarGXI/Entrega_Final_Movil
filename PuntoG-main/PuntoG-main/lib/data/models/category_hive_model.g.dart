// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'category_hive_model.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class CategoryHiveModelAdapter extends TypeAdapter<CategoryHiveModel> {
  @override
  final int typeId = 0;

  @override
  CategoryHiveModel read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return CategoryHiveModel(
      id: fields[0] as String,
      label: fields[1] as String,
      type: fields[2] as String,
    );
  }

  @override
  void write(BinaryWriter writer, CategoryHiveModel obj) {
    writer
      ..writeByte(3)
      ..writeByte(0)
      ..write(obj.id)
      ..writeByte(1)
      ..write(obj.label)
      ..writeByte(2)
      ..write(obj.type);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is CategoryHiveModelAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
