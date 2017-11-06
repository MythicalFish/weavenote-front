import React, { PropTypes } from 'react';
import { FieldArray } from 'redux-form/immutable';
import Checkbox from 'components/Checkbox';

class CareLabels extends React.PureComponent {
  labelKey = (label) => {
    const { fields } = this.props;
    const labelID = label.get('id');
    const values = fields.getAll();
    return values.findKey((id) => id === labelID);
  };
  isAdded = (label) => this.labelKey(label) !== undefined;
  handleClick = (label) => () => {
    const { fields, updateMaterial, isNew, isRestricted } = this.props;
    if (isRestricted) return false;
    if (this.isAdded(label)) {
      fields.remove(this.labelKey(label));
    } else {
      fields.push(label.get('id'));
    }
    if (!isNew) updateMaterial();
  };
  render() {
    const { globalData, isRestricted } = this.props;
    let klass = '';
    if (isRestricted) klass = 'cursor-default';
    return (
      <div className="field">
        <label>Care labels</label>
        <div className="checklist">
          {globalData.careLabels.map((label, index) => (
            <div
              key={index}
              onClick={this.handleClick(label)}
              className={klass}
            >
              <div>{label.get('name')}</div>
              <Checkbox checked={this.isAdded(label)} readOnly={isRestricted} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const C = (props) => (
  <FieldArray name="care_label_ids" component={CareLabels} {...props} />
);

CareLabels.propTypes = {
  isRestricted: PropTypes.bool,
  globalData: PropTypes.object,
  isNew: PropTypes.bool,
  fields: PropTypes.object,
  updateMaterial: PropTypes.func,
};

export default C;
