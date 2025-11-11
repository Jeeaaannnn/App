import { Pin as GlobalPin } from "@/components/Global";
import { useCallback } from "react";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";

interface IProps {
  name: string;
}

export function Pin(props: IProps) {
  const methods = useFormContext();
  type field = ControllerRenderProps<FieldValues, typeof props.name>;

  interface IRenderProps {
    field: field;
  }

  interface IHandleChangeText {
    field: field;
    text: string[];
  }

  const error = methods.formState.errors[props.name]
    ? methods.formState.errors[props.name]
    : undefined;

  const handleChangeText = useCallback(({ field, text }: IHandleChangeText) => {
    field.onChange(text);
  }, []);

  return (
    <Controller
      name={props.name}
      rules={{ required: true }}
      render={({ field }) => {
        return (
          <GlobalPin
            error={error}
            length={6}
            value={field.value}
            onChangeText={(text) => {
              handleChangeText({ field, text });
            }}
          />
        );
      }}
    />
  );
}
