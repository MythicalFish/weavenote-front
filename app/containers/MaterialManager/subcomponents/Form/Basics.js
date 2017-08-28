import React, { PropTypes } from 'react';

export default class Basics extends React.PureComponent {
  render() {
    const { showFor, materialTypes, colors, switchType, F } = this.props;

    return (
      <div className="row">
        <div className="col-xs-8">
          <F name="name" label="Name" />
        </div>
        <div className="col-xs-4">
          <F name="identifier" label="Ref." />
        </div>
        <div className="col-xs-12">
          <F
            name="type"
            type="select"
            label="Type"
            data={materialTypes}
            onChanged={switchType}
          />
        </div>
        <div className="col-xs-8">
          <F name="color" type="select" label="Color" data={colors} />
        </div>
        <div className="col-xs-4">
          <F name="size" label="Size" c={showFor(['Button', 'Zip'])} />
        </div>
        <div className="col-xs-12">
          <F name="composition" label="Composition" c={showFor('Fabric')} />
        </div>
        <div className="col-xs-12">
          <F name="length" label="Length" c={showFor('Zip')} />
        </div>
        <div className="col-xs-12">
          <F name="subtype" label="Zip Type" c={showFor('Zip')} />
        </div>
        <div className="col-xs-12">
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
