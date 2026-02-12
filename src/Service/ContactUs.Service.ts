import { GET_CONTACT_MESSAGES, SEND_CONTACT_MESSAGE, SEND_REPLY_TO_CONTACT } from "../Constant/ApiRoutes/ContactUsRoutes";
import { axiosInstance } from "../lib/axios";
import { handleError } from "./ErrorHandler";

interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

interface ReplyData {
  email: string;
  replyMessage: string;
}

export const sendContactMessage = async (data: ContactMessage) => {
  try {
    const response = await axiosInstance.post(SEND_CONTACT_MESSAGE, data);
    return response.data.data;
  } catch (error) {
   handleError(error);
  }
};

export const getContactMessages = async ({
  page = 1,
  limit = 10,
  search = "",
  dateFilter = "all",
}: {
  page?: number;
  limit?: number;
  search?: string;
  dateFilter?: "today" | "7days" | "30days" | "all";
}) => {
  try {
    const response = await axiosInstance.get(GET_CONTACT_MESSAGES, {
      params: { page, limit, search, dateFilter },
    });

    return response.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const sendReply = async (contactMessageId: string, data: ReplyData) => {
  try {
    const response = await axiosInstance.post(SEND_REPLY_TO_CONTACT(contactMessageId), data);
    return response.data.data;
  } catch (error) {
    handleError(error);
    throw new Error(error.response?.data?.message || "Failed to send reply");
  }
};