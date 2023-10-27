import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import {ThemeProvider, createTheme} from '@rneui/themed';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {themeOptions} from './src/configs/styles';
import {SyncedRealmContext} from './src/models/Realm/RealmConfig';
import Toast from 'react-native-toast-message';
import {setupPlayer, updateOptions} from './src/services/trackPlayerServices';

const theme = createTheme(themeOptions);
const {RealmProvider} = SyncedRealmContext;

function App(): JSX.Element {
  useEffect(() => {
    setupPlayer();
    updateOptions();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider theme={theme}>
        <RealmProvider>
          <BottomSheetModalProvider>
            <NavigationContainer>
              <StackNavigator />
            </NavigationContainer>
          </BottomSheetModalProvider>
        </RealmProvider>
        <Toast />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
