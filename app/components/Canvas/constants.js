export const colors = {
  green: '#42EA83',
  blue: '#51b2fe',
  gray: '#EEE',
};

export const styles = {
  dot: {
    default: {
      width: 22,
      height: 22,
      fill: colors.gray,
      strokeWidth: 3,
      stroke: '#FFF',
    },
    active: {
      fill: colors.blue,
    },
    line: {
      width: 8,
      height: 8,
      fill: colors.green,
      strokeWidth: 0,
    },
    arrow: {
      width: 8,
      height: 8,
      fill: colors.green,
      strokeWidth: 0,
    },
  },
  line: {
    default: {
      stroke: colors.green,
      fill: colors.green,
      strokeWidth: 3,
      lineCap: 'round',
    },
    active: {
      stroke: colors.blue,
      fill: colors.blue,
    },
  },
  text: {
    default: {
      fill: colors.green,
      fontSize: 16,
      padding: 5,
    },
  },
};
