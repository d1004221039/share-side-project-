import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { start } from "repl";
import type { RootState } from "../../app/store";

// Define a type for the slice state
interface CounterState {
  islogin: boolean;
  userID: string;
  poNum: number;
  cloud: number;
  pageState: number;
  messageToggle: boolean;
  messageState: number;
}
// 頁面狀態
export enum pageState {
  "caseAndDesign" = 1,
  "project" = 2,
  "porposal" = 3,
}
export enum MessageState {
  "notLogin" = 0,
  "deleteProject" = 1,
  "cloudIsFull" = 2,
  "overPost" = 3,
  "incomplete" = 4,
}

// Define the initial state using that type
const initialState: CounterState = {
  islogin: false,
  userID: "",
  pageState: pageState.caseAndDesign, //頁面狀態
  messageToggle: false,
  messageState: MessageState.notLogin,
  // 仿後端
  poNum: 0, //發文次數
  cloud: 0, //雲端
};

export const counterSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    //改變頁面狀態
    changePageState: (state, newState: PayloadAction<number>) => {
      state.pageState = newState.payload;
    },
    isloginToggle: (state, newState: PayloadAction<boolean>) => {
      state.islogin = newState.payload;
    },
    callMessage: (state, msgState: PayloadAction<number>) => {
      state.messageState = msgState.payload;
      state.messageToggle = true;
    },
    closeMessage: (state) => {
      state.messageToggle = false;
    },
    getUserID: (state, value: PayloadAction<string>) => {
      state.userID = value.payload;
    },
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const {
  changePageState,
  isloginToggle,
  callMessage,
  closeMessage,
  getUserID,
} = counterSlice.actions;

export default counterSlice.reducer;
