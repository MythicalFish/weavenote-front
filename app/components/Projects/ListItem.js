import React from 'react';
import Dropdown from 'components/Dropdown';
import Thumbnail from './Thumbnail';
import ListItemMenu from './ListItemMenu';

class ListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  handleOnClick = (id) => {
    this.props.onClick(id);
  }
  render() {
    const p = this.props.project;
    return (
      <div className="b1 mb2 bg-white dark7 smaller2 flex justify-between x-fill">
        <button onClick={this.props.onClick} className="flex items-center b0 bg-white">
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
        </button>
        <div className="flex items-center">
          <div className="p2 smaller4 upcase">
            {p.stage.label}
          </div>
          <div className="p2 dark3 smaller4">
            collaborators
          </div>
          <div className="p2">
            <Dropdown label="..." menuItems={ListItemMenu} />
          </div>
        </div>
      </div>
    );
  }
}
const links = [1,2,3];

ListItem.propTypes = {
  project: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default ListItem;
