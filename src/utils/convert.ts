import RNFS from 'react-native-fs';
import {FFmpegKit, ReturnCode} from 'ffmpeg-kit-react-native';

export const generateThumbnail = async (uri: any) => {
  const videoName = uri.split('/')[uri.split('/').length - 1].split('.')[0];
  const output = RNFS.CachesDirectoryPath + '/' + videoName + '.png';
  const ffmpegCommand = `-y -i ${uri} -frames:v 1 "${output}"`;

  const res = FFmpegKit.execute(ffmpegCommand).then(async session => {
    const returnCode = await session.getReturnCode();

    if (ReturnCode.isSuccess(returnCode)) {
      // SUCCESS
      return 'file:' + output;
    } else if (ReturnCode.isCancel(returnCode)) {
      // CANCEL
      console.log('Execution Failed');
      return undefined;
    } else {
      // ERROR
      console.log('Execution Failed');
      return undefined;
    }
  });
  return res;
};

export const convertVideo = async (
  uriList: string[],
  format: any,
): Promise<any> => {
  const outputDirectory =
    format.type === 'video'
      ? `${RNFS.DocumentDirectoryPath}/converted/video`
      : `${RNFS.DocumentDirectoryPath}/converted/music`;
  const exist = await RNFS.exists(outputDirectory);

  if (!exist) await RNFS.mkdir(outputDirectory); // Create new directory if not exists

  const promises = uriList.map(async uri => {
    const videoName = uri.split('/')[uri.split('/').length - 1].split('.')[0];

    const output =
      outputDirectory +
      '/' +
      videoName +
      new Date().getTime() +
      `.${format.container.toLowerCase()}`;

    const ffmpegCommand = `-y -i ${uri} ${format.codec} ${format.sampleRate} "${output}"`;
    const session = await FFmpegKit.execute(ffmpegCommand);
    const returnCode = await session.getReturnCode();

    if (ReturnCode.isSuccess(returnCode)) {
      console.log('Execution Successed');
      return true;
    } else {
      console.log('Execution Failed');
      return false;
    }
  });

  return Promise.all(promises);
};
