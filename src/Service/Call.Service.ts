import { GENERATE_GROUP_CALL_TOKEN, GET_CALL_LOGS } from "../Constant/ApiRoutes/CallLogRoutes";
import { axiosInstance } from "../lib/axios";
import { ICallLog } from "../types";
import { handleError } from "./ErrorHandler";


export const getCallLogs = async (): Promise<ICallLog[]> => {
  try {
    const response = await axiosInstance.get(GET_CALL_LOGS);
    return response.data.data;
  } catch (error) {
    handleError(error);
    throw new Error(error.response?.data?.message || "Failed to fetch call logs");
  }
};

export const fetchGroupCallToken = async (groupId: string) => {
  try{
    const res = await axiosInstance.get(GENERATE_GROUP_CALL_TOKEN(groupId));
    return res.data.data;
  }catch(error){
    handleError(error);
  }
};