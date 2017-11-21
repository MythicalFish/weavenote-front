import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Layout from 'components/Layout';
import List from './subcomponents/List';
import Header from './subcomponents/Header';
import { filterMaterials } from './actions';

// Most actions, selectors, etc. are in List.js because it
// all needs to be able to work in a modal window.

class MaterialList extends React.PureComponent {
  Header = (props) => <Header {...this.props} {...props} />;
  render() {
    return (
      <Layout {...this.props} type="narrow" scrollable Header={this.Header}>
        <List {...this.props} inModal={false} />
      </Layout>
    );
  }
}

function mapDispatch(dispatch) {
  return bindActionCreators({ filterMaterials }, dispatch);
}

export default connect(null, mapDispatch)(MaterialList);
