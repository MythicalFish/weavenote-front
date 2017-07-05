import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Dropdown from 'components/Dropdown';
import { switchOrganization } from '../../actions';

class Switcher extends React.PureComponent {
  switchOrganization = (o) => () => {
    this.props.switchOrganization(o.id);
  };
  render() {
    const { organization, organizations } = this.props;
    return (
      <div>
        <Dropdown label={organization.name} className="right-align">
          {organizations.map((o, i) =>
            <button type="button" onClick={this.switchOrganization(o)} key={o}>
              {o.name}
            </button>
          )}
        </Dropdown>
      </div>
    );
  }
}

Switcher.propTypes = {
  organization: PropTypes.object,
  organizations: PropTypes.object,
  switchOrganization: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({ switchOrganization }, dispatch);
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(Switcher);
