import React, { PropTypes } from 'react';
import { FieldArray } from 'redux-form/immutable';
import Dropdown from 'components/Dropdown';
import InputRow from 'components/FormField';

const renderCareLabels = ({ fields, removeLabel }) =>
  <div>
    {fields.getAll().map((label, index) =>
      <div key={label} className="tag">
        <span>
          {label.get('name')}
        </span>
        <button
          className="btn-shy"
          onClick={() => {
            removeLabel({ label, index });
          }}
        >
          <i className="fa fa-close" />
        </button>
      </div>
    )}
  </div>;

export default class CareLabels extends React.PureComponent {
  addLabel = (label) => {
    this.props.addCareLabel(label);
  };

  removeLabel = (label) => {
    this.props.removeCareLabel(label);
  };

  render() {
    const { labels, className } = this.props;

    return (
      <div className={className}>
        <div className="data-rows">
          <InputRow
            label="Care labels"
            type="select"
            data={labels}
            onChange={this.addLabel}
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
  addCareLabel: PropTypes.func,
  removeCareLabel: PropTypes.func,
};
