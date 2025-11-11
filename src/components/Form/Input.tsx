import { useCallback, useState } from "react";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { Input as GlobalInput } from "@/components/Global";

interface IProps {
  name: string;
  type: "text" | "email" | "password" | "phone" | "date";
  label?: string;
  placeholder?: string;
}

export function Input(props: IProps) {
  const { name, type, label, placeholder } = props;
  const methods = useFormContext();

  const defaultValue = methods.formState.defaultValues
    ? methods.formState.defaultValues[props.name]
    : "";
  const [input, setInput] = useState<string>(defaultValue);
  type field = ControllerRenderProps<FieldValues, typeof name>;

  const handleChangeText = useCallback(
    ({ value, field }: { value: string; field: field }) => {
      setInput(value);
      field.onChange(value);
    },
    []
  );

  interface IRenderProps {
    field: field;
  }

  const error = methods.formState.errors[name]
    ? methods.formState.errors[name]
    : undefined;

  const Render = useCallback(
    ({ field }: IRenderProps) => (
      <GlobalInput
        error={error}
        placeholder={placeholder ?? undefined}
        label={label ?? undefined}
        type={type ?? "text"}
        defaultValue={defaultValue}
        onChangeText={(value) => handleChangeText({ value, field })}
      />
    ),
    [input, error]
  );

  return <Controller name={name} rules={{ required: true }} render={Render} />;
}
