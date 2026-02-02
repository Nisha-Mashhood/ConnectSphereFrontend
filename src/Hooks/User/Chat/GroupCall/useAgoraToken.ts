import { useEffect, useState } from "react";
import { fetchGroupCallToken } from "../../../../Service/Call.Service";

export const useAgoraToken = (channelName?: string) => {
  const [agoraToken, setAgoraToken] = useState<string | null>(null);
  const [agoraUid, setAgoraUid] = useState<number | null>(null);

  useEffect(() => {
    if (!channelName) return;
    const groupId = channelName.replace("group-", "");

    const loadToken = async () => {
      try {
        const { token, agoraUid } = await fetchGroupCallToken(groupId);
        setAgoraToken(token);
        setAgoraUid(agoraUid);
      } catch (err) {
        console.error("Failed to fetch Agora token", err);
      }
    };

    loadToken();
  }, [channelName]);

  return { agoraToken, agoraUid };
};