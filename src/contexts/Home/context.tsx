import { Case } from "@/interfaces/case.interface";
import { createContext, Dispatch, SetStateAction } from "react";
import { SharedValue, useSharedValue } from "react-native-reanimated";

type THomeContext = {
  headerHeight: number;
  setHeaderHeight: Dispatch<SetStateAction<number>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  data: { type: string; data: Case | null }[] | null;
  setData: Dispatch<SetStateAction<{ data: Case; type: string }[] | null>>;
  headerHeightValue: SharedValue<number>;
};

const iHomeContextState: THomeContext = {
  headerHeight: 150,
  setHeaderHeight: () => {},
  loading: false,
  setLoading: () => {},
  data: null,
  setData: () => {},
  headerHeightValue: undefined,
};

export const HomeContext = createContext<THomeContext>(iHomeContextState);
