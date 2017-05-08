import React from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';

export default function SelectInput({ input, data, meta }) {
  let val = input.value;
  if (val.toJS) { val = val.toJS(); }
  return (
    <DropdownList
      data={data}
      name={input.name}
      defaultValue={val}
      valueField="id"
      textField="name"
      onSelect={input.onChange}
    />
  );
}
