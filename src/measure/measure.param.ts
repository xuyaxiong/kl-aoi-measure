import { ImageSize } from './measure.bo';

export interface MeasureParam {
  imagePath: string;
  imageSize: ImageSize;
  pos: Pos;
  lensParams: LensParams;
  mappingParams: MappingParams;
  rectifyParams: RectifyParams;
  modelPath: string;
  chipNum: number;
  chipSize: number[];
  roiCornerPoint: any;
  detectRegionPath: string;
  measureThreshold: number;
  postProcess: Boolean;
}
