import React from 'react';
import Layout from 'components/Layout';
import Form from './Form';

// Actions, selectors, etc. are in List because it
// all needs to be able to work in a modal window.

const MaterialManager = (props) => (
  <Layout {...props} type="narrow" scrollable>
    <Form {...props} />
  </Layout>
);

export default MaterialManager;
