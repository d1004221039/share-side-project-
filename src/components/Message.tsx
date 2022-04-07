import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import {
  MessageState,
  closeMessage,
  isloginToggle,
  getUserID,
} from "../redux/features/counter/Slice";
import { useAppSelector, useAppDispatch } from "../redux/app/hooks";
import { useNavigate } from "react-router-dom";

type msgType = {
  msgText: string;
  cancelBTN: string;
  checkBTN: string;
};
const msg: msgType[] = [
  {
    msgText: "請先登入才能發文",
    cancelBTN: "離開",
    checkBTN: "登入",
  },
  {
    msgText: "確定要刪除專案？",
    cancelBTN: "取消",
    checkBTN: "確定",
  },
  {
    msgText: "Google雲端容量已滿，請清出空間後，再發文",
    cancelBTN: "離開",
    checkBTN: "確定",
  },
  {
    msgText: "發文次數己超過限制",
    cancelBTN: "離開",
    checkBTN: "確定",
  },
  {
    msgText: "必填項目未填寫，請填寫後再發佈。",
    cancelBTN: "離開",
    checkBTN: "確定",
  },
];

const Message = () => {
  const go = useNavigate();
  const select = useAppSelector((state) => {
    return state.counterReducer;
  });
  const dispatch = useAppDispatch();
  //登入
  const loginToggle = (value: boolean) => {
    dispatch(isloginToggle(value));
  };

  function cancel() {
    switch (select.messageState) {
      case MessageState.notLogin:
        go("/");
        break;
      case MessageState.deleteProject:
        break;
    }
  }

  function check() {
    switch (select.messageState) {
      case MessageState.notLogin:
        loginToggle(true);
        dispatch(getUserID("ID008"));
        break;
      case MessageState.deleteProject:
        go("/");
        break;
    }
  }
  return (
    <>
      <div className="w-full h-full bg-[rgba(0,0,0,0.3)] fixed top-0 left-0 z-25 ">
        <div className="w-[300px]  bg-[#fff]  rounded-[12px] pb-[24px] fixed translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%]">
          <p className="w-full pt-[48px] pl-[57px] pr-[57px] pb-[28px] text-center text-[18px]">
            {msg[select.messageState].msgText}
          </p>

          <div className="w-full h-[53px] flex justify-center items-center">
            {select.messageState != MessageState.incomplete && (
              <button
                onClick={() => {
                  dispatch(closeMessage());
                  cancel();
                }}
                className="h-full w-[150px] text-[18px] text-[#BEBEBE] text-center"
              >
                {msg[select.messageState].cancelBTN}
              </button>
            )}

            <button
              onClick={() => {
                dispatch(closeMessage());
                check();
              }}
              className="h-full w-[150px]  text-[18px] text-[#00A3FF]"
            >
              {msg[select.messageState].checkBTN}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
