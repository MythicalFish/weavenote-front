import React, { PropTypes } from 'react';
import DefaultHeader from 'components/Header';
import Sidebar from 'components/Sidebar';
import ScrollArea from 'components/ScrollArea';
import Notification from 'containers/Notification';
import ModalImage from 'containers/ImageForm/ModalImage';

const ScrollContainer = ({ scrollable, children }) => {
  const sProps = { children };
  return (
    <div className="flex-auto">
      {scrollable ? <ScrollArea {...sProps} /> : children}
    </div>
  );
};

ScrollContainer.propTypes = {
  children: PropTypes.node,
  scrollable: PropTypes.bool,
};

const InnerLayout = (props) => {
  const { type, children, scrollable } = props;
  switch (type) {
    case 'boxed':
      return (
        <ScrollContainer scrollable={scrollable}>
          <div className="p4">
            <div className="container-narrowest">
              <div className="box b1 py4 bg-white">{children}</div>
            </div>
          </div>
        </ScrollContainer>
      );
    case 'narrow':
      return (
        <ScrollContainer scrollable={scrollable}>
          <div className="p4">
            <div className="container-narrow">{children}</div>
          </div>
        </ScrollContainer>
      );
    default:
      return <ScrollContainer {...props} />;
  }
};

InnerLayout.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  scrollable: PropTypes.bool,
};

const Layout = (props) => {
  const { Header, modalImage, background } = props;
  const sidebarOffset = {
    style: { marginLeft: '194px' },
  };
  let containerClass = 'flex flex-column';
  if (background) containerClass += ` bg-${background}`;
  return (
    <div>
      <div id="app-container" className={containerClass}>
        {Header ? (
          <Header {...sidebarOffset} />
        ) : (
          <DefaultHeader {...sidebarOffset} />
        )}
        <div id="app-content" className="flex-auto flex">
          <Sidebar {...props} />
          <InnerLayout {...props} />
        </div>
      </div>
      <Notification />
      <ModalImage image={modalImage} />
    </div>
  );
};

Layout.propTypes = {
  Header: PropTypes.func,
  modalImage: PropTypes.object,
};

export default Layout;
