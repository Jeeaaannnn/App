import { JSX } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Href, router } from "expo-router";

interface IItemDimension {
  width: number;
}

// TODO

interface ICarouselItem {
  Icon?: any;
  IconType?: string;
  label?: string;
  href?: Href;
  itemSize?: IItemDimension | null;
}

export function CarouselItem(props: ICarouselItem): JSX.Element {
  const { itemSize } = props;
  if (!itemSize) return <></>;
  const { width } = itemSize;

  const handlePress = () => {
    if (props.href) return router.navigate(props.href);
  };

  const Icon = props.Icon;

  return (
    <Pressable onPress={handlePress}>
      <View style={[styles.container, { width, height: width }]}>
        <View style={styles.wrapper}>
          {props.Icon && (
            <View style={styles.icon}>
              <Icon width={45} height={45} />
            </View>
          )}
          {props.Icon && props.IconType && <View style={styles.icon}>{}</View>}
          {props.label && <Text style={styles.label}>{props.label}</Text>}
        </View>
      </View>
    </Pressable>
  );
}

// {/* <props.Icon name={props.IconType} size={28} color="#F37021" /> */}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  wrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#F37021",
    justifyContent: "center",
    // padding: 10,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 1,
        blurRadius: 9,
        spreadDistance: -6,
        color: "black",
      },
    ],
  },
  icon: {
    alignItems: "center",
    marginTop: 10,
  },
  label: {
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: 10,
    padding: 10,
    lineHeight: 12,
    textAlign: "center",
    textTransform: "uppercase",
    color: "#343434",
  },
});
