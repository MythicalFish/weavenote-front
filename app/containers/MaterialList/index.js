import React from 'react';
import Layout from 'components/Layout';
import List from './subcomponents/List';

// Actions, selectors, etc. are in List because it
// all needs to be able to work in a modal window.

const MaterialList = (props) => (
  <Layout {...props} type="narrow">
    <List {...props} showToolbar />
  </Layout>
);

export default MaterialList;
