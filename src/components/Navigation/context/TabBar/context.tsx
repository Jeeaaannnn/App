import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { createContext } from "react";

interface ITabBarContext {
  props: null | BottomTabBarProps;
}

const iTabBarContext: ITabBarContext = {
  props: null,
};

export const TabBarContext = createContext<ITabBarContext>(iTabBarContext);
