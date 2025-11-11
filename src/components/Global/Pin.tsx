import React, { useCallback, useEffect, useRef } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface IProps {
  length: number;
  value: string[];
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  onChangeText?: (props: string[]) => void;
}

interface IHandleChange {
  item: string;
  index: number;
}

export function Pin(props: IProps) {
  // const { t } = useTranslation();
  const refList = useRef<{ [key: number]: TextInput | null }>({});
  const preventFocus = useRef(false);
  const opacity = useSharedValue(0);

  const handlePaste = async () => {
    // // retrieve the value stored in the clipboard
    // const clipboard = await Clipboard.getString();
    // // if there is no value, then just return. This will prevent extra inputs being entered on the last input box
    // if (!clipboard) {
    //   return;
    // }
    // // instead of using the current code state variable, we want to replace it entirely using the clipboard value.
    // // we want to clip the string so that it is no longer than our maximum length and then convert it to an array
    // const currentCode = clipboard.substring(0, length).split('');
    // // get the length of the string as an index so that we can use this to move the cursor to the next box (if available)
    // const endIndex = currentCode.length - 1;
    // // if the length of the clipboard value is less than our input, then pad the end of the array with empty strings
    // if (currentCode.length < length) {
    //   do {
    //     currentCode.push('');
    //   } while (currentCode.length < length);
    // }
    // // then move the cursor to the next relevant input box
    // refs.current[endIndex < length - 1 ? endIndex + 1 : endIndex]?.focus();
    // // set the local state code
    // setCode(currentCode);
    // // set the parent components code
    // onChange(currentCode.join(''));
  };

  const getErrorMessage = useCallback((): string => {
    if (!props.error) return "";
    if (props.error.message && props.error.message !== "")
      return props.error.message as string;
    switch (props.error.type) {
      default:
        return "Errore imprevisto.";
    }
  }, [props.error]);

  // UTILITIES
  const arrayReplace = useCallback((arr: any[], index: number, item: any) => {
    arr.splice(index, 1, item);
    return arr;
  }, []);

  const handleChange = useCallback(
    async ({ item, index }: IHandleChange) => {
      const nextRef = refList.current[index + 1];
      if (item.length > 1) {
        return await handlePaste();
        // if (props.onChangeText) props.onChangeText([...props.value]);
        // return;
      }

      const prevText = props.value[index];
      if (item === " " && prevText === "") return;
      if (prevText === "" && item !== "" && nextRef) nextRef.focus();
      const newText = [...arrayReplace(props.value, index, item)];
      if (props.onChangeText) props.onChangeText(newText);
    },
    [props]
  );

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    const nextRef = refList.current[index + 1];
    const prevRef = refList.current[index - 1];
    const keyPressed = e.nativeEvent.key;
    const prevText = props.value[index];
    if (keyPressed === "Backspace" && prevRef && prevText === "") {
      preventFocus.current = true;
      return prevRef.focus();
    }
    if (keyPressed === " " && nextRef) {
      return nextRef.focus();
    }
  };

  const handleFocus = useCallback(
    (index: number) => {
      if (preventFocus.current) return (preventFocus.current = false);
      if (props.onChangeText)
        props.onChangeText([...arrayReplace(props.value, index, "")]);
    },
    [props.value]
  );

  const handleRefSet = (ref: TextInput | null, index: number) => {
    refList.current[index] = ref;
  };

  const wrapperStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(opacity.value, [0, 1], ["#F37021", "red"]),
  }));

  const errorMessageStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    if (props.error) opacity.value = withTiming(1, { duration: 250 });
    else opacity.value = withTiming(0, { duration: 250 });
  }, [props.error]);

  return (
    <View style={[styles.container]}>
      <View style={styles.wrapper}>
        {Array.from({ length: props.length }).map((_, index) => (
          <Animated.View
            key={index}
            style={[styles.inputWrapper, wrapperStyle]}
          >
            <TextInput
              ref={(ref) => handleRefSet(ref, index)}
              style={[styles.inputText]}
              keyboardType="number-pad"
              onChangeText={(item) => handleChange({ item, index })}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => handleFocus(index)}
              value={props.value[index]}
              maxLength={1}
            />
          </Animated.View>
        ))}
      </View>

      <Animated.Text style={[styles.errorMessage, errorMessageStyle]}>
        {getErrorMessage()}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 10,
  },
  wrapper: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  inputWrapper: {
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#F37021",
  },
  inputText: {
    width: 45,
    height: 50,
    textAlign: "center",
    fontFamily: "sans-serif",
    fontWeight: "800",
    fontSize: 28,
    lineHeight: 30,
    color: "black",
  },
  errorMessage: {
    fontFamily: "Poppins",
    fontWeight: "300",
    fontSize: 13,
    lineHeight: 17,
    height: 17,
    alignSelf: "center",
    color: "red",
  },
});
