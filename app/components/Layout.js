import React, { PropTypes } from 'react';
import Header from 'components/Header';

export default function Layout(props) {
  return (
    <div>
      <Header />
      <div className="p3 md-p4">
        <div className="container-narrow">
          {props.children}
        </div>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
