import React, { PropTypes } from 'react';
import FormField from 'components/FormField';

const fieldConstructor = (fProps) => (props) => {
  const field = (
    <FormField
      {...{
        ...props,
        ...fProps,
        theme: 'alt1',
      }}
    />
  );
  if (props.c) return <div className={props.c}>{field}</div>;
  return field;
};

export default fieldConstructor;
