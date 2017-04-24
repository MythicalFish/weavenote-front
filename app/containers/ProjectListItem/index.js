/*
 *
 * ProjectListItem
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//import makeSelectProjectListItem from './selectors';
//import Dropdown from 'components/Dropdown';
import Thumbnail from 'components/ProjectsList/Thumbnail';
import { showBasics } from '../Projects/actions';

export class ProjectListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  handleOnClick(id) {
    console.log(id);
    this.props.showBasics(id);
  }
  render() {
    const p = this.props.project;
    return (
      <button onClick={() => this.handleOnClick(p.id)} className="b1 mb2 bg-white dark7 smaller2 flex justify-between x-fill">
        <div className="flex">
          <div className="p1 pr2">
            <div className="vh-sq7 overflow-hidden b1">
              <Thumbnail project={p} />
            </div>
          </div>
          <div className="p2 flex items-center">
            <div>{p.name}</div>
          </div>
          <div className="p2 flex items-center">
            <div>#{p.identifier}</div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="p2 smaller4 upcase">
            {p.stage.label}
          </div>
          <div className="p2 dark3 smaller4">
            collaborators
          </div>
          <div className="p2">
          </div>
        </div>
      </button>
    );
  }
}

ProjectListItem.propTypes = {
  project: React.PropTypes.object.isRequired,
  showBasics: React.PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // ProjectListItem: makeSelectProjectListItem(),
});

function mapDispatchToProps(dispatch) {
  return {
    showBasics: (id) => dispatch(showBasics(id)), // <--- Don't forget to pass vars here!
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListItem);
