import React from "react";

const Loading: React.FC = () => {
  return (
    <>
      <div className="w-full  flex justify-center pt-[80px]">
        <img className="w-[83px] h-[83px]" src="loading/loading.gif" alt="" />
      </div>
    </>
  );
};

export default Loading;
