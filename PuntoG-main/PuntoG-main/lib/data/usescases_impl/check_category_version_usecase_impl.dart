
import 'package:f_project_1/domain/datasources/i_category_local_data_source.dart';
import 'package:f_project_1/domain/datasources/i_version_remote_data_source.dart';
import 'package:f_project_1/domain/usecases/i_check_version_usecase.dart';

class CheckCategoryVersionUseCaseImpl implements ICheckVersionUseCase {
  final ICategoryLocalDataSource local;
  final IVersionRemoteDataSource remote;

  CheckCategoryVersionUseCaseImpl({
    required this.local,
    required this.remote,
  });

  @override
  Future<bool> hasNewVersion() async {
    final localVersion = await local.getLocalVersion();
    final remoteVersion = await remote.fetchRemoteVersion();

    return remoteVersion > localVersion;
  }
  

    @override
  Future<void> setLocalVersion(int version) async {
    await local.setLocalVersion(version);
  }
}
