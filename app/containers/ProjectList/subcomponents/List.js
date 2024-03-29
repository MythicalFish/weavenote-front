import React, { PropTypes } from 'react';
import ListItem from './ListItem';
import LoadingOverlay from '../../../components/LoadingOverlay';

export default function List(props) {
  const { projects } = props;
  return (
    <div className="container-narrow px2 pb4 relative">
      {
        props.isLoading && <LoadingOverlay />
      }
      <table className="project-list-table">
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Style number</th>
            <th>Color</th>
            <th>Season/Collection</th>
            <th>Members</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {projects &&
            projects.map((project, index) => (
              <ListItem key={`project-${index}`} project={project} {...props} />
            ))}
        </tbody>
      </table>
    </div>
  );
}

List.propTypes = {
  projects: PropTypes.object,
  isLoading: PropTypes.bool,
};
