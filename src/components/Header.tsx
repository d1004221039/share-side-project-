import "./HeaderCSS.css";
import React from "react";
import HeaderContainer from "./layout/headerContainer";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/app/hooks";
import {
  isloginToggle,
  MessageState,
  callMessage,
  pageState,
  getUserID,
} from "../redux/features/counter/Slice";

const Header = () => {
  const go = useNavigate();
  const select = useAppSelector((state) => {
    return state.counterReducer;
  });
  const dispatch = useAppDispatch();
  //登入
  const loginToggle = (value: boolean) => {
    dispatch(isloginToggle(value));
  };

  return (
    <>
      <div
        className={
          (select.pageState == pageState.porposal && "hidden xl:block ") +
          " bg-[#f8f8f8]"
        }
      >
        <HeaderContainer>
          <div className="w-full h-full relative">
            {/* logo */}
            <img
              typeof="button"
              onClick={() => {
                go("/");
              }}
              className="absolute translate-y-[-50%] translate-x-[-50%]  left-[50%] top-[30px] md:translate-y-0 md:translate-x-0 md:left-[3%] md:top-[19%]  h-[44px] w-[120px] md:w-[174px] md:h-[63px]"
              src="header/logo.png"
              alt=""
            />
            {/* serch */}
            <div className="absolute left-[19.44%] top-[60px] md:left-[27.5%] md:top-[27%] w-[78.05%] h-[46px] md:w-[38.54%] xl:w-[41.87%] ">
              <input
                type="text"
                className="pl-[4.9%] text-[14px] h-[46px] w-[80.78%] md:w-[81.75%] xl:w-[90%] float-left bg-[#EDEEF0] border-[#EDEEF0] rounded-[12px]"
                placeholder="搜尋視覺或專案..."
              />
              <button className="h-[46px] w-[46px] rounded-[12px] bg-[#313131] flex justify-center items-center float-right">
                <img src="Icon/search.svg" className="h-[17px] w-[18.21px]  " />
              </button>
            </div>
            {/* proposal btn */}
            <div className="  w-[46px]  md:w-[210px] h-[46px] absolute left-[4%] top-[60px]  md:top-[27.45%] md:left-[70%] xl:left-[80%]">
              {/* 提案 */}
              <button
                onClick={() => {
                  if (select.islogin) {
                    go("/proposal:empty");
                  } else {
                    dispatch(callMessage(MessageState.notLogin));
                  }
                }}
                className=" hidden  bg-[#313131] float-left w-[150px] h-[46px] rounded-[8px] md:flex justify-center items-center"
              >
                <img
                  className="mr-[11px] w-[21px] h-[20px]"
                  src="Icon/po.svg"
                  alt=""
                />
                <p className="text-white font-H5_TC text-[14px] ">
                  投稿 / 提案
                </p>
              </button>

              {/* 登入 */}
              {!select.islogin && (
                <div className="float-left  md:float-right h-[26px] w-full md:w-[20.95%] pt-[10px]">
                  <button
                    onClick={() => {
                      loginToggle(true);
                      dispatch(getUserID("ID008"));
                    }}
                    className=" w-full h-full border-0   font-normal font-[18px] text-[#313131]"
                  >
                    登入
                  </button>
                </div>
              )}
              {/* 頭像登出 */}
              {select.islogin && (
                <div className="avatarCSS  w-[46px] h-[60px] float-left md:float-right">
                  <img
                    src="header/Ellipse1.png"
                    className=" w-[46px] h-[46px] border-white border-0 rounded-full  relative"
                  />
                  <button
                    onClick={() => {
                      loginToggle(false);
                      dispatch(getUserID(""));
                    }}
                    className="hidden absolute left-[0px] top-[50px] w-full h-full border-0   font-normal font-[18px] text-[#fff] bg-[#313131] rounded-[8px]"
                  >
                    登出
                  </button>
                </div>
              )}
            </div>
          </div>
        </HeaderContainer>
        {/* 裝置用按鈕 */}
        {select.pageState == pageState.caseAndDesign && (
          <button
            onClick={() => {
              go("/proposal:empty");
            }}
            className="w-[58px] h-[58px] rounded-full bg-[#313131] fixed left-[79.44%] top-[84.37%] flex justify-center items-center z-20 md:hidden"
          >
            <img src="Icon/po.svg" alt="" />
          </button>
        )}
      </div>
    </>
  );
};

export default Header;
