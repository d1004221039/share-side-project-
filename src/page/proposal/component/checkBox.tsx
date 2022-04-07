import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import "./style.css";

// 專案分類列表，可隨時新增項目
type CheckListType = {
  id: string;
  text: string;
};

export const CheckList: CheckListType[] = [
  { id: "web", text: "網頁" },
  { id: "ios", text: "IOS" },
  { id: "android", text: "Android" },
  { id: "software", text: "軟體" },
  { id: "element", text: "元件" },
  { id: "other", text: "其他介面" },
];

type CheckBoxType = {
  textProp: string;
  idProp: string;
};

const CheckBox: React.FC<CheckBoxType> = ({ textProp, idProp }) => {
  return (
    <div className="mr-[26px] mt-[24px] xl:mr-[58px] inline-block">
      <input
        type="checkbox"
        className="inputCSS"
        id={idProp}
        name="vehicle1"
        value="Bike"
      />
      <label htmlFor={idProp} className="flex justify-center items-center">
        <span></span> {textProp}{" "}
      </label>
    </div>
  );
};
export default CheckBox;
