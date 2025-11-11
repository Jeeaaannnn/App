import { View, Text, ScrollView, StyleSheet, StatusBar } from "react-native";
import Header from "@/src/modules/Share/Header";
import { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";
import { ContactCard } from "@/modules/Share";
import { useTranslation } from "react-i18next";

export default function SharePage() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const { t } = useTranslation("", { keyPrefix: "screens.sharePage" });

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== "granted") return;

      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.Emails,
          Contacts.Fields.PhoneNumbers,
          Contacts.Fields.PhoneticFirstName,
          Contacts.Fields.PhoneticMiddleName,
          Contacts.Fields.PhoneticLastName,
        ],
      });

      if (data.length > 0) setContacts(data.filter((el) => el.phoneNumbers));
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.mainContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainerContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "800" }}>{t("contacts")}</Text>
            <Text style={{ marginLeft: "auto" }}>{t("shares")}. 0</Text>
          </View>

          <View style={{ flexDirection: "column", marginTop: 15, gap: 15 }}>
            {contacts.map((contact, index) => {
              const phoneNumber = contact.phoneNumbers
                ? contact.phoneNumbers[0].number
                : "";
              const name = contact.name;

              return (
                <ContactCard
                  name={name}
                  phoneNumber={phoneNumber}
                  key={index}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#F37021",
    paddingTop: (StatusBar.currentHeight ?? 0) + 15,
  },
  mainContainer: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    overflow: "hidden",
  },
  scrollContainer: {},
  scrollContainerContent: {
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
});
