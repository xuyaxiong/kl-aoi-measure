import { Image } from 'src/measure/measure.bo';
import shmemDll from 'src/wrapper/shmem';

export function loadImage(
  path: string,
  width: number,
  height: number,
  channel: number,
): Image {
  const buffer = Buffer.alloc(width * height * channel);
  shmemDll.imread(path, buffer, width, height, channel, true);
  return {
    buffer,
    width,
    height,
    channel,
  };
}
