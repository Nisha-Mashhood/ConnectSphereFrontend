import { useCallback, useEffect, useRef, useState } from "react";
import { IAgoraRTCClient, IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";

export const useAgoraRemoteUsers = (
  clientRef: React.MutableRefObject<IAgoraRTCClient | null>,
  lastCameraToggleTime: number,
  agoraToken: string | null,
  agoraUid: number | null,
  channelName?: string
) => {
  const [mutedUsers, setMutedUsers] = useState<Set<string>>(new Set());
  const mutedUsersRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    mutedUsersRef.current = mutedUsers;
  }, [mutedUsers]);

  const handleUserPublished = useCallback(
    async (user: IAgoraRTCRemoteUser, mediaType: "audio" | "video") => {
      try {
        await clientRef.current?.subscribe(user, mediaType);

        if (mediaType === "audio" && user.audioTrack) {
          user.audioTrack.play();
          setMutedUsers((prev) => {
            const newSet = new Set(prev);
            newSet.delete(String(user.uid));
            return newSet;
          });
        }

        if (mediaType === "video") {
          let container = document.getElementById(`remote-${user.uid}`);

          if (!container) {
            container = document.createElement("div");
            container.id = `remote-${user.uid}`;
            container.className =
              "w-[300px] h-[220px] rounded-lg overflow-hidden bg-gray-700 camera-off";
            document.getElementById("remote-videos")?.appendChild(container);
          }

          const nameLabel = document.createElement("div");
            nameLabel.className =
            "absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs z-10";

            nameLabel.innerText = user.uid.toString();
            container.appendChild(nameLabel);

          container.classList.remove("camera-off");
          container.innerHTML = "";

          if (mutedUsersRef.current.has(String(user.uid))) {
            const muteOverlay = document.createElement("div");
            muteOverlay.className =
              "absolute bottom-3 left-3 bg-red-600/80 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 z-10";
            muteOverlay.innerHTML = "<span>🔇</span> Muted";
            container.appendChild(muteOverlay);
          }

          user.videoTrack?.play(container);
        }
      } catch (err) {
        console.error("handleUserPublished error", err);
      }
    },
    [clientRef]
  );

  const handleUserUnpublished = (user: IAgoraRTCRemoteUser) => {
    const container = document.getElementById(`remote-${user.uid}`);
    if (container) {
      user.videoTrack?.stop();
      container.classList.add("camera-off");
      container.innerHTML = "";
    }

    if (user.hasVideo) {
      setMutedUsers((prev) => new Set([...prev, String(user.uid)]));
    }
  };

  useEffect(() => {
    const client = clientRef.current;
    if (!client) return;

    client.on("user-published", handleUserPublished);
    client.on("user-unpublished", handleUserUnpublished);

    return () => {
      client.off("user-published", handleUserPublished);
      client.off("user-unpublished", handleUserUnpublished);
    };
  }, [handleUserPublished, clientRef]);

  useEffect(() => {
    if (!agoraToken || !agoraUid || !channelName) return;

    const interval = setInterval(() => {
      const client = clientRef.current;
      if (!client) return;

      client.remoteUsers.forEach(async (user) => {
        if (user.hasVideo) await handleUserPublished(user, "video");
        if (user.hasAudio && !user.audioTrack?.isPlaying)
          await handleUserPublished(user, "audio");
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [agoraToken, agoraUid, channelName, lastCameraToggleTime, handleUserPublished, clientRef]);

  return { mutedUsers, handleUserPublished };
};