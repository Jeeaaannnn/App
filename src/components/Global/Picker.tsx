import {
  Picker as GlobalPicker,
  PickerItemProps,
} from "@react-native-picker/picker";
import { JSX, useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { useTranslation } from "react-i18next";
import DropDownPicker from "react-native-dropdown-picker";

interface IProps {
  label: string;
  selected: string;
  itemList: any[];
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  renderItem: (value: unknown, index: number) => JSX.Element;
  onChange?: (value: unknown) => void;
}

export function PickerItem(props: PickerItemProps) {
  return <GlobalPicker.Item label={props.label} />;
}

export function Picker(props: IProps) {
  const ref = useRef<GlobalPicker<string> | null>(null);
  const opacity = useSharedValue(0);
  const { t } = useTranslation();

  const handleChange = useCallback(
    (item: any) => {
      if (props.onChange) props.onChange(item.value);
    },
    [props.onChange]
  );

  const getErrorMessage = useCallback((): string => {
    if (!props.error) return "";

    if (props.error.message && props.error.message !== "")
      return props.error.message as string;

    switch (props.error.type) {
      case "required":
        return t("general.errors.validations.required");
      case "minLength":
        return t("general.errors.validations.minLength");
      case "maxLength":
        return t("general.errors.validations.maxLength");
      default:
        return t("general.errors.validations.invalidData");
    }
  }, [props.error]);

  useEffect(() => {
    if (props.error) opacity.value = withTiming(1, { duration: 250 });
    else opacity.value = withTiming(0, { duration: 250 });
  }, [props.error]);

  const errorStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(opacity.value, [0, 1], ["#d0dbd2", "red"]),
  }));

  const errorMessageStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(
    props.itemList.map((el) => ({
      label: el.nome,
      regione: el.regione,
      value: el.sigla,
    }))
  );

  return (
    <>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onSelectItem={handleChange}
        placeholder="Seleziona la regione"
        listMode="SCROLLVIEW"
        placeholderStyle={{ color: "rgba(0,0,0,0.2)" }}
        style={{ borderColor: "#d0dbd2", borderWidth: 2 }}
      />
      <Animated.Text style={[styles.errorMessage, errorMessageStyle]}>
        {getErrorMessage()}
      </Animated.Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
    zIndex: 15,
  },
  inputLabel: {
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "black",
    fontSize: 15,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  errorMessage: {
    fontFamily: "Poppins",
    fontWeight: "300",
    fontSize: 13,
    lineHeight: 15,
    height: 15,
    alignSelf: "flex-end",
    color: "red",
  },
});
