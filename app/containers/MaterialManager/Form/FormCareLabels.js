import React, { PropTypes } from 'react';

class CareLabels extends React.PureComponent {
  isAdded = (label) => {
    const { initialValues: v } = this.props;
    return v
      .get('care_label_ids')
      .toJS()
      .includes(label.get('id'));
  };
  render() {
    const { globalData } = this.props;
    return (
      <div>
        {globalData.careLabels.map((label, index) => (
          <div key={index} onClick={() => this.props.toggleCareLabel(label)}>
            {label.get('name')}
            {this.isAdded(label) && <span>x</span>}
          </div>
        ))}
      </div>
    );
  }
}

CareLabels.propTypes = {
  toggleCareLabel: PropTypes.func,
  careLabels: PropTypes.object,
};

export default CareLabels;
