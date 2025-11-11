import { StyleSheet, View, Text, Pressable } from "react-native";
import { FooterElement } from "./FooterElement";
import { useMemo } from "react";
import { Case } from "@/interfaces/case.interface";
import ContentLoader, { Rect } from "react-content-loader/native";
import { router } from "expo-router";
import Animated from "react-native-reanimated";
import NewLoad from "@/assets/svg/_new_load.svg";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { formatDate } from "@/utils/date";

interface IHomeCardProps<T> {
  data: T extends true ? Case : null;
  type: string;
  loading: boolean;
}

// TODO: auto language

export function Card(props: IHomeCardProps<false> | IHomeCardProps<true>) {
  const CardHeaderLoader = useMemo(
    () => (
      <ContentLoader
        backgroundColor="#e6e6e60f"
        foregroundColor="#b9b6b6"
        speed={1}
        viewBox="0 0 215 18"
        width={215}
        height={18}
      >
        <Rect x="0" y="0" rx="2" ry="2" width="215" height="18" />
      </ContentLoader>
    ),
    []
  );

  const CardMainLoader = useMemo(
    () => (
      <ContentLoader
        backgroundColor="#e6e6e60f"
        foregroundColor="#b9b6b6"
        speed={1}
        viewBox="0 0 185 53"
        width={185}
        height={53}
      >
        <Rect x="0" y="0" rx="2" ry="2" width="100" height="16" />
        <Rect x="0" y="21" rx="2" ry="2" width="185" height="32" />
      </ContentLoader>
    ),
    []
  );

  if (props.loading || (!props.data && props.type === ""))
    return (
      <Animated.View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {CardHeaderLoader}
          </View>
          <View style={styles.mainContainer}>{CardMainLoader}</View>
          <View style={styles.footerContainer}>
            <FooterElement skeleton />
            <FooterElement skeleton />
          </View>
        </View>
      </Animated.View>
    );

  if (!props.loading && props.type === "new")
    return (
      <>
        <Animated.View style={[styles.container, styles.requestContainer]}>
          <View
            style={[
              styles.wrapper,
              { alignItems: "center", flexDirection: "row" },
            ]}
          >
            <NewLoad />
            <View style={styles.requestWrapper}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.headerTitle]}>Preventivo prestito</Text>
              </View>

              <Pressable
                style={styles.requestButton}
                onPress={() => router.navigate("/(main)/(screens)/(request)")}
              >
                <FontAwesome6 name="check-circle" size={24} color="white" />
                <Text style={styles.requestButtonText}>Inizia ora</Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </>
    );

  // CASE User requested
  if (!props.loading && props.type === "requested")
    return (
      <>
        <Animated.View style={[styles.container]}>
          <View style={styles.wrapper}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.headerTitle}>In corso</Text>
              {/* EDIT */}
              <Pressable style={{ marginLeft: "auto" }}>
                <Text style={styles.headerButton}>Modifica</Text>
              </Pressable>
            </View>
            <View style={styles.mainContainer}>
              <Text style={styles.mainHeaderTitle}>Importo Richiesto</Text>
              <Text style={styles.mainHeaderText}>€ 10000</Text>
            </View>

            <View style={styles.footerContainer}>
              <FooterElement label={"Richiesto"} value={"10/01/2000"} />
              <FooterElement label={"Rate"} value={"86"} />
            </View>
          </View>
        </Animated.View>
      </>
    );

  const fun = (data) => {
    if (!data.resolvedAt || data.resolvedAt === "") return "In istruttoria";
    else if (!data.approvedAt || data.approvedAt === "") return "Deliberata";
    else if (!data.settledAt || data.settledAt === "")
      return "In Perfezionamento";
    else return "Liquidata";
  };

  // <!-- settledAt ~ data_liquidazione -->
  // <!-- resolvedAt ~ DataDeliber -->
  // <!-- approvedAt ~ data_ric_benestare -->

  const state = fun(props.data);

  return (
    <Animated.View style={styles.container}>
      <View style={[styles.wrapper, { height: 280 }]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.headerTitle}>Cessione del Quinto</Text>
        </View>
        <View style={styles.mainContainer}>
          <Text style={styles.mainHeaderTitle}>Importo</Text>
          <Text style={styles.mainHeaderText}>
            € {parseFloat(props.data.netAmount).toLocaleString()}
          </Text>
        </View>
        <View style={styles.footerContainer}>
          <FooterElement label={"Stato"} value={state} />
          <FooterElement label={"Data"} value={formatDate(props.data)} />
        </View>
        <View
          style={{
            width: "100%",
            height: 0.5,
            backgroundColor: "#F37021",
            marginTop: 15,
            marginBottom: 10,
          }}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <FooterElement
            labelStyle={{ color: "#F37021" }}
            label={"Rata mensile"}
            value={`€ ${Math.round(props.data.installmentAmount * 100) / 100}`}
          />
          <FooterElement
            labelStyle={{ color: "#F37021" }}
            valueStyle={{ alignSelf: "flex-end" }}
            label={"Importo estinzione"}
            value={`€ ${Math.round(props.data.extinguishedAmount * 100) / 100}`}
          />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 15,
    overflow: "hidden",
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 10,
        spreadDistance: -6,
        color: "black",
      },
    ],
  },
  requestContainer: {
    height: 145,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 10,
        spreadDistance: -7,
        color: "black",
      },
    ],
  },
  wrapper: {
    padding: 20,
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  requestWrapper: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingTop: 15,
  },
  requestButton: {
    backgroundColor: "#2FAF3E",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  requestButtonText: {
    color: "white",
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 20,
    textAlign: "center",
  },
  headerTitle: {
    color: "#F37021",
    fontSize: 20,
    lineHeight: 26,
    fontFamily: "Poppins",
    fontWeight: "700",
  },
  headerButton: {
    position: "relative",
    fontFamily: "Poppins",
    fontWeight: "500",
    marginLeft: "auto",
    textAlign: "center",
    backgroundColor: "#2FAF3E",
    color: "white",
    alignItems: "center",
    fontSize: 12,
    lineHeight: 14,
    padding: 5,
    borderRadius: 15,
    paddingHorizontal: 8,
  },
  mainContainer: {
    flexDirection: "column",
  },
  mainHeaderTitle: {
    color: "black",
    fontFamily: "Poppins",
    fontWeight: "400",
    opacity: 0.76,
  },
  mainHeaderText: {
    color: "black",
    fontSize: 32,
    fontFamily: "Poppins",
    fontWeight: "600",
    lineHeight: 38,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
