import React from "react";

const CardCantainer: React.FC = ({ children }) => {
  return (
    <>
      <div className=" mx-auto w-[86.11%] md:w-[82.29%] xl:w-[75.1%]  ">
        {children}
      </div>
    </>
  );
};

export default CardCantainer;
