import React from 'react';
import { Link } from 'react-router';
import Thumbnail from './Thumbnail';

class ListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const p = this.props.project;
    return (
      <Link className="block b1 mb2 bg-white dark7 smaller2 flex justify-between" to="">
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
            <button className="b0 bg-white dark4 bigger5 lh0">
              ...
            </button>
          </div>
        </div>
      </Link>
    );
  }
}

ListItem.propTypes = {
  project: React.PropTypes.object.isRequired,
};

export default ListItem;
