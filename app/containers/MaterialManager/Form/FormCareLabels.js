import React, { PropTypes } from 'react';
import { FieldArray } from 'redux-form/immutable';
import Icon from 'components/Icon';

class CareLabels extends React.PureComponent {
  labelKey = (label) => {
    const { fields } = this.props;
    const labelID = label.get('id');
    const values = fields.getAll();
    return values.findKey((id) => id === labelID);
  };
  isAdded = (label) => this.labelKey(label) !== undefined;
  handleClick = (label) => () => {
    const { fields, updateMaterial, isNew } = this.props;
    if (this.isAdded(label)) {
      fields.remove(this.labelKey(label));
    } else {
      fields.push(label.get('id'));
    }
    if (!isNew) updateMaterial();
  };
  render() {
    const { globalData } = this.props;
    return (
      <div className="field">
        <label>Care labels</label>
        <div className="checklist">
          {globalData.careLabels.map((label, index) => (
            <div key={index} onClick={this.handleClick(label)}>
              <div>{label.get('name')}</div>
              <div>
                {this.isAdded(label) ? (
                  <Icon name="CheckSquare" size={20} color="dark4" />
                ) : (
                  <Icon name="Square" size={20} color="dark3" />
                )}
              </div>
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
  globalData: PropTypes.object,
  isNew: PropTypes.bool,
  fields: PropTypes.object,
  updateMaterial: PropTypes.func,
};

export default C;
