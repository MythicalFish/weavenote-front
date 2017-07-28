import { fromJS } from 'immutable';
import { CREATE_IMAGE_SUCCESS } from 'containers/ImageUploader/constants';
import { DELETE_IMAGE_SUCCESS } from 'containers/ImageThumbnails/constants';
import { UPDATE_IMAGE_SUCCESS } from 'containers/ImageForm/constants';
import { FETCH_PROJECT_SUCCESS } from 'containers/ProjectManager/constants';
import { idToIndex } from 'utils/reducerHelpers';
import * as types from './constants';

const initialState = fromJS({
  newAnnotation: {
    maxAnchors: 1,
    annotatable: null,
    anchors: [],
    type: null,
  },
  images: [],
});

function ProjectImagesReducer(state = initialState, action) {
  const { payload, response } = action;

  const annotation = state.get('newAnnotation');
  const maxAnchors = annotation.get('maxAnchors');
  const anchors = annotation.get('anchors');

  const setAnchor = (i) => state.setIn(['newAnnotation', 'anchors', i], payload);

  const setImages = () => {
    const { type } = response.imageable;
    if (type && type !== 'Project') return state;
    return state.set('images', fromJS(response.images));
  };

  switch (action.type) {
    case FETCH_PROJECT_SUCCESS:
      return state.set('images', fromJS(response.images));

    case CREATE_IMAGE_SUCCESS:
      return setImages();

    case DELETE_IMAGE_SUCCESS:
      return setImages();

    case UPDATE_IMAGE_SUCCESS:
      return setImages();

    case types.CANCEL_ANNOTATION:
      return state.set('newAnnotation', initialState.get('newAnnotation'));

    case types.ADD_ANNOTATION:
      return state
        .setIn(['newAnnotation', 'maxAnchors'], payload.maxAnchors)
        .setIn(['newAnnotation', 'annotatable'], payload.annotatable)
        .setIn(['newAnnotation', 'type'], payload.type);

    case types.SET_ANNOTATION:
      if (maxAnchors === 1) {
        return setAnchor(0);
      } else if (maxAnchors === anchors.size) {
        return setAnchor(0).deleteIn(['newAnnotation', 'anchors', 1]);
      }
      return setAnchor(anchors.size);

    case types.CREATE_ANNOTATION_SUCCESS:
      const index = idToIndex(response.id, state.get('images'));
      if (index !== undefined) {
        return state.setIn(['images', index], fromJS(response));
      }
      return state;

    default:
      return state;
  }
}

export default ProjectImagesReducer;
