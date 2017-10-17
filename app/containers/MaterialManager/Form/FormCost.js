import React, { PropTypes } from 'react';

export default class Cost extends React.PureComponent {
  render() {
    const { globalData, Field } = this.props;

    return (
      <div className="row">
        <Field
          name="currency"
          type="select"
          placeholder="Currency"
          data={globalData.currencies}
        />
        <Field name="cost_base" placeholder="Eg. 3.50" c="col-xs-6" />
        <Field
          name="unit_type_id"
          type="select"
          data={globalData.unitTypes}
          c="col-xs-12"
        />
      </div>
    );
  }
}

Cost.propTypes = {
  globalData: PropTypes.object,
  Field: PropTypes.func,
};
