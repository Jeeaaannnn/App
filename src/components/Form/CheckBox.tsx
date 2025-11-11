import { useCallback, useState } from "react";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import GlobalCheckBox from "expo-checkbox";
import { View, Text } from "react-native";

interface IProps {
  name: string;
  label?: string;
}

export function CheckBox(props: IProps) {
  const { name, label } = props;
  const methods = useFormContext();
  type field = ControllerRenderProps<FieldValues, typeof name>;

  interface IRenderProps {
    field: field;
  }

  const error = methods.formState.errors[name]
    ? methods.formState.errors[name]
    : undefined;

  const Render = useCallback(
    ({ field }: IRenderProps) => (
      <View style={{ flexDirection: "row", gap: 10 }}>
        <GlobalCheckBox value={field.value} onValueChange={field.onChange} />
        <Text
          style={{ fontFamily: "Poppins", fontWeight: "400", lineHeight: 18 }}
        >
          {label}
        </Text>
      </View>
    ),
    [error]
  );

  return <Controller name={name} rules={{ required: true }} render={Render} />;
}
