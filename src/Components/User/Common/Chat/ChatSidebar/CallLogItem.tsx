import { Avatar } from "@nextui-org/react";
import {
    formatCallDuration, 
    formatCallTime, 
    getCallParticipantName, 
    getCallStatusIcon, 
    getCallTypeIcon 
} from "../utils/chatSidebarUtils";


const CallLogItem = ({ callLog, currentUserId }) => {
  const isGroup = callLog.type === "group";
  const participantName = getCallParticipantName(callLog, currentUserId);

  return (
    <div className="flex items-center p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
      <Avatar 
        size="sm" 
        src={isGroup ? callLog.group.profilePic : callLog.senderId?.profilePic}
        fallback={isGroup ? "G" : "?"}
        className={isGroup ? "ring-2 ring-emerald-500" : ""}
      />

      <div className="ml-3 flex-1">
        <div className="flex justify-between items-center">
          <p className="font-medium">
            {isGroup ? participantName : participantName}
          </p>
          {getCallStatusIcon(callLog, currentUserId)}
        </div>

        <p className="text-xs text-gray-500 flex items-center gap-1">
          {formatCallDuration(callLog)} • {formatCallTime(callLog.startTime)}
          {isGroup && (
            <span className="ml-1 text-emerald-500">
              • Group
            </span>
          )}
        </p>
      </div>

      {getCallTypeIcon(callLog.callType)}
    </div>
  );
};

export default CallLogItem;
