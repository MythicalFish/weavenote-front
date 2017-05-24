import React, { PropTypes } from 'react';
import { FieldArray } from 'redux-form/immutable';
import SelectInput from 'components/SelectInput';
import DataRow from 'components/DataRow';

const renderCareLabels = ({ fields }) => (
  <div>
    {fields.getAll().map((label, index) => (
      <div key={label} className="bg-color1x p1 white mt1">
        {label.get('name')}
      </div>
    ))}
  </div>
);


export default class CareLabels extends React.PureComponent {

  addLabel = (label) => {
    this.props.addCareLabel(label);
  }

  removeLabel = (label) => {
    this.props.removeCareLabel(label);
  }

  render() {

    const { labels } = this.props;    

    return (
      <div>
        <div className="data-rows">
          <DataRow label="Care labels" type="select" data={labels} onChange={this.addLabel} />
        </div>
        <FieldArray name="care_labels" component={renderCareLabels} />
      </div>
    );
  }
}

CareLabels.propTypes = {
  addCareLabel: PropTypes.func,
  removeCareLabel: PropTypes.func,
};

