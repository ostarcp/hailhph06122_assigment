import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

export default (
  type = "success",
  titleMessage = "default Title",
  contentMessage = "default Content",
  timeClose = 4000,
  func = () => {}
) => {
  switch (type) {
    case "info":
      NotificationManager.info(titleMessage, contentMessage, timeClose, func);
      break;
    case "success":
      NotificationManager.success(
        titleMessage,
        contentMessage,
        timeClose,
        func
      );
      break;
    case "warning":
      NotificationManager.warning(
        titleMessage,
        contentMessage,
        timeClose,
        func
      );
      break;
    case "error":
      NotificationManager.error(titleMessage, contentMessage, timeClose, func);
      break;
    default:
      break;
  }
};
