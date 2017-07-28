import { fromJS } from 'immutable';
import { idToIndex } from 'utils/reducerHelpers';

export function setImages(state, { response }) {
  const { type, id } = response.imageable;
  if (type !== 'Comment') return state;
  const keyPath = commentImageKeyPath(state, id);
  if (keyPath) return state.setIn(keyPath, fromJS(response.images));
  return state;
}

function commentImageKeyPath(state, id) {
  const comments = state.get('comments');
  const index = idToIndex(id, comments);
  if (index !== undefined) {
    return ['comments', index, 'images'];
  }
  return commentReplyImageKeyPath(comments, id);
}

function commentReplyImageKeyPath(comments, id) {
  let kp;
  comments.forEach((comment, commentIndex) => {
    const index = idToIndex(id, comment.get('replies'));
    if (index !== undefined) {
      kp = ['comments', commentIndex, 'replies', index, 'images'];
    }
  });
  return kp;
}
