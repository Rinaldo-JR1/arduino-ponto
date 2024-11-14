"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { message, notification, Spin } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { NotificationInstance } from "antd/es/notification/interface";

interface AppContextProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  messageApi: MessageInstance;
  notificationApi: NotificationInstance;
}

export const AppContext = createContext<AppContextProps>({
  loading: false,
  setLoading: () => {},
  messageApi: message,
  notificationApi: notification,
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        messageApi,
        notificationApi,
      }}
    >
      <Spin spinning={loading}>
        {contextHolder}
        {notificationContextHolder}
        {children}
      </Spin>
    </AppContext.Provider>
  );
};
