import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Layout from 'components/Layout';
import List from './subcomponents/List';
import Header from './subcomponents/Header';
import { fetchMaterials, filterMaterials } from './actions';
import Toolbar from './subcomponents/Toolbar';
import { VIEW } from './constants';

// Most actions, selectors, etc. are in List.js because it
// all needs to be able to work in a modal window.

class MaterialList extends React.PureComponent {
  static propTypes = {
    fetchMaterials: PropTypes.func,
  };
  state = { view: VIEW.list };
  Header = (props) => <Header {...this.props} {...props} />;
  changeView = (view) => {
    this.setState({ view });
  };
  render() {
    return (
      <Layout {...this.props} type="narrow" scrollable Header={this.Header}>
        <Toolbar
          changeView={this.changeView}
          currentView={this.state.view}
          fetch={this.props.fetchMaterials}
        />
        <List {...this.props} />
      </Layout>
    );
  }
}

function mapDispatch(dispatch) {
  return bindActionCreators({ filterMaterials, fetchMaterials }, dispatch);
}

export default connect(null, mapDispatch)(MaterialList);
