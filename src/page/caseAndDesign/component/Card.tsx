import { url } from "inspector";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type cardDataProp = {
  cardDataProp: {
    id: string;
    avatarImg: string;
    name: string;
    title: string;
    abstract: string;
    featuredImg: string;
  };
};
// 多行CSS
const moreLine = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "3",
  "-webkit-box-orient": "vertical",
};

const Card: React.FC<cardDataProp> = ({ cardDataProp }) => {
  const go = useNavigate();
  const [imgSize, setImgSize] = useState(false);
  return (
    <>
      <div
        onClick={() => {
          go("/project:" + cardDataProp.id);
        }}
        className="inline-grid  w-[100%]  md:w-[49.5%] xl:w-[33%]"
      >
        <div className="w-[100%-8px] h-[152px] p-[16px] round-[6px] shadow-black bg-[#F9F9F9] flex justify-between rounded-[6px] mr-[12px] mb-[12px] ">
          {/* 左側 */}
          <div className="w-[47%] h-full">
            {/* 頭像跟名子 */}
            <div className="h-[36px] w-full flex items-center mb-[4px]">
              <img
                className="w-[36px] h-[36px] float-left rounded-full border-[1px] border-[#EDEEF0]"
                src={cardDataProp.avatarImg}
                alt=""
              />
              <p className="pl-[8px] text-[14px] float-left">
                {cardDataProp.name}
              </p>
            </div>
            {/* 標題內文 */}
            <p className="text-[14px] w-full mb-[4px]">{cardDataProp.title}</p>
            <p
              className="text-[#919191] text-[12px] w-full h-[51px]  "
              style={moreLine}
            >
              {cardDataProp.abstract}
            </p>
          </div>
          {/* 右側圖 */}
          {/*抓到原始圖片，自然高度、自然寬度 ，在控制高的圖以寬為主，寬的圖以高為主*/}
          <div className="w-[118px] h-[118px] overflow-hidden relative rounded-[6px]  ">
            <img
              className={`absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] ${
                imgSize && "h-full"
              } ${imgSize && "max-w-none"}`}
              onLoad={(element) => {
                const img = element.target as unknown as HTMLImageElement;

                img.naturalHeight > img.naturalWidth
                  ? setImgSize(false)
                  : setImgSize(true);
              }}
              src={cardDataProp.featuredImg}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
