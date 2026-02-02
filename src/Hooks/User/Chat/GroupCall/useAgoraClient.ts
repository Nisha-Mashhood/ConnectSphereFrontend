import { useRef } from "react";
import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng";

export const useAgoraClient = () => {
  const clientRef = useRef<IAgoraRTCClient | null>(null);

  if (!clientRef.current) {
    clientRef.current = AgoraRTC.createClient({
      mode: "rtc",
      codec: "vp8",
    });
  }

  return clientRef;
};
