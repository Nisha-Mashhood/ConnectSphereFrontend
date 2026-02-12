export const CALL_LOG_BASE = '/callLog';

export const GET_CALL_LOGS = `${CALL_LOG_BASE}/call-logs`;
export const GENERATE_GROUP_CALL_TOKEN = (groupId: string) =>
  `${CALL_LOG_BASE}/generateToken/${groupId}`;