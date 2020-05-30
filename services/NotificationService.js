import PushNotification from 'react-native-push-notification';
import NotificationHandler from './NotificationHandler';

export default class NotificationService {
  constructor(onRegister, onNotification) {
    NotificationHandler.attachRegister(onRegister);
    NotificationHandler.attachNotification(onNotification);

    PushNotification.getApplicationIconBadgeNumber(function(number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });
  }

  localNotification(title, content) {
    PushNotification.localNotification({
      title: title,
      message: content,
    });
  }

  scheduleNotification(title, content, time) {
    PushNotification.localNotificationSchedule({
      date: time || new Date(Date.now() + 30 * 1000), // in 30 secs
      title: title,
      message: content,
    });
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  requestPermissions() {
    return PushNotification.requestPermissions();
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }

  abandonPermissions() {
    PushNotification.abandonPermissions();
  }
}
