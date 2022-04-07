import { RouteObject } from "react-router-dom";
import CaseAndDesign from "./page/caseAndDesign/caseAndDesign";
import Project from "./page/project/project";
import Proposal from "./page/proposal/proposal";

export let routerConfig: RouteObject[] = [
  {
    path: "/",
    element: <CaseAndDesign />,
    // children: [
    //   {
    //     path: "/case",
    //     element: <Case />,
    //   },
    //   {
    //     path: "/design",
    //     element: <Design />,
    //   },
    // ],
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
];
