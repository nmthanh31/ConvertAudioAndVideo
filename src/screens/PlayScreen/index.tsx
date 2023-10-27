import React, {useEffect, useState} from 'react';
import {View, SafeAreaView} from 'react-native';
import {Text, makeStyles, useTheme, Slider, Icon} from '@rneui/themed';
import Play from '../../assets/img/icons/Play.svg';
import Pause from '../../assets/img/icons/Pause.svg';
import VideoPlayback from './VideoPlayback';
import AudioPlayback from './AudioPlayback';
import TopNav from './TopNav';
import TrackPlayer, {
  Event,
  RepeatMode,
  State,
  Track,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {addTracks} from '../../services/trackPlayerServices';
import {format} from '../../utils/formatSeconds';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused} from '@react-navigation/native';

const PlayScreen = ({navigation, route}: any) => {
  const {theme} = useTheme();
  const styles = useStyles();

  const {list, initPos} = route.params;
  const isFocused = useIsFocused();

  const playbackState = usePlaybackState();

  const {position, duration} = useProgress();

  const [queue, setQueue] = useState<Track[]>([]);
  const [currTrack, setCurrTrack] = useState<number>(initPos || 0);

  const [repeatMode, setRepeatMode] = useState('off');
  const [shuffle, setShuffle] = useState(false);
  const [seekVal, setSeekVal] = useState(-1);
  const [pause, setPause] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const setup = async () => {
    try {
      await loadPlaylist();
    } catch (error) {
      console.log(error);
    }
  };

  const loadPlaylist = async () => {
    await TrackPlayer.reset();
    await addTracks(list);

    const queue = await TrackPlayer.getQueue();

    setQueue(queue);
  };

  useEffect(() => {
    if (isFocused) {
      setup();
      console.log(
        'List: ',
        list.map(val => val?.title),
      );
      console.log('init track: ', currTrack);
      if (initPos) skipTo(initPos);
    }
    return () => {
      TrackPlayer.pause();
    };
  }, []);

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const skipTo = async (track: number) => {
    await TrackPlayer.skip(track);
  };

  const repeatIcon = (): string => {
    const res =
      repeatMode === 'off'
        ? 'repeat-off'
        : repeatMode === 'track'
        ? 'repeat-once'
        : 'repeat';

    return res;
  };

  const changeRepeatMode = () => {
    console.log('Previous: ', repeatMode);
    if (repeatMode === 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatMode('track');
    }
    if (repeatMode === 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setRepeatMode('repeat');
    }
    if (repeatMode === 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeatMode('off');
    }
  };

  const togglePlayback = async (playbackState: State) => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack !== null) {
      if (playbackState === State.Paused || playbackState === State.Ready) {
        console.log('is end: ', isEnd);
        if (isEnd) {
          console.log('curr track: ', currTrack);
          skipTo(currTrack);
        }
        await TrackPlayer.play();
      } else if (playbackState === State.Stopped) {
        skipTo(currTrack);
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };

  const hanldeShuffle = async () => {
    const curr = await TrackPlayer.getCurrentTrack();
    const track = await TrackPlayer.getTrack(curr);

    let listIdx = []; // index of track not playing
    let tracks = []; // tracks not playing
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].id !== track?.id) {
        listIdx.push(i);
        tracks.push(queue[i]);
      }
    }

    try {
      // Remove tracks not playing from queue
      for (let idx of listIdx) {
        idx < curr ? await TrackPlayer.remove(0) : await TrackPlayer.remove(1);
      }
    } catch (err) {
      console.log(err);
    }

    if (!shuffle) {
      // Shuffle
      tracks.sort(() => Math.random() - 0.5);

      await TrackPlayer.add(tracks);

      const trackss = await TrackPlayer.getQueue();
      console.log(
        'now queue: ',
        trackss.map(val => val.title),
      );

      await TrackPlayer.play();

      setCurrTrack(0);
      setQueue(trackss);
    } else {
      console.log(
        'init queue: ',
        list.map(val => val.title),
      );
      // Initial index of playing track in list shuffle off
      let pos = 0;
      for (let i = 0; i < queue.length; i++) {
        if (list[i].id === track?.id) {
          pos = i;
          break;
        }
      }
      console.log('init pos: ', pos);
      const trackss = await TrackPlayer.getQueue();
      console.log(
        'after queue: ',
        trackss.map(val => val.title),
      );

      for (let i = pos + 1; i < list.length; i++) {
        await TrackPlayer.add(list[i]);
        const trackss = await TrackPlayer.getQueue();
        console.log(
          'after queue: ',
          trackss.map(val => val.title),
        );
      }

      for (let i = pos - 1; i >= 0; i--) {
        await TrackPlayer.add(list[i], 0);
        const trackss = await TrackPlayer.getQueue();
        console.log(
          'after queue: ',
          trackss.map(val => val.title),
        );
      }

      await TrackPlayer.play();

      setQueue(list);
    }

    setShuffle(prev => !prev);
  };

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.PlaybackQueueEnded, Event.PlaybackState],
    async event => {
      if (
        event.type === Event.PlaybackTrackChanged &&
        event.nextTrack != null
      ) {
        setPause(false);
        let track = await TrackPlayer.getCurrentTrack();
        console.log('curr track: ', track);

        await TrackPlayer.seekTo(0);
        await TrackPlayer.play();

        track && setCurrTrack(track);
      }
      if (event.type === Event.PlaybackQueueEnded) {
        console.log('End queue');
        setIsEnd(true);
      } else {
        setIsEnd(false);
      }
      if (event.type === Event.PlaybackState) {
        console.log(playbackState);
        if (
          playbackState === State.None ||
          playbackState === State.Stopped ||
          playbackState === State.Paused
        ) {
          setPause(true);
        } else {
          await TrackPlayer.play();
          setPause(false);
        }
      }
    },
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNav />

      {queue[currTrack]?.type && queue[currTrack].type === 'music' ? (
        <AudioPlayback val={queue[currTrack]} />
      ) : (
        <VideoPlayback
          val={queue[currTrack]}
          seekVal={seekVal}
          repeatMode={repeatMode}
        />
      )}

      <View style={styles.performance}>
        <Text style={styles.title}>{queue[currTrack]?.title}</Text>

        <View style={styles.progress}>
          <Slider
            value={position}
            minimumValue={0}
            maximumValue={duration}
            minimumTrackTintColor={theme.colors.lightPink}
            maximumTrackTintColor="#fff"
            thumbTintColor={theme.colors.lightPink}
            allowTouchTrack
            thumbStyle={{
              width: 18,
              height: 18,
            }}
            onSlidingComplete={async value => {
              setSeekVal(value);
              await TrackPlayer.seekTo(value);
              setSeekVal(-1);
            }}
          />
          <View style={styles.progressLabel}>
            <Text style={styles.label}>{format(position)}</Text>
            <Text style={styles.label}>{format(duration)}</Text>
          </View>
        </View>

        <View style={styles.trackControl}>
          <TouchableOpacity onPress={hanldeShuffle} style={{padding: 5}}>
            <MaterialCommunityIcon
              name="shuffle"
              color={shuffle ? theme.colors.lightPink : '#fff'}
              size={30}
            />
          </TouchableOpacity>

          <View style={styles.central}>
            <TouchableOpacity onPress={skipToPrevious} style={{padding: 5}}>
              <Icon
                name="controller-jump-to-start"
                type="entypo"
                size={48}
                color={'#fff'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.play}
              onPress={() => {
                togglePlayback(playbackState);
              }}>
              {pause ? <Play /> : <Pause />}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={skipToNext}
              style={{padding: 5}}
              disabled={currTrack === list.length ? true : false}>
              <Icon
                name="controller-next"
                type="entypo"
                size={48}
                color={
                  currTrack === list.length - 1 && repeatMode === 'off'
                    ? theme.colors.gray
                    : '#fff'
                }
                style={{
                  opacity:
                    currTrack === list.length - 1 && repeatMode === 'off'
                      ? 0.5
                      : 1,
                }}
              />
            </TouchableOpacity>
          </View>

          {/* <Repeat /> */}
          <TouchableOpacity onPress={changeRepeatMode} style={{padding: 5}}>
            <MaterialCommunityIcon
              name={repeatIcon()}
              color={repeatMode === 'off' ? '#fff' : theme.colors.lightPink}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.darkShadeBlue,
    justifyContent: 'space-between',
  },
  performance: {
    gap: 40,
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progress: {
    // gap: 10,
  },
  progressLabel: {flexDirection: 'row', justifyContent: 'space-between'},
  label: {color: '#fff'},
  trackControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  central: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  play: {
    borderWidth: 2,
    borderColor: theme.colors.lightPink,
    borderRadius: 50,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default PlayScreen;
