import {
  cloneElement,
  JSX,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { TabBarContext } from "../context/TabBar/context";
import { Href, router } from "expo-router";

interface IProps {
  children: JSX.Element;
  name: string;
  href: Href;
}

export function TabBarTrigger({ children, name, href }: IProps) {
  const [isFocused, setIsFocused] = useState(false);
  const { props } = useContext(TabBarContext);

  const onPress = useCallback(() => {
    router.navigate(href);
  }, []);

  useEffect(() => {
    if (props) {
      const found = props.state.routes.find((route, index) => {
        const validName = route.name === name;
        const validIndex = index === props.state.index;
        return validName && validIndex;
      });
      if (found) setIsFocused(true);
      else setIsFocused(false);
    }
  }, [props]);

  return cloneElement(children, { isFocused, onPress });
}
