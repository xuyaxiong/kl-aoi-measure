const AppConfig = {
  DLL_PATH: 'D:\\kl-storage\\dll\\', // dll路径
  CRASH_DUMP_DIR: 'D:\\kl-storage\\crashDump\\aoi-measure', // dll崩溃dump文件保存路径
  APP_LOG_DIR: 'D:\\kl-storage\\app-logs\\aoi-measure', // 服务日志保存路径
  TMP_DIR: 'D:\\tmp', // 临时文件夹

  registerHealthCheck: 'ws://127.0.0.1:9000?clientType=service',
  serviceName: '测量检测服务',
  event: 'MeasureService',
};
export default AppConfig;
