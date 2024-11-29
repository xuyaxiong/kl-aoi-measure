const FFI = require('ffi-napi');
const path = require('path');
import AppConfig from '../app.config';
const DLL_PATH = AppConfig.DLL_PATH;

export const rectify = () => {
  const pathArray = process.env.PATH.split(';');
  pathArray.unshift(DLL_PATH);
  process.env.PATH = pathArray.join(';');

  const Library = new FFI.Library(path.join(DLL_PATH, 'rectify.dll'), {
    calculateChipsCoorV3: [
      'int',
      [
        'int',
        'string',
        'int',
        'int',
        'int',
        'string',
        'string',
        'double*',
        'double*',
        'double*',
        'double*',
        'double*',
        'int',
        'double*',
        'int',
        'string',
        'double',
        'double**',
      ],
    ],

    releaseArray: ['void', ['double **']],

    get_dll_version: ['string', []],
  });

  return Library;
};

const rectifyDll = rectify();
export default rectifyDll;
