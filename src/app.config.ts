const path = require('path');

const KL_STORAGE_PATH = 'D:\\kl-storage';

const AppConfig = {
  DLL_PATH: path.join(KL_STORAGE_PATH, 'dll'), // dll路径
  CRASH_DUMP_DIR: path.join(KL_STORAGE_PATH, 'crashDump', 'aoi-measure'), // dll崩溃dump文件保存路径
  APP_LOG_DIR: path.join(KL_STORAGE_PATH, 'app-logs', 'aoi-measure'), // 服务日志保存路径
  TMP_DIR: 'D:\\tmp', // 临时文件夹

  registerHealthCheck: 'ws://127.0.0.1:9000?clientType=service',
  serviceName: '测量检测服务',
  event: 'MeasureService',
};
export default AppConfig;
