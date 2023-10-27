import TrackPlayer, {Capability, Event} from 'react-native-track-player';

export const setupPlayer = async () => {
  await TrackPlayer.setupPlayer();
};

export const addTracks = async (tracks: any) => {
  await TrackPlayer.add(tracks);
};

export const updateOptions = async () => {
  await TrackPlayer.updateOptions({
    // Media controls capabilities
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
    // Capabilities that will show up when the notification is in the compact form on Android
    compactCapabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
  });
};

export const playbackService = async () => {
  // TODO: Attach remote event handlers
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    console.log('Event.RemotePause');
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    console.log('Event.RemotePlay');
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    console.log('Event.RemoteNext');
    TrackPlayer.skipToNext();
  });

  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    console.log('Event.RemotePrevious');
    TrackPlayer.skipToPrevious();
  });
};
