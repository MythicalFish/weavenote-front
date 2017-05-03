import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { archiveProject } from 'containers/ProjectList/actions';
import Dropdown from 'components/Dropdown';
import Thumbnail from './Thumbnail';

class ListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const p = this.props.project;
    return (
      <div className="b1 mb2 bg-white dark7 flex justify-between x-fill">
        <Link to={`/projects/${p.id}`} className="flex items-center b0 bg-white">
          <div className="p1 pr2">
            <div className="vh-sq7 overflow-hidden b1">
              <Thumbnail project={p} />
            </div>
          </div>
          <div className="p2">
            <div>{p.name}</div>
          </div>
          <div className="p2">
            <div>#{p.identifier}</div>
          </div>
        </Link>
        <div className="flex items-center">
          <div className="p2 smaller1 upcase">
            {p.stage.label}
          </div>
          <div className="p2 dark3 smaller1">
            collaborators
          </div>
          <div className="p2">
            <Dropdown label="...">
              <button onClick={() => { this.props.fetchProject(p.id); }}>Manage</button>
              <button onClick={() => { this.props.archiveProject(p.id); }}>Archive</button>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}

ListItem.propTypes = {
  project: React.PropTypes.object.isRequired,
  fetchProject: React.PropTypes.func,
  archiveProject: React.PropTypes.func,
};


export function mapDispatch(dispatch) {
  return {
    fetchProject: (projectID) => dispatch(fetchProject(projectID)),
    archiveProject: (projectID) => dispatch(archiveProject(projectID)),
  };
}

const mapState = createStructuredSelector({

});

export default connect(mapState, mapDispatch)(ListItem);
