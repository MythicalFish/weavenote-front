import React, { PropTypes } from 'react';
import { envVar } from 'utils/misc';
import Logo from 'images/logo.png';
import Layout from './Layout';
import Switcher from './OrgSwitch';

const Subscribe = (props) => {
  const { user, organization, organizations } = props;
  return (
    <Layout type="boxed" background="gray-lightest">
      <div className="center">
        <img src={Logo} role="presentation" />
        <h1 className="h3 mt4 mb2">{organization.get('name')}</h1>
        This organization currently has no active subscription.
        {user.getIn(['role_type', 'name']) === 'Admin' ? (
          <div className="mt3">
            <a className="btn btn-lg" href={envVar('billing')}>
              <i className="fa fa-plus" />
              Subscribe now
            </a>
          </div>
        ) : (
          <div>Contact the Organization Admin to resolve this</div>
        )}
        {organizations.size > 1 && (
          <div className="mt4">
            <div>Switch organization:</div>
            <div className="input input-sm x10 inline-block mt2">
              <Switcher {...props} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

Subscribe.propTypes = {
  user: PropTypes.object,
  organization: PropTypes.object,
  organizations: PropTypes.object,
};

export default Subscribe;
