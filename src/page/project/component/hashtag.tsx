import React from "react";
type HashtagType = {
  tag: string;
};

const Hashtag: React.FC<HashtagType> = ({ tag }) => {
  return (
    <>
      <div className="w-[p48x] h-[28px]  rounded-[6px] bg-[#EDEEF0] inline-block mt-[8px] mr-[8px]">
        <p className="text-[14px] text-[#919191] px-[10px] py-[4px]">{tag}</p>
      </div>
    </>
  );
};

export default Hashtag;
