import React from 'react';

function List(props) {
  let content = (<li></li>);

  if (props.items) {
    content = props.items.map((item, index) => (
      <li key={`item-${index}`}>{item.title}</li>
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
  items: React.PropTypes.array,
};

export default List;
