import { createContext, Dispatch, SetStateAction } from "react";

interface IOnboardingContext {
  loading: boolean;
  hasOnboarded: boolean;
  setHasOnboarded: Dispatch<SetStateAction<boolean>>;
  handleSetOnboarded: () => void;
}

const iOnboardingContext: IOnboardingContext = {
  loading: false,
  hasOnboarded: false,
  setHasOnboarded: () => {},
  handleSetOnboarded: () => {},
};

export const OnboardingContext =
  createContext<IOnboardingContext>(iOnboardingContext);
