import React from 'react';
import { Link } from 'react-router';

export default function ListItem(props) {
  const { material } = props;
  const url = `/materials/${material.id}`;
  return (
    <div className="b1 mb2 bg-white dark7 flex justify-between x-fill">
      <Link to={url} className="flex items-center b0 bg-white">
        <div className="p1 pr2">
          {material.name}
        </div>
      </Link>
    </div>
  );
}

ListItem.propTypes = {
  material: React.PropTypes.object.isRequired,
};
