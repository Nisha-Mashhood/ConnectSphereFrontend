import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import AgoraGroupCallOverlay from "./AgoraGroupCallOverlay";
import { useGroupCall } from "../../../../../Hooks/User/Chat/GroupCall/useChatGroupCall";

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
