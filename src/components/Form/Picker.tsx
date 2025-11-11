import { Picker as GlobalPicker } from "@/components/Global";
import { JSX, useCallback, useState } from "react";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";

interface IProps {
  name: string;
  label: string;
  itemList: any[];
  renderItem: (value: any, index: number) => JSX.Element;
  filterFun: (itemList: any[], value: any) => any;
}

export function Picker(props: IProps) {
  const { name, label, itemList, filterFun, renderItem } = props;
  const [selected, setSelected] = useState("");
  const methods = useFormContext();
  type field = ControllerRenderProps<FieldValues, typeof props.name>;

  interface IHandleChange {
    field: field;
    value: any;
  }

  const handleChange = useCallback(({ field, value }: IHandleChange) => {
    if (value === "") {
      field.onChange("");
      setSelected("");
      return;
    }
    const filteredValue = filterFun(itemList, value);
    setSelected(filteredValue);
    field.onChange(value);
  }, []);

  const error = methods.formState.errors[name]
    ? methods.formState.errors[name]
    : undefined;

  return (
    <Controller
      name={name}
      rules={{ required: true }}
      render={({ field }) => (
        <GlobalPicker
          error={error}
          selected={selected}
          label={label}
          itemList={itemList}
          renderItem={renderItem}
          onChange={(value) => handleChange({ value, field })}
        />
      )}
    />
  );
}
