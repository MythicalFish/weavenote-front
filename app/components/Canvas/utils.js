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
