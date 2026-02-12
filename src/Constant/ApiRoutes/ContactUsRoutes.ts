export const CONTACT_US_BASE = '/contactUs';

export const SEND_CONTACT_MESSAGE = `${CONTACT_US_BASE}/contact`;
export const GET_CONTACT_MESSAGES = `${CONTACT_US_BASE}/messages`;
export const SEND_REPLY_TO_CONTACT = (contactMessageId: string) =>
  `${CONTACT_US_BASE}/reply/${contactMessageId}`;