import { ImageSize } from './measure.bo';

export interface MeasureParam {
  fno: number;
  imagePath: string;
  imageSize: ImageSize;
  pos: Pos;
  lensParams: LensParams;
  mappingParams: MappingParams;
  rectifyParams: RectifyParams;
  modelPath: string;
  padModelPath: string;
  chipNum: number;
  chipSize: number[];
  roiCornerPoint: any;
  detectRegionSize: number[]; // [maxRow, maxCol]
  measureThreshold: number;
  postProcess: Boolean;
}
