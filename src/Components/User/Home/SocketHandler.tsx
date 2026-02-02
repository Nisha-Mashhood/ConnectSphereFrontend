import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { RootState } from "../../../redux/store";
import { socketService } from "../../../Service/SocketService";
import {
  setNotifications,
  addNotification,
  updateNotification,
  markNotificationAsRead,
} from "../../../redux/Slice/notificationSlice";
import { fetchNotificationService } from "../../../Service/Notification.Service";
import { Notification } from "../../../Interface/User/Inotification";
import { setIncomingGroupCall } from "../../../redux/Slice/callSlice";

const SocketHandler: React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { isInChatComponent } = useSelector((state: RootState) => state.notification);

  useEffect(() => {
    if (!currentUser?.id) return;

    const token = localStorage.getItem("authToken") || "";

    // Connect socket if not already connected
    if (!socketService.isConnected()) {
      socketService.connect(currentUser.id, token);
      console.log("[SocketHandler] Socket connected for user:", currentUser.id);
    }

    // Join all group rooms this user belongs to
    socketService.joinAllMyGroupRooms(currentUser.id);
    console.log("[SocketHandler] Requested to join all group rooms for user:", currentUser.id);

    const handleJoinedGroups = (data: { groupIds: string[] }) => {
      console.log("[SocketHandler] Successfully joined group rooms:", data.groupIds);
    };
    socketService.onJoinedAllGroupRooms(handleJoinedGroups);

    const fetchNotifications = async () => {
      try {
        const notifications = await fetchNotificationService(currentUser.id);
        dispatch(setNotifications(notifications));
      } catch (error) {
        console.error("[SocketHandler] Error fetching notifications:", error);
      }
    };
    fetchNotifications();

    const handleNotificationNew = (notification: Notification) => {
      dispatch(addNotification(notification));
      if (
        notification.type === "task_reminder" &&
        notification.status === "unread" &&
        !isInChatComponent
      ) {
        toast.success(notification.content, {
          id: notification.id,
          duration: 5000,
        });
      }
    };

    const handleNotificationRead = ({ notificationId }: { notificationId: string }) => {
      dispatch(markNotificationAsRead(notificationId));
    };

    const handleNotificationUpdated = (notification: Notification) => {
      dispatch(updateNotification(notification));
    };

    socketService.onNotificationNew(handleNotificationNew);
    socketService.onNotificationRead(handleNotificationRead);
    socketService.onNotificationUpdated(handleNotificationUpdated);

    const handleGroupCallStarted = (data: {
        groupId: string;
        groupName: string;
        starterId: string;
        starterName?: string;
        roomName: string;
        callType: "audio" | "video";
    }) => {
      if (data.starterId === currentUser?.id) return;

      console.log("[SocketHandler] Received groupCallStarted:", data);
      dispatch(
        setIncomingGroupCall({
            groupId: data.groupId,
            groupName: data.groupName,
            starterId: data.starterId,
            starterName: data.starterName || "Someone",
            roomName: data.roomName,
            callType: data.callType,
        })
      );
    };

    socketService.onGroupCallStarted(handleGroupCallStarted);


    return () => {
      console.log("[SocketHandler] Cleaning up socket listeners");

      // Group room confirmation listener
      socketService.offJoinedAllGroupRooms(handleJoinedGroups);
      socketService.leaveAllMyGroupRooms(currentUser.id);

      // Notification listeners
      socketService.socket?.off("notification.new", handleNotificationNew);
      socketService.socket?.off("notification.read", handleNotificationRead);
      socketService.socket?.off("notification.updated", handleNotificationUpdated);
    };
  }, [currentUser?.id, dispatch, isInChatComponent]);

  return null;
};

export default SocketHandler;