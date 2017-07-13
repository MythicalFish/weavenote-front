import { createSelector } from 'reselect';
export const selectDomain = () => (state) => state.get('ProjectInstructions');

export const selectInstructions = () =>
  createSelector(selectDomain(), (s) => s.get('instructions'));

export const selectCurrentInstruction = () =>
  createSelector(selectDomain(), (s) => {
    const index = s.get('currentInstruction');
    return s.getIn(['instructions', index]);
  });

export const selectImage = () =>
  createSelector(selectCurrentInstruction(), (instruction) => {
    let image;
    const imageable = {
      type: 'Instruction',
      id: null,
    };
    if (instruction) {
      image = instruction.getIn(['images', 0]);
      imageable.id = instruction.get('id');
    }
    if (image) {
      return image.set('imageable', imageable).toJS();
    }
    return { imageable };
  });
