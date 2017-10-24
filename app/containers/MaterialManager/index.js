import React, { PropTypes } from 'react';
import Layout from 'components/Layout';
import Form from './Form';
import Comments from '../Comments';

// Actions, selectors, etc. are in List because it
// all needs to be able to work in a modal window.

const MaterialManager = (props) => (
  <Layout {...props} type="narrow" scrollable>
    <Form {...props} />
    {props.params.id && (
      <div className="box">
        <Comments
          commentable={{ type: 'Material', id: props.params.id }}
          {...props}
        />
      </div>
    )}
  </Layout>
);

MaterialManager.propTypes = {
  params: PropTypes.object,
};

export default MaterialManager;
