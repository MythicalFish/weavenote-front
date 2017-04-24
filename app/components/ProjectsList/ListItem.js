import React from 'react';
import { Link } from 'react-router';

class ListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const p = this.props.project;
    return (
      <Link className="block p3 mb2 bg-white dark7 smaller1 flex justify-between items-center" to="">
        <div className="flex items-center">
          <div>
            <img src="" role="presentation" />
          </div>
          <div>
            {p.name}  
          </div>
        </div>
        <div className="flex items-center">
          <div>
          </div>
          <div>

          </div>
          <div>
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
