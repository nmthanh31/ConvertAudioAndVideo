import { SafeAreaView, View, Linking } from 'react-native';
import React from 'react';
import CustomHeader from '../../components/CustomHeader';
import { makeStyles } from '@rneui/base';
import SettingItem from './SettingItem';
import { settings } from '../../models/settings';
import InAppReview from 'react-native-in-app-review';
import Information from '../../common/env'
import Share from 'react-native-share';

const SettingScreen = ({ navigation }: any) => {
  
  const styles = useStyles();

  const RateApp = async () => {
    try {
      console.log('RATE APP:', InAppReview.isAvailable());
      InAppReview.isAvailable(); // XEM MÁY ĐỦ VERSION HỖ TRỢ HAY KHÔNG (android version >= 21 and iOS >= 10.3)
      const response = await InAppReview.RequestInAppReview();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
  const FeedBack = () => {
    Linking.openURL('mailto:' + Information.emailFeedBack);
  }
  const ShareInfo = () => {
    const shareInfo = {
      message: Information.app_link,
    };
    Share.open(shareInfo);
  }
  const Policy = () => {
    Linking.openURL(Information.policyWebSite);
  }
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader navigation={navigation} textHeader={'Settings'} />
      <View style={styles.itemList}>
        {settings.map((item, idx) => (
          <SettingItem
            key={idx}
            navigation={navigation}
            item={item}
            handlePress={()=>{
              if(item.icon == "star"){
                RateApp();
              }else if(item.icon == "feedback"){
                FeedBack();
              }else if(item.icon == "share"){
                ShareInfo();
              }else{
                Policy();
              }
            }}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const useStyles = makeStyles(theme => ({
  container: { flex: 1 },
  itemList: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
}));

export default SettingScreen;
