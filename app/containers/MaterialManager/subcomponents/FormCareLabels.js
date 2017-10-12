import React, { PropTypes } from 'react';
import { FieldArray } from 'redux-form/immutable';
import { FormField } from 'components/FormField';
import Icon from 'components/Icon';

const renderCareLabels = ({ fields, removeLabel }) => {
  const l = fields.getAll();
  if (!l) return null;
  return (
    <div>
      {l.map((label, index) => (
        <div key={label} className="tag">
          <div>{label.get('name')}</div>
          <Icon
            onClick={() => removeLabel({ label, index })}
            size={15}
            name="X"
            className="p0"
          />
        </div>
      ))}
    </div>
  );
};

export default class CareLabels extends React.PureComponent {
  addLabel = (label) => {
    this.props.addLabel(label);
  };

  removeLabel = (label) => {
    this.props.removeLabel(label);
  };

  render() {
    const { careLabels, className } = this.props;
    if (!careLabels) return null;
    return (
      <div className={className}>
        <div className="data-rows">
          <FormField
            label="Care labels"
            value={{ name: 'Select' }}
            type="select"
            data={careLabels}
            onChange={this.addLabel}
            theme="alt1"
          />
        </div>
        <FieldArray
          name="care_labels"
          component={renderCareLabels}
          removeLabel={this.removeLabel}
        />
      </div>
    );
  }
}

CareLabels.propTypes = {
  addLabel: PropTypes.func,
  removeLabel: PropTypes.func,
  careLabels: PropTypes.object,
  className: PropTypes.string,
};
