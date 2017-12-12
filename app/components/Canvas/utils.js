import { toPath } from 'svg-points';
import { colors, lineThemes, dotThemes } from './constants';

export const lineTheme = (props) => {
  const { type } = props;
  let theme = lineThemes.default;
  if (type && lineThemes[type]) theme = lineThemes[type];
  if (props.isActive) theme = lineThemes.active;
  return theme;
};

export const dotTheme = (props) => {
  const { type } = props;
  let theme = dotThemes.default;
  if (type && dotThemes[type]) theme = dotThemes[type];
  if (props.isActive) theme.fill = colors.blue;
  return theme;
};

export const pointsToPath = (points) =>
  toPath({
    type: 'line',
    x1: points[0],
    y1: points[1],
    x2: points[2],
    y2: points[3],
  });
