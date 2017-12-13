import { styles } from './constants';

const buildStyle = (props) => {
  const { type, isActive, shape } = props;
  let style = { ...styles[shape].default };
  if (type && styles[shape][type]) style = { ...styles[shape][type] };
  if (isActive) {
    style = Object.assign(style, styles[shape].active);
  }
  return style;
};

export const lineStyle = (props) => buildStyle({ shape: 'line', ...props });

export const dotStyle = (props) => buildStyle({ shape: 'dot', ...props });

export const textStyle = (props) => buildStyle({ shape: 'text', ...props });
