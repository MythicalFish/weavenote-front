import React, { PropTypes } from 'react';
import { FieldArray } from 'redux-form/immutable';
import { FormField } from 'components/FormField';
import Icon from 'components/Icon';

export default class CareLabels extends React.PureComponent {
  renderCareLabels = ({ fields, removeLabel }) => {
    const { careLabels } = this.props;
    const l = fields.getAll();
    if (!l) return null;
    return (
      //
      <div>
        {careLabels.map((label) => (
          //
          <div>{label.get('name')}</div>
        ))}
      </div>
    );
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
  render() {
    return (
      <FieldArray
        name="care_label_ids"
        component={this.renderCareLabels}
        removeLabel={this.removeLabel}
      />
    );
  }
}

CareLabels.propTypes = {
  removeLabel: PropTypes.func,
  careLabels: PropTypes.object,
};
