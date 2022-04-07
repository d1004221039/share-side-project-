import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Hashtag from "./component/hashtag";
import { useProjectApiQuery } from "../../redux/server/dataAPI";
import {
  changePageState,
  pageState,
  callMessage,
  MessageState,
} from "../../redux/features/counter/Slice";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading";
const Project: React.FC = () => {
  const go = useNavigate();
  const select = useAppSelector((state) => {
    return state.counterReducer;
  });
  const dispatch = useAppDispatch();
  //載入設定init
  const init = useEffect(() => {
    //頁面狀態
    dispatch(changePageState(pageState.project));
  }, []);

  let url = useParams();
  const item = url.item == undefined ? "empty" : url.item.slice(1);

  const { data, error, isLoading } = useProjectApiQuery(item);
  // hashtage

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className="pt-[47px]  xl:pb-[87px]">
          <div className="w-full xl:w-[52%] overflow-hidden rounded-[8px] mx-auto ">
            {/* 頭像 編輯 區 */}
            <div className="w-full h-[78px] bg-[#FFF] flex justify-between ">
              {/* 頭像 姓名 */}
              <div className="pt-[18px] pb-[14px] pl-[20px] ">
                <img
                  src={data?.avatarImg}
                  className="border-[#EDEEF0] border-[1px] rounded-full h-[46px] w-[46px] float-left "
                  alt=""
                />
                <div className=" float-left pl-[15px] pt-[5px] ">
                  <p className=" h-[19px] text-[16px] mb-[2px]">{data?.name}</p>
                  <p className="text-[14px] text-[#919191]">{data?.date}</p>
                </div>
              </div>
              {/* 編輯刪除BTN */}
              <div className="pt-[30px] pb-[25px] pr-[29px]">
                {data?.userID == select.userID && (
                  <button
                    onClick={() => {
                      go("/proposal:" + item);
                    }}
                    className="mr-[46px] text-[16px]"
                  >
                    編輯
                  </button>
                )}
                {data?.userID == select.userID && (
                  <button
                    onClick={() => {
                      dispatch(callMessage(MessageState.deleteProject));
                    }}
                    className="text-[#919191] text-[16px]"
                  >
                    刪除
                  </button>
                )}
                {data?.userID != select.userID && (
                  <img typeof="button" src="Icon/share.svg" alt="" />
                )}
              </div>
            </div>
            {/* 圖片 */}
            <div className="w-full h-[270px] md:h-[576px] xl:h-[502px] truncate flex justify-center items-center">
              <img src={data?.featuredImg} className="w-full" alt="" />
            </div>
            {/* 內文 */}
            <div className="w-full  bg-[#FFF] pl-[20px] pr-[26px] pt-[29px] pb-[27px] ">
              {/* CC */}
              <div className="w-full  md:flex  md:justify-start md:items-end pb-[21px]">
                <img
                  className=" w-[88px] h-[31px] "
                  src="/projectPage/cc2.png"
                  alt=""
                />
                <p className="pt-[13px] md:pl-[7px]">
                  本著作係採用
                  <span className="text-[#10a9ff]">
                    創用 CC 姓名標示 3.0 台灣 授權條款
                  </span>
                  授權.
                </p>
              </div>
              {/* 標題內文 */}
              <div>
                <p className="text-[18px] text-[#313131] mb-[16px]">
                  {data?.title}
                </p>
                <div className="text-[16px] mb-[16px] w-full">
                  {data?.abstract}
                </div>
              </div>
              {/* 超連結 */}
              <a
                className="mb-[16px] block text-[#00A3FF]"
                href={data?.hyperlink}
              >
                {data?.hyperlink}
              </a>
              {/* 標籤 */}
              <div className="">
                {data?.hashTag.map((hashtag) => {
                  return <Hashtag tag={hashtag} />;
                })}
              </div>
            </div>
            {/* 觀看次數 */}
            <div className="mt-[5px] w-full h-[56px] bg-white pb-[19px] pl-[21px] pt-[19px] flex justify-start items-start">
              <img src="Icon/CTR.svg" alt="" />
              <p className="ml-[13px]">{data?.peopleNum}</p>
              <p className="ml-[5px]">人看過</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
