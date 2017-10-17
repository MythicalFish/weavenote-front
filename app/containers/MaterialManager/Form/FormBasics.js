import React, { PropTypes } from 'react';

export default class Basics extends React.PureComponent {
  render() {
    const { globalData, typeIs, switchType, Field } = this.props;

    return (
      <div className="row">
        <Field
          name="type"
          type="select"
          required
          label="Type"
          data={globalData.materialTypes}
          onChanged={switchType}
          c="col-xs-12 mb3"
        />
        <Field name="name" label="Material Name" required c="col-xs-7 mb3" />
        <Field name="reference" label="Reference" c="col-xs-5 mb3" />
        <Field name="color" label="Color" c="col-xs-8 mb3" />
        {typeIs(['Button', 'Zip']) && (
          <Field name="size" label="Size" c="col-xs-4 mb3" />
        )}
        {typeIs(['Fabric', 'Yarn']) && (
          <Field name="composition" label="Composition" c="col-xs-12 mb3" />
        )}
        {typeIs(['Yarn']) && (
          <Field name="yarn_count" label="Yarn count" c="col-xs-6 mb3" />
        )}
        {typeIs(['Yarn']) && (
          <Field name="weight" label="Weight" c="col-xs-6 mb3" />
        )}
        {typeIs(['Fabric']) && (
          <Field name="width" label="Width" c="col-xs-6 mb3" />
        )}
        {typeIs(['Zip']) && (
          <Field name="length" label="Length" c="col-xs-12 mb3" />
        )}
        {typeIs(['Zip']) && (
          <Field name="subtype" label="Zip Type" c="col-xs-12 mb3" />
        )}
        {typeIs(['Zip']) && (
          <Field name="opening_type" label="Opening Type" c="col-xs-12 mb3" />
        )}
      </div>
    );
  }
}

Basics.propTypes = {
  typeIs: PropTypes.func,
  switchType: PropTypes.func,
  globalData: PropTypes.object,
};
