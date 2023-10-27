import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {convertVideo} from '../utils/convert';
import {formatList} from '../models/fileFormat';
import {makeStyles, useTheme} from '@rneui/themed';
import {windowWidth} from '../utils/dimension';
import {useNavigation} from '@react-navigation/native';
import {errorToast, successToast} from '../utils/toastify';

const ImportVideo = ({list, pos, setOverlay}: any) => {
  const {theme} = useTheme();

  const styles = useStyles();

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const handleConverVideo = (list: string[], format: any) => {
    setLoading(true);
    setOverlay(true);
    try {
      convertVideo(list, format).then(results => {
        const isSuccess = results.every((result: any) => result);
        setLoading(false);
        setOverlay(false);
        if (isSuccess) {
          successToast('Convert Successfully', () => {
            navigation.goBack();
          });
        } else {
          errorToast('Convert Failed');
          setLoading(false);
        }
      });
    } catch (err) {
      console.log('Error when converting videos');
      errorToast('Convert Failed');
      setLoading(false);
      setOverlay(false);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.btn, !loading ? styles.btnActive : styles.btnDisable]}
      onPress={() => {
        handleConverVideo(list, formatList[pos]);
      }}>
      <Text
        style={[
          styles.btnText,
          !loading ? styles.textActive : styles.textDisable,
        ]}>
        {pos === -1 ? 'Convert' : `Convert to ${formatList[pos].container}`}
      </Text>
      {loading && (
        <ActivityIndicator
          size="large"
          color={theme.colors.darkBlue}
          style={styles.loadingIcon}
        />
      )}
    </TouchableOpacity>
  );
};
const useStyles = makeStyles(theme => ({
  btn: {
    gap: 20,
    backgroundColor: theme.colors.pink,
    borderRadius: 25,
    width: windowWidth - 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    position: 'relative',
  },
  loadingIcon: {
    // borderColor: 'red',
    // borderWidth: 1,
    position: 'absolute',
    right: 30,
  },
  btnText: {
    textAlign: 'center',
    letterSpacing: 1.25,
    fontSize: 20,
  },
  textActive: {
    color: '#fff',
  },
  textDisable: {
    color: theme.colors.pink,
  },
  btnActive: {
    backgroundColor: theme.colors.pink,
  },
  btnDisable: {
    backgroundColor: theme.colors.gray,
  },
}));
export default ImportVideo;
