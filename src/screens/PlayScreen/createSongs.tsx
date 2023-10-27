
type TrackProps = {
  id: string;
  title: string;
  artist: string;
  url: string;
  artwork: any;
  type: string;
};

export const createSongs = (list: any) => {
  const arr = list.map((val: any) => {
    const obj: TrackProps = {
      id: val.id,
      title: val.name,
      artist: 'Unknown',
      url: val.path,
      artwork: require('../../assets/img/disk.jpg'),
      type: val.type,
    };
    return obj;
  });
  return [...arr];
};
