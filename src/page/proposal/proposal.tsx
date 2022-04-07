import { url } from "inspector";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import CheckBox, { CheckList } from "./component/checkBox";
import {
  changePageState,
  pageState,
  callMessage,
  MessageState,
} from "../../redux/features/counter/Slice";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useProjectApiQuery, ProjectApiType } from "../../redux/server/dataAPI";

const Proposal: React.FC = () => {
  const go = useNavigate();
  //圖片大小計算
  const [imgSize, setImgSize] = useState(false);

  const select = useAppSelector((state) => {
    return state.counterReducer;
  });
  const dispatch = useAppDispatch();
  //載入設定init
  const init = useEffect(() => {
    //頁面狀態
    dispatch(changePageState(pageState.porposal));
  }, []);

  const login = useEffect(() => {
    select.islogin == false && dispatch(callMessage(MessageState.notLogin));
  }, [select.islogin]);

  //取得資料
  let url = useParams();
  const item = url.item == undefined ? "empty" : url.item.slice(1);
  const contribute = url.item == undefined ? "empty" : url.item.slice(1, 2);
  // const { data, error, isLoading } = useProjectApiQuery(item);
  const { data, error, isLoading } = useProjectApiQuery("all");

  let newData: ProjectApiType = {
    id: "",
    avatarImg: "",
    name: "",
    title: "",
    abstract: "",
    featuredImg: "",
    date: "",
    hashTag: [""],
    peopleNum: "",
    hyperlink: "",
    userID: "",
  };

  data?.forEach((value) => {
    if (value.id == item) {
      newData = value;
      return;
    }
  });

  //編輯圖片
  const [imgToggle, setImgToggle] = useState(item == "empty" ? true : false);

  //投稿提案
  const [contributeOption, setContributeOption] = useState(
    contribute == "p" ? "提案" : "UI投搞"
  );

  //專案名

  const [projectName, setProjectName] = useState(
    item == "empty" ? "" : newData?.name
  );

  return (
    <>
      {/* 裝置的頂部 */}
      <div className="xl:hidden w-full h-[72px] md:h-[101px] relative bg-[#F8F8F8]">
        <div className="absolute left-[16px] top-[29px] md:top-[44px] w-[24px] h-[24px]">
          <img
            onClick={() => {
              go("/");
            }}
            src="Icon/arrow.svg"
            className=" w-[7px] h-[24px] "
          />
        </div>

        <p className="absolute text-[18px] w-[120px] h-[26px] translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] text-center ">
          {item == "empty" ? "投稿 / 提案" : `編  輯`}
        </p>
      </div>
      {/* 主體 */}
      <div className="w-full pt-[24px] md:pt-[36px] xl:pt-[102px] md:pb-[46px] xl:pb-[136px]">
        <div className=" mx-auto w-full md:w-[95.83%] xl:w-[78%] h-[1414px] bg-white rounded-[16px] overflow-hidden pt-[214px] pl-[30px] pr-[30px] md:pl-[40px] md:pr-[41px] xl:pl-[93px] xl:pr-[124px] md:pt-[163px] pb-[55px] relative">
          {/* 圖片 */}
          <div className=" absolute top-[39px] md:top-[51px] left-[8.33%] md:left-[65.5%] xl:left-[67.5%] w-full md:w-[25.67%] h-[180px] md:h-[238px] 2xl:left-[72.4%]   ">
            <div className=" overflow-hidden w-[153px] h-[153px] md:w-[201px] md:h-[192px] bg-[#EDEEF0] rounded-[13px] relative inline-block md:block">
              {/* 新增圖片 */}
              {imgToggle && (
                <div>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={(value) => {
                      setImgToggle(false);
                    }}
                    className="hidden"
                  />
                  <img
                    src="Icon/newImg.png"
                    className=" w-[64px] h-[59px] absolute left-[48px] top-[38px]  md:left-[64px]  md:top-[48px] "
                    alt=""
                  />
                  <label
                    htmlFor="file"
                    className="text-[#919191] text-[16px] absolute left-[40px] top-[100px] md:left-[58px] md:top-[123px] underline decoration-1 "
                  >
                    + 新增圖片
                  </label>
                </div>
              )}
              {/* 刪除圖片 */}
              {!imgToggle && (
                <div className="w-full h-full">
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
                    src={newData?.featuredImg}
                    alt=""
                  />
                  <button
                    onClick={() => {
                      setImgToggle(true);
                    }}
                    className="absolute left-0 bottom-0  h-[39px] w-full text-white bg-[rgba(0,0,0,0.5)]"
                  >
                    刪 除 圖 片
                  </button>
                </div>
              )}
            </div>

            <div className=" w-[44.5%] md:w-full h-[40px] text-[#FF688C]  inline-block md:block ml-[9px] md:ml-0 ">
              <p className=" text-[14px]">視覺或示意圖</p>
              <p className=" text-[14px]">
                (建議 <span className="text-[#00A3FF]">寬670 x 高502</span>{" "}
                JPG、PNG)
              </p>
            </div>
          </div>
          {/* 投稿提案選單 */}
          <div>
            <p className="text-[#FF688C] text-[14px]  mb-[8px]">*必選</p>
            <select
              className="w-full md:w-[64.10%] xl:w-[71%] h-[54px] bg-[#F6F7F9] rounded-[8px]"
              name=""
              id=""
              value={contributeOption}
              onChange={(value) => {
                setContributeOption(value.target.value);
              }}
            >
              <option value="UI投搞">UI 投搞</option>
              <option value="提案">提&ensp;&ensp;&ensp;案</option>
            </select>
          </div>
          {/* 創用CC選單 */}
          <div className="mt-[36px] ">
            <div className="flex justify-start items-center  mb-[8px]">
              <p className="mr-[10px] text-[16px]">創用CC</p>
              <p className="text-[#00A3FF] text-[14px] mr-[4px]">(版權說明)</p>
              <p className="text-[#FF688C] text-[14px]">*必選</p>
            </div>
            <select
              className="w-[100%] h-[54px] bg-[#F6F7F9] rounded-[8px]"
              name=""
              id=""
            >
              <option value="姓名標示">姓名標示</option>
              <option value="姓名標示－非商業性">姓名標示－非商業性</option>
            </select>
          </div>
          {/* 專案名 */}
          <div className="mt-[46px]">
            <div className="flex justify-start items-center  mb-[8px]">
              <p className="mr-[10px] text-[16px]">專案名稱</p>
              <p className="text-[#FF688C] text-[14px]">*必選</p>
            </div>
            <textarea
              value={projectName}
              onChange={(value) => {
                setProjectName(value.target.value);
              }}
              className="w-full h-[54px] bg-[#F6F7F9] rounded-[8px] text-[16px] pt-[15px] pl-[14px] xl:pl-[20px] md:pl-[18px] "
            />
          </div>
          {/* 專案分類 */}
          <div className="mt-[36px]">
            <div className="flex justify-start items-center mb-[24px]">
              <p className="mr-[10px] text-[16px]">專案分類</p>
            </div>
            <div className="">
              {CheckList.map((value) => {
                return (
                  <CheckBox
                    key={value.id}
                    textProp={value.text}
                    idProp={value.id}
                  />
                );
              })}
            </div>
          </div>

          {/* 視覺搞 */}
          <div className="mt-[36px] ">
            <div className="flex justify-start items-center mb-[8px]">
              <p className="mr-[10px] text-[16px]">視覺搞</p>
            </div>
            <textarea
              value={newData?.hyperlink}
              className="w-full h-[104px] bg-[#F6F7F9] rounded-[8px] text-[16px] mb-[6px] pt-[15px]  pl-[14px] xl:pl-[20px] md:pl-[18px]"
            />

            <p className="text-[#919191] text-[14px]">
              附上視覺稿連結，方便工程師了解詳細視覺
            </p>
          </div>
          {/* 專案說明 */}
          <div className="mt-[36px] ">
            <div className="flex justify-start items-center mb-[8px]">
              <p className="mr-[10px] text-[16px]">專案說明</p>
            </div>
            <textarea
              value={newData?.abstract}
              className="w-full h-[256px] bg-[#F6F7F9] rounded-[8px] text-[16px]  mb-[6px] pt-[15px]  pl-[14px] xl:pl-[20px] md:pl-[18px]"
            />
            <p className="text-[#919191] text-[14px]">
              詳細說明專案，讓工程師更了解專案內容。
            </p>
          </div>
          {/* 按鈕組 */}
          <div className="mt-[78px] md:mt-[95px] flex justify-center md:justify-end  ">
            <button
              onClick={() => {
                go(-1);
              }}
              className="  w-[145px] md:w-[214px] h-[62px] rounded-[8px] text-[20px]  text-[#fff] bg-[#BEBEBE]"
            >
              取消
            </button>
            <button
              onClick={() => {
                projectName != ""
                  ? go(-1)
                  : dispatch(callMessage(MessageState.incomplete));
              }}
              className="w-[145px] md:w-[214px] h-[62px] rounded-[8px] text-[20px]  text-[#fff] bg-[#000] ml-[16px]"
            >
              發布
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Proposal;
