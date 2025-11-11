import { View, Text, StyleSheet } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";

// TODO: set types for style

interface IProps {
  label?: string;
  value?: string;
  style?: unknown;
  labelStyle?: unknown;
  valueStyle?: unknown;
  skeleton?: boolean;
}

export function FooterElement(props: IProps) {
  const { label, value } = props;

  if (props.skeleton)
    return (
      <ContentLoader
        backgroundColor="#e6e6e60f"
        foregroundColor="#b9b6b6"
        speed={1}
        viewBox="0 0 70 35"
        width={70}
        height={35}
        style={{ marginTop: 5 }}
      >
        <Rect x="0" y="0" rx="2" ry="2" width="40" height="15" />
        <Rect x="0" y="20" rx="2" ry="2" width="70" height="15" />
      </ContentLoader>
    );

  return (
    <View style={[styles.container, props.style ?? {}]}>
      <Text style={[styles.label, props.labelStyle ?? {}]}>{label}</Text>
      <Text style={[styles.value, props.valueStyle ?? {}]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  label: {
    color: "#A7A7A7",
    fontFamily: "Poppins",
    fontWeight: "400",
  },
  value: {
    color: "black",
    fontWeight: "800",
  },
});
