import React, { PropTypes } from 'react';
import Dropdown from 'components/Dropdown';
import Button from 'components/Button';

class Switcher extends React.PureComponent {
  switchOrganization = (o) => {
    this.props.switchOrganization(o.get('id'));
  };
  otherOrganizations = () => {
    const { organization, organizations } = this.props;
    const orgs = [];
    organizations.forEach((org) => {
      if (organization.get('id') !== org.get('id')) {
        orgs.push(org);
      }
    });
    return orgs;
  };
  render() {
    const { organization, organizations, startCreate } = this.props;
    return (
      <div className="input inline-block">
        <Dropdown
          value={organization}
          data={this.otherOrganizations()}
          onChange={this.switchOrganization}
          align="right"
          tail={() =>
            <Button
              small
              inline
              label="Create new organization"
              icon="Plus"
              onClick={startCreate}
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
