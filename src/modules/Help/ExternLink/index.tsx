import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ExternalPathString, router } from "expo-router";
import { useCallback } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";

export interface IProps {
  icon: "globe-sharp" | "logo-facebook" | "logo-instagram";
  label: string;
  href: ExternalPathString;
}

export function ExternLink(props: IProps) {
  const handlePress = useCallback(async () => {
    router.navigate(props.href);
  }, [props.href]);

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons name={props.icon} size={24} color="#343434" />
        </View>
        <Text style={styles.label}>{props.label}</Text>
        <View style={{ marginLeft: "auto" }}>
          <FontAwesome6 name="angle-right" size={24} color="black" />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  iconContainer: {
    width: 34,
    height: 34,
    backgroundColor: "#DFF5F7",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 20,
  },
});
