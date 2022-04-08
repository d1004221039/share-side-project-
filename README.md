# 分享視覺專案-React 切版練習

- 視覺來源：[Doris KT](https://www.facebook.com/K.T1003)
- 專案框架：React
- 使用語言：TypeScript
- 使用套件：Router、Redux、tailwindCSS
- DataAPI:
  - 開發：json server
  - 上傳：firebase
    > ※沒有接後端

---

## 說明

- 專案說明：主要練習 TypeScript 及 React。學習組件寫法，將共用組建分開寫，並使用 Router 進行頁面的切換，Redux 進行狀態管理及 Fetch 資料，進而實現一些功能的作用
- 學習成果：除了熟悉去拆分組件之外，開始熟悉一些型態的用法，以前 JS 並不太了解型態的宣告這部分，透過 TS 的學習，開始會在撰寫前思考這些問題，降低程式報錯的機會，更學習使用 2 元 3 元的條件式、enum...等以前沒用過的寫法，最大的收穫就是學會使用 Router、Redex、Tailwind CSS，這些在開發上幫助非常的大

---

## 程式組件、頁面介紹

共用組件：head、bottom、loading、message
三個頁面：caseAndDesign、project、proposal

### Router

Router 管理三個頁面
路徑管理檔案：routerConfig.ts

```
 {
    path: "/",
    element: <CaseAndDesign />,
  },
 {
    path: "/project",
    element: <Project />,
  },
  {
    path: "/project:item",
    element: <Project />,
  },
  {
    path: "/proposal",
    element: <Proposal />,
  },
  {
    path: "/proposal:item",
    element: <Proposal />,
  },
```

---

### Redux

Redux 使用狀態管理及 RTK 來 Fetch API
檔案：hooks.ts、store.ts、Slice.ts、dataAPI.ts

- 狀態:
  1. islogin:是否登入
  2. userID: 使用者 ID
  3. pageState: 使用頁面
  4. messageToggle: 訊息開關
  5. messageState: 訊息狀態
