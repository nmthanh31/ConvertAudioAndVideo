import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Tab, Text, makeStyles, useTheme} from '@rneui/themed';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {formatList} from '../models/fileFormat';
import CheckCircleIcon from 'react-native-vector-icons/AntDesign';
import {windowWidth} from '../utils/dimension';
import ImportVideo from './ImportVideo';
import {TabItem} from '@rneui/base/dist/Tab/Tab.Item';
import {TabView} from '@rneui/base';
import {ScrollView} from 'react-native-gesture-handler';

const BottomModal = ({list, setOverlay}: any) => {
  const styles = useStyles();

  const [checked, setChecked] = useState<number>(-1);
  const [index, setIndex] = useState(0);

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '75%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);

  const handleChecked = (idx: number) => {
    setChecked(idx);
    bottomSheetModalRef.current?.close();
  };

  // renders
  return (
    <View style={styles.container}>
      {checked !== -1 && (
        <ImportVideo list={list} pos={checked} setOverlay={setOverlay} />
      )}

      <TouchableOpacity style={styles.btn} onPress={handlePresentModalPress}>
        <Text style={styles.btnText}>Choose Format</Text>
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={styles.bottomStyle}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        )}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Choose format you want to convert
          </Text>
        </View>

        <Tab value={index} onChange={e => setIndex(e)}>
          <TabItem title="Video" />
          <TabItem title="Audio" />
        </Tab>

        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item style={styles.tabViewItem}>
            <ScrollView
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={false}>
              {formatList
                .filter(val => val.type === 'video')
                .map((val: any, idx: number) => {
                  return (
                    <TouchableOpacity
                      key={val.id}
                      style={styles.option}
                      onPress={() => handleChecked(val.id)}>
                      <Text style={styles.optionText}>{val.container}</Text>
                      {val.id === checked && (
                        <CheckCircleIcon
                          name="checkcircle"
                          size={25}
                          style={styles.icon}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </TabView.Item>

          <TabView.Item style={styles.tabViewItem}>
            <ScrollView
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={false}>
              {formatList
                .filter(val => val.type === 'audio')
                .map((val: any, idx: number) => {
                  return (
                    <TouchableOpacity
                      key={val.id}
                      style={styles.option}
                      onPress={() => handleChecked(val.id)}>
                      <Text style={styles.optionText}>{val.container}</Text>
                      {val.id === checked && (
                        <CheckCircleIcon
                          name="checkcircle"
                          size={25}
                          style={styles.icon}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </TabView.Item>
        </TabView>
      </BottomSheetModal>
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
    gap: 20,
  },

  btn: {
    backgroundColor: theme.colors.darkBlue,
    borderRadius: 25,
    width: windowWidth - 60,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 1.25,
    fontSize: 20,
  },
  bottomStyle: {
    flex: 1,
    padding: 20,
  },
  header: {
    paddingVertical: 20,
  },
  headerText: {
    color: theme.colors.pink,
    letterSpacing: 1.25,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tabViewItem: {flex: 1, paddingBottom: 20},
  contentContainer: {gap: 20, paddingVertical: 10},
  option: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: theme.colors.lightGray,
    borderRadius: 15,
  },
  optionText: {
    fontSize: 18,
    color: theme.colors.pink,
    letterSpacing: 1,
  },
  icon: {
    color: theme.colors.pink,
  },
}));

export default BottomModal;
