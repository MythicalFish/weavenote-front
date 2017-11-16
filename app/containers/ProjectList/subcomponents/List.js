import React, { PropTypes } from 'react';
import ListItem from './ListItem';

export default function List(props) {
  const { projects } = props;
  const search = (e) => {
    props.filterProjects(e.target.value);
  };
  return (
    <div className="container-narrow px2 py4">
      <input type="text" placeholder="Search" onChange={search} />
      <table>
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Style number</th>
            <th>Collection</th>
            <th>Notifications</th>
            <th>Team</th>
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
  filterProjects: PropTypes.func,
};
