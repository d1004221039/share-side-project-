import React from "react";

import "./App.css";
import Header from "./components/Header";
import { RouteObject, useRoutes } from "react-router-dom";
import { routerConfig } from "./routerConfig";
import Message from "./components/Message";

import { useAppSelector } from "./redux/app/hooks";

function App() {
  const select = useAppSelector((state) => {
    return state.counterReducer;
  });

  // console.log(selector);

  const elements = useRoutes(routerConfig);
  return (
    <>
      <Header />
      <div className="w-full bg-[#EDEEF0]">{elements}</div>
      {/* 提示訊息框 */}
      {select.messageToggle && <Message />}
    </>
  );
}

export default App;
