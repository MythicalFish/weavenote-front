import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fileProject } from 'containers/ProjectList/actions';
import Dropdown from 'components/Dropdown';
import Thumbnail from './Thumbnail';

class ListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { project, dispatch } = this.props;
    const url = `/projects/${project.id}`;
    return (
      <div className="b1 mb2 bg-white dark7 flex justify-between x-fill">
        <Link to={url} className="flex items-center b0 bg-white">
          <div className="p1 pr2">
            <div className="vh-sq7 overflow-hidden b1">
              <Thumbnail project={project} />
            </div>
          </div>
          <div className="p2">
            <div>{project.name}</div>
          </div>
          <div className="p2">
            <div>#{project.identifier}</div>
          </div>
        </Link>
        <div className="flex items-center">
          <div className="p2 smaller1 upcase">
            {project.stage.label}
          </div>
          <div className="p2 dark3 smaller1">
            collaborators
          </div>
          <div className="p2">
            <Dropdown label="...">
              <Link to={url}>Manage</Link>
              {!project.archived && <button onClick={() => { dispatch(fileProject({ id: project.id, archived: true })); }}>Archive</button>}
              {project.archived && <button onClick={() => { dispatch(fileProject({ id: project.id, archived: false })); }}>Restore</button>}
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}

ListItem.propTypes = {
  project: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func,
};


export function mapDispatch(dispatch) {
  return {
    dispatch,
  };
}

const mapState = createStructuredSelector({

});

export default connect(mapState, mapDispatch)(ListItem);
