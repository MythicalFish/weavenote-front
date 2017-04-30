import React from 'react';

function TextInput(p) {
  return (
    <input type="text" name={p.name} defaultValue={p.val} />
  );
}

TextInput.propTypes = {
  name: React.PropTypes.string,
  val: React.PropTypes.string,
};

export default TextInput;
