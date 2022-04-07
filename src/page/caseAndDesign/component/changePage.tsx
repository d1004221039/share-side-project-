import React from "react";

type ChangePageType = {
  pageNum: number;
  togglePageNum: (value: number) => void;
  long: number;
};

const pageBTN = (
  pageNum: number,
  value: number,
  togglePageNum: (value: number) => void,
  long: number
) => {
  // 0頁
  if (pageNum == 1 && value == -1) return;
  // 超過頁數
  if (long < pageNum + value) return;

  togglePageNum(pageNum + value);
};

const ChangePage: React.FC<ChangePageType> = ({
  pageNum,
  togglePageNum,
  long,
}) => {
  return (
    <>
      <div className="pt-[72px] pb-[54px] h-[21] w-full flex justify-end items-center pr-[20px]">
        <img
          onClick={() => {
            pageBTN(pageNum, -1, togglePageNum, long);
          }}
          src="Icon/previous.svg"
          className="float-right"
          alt=""
        />
        <p className="  pl-[33px] text-[18px]">{pageNum}</p>
        <img
          onClick={() => {
            pageBTN(pageNum, 1, togglePageNum, long);
          }}
          src="Icon/next.svg"
          className="  pl-[33px]"
          alt=""
        />
      </div>
    </>
  );
};

export default ChangePage;
