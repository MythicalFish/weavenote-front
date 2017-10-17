import React, { PropTypes } from 'react';
import { FieldArray } from 'redux-form/immutable';

class CareLabels extends React.PureComponent {
  labelKey = (label) => {
    const { fields } = this.props;
    const labelID = label.get('id');
    const values = fields.getAll();
    return values.findKey((id) => id === labelID);
  };
  isAdded = (label) => this.labelKey(label) !== undefined;
  handleClick = (label) => () => {
    const { fields, updateMaterial } = this.props;
    if (this.isAdded(label)) {
      fields.remove(this.labelKey(label));
    } else {
      fields.push(label.get('id'));
    }
    updateMaterial();
  };
  render() {
    const { globalData } = this.props;
    return (
      <div>
        {globalData.careLabels.map((label, index) => (
          <div key={index} onClick={this.handleClick(label)}>
            {label.get('name')}
            {this.isAdded(label) && <span>x</span>}
          </div>
        ))}
      </div>
    );
  }
}

const C = (props) => (
  <FieldArray name="care_label_ids" component={CareLabels} {...props} />
);

CareLabels.propTypes = {
  globalData: PropTypes.object,
  initialValues: PropTypes.object,
  fields: PropTypes.object,
  updateMaterial: PropTypes.func,
};

export default C;
