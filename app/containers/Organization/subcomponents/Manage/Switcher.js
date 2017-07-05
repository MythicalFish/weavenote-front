import React, { PropTypes } from 'react';
import SelectInput from 'components/SelectInput';
import Button from 'components/Button';

class Switcher extends React.PureComponent {
  switchOrganization = (o) => {
    this.props.switchOrganization(o.get('id'));
  };
  render() {
    const { organization, organizations, startCreate } = this.props;
    return (
      <div className="input inline-block">
        <SelectInput
          value={organization}
          data={organizations}
          onChange={this.switchOrganization}
          align="right"
          tail={() =>
            <Button
              small
              inline
              label="Create new organization"
              icon="plus"
              onclick={startCreate}
            />}
        />
      </div>
    );
  }
}

Switcher.propTypes = {
  organization: PropTypes.object,
  organizations: PropTypes.object,
  switchOrganization: PropTypes.func,
  startCreate: PropTypes.func,
};

export default Switcher;
