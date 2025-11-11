import { View, Text, StyleSheet, LayoutAnimation } from "react-native";
import FidelityIcon from "@/assets/svg/fidelity.svg";
import Animated, { Easing, LinearTransition } from "react-native-reanimated";

// TODO
// Translation
const LayoutCustom = LinearTransition.easing(Easing.bezierFn(0.32, 0.72, 0, 1));

export function FidelityBox() {
  return (
    <Animated.View
      layout={LayoutCustom.springify(150)}
      style={styles.container}
    >
      <View>
        <FidelityIcon width={38} height={38} />
      </View>
      <Text style={styles.containerText}>Punti fidelity</Text>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsNumber}>0</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F37021",
    flexDirection: "row",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignItems: "center",
    marginTop: 10,
  },
  containerText: {
    color: "white",
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 22,
    justifyContent: "center",
    marginLeft: 25,
  },
  pointsContainer: {
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "white",
    padding: 10,
  },
  pointsNumber: {
    fontFamily: "Poppins",
    fontWeight: "600",
    lineHeight: 20,
    fontSize: 18,
    width: 50,
    textAlign: "center",
    color: "#F37021",
  },
});
