import React, { PropTypes } from 'react';
import { FieldArray } from 'redux-form/immutable';
import SelectInput from 'components/SelectInput';
import DataRow from 'components/DataRow';
const renderCareLabels = ({ care_labels }) => {
  return null;
};

export default class CareLabels extends React.PureComponent {

  addLabel = (label) => {
    console.log(label);
  }

  removeLabel = (label) => {
    console.log(label);
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
};

