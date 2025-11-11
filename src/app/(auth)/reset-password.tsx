import { Button } from "@/components/Global";
import { Input } from "@/components/Form";
import { MainLayout, ContainerLayout } from "@/layouts/Auth";
import { HeaderLayout } from "@/layouts/Auth/Header";
import authApi from "@/utils/api/auth.api";
import { emailValidate } from "@/utils/auth";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet } from "react-native";

interface IFormData {
  email: string;
}

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const abortController = new AbortController();
  const methods = useForm<IFormData>({
    defaultValues: {
      email: "", // Cliente
    },
  });

  const handlePress = useCallback(
    async (formData: IFormData) => {
      const email = formData.email;
      const isValid = emailValidate(email);
      if (!isValid)
        return methods.setError("email", { message: "Email non valida." });

      setLoading(true);
      const result = await authApi.recoverPassword(abortController, email);
      setLoading(false);
      if (!result.status) {
        if (result.message === "Utente non trovato")
          return methods.setError("email", { message: result.message });
        return;
      }

      router.replace({
        pathname: "/(auth)/security-pin",
        params: { email },
      });
    },
    [abortController]
  );

  return (
    <MainLayout>
      <HeaderLayout style={{ height: 70 }}>
        <Text style={styles.headerTitle}>
          {t("screens.resetPassword.title")}
        </Text>
      </HeaderLayout>
      <ContainerLayout
        style={{ borderTopRightRadius: 25, borderTopLeftRadius: 25 }}
        contentStyle={styles.container}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.subHeaderDescription}>
            {t("screens.resetPassword.subtitle")}
          </Text>
        </View>

        <View style={{ gap: 25 }}>
          <FormProvider {...methods}>
            <Input
              name="email"
              type="email"
              label={t("screens.resetPassword.form.email.label")}
            />
          </FormProvider>
        </View>

        <Button
          containerStyle={styles.submitButton}
          label="Next Step"
          loading={loading}
          onPress={methods.handleSubmit(handlePress)}
        />
      </ContainerLayout>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
  headerContainer: {
    marginBottom: 60,
    gap: 10,
  },
  headerTitle: {
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 32,
    color: "white",
  },
  subHeaderDescription: {
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
  },
  submitButton: {
    marginTop: 50,
    minWidth: "50%",
  },
});
