import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MeasureParam } from './measure.param';
import rectifyDll from '../wrapper/rectify';
const ref = require('ref-napi') as typeof import('ref-napi');
import '../extension';
import { ImageSize } from './measure.bo';

@Injectable()
export class MeasureService {
  constructor(private readonly configService: ConfigService) {}

  measure(measureParam: MeasureParam): number[] {
    const res = _measure(
      measureParam.imagePath,
      measureParam.imageSize,
      measureParam.modelPath,
      measureParam.pos,
      measureParam.mappingParams,
      measureParam.lensParams,
      measureParam.rectifyParams,
      measureParam.roiCornerPoint,
      measureParam.chipNum,
      measureParam.chipSize,
      measureParam.detectRegionPath,
      measureParam.measureThreshold,
    );
    return res;
  }
}

function _measure(
  imagePath: string,
  imageSize: ImageSize,
  modelPath: string,
  pos: Pos,
  mappingParams: MappingParams,
  lensParams: LensParams,
  rectifyParams: RectifyParams,
  roiCornerPoint: number[],
  chipNum: number,
  chipSize: number[],
  detectRegionPath: string,
  measureThreshold: number,
) {
  const pointer = ref.alloc('pointer');
  rectifyDll.calculateChipsCoorV2(
    1,
    imagePath,
    imageSize.height,
    imageSize.width,
    imageSize.channel,
    modelPath,
    (pos as Array<number>).doubleToBuffer(),
    (mappingParams as Array<number>).doubleToBuffer(),
    (lensParams as Array<number>).doubleToBuffer(),
    (rectifyParams as Array<number>).doubleToBuffer(),
    roiCornerPoint.doubleToBuffer(),
    chipNum,
    chipSize.doubleToBuffer(),
    0,
    detectRegionPath,
    measureThreshold,
    pointer,
  );
  const SIZE_OF_DOUBLE = 8;
  const countBuf = pointer.readPointer(0, SIZE_OF_DOUBLE);
  const count = countBuf.readDoubleLE(0);
  console.log('count =', count);
  const dataBuf = pointer.readPointer(0, (count + 1) * SIZE_OF_DOUBLE);
  const res = Array.from(new Float64Array(dataBuf.buffer, 8, count));
  return res;
}
