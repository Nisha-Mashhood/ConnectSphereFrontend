import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIncomingGroupCall } from "../../../../redux/Slice/callSlice";
import { socketService } from "../../../../Service/SocketService";
import { RootState } from "../../../../redux/store";

const GlobalGroupCallListener: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    const handleGroupCallStarted = (data: {
        groupId: string;
        groupName: string;
        starterId: string;
        starterName?: string;
        roomName: string;
        callType: "audio" | "video";
    }) => {
      console.log("StarterId : ",data.starterId);
      console.log("currentUser : ",currentUser.id);
      if (data.starterId !== currentUser?.id) {
        console.log("Incoming group call:", data);
        dispatch(setIncomingGroupCall({
            groupId: data.groupId,
            groupName: data.groupName,
            starterId: data.starterId,
            starterName: data.starterName || "Someone",
            roomName: data.roomName,
            callType: data.callType,
        }));
      }
    };
    socketService.onGroupCallStarted(handleGroupCallStarted);
    return () => {
      socketService.offGroupCallStarted(handleGroupCallStarted);
    };
  }, [dispatch, currentUser?.id]);

  return null;
};
export default GlobalGroupCallListener;