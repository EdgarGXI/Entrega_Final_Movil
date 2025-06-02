abstract class ICheckVersionUseCase {
  Future<bool> hasNewVersion(); 
  Future<void> setLocalVersion(int version);// compara local vs remoto
}
