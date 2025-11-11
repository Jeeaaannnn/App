import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import CheckBox from "@/components/Global/CheckBox";

interface IProps {
  name: string;
  phoneNumber: number;
}

export function ContactCard({ name, phoneNumber }: IProps) {
  const [isChecked, setChecked] = useState(false);

  return (
    <Pressable onPress={() => setChecked((prev) => !prev)}>
      <View style={cardStyles.container}>
        <CheckBox
          style={cardStyles.checkBox}
          value={isChecked}
          onValueChange={setChecked}
        />
        <View style={cardStyles.wrapper}>
          <Text style={cardStyles.name}>{name}</Text>
          <Text style={cardStyles.phoneNumber}>{phoneNumber}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const cardStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
  checkBox: {
    width: 20,
    height: 20,
    padding: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#B7B5B0",
  },
  wrapper: {
    flexDirection: "column",
    gap: 5,
  },
  name: {
    fontFamily: "Poppins",
    fontWeight: "700",
    lineHeight: 18,
  },
  phoneNumber: {
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 14,
    opacity: 0.85,
  },
});
