import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardTypeOptions,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useCallback, useEffect, useState } from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { FieldError, FieldErrorsImpl, Merge, Message } from "react-hook-form";
import { useTranslation } from "react-i18next";

type TTextContent =
  | "none"
  | "URL"
  | "addressCity"
  | "addressCityAndState"
  | "addressState"
  | "countryName"
  | "creditCardNumber"
  | "creditCardExpiration"
  | "creditCardExpirationMonth"
  | "creditCardExpirationYear"
  | "creditCardSecurityCode"
  | "creditCardType"
  | "creditCardName"
  | "creditCardGivenName"
  | "creditCardMiddleName"
  | "creditCardFamilyName"
  | "emailAddress"
  | "familyName"
  | "fullStreetAddress"
  | "givenName"
  | "jobTitle"
  | "location"
  | "middleName"
  | "name"
  | "namePrefix"
  | "nameSuffix"
  | "nickname"
  | "organizationName"
  | "postalCode"
  | "streetAddressLine1"
  | "streetAddressLine2"
  | "sublocality"
  | "telephoneNumber"
  | "username"
  | "password"
  | "newPassword"
  | "oneTimeCode"
  | "birthdate"
  | "birthdateDay"
  | "birthdateMonth"
  | "birthdateYear"
  | undefined;

interface IProps {
  name?: string;
  label?: string;
  // error?: boolean;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  // errorMessage?: Message;
  placeholder?: string;
  type: "email" | "password" | "text" | "phone" | "date";
  boxStyle?: any;
  defaultValue?: string;
  onChangeText?: (e: string, key: string) => void;
}

export function Input(props: IProps) {
  const { t } = useTranslation();
  const config: {
    placeholder: string;
    label: string;
    keyboardType: KeyboardTypeOptions;
    textContentType?: TTextContent;
  } = {
    placeholder: "",
    label: "",
    keyboardType: "default",
    textContentType: undefined,
  };

  const [input, setInput] = useState<string>(props.defaultValue ?? "");
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(
    props.type === "password" ? true : false
  );

  // TODO: default language translating
  if (props.type === "email") {
    config.label = props.label ?? "E-mail";
    config.placeholder = props.placeholder ?? "example@example.com";
  } else if (props.type === "password") {
    config.label = props.label ?? "Password";
    config.placeholder = props.placeholder ?? "password";
  } else if (props.type === "text") {
    config.label = props.label ?? "...";
    config.placeholder = props.placeholder ?? "...";
  } else if (props.type === "phone") {
    config.keyboardType = "phone-pad";
    config.textContentType = "telephoneNumber";
    config.label = props.label ?? "Cellulare";
    config.placeholder = props.placeholder ?? "123 4567 890";
  }

  const handleChangeText = (e: string) => {
    if (props.onChangeText) props.onChangeText(e, props.name ?? "");
    setInput(e);
  };

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

  const opacity = useSharedValue(0);
  // const { previousState, update } = usePreviousState(props.error);

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

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{config.label}</Text>
      <Animated.View style={[styles.inputBox, errorStyle]}>
        <TextInput
          value={input ?? undefined}
          onChangeText={handleChangeText}
          numberOfLines={1}
          style={styles.inputBoxElement}
          placeholder={config.placeholder}
          keyboardType={config.keyboardType}
          textContentType={config.textContentType}
          secureTextEntry={passwordVisibility}
          placeholderTextColor={"rgba(0,0,0,0.2)"}
        />
        {props.type === "password" && (
          <TouchableOpacity
            onPress={() => {
              setPasswordVisibility((opt) => !opt);
            }}
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!passwordVisibility && (
              <FontAwesome name="eye" size={24} color="black" />
            )}
            {passwordVisibility && (
              <FontAwesome name="eye-slash" size={24} color="black" />
            )}
          </TouchableOpacity>
        )}
      </Animated.View>
      <Animated.Text style={[styles.errorMessage, errorMessageStyle]}>
        {getErrorMessage()}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    gap: 5,
  },
  inputLabel: {
    fontFamily: "Poppins",
    fontWeight: "500",
    color: "black",
    fontSize: 15,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  inputBox: {
    // backgroundColor: "#EEF7FF",
    width: "100%",
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: "row",
    borderStyle: "solid",
    borderWidth: 2,
    paddingVertical: 12,
  },
  inputBoxElement: {
    fontSize: 16,
    flex: 1,
    color: "black",
    padding: 0,
    margin: 0,
  },
  buttonsContainer: {
    marginTop: 70,
    gap: 15,
  },
  buttonElement: {
    width: "60%",
    height: 50,
    borderRadius: 35,
    alignSelf: "center",
    backgroundColor: "#F37021",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 22,
    paddingTop: 6,
    fontFamily: "Poppins",
    fontWeight: "700",
    color: "white",
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
