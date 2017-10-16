import React, { PropTypes } from 'react';
import FocusableField, { FormField } from 'components/FormField';
import { Field } from 'redux-form/immutable';

const fieldConstructor = ({ isRestricted, isNew, handleSubmit }) => (props) => {
  const p = { ...props };
  p.component = p.type === 'select' ? FormField : FocusableField;
  p.theme = 'alt1';
  delete p.c;
  if (!isNew) p.onBlur = handleSubmit;
  const f = <Field {...{ ...p, restricted: isRestricted }} />;
  if (props.c) return <div className={props.c}>{f}</div>;
  return f;
};

export default fieldConstructor;
