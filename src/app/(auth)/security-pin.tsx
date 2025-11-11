import { Button } from "@/components/Global";
import { MainLayout, ContainerLayout } from "@/layouts/Auth";
import { HeaderLayout } from "@/layouts/Auth/Header";
import { pinValidate } from "@/utils/auth";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useCallback, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import authApi from "@/utils/api/auth.api";
import { Pin } from "@/components/Form";
import { FormProvider, useForm } from "react-hook-form";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { formatReadableTimer } from "@/utils/date";

interface IFormData {
  pin: string[];
}
const codeLength = 6;

// TODO: to utility

export default function SecurityPin() {
  const { t } = useTranslation();
  const [timer, setTimer] = useState<number>(0);
  const [resend, setResend] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const opacity = useSharedValue(0);
  const length = codeLength;
  const methods = useForm<IFormData>({
    defaultValues: { pin: Array.from({ length: length }) },
  });

  const { email } = useLocalSearchParams<{ email: string }>();
  const abortController = new AbortController();
  const [loading, setLoading] = useState(false);

  // TODO re sedn code.
  const handleNewCode = useCallback(() => {
    if (timer > 0 || resend) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    setResend(true);
    setTimer(1000 * 60 * 3);
    handleResend();
    opacity.value = withTiming(1, { duration: 250 });
    intervalRef.current = setInterval(
      () => setTimer((prev) => prev - 1000),
      1000
    );
  }, [timer, resend]);

  useEffect(() => {
    if (timer <= 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setTimer(0);
      setResend(false);
      opacity.value = withTiming(0, { duration: 250 });
    }
  }, [timer]);

  const handleAccept = useCallback(
    async (formData: IFormData) => {
      const fullPin = formData.pin.join("");
      const isValid = pinValidate(fullPin);
      if (!isValid) {
        methods.setError("pin", { message: "Il pin inserito non è valido" });
        return;
      }

      setLoading(true);
      const result = await authApi.approveCode(abortController, email, fullPin);
      setLoading(false);
      if (result && !result.status) {
        methods.setError("pin", { message: "Il pin inserito non è valido." });
        return;
      }
      return router.replace({
        pathname: "/(auth)/new-password",
        params: {
          email,
          token: result.data.token,
        },
      });
    },
    [abortController]
  );

  const handleResend = useCallback(async () => {
    const test = await authApi.recoverPassword(abortController, email);
  }, [abortController]);

  const handleWrongMail = useCallback(
    () => router.replace("/(auth)/reset-password"),
    []
  );

  const resendStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <MainLayout>
      <HeaderLayout style={{ height: 70 }}>
        <Text style={styles.headerTitle}>{t("screens.securityPin.title")}</Text>
      </HeaderLayout>
      <ContainerLayout
        style={{ borderTopRightRadius: 25, borderTopLeftRadius: 25 }}
        contentStyle={styles.container}
      >
        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeaderTitle}>
            {t("screens.securityPin.description.head")}
            <Text
              style={{
                fontFamily: "Poppins",
                fontWeight: "600",
                lineHeight: 20,
              }}
            >
              {" " + email + " "}
            </Text>
            <Text onPress={handleWrongMail} style={{ color: "#5B83ED" }}>
              {t("screens.securityPin.description.wrongMail")}
            </Text>
          </Text>
        </View>
        <FormProvider {...methods}>
          <Pin name="pin" />
        </FormProvider>
        <Button
          containerStyle={styles.submitButton}
          label={t("screens.securityPin.submitBtn")}
          loading={loading}
          onPress={methods.handleSubmit(handleAccept)}
        />

        <Pressable style={styles.newCodeButton} onPress={handleNewCode}>
          <Text style={[styles.newCodeText]}>
            {t("screens.securityPin.codeNotReceived")}
          </Text>

          <Animated.View style={[styles.resendButton, resendStyle]}>
            <Text style={styles.resendLabel}>
              {t("screens.securityPin.newRequest")}
            </Text>
            <Text style={[styles.newCodeText, { width: 50 }]}>
              {formatReadableTimer(timer)}
            </Text>
          </Animated.View>
        </Pressable>
      </ContainerLayout>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 32,
    alignSelf: "center",
    color: "white",
  },
  container: {
    paddingTop: 30,
  },
  subHeaderContainer: {
    flex: 1,
    marginBottom: 50,
  },
  subHeaderTitle: {
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
  },
  submitButton: {
    marginTop: 25,
    minWidth: "60%",
  },
  newCodeButton: {
    marginTop: 20,
    gap: 7.5,
  },
  newCodeText: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontWeight: "600",
    color: "#5B83ED",
    fontSize: 15,
    lineHeight: 18,
    gap: 15,
  },
  codeTest: {},
  expireIn: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontWeight: "600",
    marginTop: 15,
    fontSize: 14,
    lineHeight: 16,
    opacity: 0.8,
  },
  resendButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  resendLabel: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontWeight: "300",
    color: "black",
    fontSize: 14,
    lineHeight: 18,
  },
});
