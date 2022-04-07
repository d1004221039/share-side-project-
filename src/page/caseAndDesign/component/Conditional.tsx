import React, { useState } from "react";
import "./style.css";
type ConditionalType = {
  toggleCard: (value: boolean) => void;
};

const Conditional: React.FC<ConditionalType> = ({ toggleCard }) => {
  const [toggleBTN, setToggleBTN] = useState(true);
  return (
    <>
      <div className=" flex justify-center md:justify-between items-center box-content pt-[49px] pb-[29px]">
        {/* 提案按鈕 */}
        <div className=" h-[36px] w-[227px] relative">
          <button
            onClick={() => {
              toggleCard(true);
              setToggleBTN(true);
            }}
            className={` h-full w-[115px] rounded-[8px] absolute left-0 
            ${
              !toggleBTN
                ? "bg-[#FFFFFF] text-[#313131] z-1"
                : "bg-[#313131] text-[#FFFFFF] z-10"
            }`}
          >
            設計分享
          </button>
          <button
            onClick={() => {
              toggleCard(false);
              setToggleBTN(false);
            }}
            className={` h-full w-[115px] rounded-[8px] absolute right-0
            ${
              !toggleBTN
                ? "bg-[#313131] text-[#FFFFFF]  z-10"
                : "bg-[#FFFFFF] text-[#313131]  z-1"
            }`}
          >
            提案
          </button>
        </div>
        {/* 條件下拉 */}
        {/* bg-[#F6F7F9]
         */}
        <div className="pr-[20px]   hidden md:block ">
          <select className="pretty-select" name="" id="">
            <option value="最新">最 新</option>
            <option value="saab">人氣瀏覽</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Conditional;
