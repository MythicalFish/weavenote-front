import React, { PropTypes } from 'react';
import FormField from 'components/FormField';
import { Field } from 'redux-form/immutable';

const fieldConstructor = (fProps) => (props) => {
  const field = (
    <Field
      {...{
        ...props,
        ...fProps,
        theme: 'alt1',
        component: FormField,
      }}
    />
  );
  if (props.c) return <div className={props.c}>{field}</div>;
  return field;
};

export default fieldConstructor;
