import React, { PropTypes } from 'react';
import DefaultHeader from 'components/Header';
import Sidebar from 'components/Sidebar';

export default function Layout(props) {
  const { Header, type } = props;
  const InnerContainer = ({ children }) => {
    if (type === 'narrow') {
      return (
        <div className="flex-auto p3 md-p4">
          <div className="container-narrowest">
            <div className="box b1 py4">{children}</div>
          </div>
        </div>
      );
    }
    return <div className="flex-auto">{children}</div>;
  };
  return (
    <div id="app-container" className="flex flex-column">
      {Header ? <Header /> : <DefaultHeader />}
      <div className="flex-auto flex">
        <Sidebar {...props} />
        <InnerContainer>{props.children}</InnerContainer>
      </div>
    </div>
  );
}

Layout.propTypes = {
  Header: PropTypes.func,
  children: PropTypes.node,
  type: PropTypes.string,
};
