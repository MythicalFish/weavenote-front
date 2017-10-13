import React, { PropTypes } from 'react';

export default class Basics extends React.PureComponent {
  render() {
    const { showFor, materialTypes, colors, switchType, F } = this.props;

    return (
      <div className="row">
        <div className="col-xs-12 mb3">
          <F
            name="type"
            type="select"
            label="Type"
            data={materialTypes}
            onChanged={switchType}
          />
        </div>
        <div className="col-xs-7 mb3">
          <F name="name" label="Material Name" />
        </div>
        <div className="col-xs-5 mb3">
          <F name="identifier" label="Reference" />
        </div>
        <div className="col-xs-8 mb3">
          <F name="color" label="Color" />
        </div>
        <div className="col-xs-4 mb3">
          <F name="size" label="Size" c={showFor(['Button', 'Zip'])} />
        </div>
        <div className="col-xs-12 mb3">
          <F
            name="composition"
            label="Composition"
            c={showFor(['Fabric', 'Yarn'])}
          />
        </div>
        <div className="col-xs-6 mb3">
          <F name="yarn_count" label="Yarn count" c={showFor('Yarn')} />
        </div>
        <div className="col-xs-6 mb3">
          <F name="weight" label="Weight" c={showFor('Yarn')} />
        </div>
        <div className="col-xs-6 mb3">
          <F name="width" label="Width" c={showFor('Fabric')} />
        </div>
        <div className="col-xs-12 mb3">
          <F name="length" label="Length" c={showFor('Zip')} />
        </div>
        <div className="col-xs-12 mb3">
          <F name="subtype" label="Zip Type" c={showFor('Zip')} />
        </div>
        <div className="col-xs-12 mb3">
          <F name="opening_type" label="Opening Type" c={showFor('Zip')} />
        </div>
      </div>
    );
  }
}

Basics.propTypes = {
  showFor: PropTypes.func,
  switchType: PropTypes.func,
  materialTypes: PropTypes.object,
  colors: PropTypes.object,
  F: PropTypes.func,
};
