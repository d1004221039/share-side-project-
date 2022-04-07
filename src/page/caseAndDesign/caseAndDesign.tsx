import React, { useState, useEffect } from "react";

import CardCantainer from "./component/Container";
import Conditional from "./component/Conditional";
import Card from "./component/Card";
import ChangePage from "./component/changePage";
import Bottom from "../../components/Bottom";
import {
  useDesignApiQuery,
  useProposalApiQuery,
} from "../../redux/server/dataAPI";
import { changePageState, pageState } from "../../redux/features/counter/Slice";
import { useAppDispatch } from "../../redux/app/hooks";
import Loading from "../../components/loading";

// 卡片屬性
export type CardData = {
  id: string;
  avatarImg: string;
  name: string;
  title: string;
  abstract: string;
  featuredImg: string;
};

const CaseAndDesign: React.FC = () => {
  //載入設定init
  const dispatch = useAppDispatch();
  const init = useEffect(() => {
    //頁面狀態
    dispatch(changePageState(pageState.caseAndDesign));
  }, []);

  // 按鈕切換邏輯
  const [cardSwitch, setCardSwitch] = useState(true);
  function toggleCard(value: boolean) {
    setCardSwitch(value);
  }

  const design = useDesignApiQuery("all");
  const proposal = useProposalApiQuery("all");

  let cardData: CardData[] = cardSwitch ? design.data : proposal.data;
  let isLoading = cardSwitch ? design.isLoading : proposal.isLoading;

  // 換頁邏輯
  const [pageNum, setPageNum] = useState(1);
  const togglePageNum = (value: number) => {
    setPageNum(value);
  };
  let pagelong: number = 0;

  if (!isLoading) {
    pagelong = Math.ceil(cardData.length / 18);
    cardData = cardData.slice((pageNum - 1) * 18, 18 * pageNum);
  }

  return (
    <>
      <CardCantainer>
        {/* 共同 切換按鈕 */}
        {!isLoading && <Conditional toggleCard={toggleCard} />}
        {/* case組件或Design組件 */}
        {isLoading && <Loading />}
        {!isLoading &&
          cardData.map((value) => {
            return <Card cardDataProp={value} key={value.id} />;
          })}

        {/* 換頁 */}
        {!isLoading && (
          <ChangePage
            pageNum={pageNum}
            togglePageNum={togglePageNum}
            long={pagelong}
          />
        )}
      </CardCantainer>
      {!isLoading && <Bottom />}
    </>
  );
};

export default CaseAndDesign;
