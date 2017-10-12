import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Icon from 'components/Icon';
import InlineIcon from 'components/InlineIcon';

export default function Button(props) {
  return (
    <ButtonWrapper {...props}>
      {props.inlineIcon && <InlineIcon name={props.inlineIcon} />}
      {props.icon && <Icon name={props.icon} size={18} />}
      {props.label || null}
    </ButtonWrapper>
  );
}

const ButtonWrapper = (props) => {
  let className = props.className || 'btn';
  if (props.small) className += ' btn-sm';
  if (props.large) className += ' btn-lg';
  if (props.inline) className += ' btn-inline';
  if (props.shy) className += ' btn-shy';
  if (props.secondary) className += ' btn-secondary';
  const bProps = { className };

  const { download, newTab } = props;
  const realLink = download || newTab;
  if (download) bProps.download = true;
  if (newTab) bProps.target = '_blank';
  if (props.to) {
    return (
      <Link {...bProps} to={props.to}>
        {props.children}
      </Link>
    );
  } else if (realLink) {
    return (
      <a {...bProps} href={realLink}>
        {props.children}
      </a>
    );
  } else {
    bProps.disabled = !!props.disabled;
    bProps.onClick = props.onClick;
    bProps.type = props.type || 'button';
    return <button {...bProps}>{props.children}</button>;
  }
};

Button.propTypes = {
  icon: PropTypes.string,
  inlineIcon: PropTypes.string,
  label: PropTypes.string,
};

ButtonWrapper.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  to: PropTypes.string,
  small: PropTypes.bool,
  download: PropTypes.string,
  newTab: PropTypes.string,
  shy: PropTypes.bool,
  large: PropTypes.bool,
  secondary: PropTypes.bool,
  inline: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};
