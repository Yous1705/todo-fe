"use client";

import { App } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { createContext, useContext, useEffect, useRef } from "react";

const messageRef = { current: null as MessageInstance | null };

export const getMessage = () => messageRef.current!;

function MessageBridge() {
  const { message } = App.useApp();

  useEffect(() => {
    messageRef.current = message;
  }, [message]);

  return null;
}

export function AntdAppProvider({ children }: { children: React.ReactNode }) {
  return (
    <App>
      <MessageBridge />
      {children}
    </App>
  );
}
