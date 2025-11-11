import { StyleSheet, Text, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { JSX } from "react";

interface IRulesCardProps {
  icon:
    | "clock"
    | "user-plus"
    | "link"
    | "file-alt"
    | "hand-holding-usd"
    | "gift";
  title?: string;
  description?: string;
  fill?: boolean;
  CustomTextElement?: () => JSX.Element;
}

export function CardElement(props: IRulesCardProps) {
  const CustomTextElement = props.CustomTextElement;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: props.fill ? "#78788019" : "transparent" },
      ]}
    >
      <View style={styles.wrapper}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name={props.icon} size={24} color="black" />
        </View>
        <View style={styles.textContainer}>
          {!CustomTextElement && (
            <>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.description}>{props.description}</Text>
            </>
          )}
          {CustomTextElement && <CustomTextElement />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  wrapper: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    overflow: "hidden",
    alignItems: "center",
  },
  iconContainer: {
    width: 30,
    height: "100%",
    paddingTop: 10,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: "Poppins",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 20,
  },
  description: {
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 18,
  },
});
