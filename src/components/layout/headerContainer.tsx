import React from "react";

const HeaderContainer: React.FC = ({ children }) => {
  return (
    <div className=" h-[122px] md:h-[102px] w-full mx-auto xl:w-[1280px] ">
      {children}
    </div>
  );
};

export default HeaderContainer;
