import { View, StyleSheet, Alert, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useCallback, useContext, useState } from "react";
import authApi from "@/utils/api/auth.api";
import { router } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/Global";
import { Input } from "@/components/Form";
import { ContainerLayout, HeaderLayout, MainLayout } from "@/layouts/Auth";
import { AuthContext } from "@/src/contexts/Auth";
import { UserContext } from "@/src/contexts/User";
import { OneSignal } from "react-native-onesignal";

interface IFormData {
  email: string;
  password: string;
}

export default function Login() {
  const { t } = useTranslation();
  const { handleSetAuth } = useContext(AuthContext);
  const { storeUserData } = useContext(UserContext);
  const abortController = new AbortController();
  const [loading, setLoading] = useState(false);

  const methods = useForm<IFormData>({
    defaultValues: {
      // email: "francesco.bancalari4@sitisrl.it", // Commerciale
      // email: "francesco.bancalari6@sitisrl.it", // Cliente
      // email: "francesco.bancalari2@sitisrl.it", // Agente
      // password: "France5549",
      // email: "eliaquim.dasilva@fin-solution.com",
      // password: "prova",
    },
  });

  const handleLogin = useCallback(
    async (formData: IFormData) => {
      setLoading(true);
      const res = await authApi.login(
        abortController,
        formData.email,
        formData.password
      );
      setLoading(false);
      if (!res?.status) {
        if (res.message === "Utente non trovato")
          return methods.setError("email", { message: res.message });
        if (res.message === "Credenziali invalide")
          return methods.setError("password", { message: res.message });

        const title = t("general.errors.alerts.serverError.title");
        const message = t("general.errors.alerts.serverError.message");
        return Alert.alert(title, message);
      }
      const resData = res.data;
      try {
        OneSignal.login(resData.user.id.toString());
      } catch (err) {}
      handleSetAuth({ token: resData?.token, date: new Date() });
      storeUserData(resData.user);
    },
    [abortController]
  );

  return (
    <MainLayout>
      <HeaderLayout style={{ height: 70 }}>
        <Text style={styles.headerTitle}>{t("screens.login.cardTitle")}</Text>
      </HeaderLayout>

      <ContainerLayout
        style={{ borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
      >
        <View style={{ gap: 10 }}>
          <FormProvider {...methods}>
            <Input
              label={t("screens.login.form.email.label")}
              name="email"
              type="email"
              placeholder={t("screens.login.form.email.placeholder")}
            />
            <Input
              label={t("screens.login.form.password.label")}
              name="password"
              type="password"
              placeholder={t("screens.login.form.password.placeholder")}
            />
          </FormProvider>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            loading={loading}
            containerStyle={{ minWidth: "80%" }}
            label={t("screens.login.form.submitBtn")}
            onPress={methods.handleSubmit(handleLogin)}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.navigate("/(auth)/reset-password")}
          >
            <Text style={styles.forgotPasswordText}>
              {t("screens.login.resetPasswordBtn")}
            </Text>
          </TouchableOpacity>
          <Button
            label={t("screens.login.createAccountBtn")}
            onPress={() => router.navigate("/(auth)/register")}
            textStyle={{ color: "#343434" }}
            containerStyle={styles.registerButton}
          />
        </View>
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
    color: "white",
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: "Poppins",
    fontWeight: "500",
    textAlign: "center",
    color: "#343434",
  },
  buttonsContainer: {
    marginTop: 70,
    gap: 15,
  },
  registerButton: {
    backgroundColor: "transparent",
    minWidth: "20%",
    borderColor: "#DFF5F7",
    borderStyle: "solid",
    borderWidth: 2,
  },
});
