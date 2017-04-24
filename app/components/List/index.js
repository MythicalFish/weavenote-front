import React from 'react';

function List(props) {
  let content = (<li></li>);

  if (props.list) {
    content = props.list.map((item, index) => (
      <li key={`item-${index}`}>
        {item.name}
      </li>
    ));
  }

  return (
    <div>
      <ul>
        {content}
      </ul>
    </div>
  );
}

List.propTypes = {
  list: React.PropTypes.array,
};

export default List;
