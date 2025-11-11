import { Button } from "@/components/Global";
import { MainLayout, ContainerLayout } from "@/layouts/Auth";
import { HeaderLayout } from "@/layouts/Auth/Header";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View, Text, StyleSheet } from "react-native";
import { Input } from "@/components/Form";
import { router, useLocalSearchParams } from "expo-router";
import authApi from "@/utils/api/auth.api";
import { useTranslation } from "react-i18next";

// TODO
// Basic user visual errors.
// Password rules.

export default function NewPassword() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const abortController = new AbortController();
  const { email, token } = useLocalSearchParams<{
    email: string;
    token: string;
  }>();

  const methods = useForm<{ password: string; confirmPassword: string }>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handlePress = useCallback(
    async (formData: any) => {
      const { password, confirmPassword } = formData;
      if (password !== confirmPassword)
        return methods.setError("confirmPassword", {
          message: "Le password sono diverse.",
        });

      setLoading(true);
      const result = await authApi.newPassword(
        abortController,
        password,
        token
      );
      if (!result.status) {
        setLoading(false);
        return;
      }
      const authResult = await authApi.login(abortController, email, password);
      const resData = authResult.data;
      setLoading(false);
      router.replace({
        pathname: "/(auth)/success",
        params: { data: JSON.stringify(resData) },
      });
    },
    [abortController]
  );

  return (
    <MainLayout>
      <HeaderLayout style={{ height: 70 }}>
        <Text style={styles.headerTitle}>{t("screens.newPassword.title")}</Text>
      </HeaderLayout>
      <ContainerLayout style={styles.container}>
        <View style={{ gap: 15 }}>
          <FormProvider {...methods}>
            <Input
              name="password"
              type="password"
              label={t("screens.newPassword.form.password.label")}
            />
            <Input
              name="confirmPassword"
              type="password"
              label={t("screens.newPassword.form.confirmPassword.label")}
            />
          </FormProvider>
        </View>

        <Button
          loading={loading}
          onPress={methods.handleSubmit(handlePress)}
          containerStyle={{ marginTop: 50 }}
          label={t("screens.newPassword.form.submitBtn")}
        />
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
  container: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
});
