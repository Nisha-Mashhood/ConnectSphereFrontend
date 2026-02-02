import { useEffect, useRef } from "react";
import AgoraRTC, {
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  IAgoraRTCRemoteUser,
} from "agora-rtc-sdk-ng";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

type HandleUserPublishedFn = (
  user: IAgoraRTCRemoteUser,
  mediaType: "audio" | "video"
) => Promise<void>;

export const useAgoraJoinPublish = (
  clientRef: React.MutableRefObject<IAgoraRTCClient | null>,
  agoraToken: string | null,
  agoraUid: number | null,
  channelName?: string,
  handleUserPublished?: HandleUserPublishedFn
) => {
  const localAudioTrackRef = useRef<IMicrophoneAudioTrack | null>(null);
  const localVideoTrackRef = useRef<ICameraVideoTrack | null>(null);
  const localVideoContainerRef = useRef<HTMLDivElement | null>(null);

  const activeGroupCall = useSelector(
    (state: RootState) => state.call.activeGroupCall
  );

  const isAudioOnly = activeGroupCall?.callType === "audio";

  useEffect(() => {
    if (!agoraToken || !agoraUid || !channelName) return;
    const client = clientRef.current!;
    let mounted = true;

    const join = async () => {
      // Join channel
      await client.join(
        import.meta.env.VITE_AGORA_APP_ID,
        channelName,
        agoraToken,
        agoraUid
      );

      // 🎤 Always publish microphone
      localAudioTrackRef.current =
        await AgoraRTC.createMicrophoneAudioTrack();
      await client.publish(localAudioTrackRef.current);

      // Publish camera ONLY if video call
      if (!isAudioOnly) {
        localVideoTrackRef.current =
          await AgoraRTC.createCameraVideoTrack();
        await client.publish(localVideoTrackRef.current);

        if (localVideoContainerRef.current) {
          localVideoTrackRef.current.play(localVideoContainerRef.current);
        }
      }

      // Handle already-published remote users
      for (const user of client.remoteUsers) {
        if (user.hasAudio) await handleUserPublished?.(user, "audio");
        if (user.hasVideo) await handleUserPublished?.(user, "video");
      }
    };

    if (mounted) join();

    return () => {
      mounted = false;

      localAudioTrackRef.current?.stop();
      localAudioTrackRef.current?.close();
      localAudioTrackRef.current = null;

      localVideoTrackRef.current?.stop();
      localVideoTrackRef.current?.close();
      localVideoTrackRef.current = null;

      client.leave();
    };
  }, [
    agoraToken,
    agoraUid,
    channelName,
    clientRef,
    handleUserPublished,
    isAudioOnly,
  ]);

  return { localAudioTrackRef, localVideoTrackRef, localVideoContainerRef };
};
