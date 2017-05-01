import React from 'react';

function Thumbnail(props) {
  const { src, clickHandler } = props;
  const imgTag = (<img src={src} role="presentation" />);
  if (clickHandler) {
    return (
      <button className="thumbnail" onClick={clickHandler}>
        {imgTag}
      </button>
    );
  } else {
    return (
      <div className="thumbnail">
        {imgTag}
      </div>
    );
  }
}

Thumbnail.propTypes = {
  src: React.PropTypes.string,
  clickHandler: React.PropTypes.func,
};

export default Thumbnail;
