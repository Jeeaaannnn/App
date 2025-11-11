import { router } from "expo-router";
import { StyleSheet, View, Text, Alert, Pressable } from "react-native";
import province from "@/config/province";
import { ContainerLayout, HeaderLayout, MainLayout } from "@/layouts/Auth";
import { Button, PickerItem } from "@/components/Global";
import { Input, CheckBox, Picker } from "@/components/Form";
import { FormProvider, useForm } from "react-hook-form";
import { useCallback, useContext, useState } from "react";
import authApi from "@/utils/api/auth.api";
import { useTranslation } from "react-i18next";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { AuthContext } from "@/contexts/Auth";
import { UserContext } from "@/contexts/User";

interface IFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  administrativeArea2: string;
  password: string;
  confirmPassword: string;
  privacy: boolean;
}

export default function Register() {
  const { t } = useTranslation();
  const { handleSetAuth } = useContext(AuthContext);
  const { storeUserData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const abortController = new AbortController();
  const methods = useForm<IFormData>();

  /**
   * Main function for the register process that handle the
   * input values in one place thanks to the `react-hook-form`
   * library.
   */
  const handleSignup = useCallback(
    async (formData: any) => {
      setLoading(true);
      const res = await authApi.register(abortController, formData);
      setLoading(false);
      if (!res?.status) {
        if (res.data && Array.isArray(res.data)) {
          for (const data of res.data) {
            methods.setError(data.key, { message: data.message });
          }
        } else {
          const title = t("general.errors.alerts.serverError.title");
          const message = res?.message
            ? res.message
            : t("general.errors.alerts.serverError.message");
          Alert.alert(title, message);
        }
        return;
      }

      const authResult = await authApi.login(
        abortController,
        formData.email,
        formData.password
      );

      const resData = authResult.data;
      handleSetAuth({ token: resData?.token, date: new Date() });
      storeUserData(resData.user);
    },
    [abortController]
  );

  return (
    <MainLayout>
      <HeaderLayout style={{ height: 70 }}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <FontAwesome6 name="arrow-left" size={24} color="white" />
        </Pressable>
        <Text style={styles.headerTitle}>{t("screens.register.title")}</Text>
      </HeaderLayout>
      <ContainerLayout style={styles.container} contentStyle={styles.content}>
        <View style={{ gap: 10 }}>
          <FormProvider {...methods}>
            <Picker
              name="administrativeArea2"
              label="Provincia"
              itemList={province ?? []}
              renderItem={(value: any, index: number) => (
                <PickerItem
                  label={value.nome}
                  value={value.sigla}
                  key={index}
                />
              )}
              filterFun={(itemList, value) => {
                return itemList.find((el) => el.sigla === value).nome;
              }}
            />

            <Input
              label={t("screens.register.form.firstName.label")}
              name="firstName"
              type="text"
              placeholder={t("screens.register.form.firstName.placeholder")}
            />

            <Input
              label={t("screens.register.form.lastName.label")}
              name="lastName"
              type="text"
              placeholder={t("screens.register.form.lastName.placeholder")}
            />

            <Input
              label={t("screens.register.form.email.label")}
              name="email"
              type="email"
            />

            <Input
              label={t("screens.register.form.phone.label")}
              name="phone"
              type="phone"
            />

            <Input
              label={t("screens.register.form.password.label")}
              name="password"
              type="password"
              placeholder="Password"
            />
            <Input
              label={t("screens.register.form.confirmPassword.label")}
              name="confirmPassword"
              type="password"
              placeholder="Conferma la password"
            />

            <CheckBox
              name="privacy"
              label={t("screens.register.form.privacy.label")}
            />
          </FormProvider>
        </View>

        <Button
          containerStyle={{ backgroundColor: "transparent" }}
          textStyle={{ color: "#F37021", fontSize: 16, lineHeight: 24 }}
          label={t("screens.register.form.privacyLinkText")}
          onPress={() => router.navigate("https://fin-solution.com/privacy")}
        />

        <Button
          label={t("screens.register.form.submitBtn")}
          loading={loading}
          onPress={methods.handleSubmit(handleSignup)}
          containerStyle={{ borderRadius: 10 }}
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
    alignSelf: "center",
  },
  container: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  content: {
    paddingTop: 40,
    gap: 20,
    paddingBottom: 40,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: "50%",
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: "-50%" }],
  },
});
