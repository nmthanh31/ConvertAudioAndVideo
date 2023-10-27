type formatProps = {
  id: number;
  container: string;
  codec: string;
  sampleRate?: string;
  type: string;
};
export const formatList: formatProps[] = [
  {
    id: 0,
    container: 'MOV',
    codec: '-c:v mpeg4 -c:a aac',
    // codec: '-vcodec libx264',
    sampleRate: '-ar 44100',
    type: 'video',
  },
  {
    id: 1,
    container: 'MP4',
    codec: '-c:v mpeg4',
    // codec: '-vcodec libx264',
    sampleRate: '-ar 44100',
    type: 'video',
  },
  {
    id: 2,
    container: 'AVI',
    codec: '-c:v mpeg4',
    // codec: '-vcodec libx264',
    sampleRate: '-ar 44100',
    type: 'video',
  },
  {
    id: 3,
    container: 'MKV',
    codec: '-c:v mpeg4',
    // codec: '-vcodec libx264',
    sampleRate: '-ar 44100',
    type: 'video',
  },
  {
    id: 4,
    container: '3G2',
    // codec: '-c:v mpeg4',
    // codec: '-vcodec libx264',
    codec: '-vcodec copy -acodec libopencore_amrnb -ac 1',
    sampleRate: '-ar 8000',
    type: 'video',
  },
  {
    id: 5,
    container: 'MP3',
    // codec: '-vn -c:a libmp3lame -b:a 192k',
    codec: '-vn',
    sampleRate: '',
    type: 'audio',
  },
  {
    id: 6,
    container: 'AAC',
    // codec: '-vn -c:a aac -b:a 192k',
    codec: '-vn',
    sampleRate: '',
    type: 'audio',
  },
  {
    id: 7,
    container: 'FLAC',
    // codec: '-vn -c:a flac -b:a 192k',
    codec: '-vn',
    sampleRate: '',
    type: 'audio',
  },
  {
    id: 8,
    container: 'M4A',
    // codec: '-vn -c:a aac -b:a 192k',
    codec: '-vn',
    sampleRate: '',
    type: 'audio',
  },
  {
    id: 9,
    container: 'WAV',
    // codec: '-vn -c:a pcm_s16le -b:a 192k',
    codec: '-vn',
    sampleRate: '',
    type: 'audio',
  },
  {
    id: 10,
    container: 'OGA',
    codec: '-vn',
    // codec: '-vn -c:a libopus',
    sampleRate: '',
    type: 'audio',
  },
];
