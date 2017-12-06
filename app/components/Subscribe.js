import React, { PropTypes } from 'react';
import { envVar } from 'utils/misc';
import Layout from 'components/Layout';
import Logo from 'images/logo.png';

const Subscribe = ({ user }) => (
  <Layout type="boxed" background="gray-lightest">
    <div className="center">
      <img src={Logo} role="presentation" />
      <p>This organization currently has no active subscription.</p>
      {user.get('role') === 'Admin' ? (
        <a className="btn" href={envVar('billing')}>
          Subscribe now
        </a>
      ) : (
        <div>Contact the Organization Admin to resolve this</div>
      )}
    </div>
  </Layout>
);

Subscribe.propTypes = {
  user: PropTypes.object,
};

export default Subscribe;
