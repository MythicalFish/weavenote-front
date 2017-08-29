import React from 'react';
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
    return (
      <button {...bProps}>
        {props.children}
      </button>
    );
  }
};

Button.propTypes = {
  icon: React.PropTypes.string,
  inlineIcon: React.PropTypes.string,
  label: React.PropTypes.string,
};

ButtonWrapper.propTypes = {
  className: React.PropTypes.string,
  type: React.PropTypes.string,
  to: React.PropTypes.string,
  small: React.PropTypes.bool,
  download: React.PropTypes.string,
  newTab: React.PropTypes.string,
  shy: React.PropTypes.bool,
  large: React.PropTypes.bool,
  secondary: React.PropTypes.bool,
  inline: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  children: React.PropTypes.node,
};
