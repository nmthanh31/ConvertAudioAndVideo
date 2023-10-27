import Toast from 'react-native-toast-message';

export const successToast = (message: any, callBack: any) => {
  Toast.show({
    type: 'success',
    text1: message,
    visibilityTime: 2000,
    onHide: callBack,
  });
};

export const errorToast = (message: any) => {
  Toast.show({
    type: 'error',
    text1: message,
    visibilityTime: 2000,
  });
};
