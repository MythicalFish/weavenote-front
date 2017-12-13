import React, { PropTypes } from 'react';
import Dropdown from 'components/Dropdown';

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
    const { organization, tail } = this.props;
    const dProps = {
      value: organization,
      data: this.otherOrganizations(),
      onChange: this.switchOrganization,
      align: 'right',
    };
    if (tail) dProps.tail = tail;
    return <Dropdown {...dProps} />;
  }
}

Switcher.propTypes = {
  organization: PropTypes.object,
  organizations: PropTypes.object,
  switchOrganization: PropTypes.func,
  tail: PropTypes.func,
};

export default Switcher;
