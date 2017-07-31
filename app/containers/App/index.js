import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Notification from 'containers/Notification';
import Gateway from './subcomponents/Gateway';
import ModalImage from './subcomponents/ModalImage';
import Focus from './subcomponents/Focus';
import * as selectors from './selectors';
import { closeDropdown } from './actions';

class App extends React.PureComponent {
  componentDidMount = () => {
    document.body.addEventListener('click', () => {
      if (this.props.dropdownID) {
        // TODO
        // this.props.closeDropdown();
      }
    });
  };
  render() {
    const { location, modalImage } = this.props;
    return (
      <Gateway {...{ location }}>
        <Focus {...this.props}>
          {this.props.children}
        </Focus>
        <Notification />
        <ModalImage image={modalImage} />
      </Gateway>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  modalImage: PropTypes.object,
  dropdownID: PropTypes.string,
  closeDropdown: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({ closeDropdown }, dispatch);
}

const mapState = createStructuredSelector({
  dropdownID: selectors.selectDropdownID(),
  modalID: selectors.selectModalID(),
  modalImage: selectors.selectModalImage(),
  focus: selectors.selectFocus(),
});

export default connect(mapState, mapDispatch)(App);
