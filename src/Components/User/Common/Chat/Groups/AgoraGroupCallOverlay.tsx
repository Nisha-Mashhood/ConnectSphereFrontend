import React, { useRef } from "react";
import { IMicrophoneAudioTrack, ICameraVideoTrack } from "agora-rtc-sdk-ng";
import { useAgoraClient } from "../../../../../Hooks/User/Chat/GroupCall/useAgoraClient";
import { useAgoraToken } from "../../../../../Hooks/User/Chat/GroupCall/useAgoraToken";
import { useAgoraRemoteUsers } from "../../../../../Hooks/User/Chat/GroupCall/useAgoraRemoteUsers";
import { useAgoraJoinPublish } from "../../../../../Hooks/User/Chat/GroupCall/useAgoraJoinPublish";
import { useAgoraControls } from "../../../../../Hooks/User/Chat/GroupCall/useAgoraControls";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";

interface AgoraGroupCallOverlayProps {
  channelName?: string;
   onEndGroupCall: () => void;
}

const AgoraGroupCallOverlay: React.FC<AgoraGroupCallOverlayProps> = ({
  channelName,
   onEndGroupCall,
}) => {
  const localAudioTrackRef = useRef<IMicrophoneAudioTrack | null>(null);
  const localVideoTrackRef = useRef<ICameraVideoTrack | null>(null);
  const activeGroupCall = useSelector( (state: RootState) => state.call.activeGroupCall);
  const isAudioOnly = activeGroupCall?.callType === "audio";

  const clientRef = useAgoraClient();
  const { agoraToken, agoraUid } = useAgoraToken(channelName);

  const {
    isMicMuted,
    isCameraOff,
    lastCameraToggleTime,
    toggleMic,
    toggleCamera,
  } = useAgoraControls(
    clientRef,
    localAudioTrackRef,
    localVideoTrackRef
  );

  const { handleUserPublished } = useAgoraRemoteUsers(
    clientRef,
    lastCameraToggleTime,
    agoraToken,
    agoraUid,
    channelName
  );

  const { localVideoContainerRef } = useAgoraJoinPublish(
    clientRef,
    agoraToken,
    agoraUid,
    channelName,
    handleUserPublished
  );


  const endCall = async () => {
    try {
      localAudioTrackRef.current?.stop();
      localAudioTrackRef.current?.close();

      localVideoTrackRef.current?.stop();
      localVideoTrackRef.current?.close();

      await clientRef.current?.leave();
      clientRef.current = null;

      onEndGroupCall();
    } catch (err) {
      console.error("Error ending call", err);
    }
  };

  return (
  <div className="fixed inset-0 bg-black z-[100] flex flex-col text-white">

    {/* Header */}
    <div className="flex justify-between items-center p-4 bg-gray-900">
      <h2 className="text-lg font-semibold">
        {isAudioOnly ? "Group Audio Call" : "Group Video Call"}
      </h2>
    </div>

    {/* Video Area */}
    <div className="flex-1 flex flex-col items-center justify-center bg-black p-4 overflow-auto">
      
      {/* Local Video */}
      <div className="mb-6 relative">
        {!isAudioOnly && (
          <div className="relative">
            <div
              ref={localVideoContainerRef}
              className="w-[300px] h-[220px] rounded-lg overflow-hidden bg-gray-800 border-2 border-blue-500"
            />

            <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
              You
            </div>
          </div>
        )}

        {isMicMuted && (
          <div className="absolute bottom-3 left-3 bg-red-600/80 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 z-10">
            <span>🔇</span> Muted
          </div>
        )}

        {isAudioOnly && (
          <div className="text-center space-y-2">
            {activeGroupCall?.groupName && (
              <p className="text-lg font-semibold">{activeGroupCall.groupName}</p>
            )}
            <p className="text-sm text-gray-400">Audio call in progress</p>
          </div>
        )}
      </div>

      {/* Remote Videos */}
      {!isAudioOnly && (
        <div
          id="remote-videos"
          className="flex flex-wrap gap-6 justify-center"
        />
      )}
    </div>

    {/* Controls */}
    <div className="bg-gray-900 p-4 flex justify-center gap-6 border-t border-gray-700">
      
      {/* Mic Toggle */}
      <button
        onClick={toggleMic}
        className={`p-4 rounded-full ${
          isMicMuted
            ? "bg-red-600 hover:bg-red-700"
            : "bg-gray-700 hover:bg-gray-600"
        } transition-colors`}
      >
        {isMicMuted ? "🔇" : "🎤"}
      </button>

      {/* Camera Toggle */}
      <button
        onClick={() => toggleCamera(localVideoContainerRef.current)}
        disabled={isAudioOnly}
        className={`p-4 rounded-full ${
          isAudioOnly
            ? "bg-gray-500 cursor-not-allowed"
            : isCameraOff
            ? "bg-red-600 hover:bg-red-700"
            : "bg-gray-700 hover:bg-gray-600"
        } transition-colors`}
      >
        {isCameraOff ? "📵" : "📹"}
      </button>

      {/* End Call */}
      <button
        onClick={endCall}
        className="p-4 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
      >
        📞🚫
      </button>
    </div>
  </div>
);
};

export default AgoraGroupCallOverlay;