import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IncomingCallData } from '../../Hooks/User/Chat/OneToOneCall/useChatCall';

interface IncomingCall {
  senderId: string;
  senderName: string;
  callType: 'audio' | 'video';
  contactType: 'user-user' | 'user-mentor';
  offerData?: IncomingCallData;
  shouldAutoAnswer?: boolean;
}
export interface IncomingGroupCall {
  groupId: string;
  groupName: string;
  starterId: string;
  starterName: string;
  roomName: string;
  callType: 'audio' | 'video';
}

export interface ActiveGroupCall {
  groupId: string;
  groupName: string;
  roomName: string;
  callType: 'audio' | 'video';
}
interface CallState {
  incomingCall: IncomingCall | null;
  incomingGroupCall: IncomingGroupCall | null;
  activeGroupCall: ActiveGroupCall | null
}


const initialState: CallState = {
  incomingCall: null,
  incomingGroupCall: null,
  activeGroupCall: null,
};

const callSlice = createSlice({
  name: 'call',
  initialState,
  reducers: {
    setIncomingCall(state, action: PayloadAction<IncomingCall>) {
      state.incomingCall = action.payload;
    },
    clearIncomingCall(state) {
      state.incomingCall = null;
    },
    setIncomingGroupCall: (state, action: PayloadAction<IncomingGroupCall | null>) => {
      state.incomingGroupCall = action.payload;
    },
    clearIncomingGroupCall: (state) => {
      state.incomingGroupCall = null;
    },
    setActiveGroupCall(state, action: PayloadAction<ActiveGroupCall>) {
      state.activeGroupCall = action.payload;
    },
    clearActiveGroupCall(state) {
      state.activeGroupCall = null;
    }
  },
});

export const { 
  setIncomingCall, 
  clearIncomingCall, 
  setIncomingGroupCall, 
  clearIncomingGroupCall,
  setActiveGroupCall,
  clearActiveGroupCall,  
} = callSlice.actions;
export default callSlice.reducer;