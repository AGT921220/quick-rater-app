import { Platform } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  })
});


export const getNotificationsToken = async () => {
    let token = "";
    try {
      if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          return 'Failed to get';
        }
        token = (await Notifications.getDevicePushTokenAsync()).data;
        
      } else {
//        token = (await Notifications.getExpoPushTokenAsync()).data;
        return 'Must use physival device';
      }
    } catch (error) {
      return error
    }
  
    try {
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    }
    catch (error) {
      return error
    }
    return token;
  };