import { createBrowserRouter } from "react-router";
import { MainFeedScreen } from "./components/MainFeedScreen";
import { PersonalizationScreen } from "./components/PersonalizationScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainFeedScreen,
  },
  {
    path: "/personalize",
    Component: PersonalizationScreen,
  },
]);
