import { fromJS } from 'immutable';
import { idToIndex } from 'utils/reducerHelpers';

export function setImages(state, { response }, imageCount = null) {
  const { type, id } = response.imageable;
  if (type !== 'Project' && type !== 'Comment') return state;
  let keyPath = ['project', 'images'];
  if (type === 'Comment') {
    keyPath = commentImageKeyPath(state, id);
  }
  let newState = state;
  if (keyPath) newState = newState.setIn(keyPath, fromJS(response.images));
  if (type === 'Project' && imageCount) {
    newState = newState.set('currentImage', imageCount);
  }
  return newState;
}

function commentImageKeyPath(state, id) {
  const comments = state.getIn(['project', 'comments']);
  const index = idToIndex(id, comments);
  if (index !== undefined) {
    return ['project', 'comments', index, 'images'];
  }
  return commentReplyImageKeyPath(comments, id);
}

function commentReplyImageKeyPath(comments, id) {
  let kp;
  comments.forEach((comment, commentIndex) => {
    const index = idToIndex(id, comment.get('replies'));
    if (index !== undefined) {
      kp = ['project', 'comments', commentIndex, 'replies', index, 'images'];
    }
  });
  return kp;
}
