import AgoraRTC, { IAgoraRTCClient, ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import { useState } from "react";

export const useAgoraControls = (
  clientRef: React.MutableRefObject<IAgoraRTCClient | null>,
  audioRef: React.MutableRefObject<IMicrophoneAudioTrack | null>,
  videoRef: React.MutableRefObject<ICameraVideoTrack | null>
) => {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [lastCameraToggleTime, setLastCameraToggleTime] = useState(0);

  const toggleMic = async () => {
    if (!clientRef.current) return;

    if (isMicMuted) {
      audioRef.current = await AgoraRTC.createMicrophoneAudioTrack();
      await clientRef.current.publish(audioRef.current);
    } else {
      audioRef.current?.close();
      await clientRef.current.unpublish(audioRef.current);
      audioRef.current = null;
    }

    setIsMicMuted(!isMicMuted);
  };

  const toggleCamera = async (container: HTMLDivElement | null) => {
    if (!clientRef.current) return;

    if (isCameraOff) {
      videoRef.current = await AgoraRTC.createCameraVideoTrack();
      await clientRef.current.publish(videoRef.current);
      if (container) {
        container.innerHTML = "";
        videoRef.current.play(container);
        }
    } else {
      if (videoRef.current) {
        videoRef.current.stop();
        videoRef.current.close();
        await clientRef.current.unpublish(videoRef.current);
        videoRef.current = null;
        }

        if (container) {
        container.innerHTML = "";
        container.classList.add("camera-off");
        }
    }

    setIsCameraOff(!isCameraOff);
    setLastCameraToggleTime(Date.now());
  };

  return {
    isMicMuted,
    isCameraOff,
    lastCameraToggleTime,
    toggleMic,
    toggleCamera,
  };
};