import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '@rneui/themed';
import {Text, View, SafeAreaView, Image, ImageBackground} from 'react-native';
import TrackPlayer, {
  State,
  Event,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Video from 'react-native-video';
import Thumbnail from './Thumbnail';

const VideoPlayback = ({val, seekVal, repeatMode}: any) => {
  const styles = useStyles();

  const playbackState = usePlaybackState();
  const {position, duration} = useProgress();
  const videoRef = useRef(null);

  const [pause, setPause] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [progress, setProgress] = useState(0);

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.PlaybackState],
    async event => {
      if (
        event.type === Event.PlaybackTrackChanged &&
        event.nextTrack != null
      ) {
        videoRef.current?.seek(0);
        setPause(false);
      }
      if (event.type === Event.PlaybackState) {
        if (
          playbackState === State.None ||
          playbackState === State.Stopped ||
          playbackState === State.Paused
        ) {          
          setPause(true);
        } else {
          setPause(false);
        }
      }
    },
  );
  useEffect(() => {
    if (seekVal !== -1) {
      videoRef.current?.seek(seekVal);
    }
  }, [seekVal]);

  useEffect(() => {
    console.log('repeat mode: ', repeatMode);
    handleRepeatMode();
  }, [repeatMode]);

  const handleLoad = (meta: any) => {};

  const hanleEnd = () => {
    setPause(true);
    handleRepeatMode();
  };

  const handleRepeatMode = async () => {
    // 0: off
    // 1: Track
    // 2: Queue
    const mode = await TrackPlayer.getRepeatMode();
    console.log('repeat mode: ', mode);
    mode !== 0 ? setRepeat(true) : setRepeat(false);
  };

  const handleProgress = (progress: any) => {
    setProgress(progress.currentTime);
  };

  return (
    <SafeAreaView style={styles.container}>
      {val &&
        (val?.url.includes('.avi') ? (
          <Thumbnail uri={val?.url} />
        ) : (
          <>
            <Video
              ref={videoRef}
              source={{
                uri: val?.url,
              }}
              paused={pause}
              repeat={repeat}
              resizeMode="cover"
              muted={true}
              onLoad={handleLoad}
              onEnd={hanleEnd}
              onProgress={handleProgress}
              style={{
                flex: 1,
                zIndex: -1,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
            <View style={styles.overlay}></View>
          </>
        ))}
      {/* <Text style={{color: '#fff'}}>{progress}</Text> */}
    </SafeAreaView>
  );
};

export default VideoPlayback;
var useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    backgroundColor: theme.colors.lightShadeBlue,
  },
}));
