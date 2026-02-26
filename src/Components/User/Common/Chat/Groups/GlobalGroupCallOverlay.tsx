import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import AgoraGroupCallOverlay from "./AgoraGroupCallOverlay";
import { useGroupCall } from "../../../../../Hooks/User/Chat/GroupCall/useChatGroupCall";
import { socketService } from "../../../../../Service/SocketService";
import { useEffect } from "react";

const GlobalGroupCallOverlay = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const activeGroupCall = useSelector(
    (state: RootState) => state.call.activeGroupCall
  );

  // groupCall hook ONLY for end call
  const groupCall = useGroupCall({
    currentUserId: currentUser?.id,
    selectedContact: null,
  });

  useEffect(() => {
    const handleGroupCallEnded = (data: { groupId: string }) => {
      if (data.groupId === activeGroupCall?.groupId) {
        groupCall.endGroupCall(); 
        console.log("Forced end group call from socket");
      }
    };

    socketService.onGroupCallEnded(handleGroupCallEnded);

    return () => {
      socketService.offGroupCallEnded(handleGroupCallEnded);
    };
  }, [activeGroupCall, groupCall]);

  if (!activeGroupCall?.groupId || !activeGroupCall?.roomName || !currentUser) {
    return null;
  }

  return (
    <AgoraGroupCallOverlay
      channelName={activeGroupCall.roomName}
       onEndGroupCall={groupCall.endGroupCall}
    />
  );
};

export default GlobalGroupCallOverlay;
