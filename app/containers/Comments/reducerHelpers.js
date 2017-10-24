import { fromJS } from 'immutable';
import { idToIndex } from 'utils/reducerHelpers';

export function commentID(payload) {
  if (payload && payload.comment) return payload.comment.get('id');
  return payload;
}

export function annotationComment(payload) {
  if (payload.getIn(['annotatable', 'type']) === 'Comment') {
    return payload.getIn(['annotatable', 'id']);
  }
  return null;
}

export function setImages(state, { response }) {
  const { type, id } = response.imageable;
  if (type !== 'Comment') return state;
  let keyPath;
  let commentable;
  state.get('data').forEach((list, c) => {
    const kp = commentImageKeyPath(list, id);
    if (kp) {
      keyPath = kp;
      commentable = c;
    }
  });
  if (keyPath) {
    return state.setIn(
      ['data', commentable].concat(keyPath),
      fromJS(response.images)
    );
  }
  return state;
}

function commentImageKeyPath(comments, id) {
  const index = idToIndex(id, comments);
  if (index !== undefined) {
    return [index, 'images'];
  }
  return commentReplyImageKeyPath(comments, id);
}

function commentReplyImageKeyPath(comments, id) {
  let kp;
  comments.forEach((comment, commentIndex) => {
    const index = idToIndex(id, comment.get('replies'));
    if (index !== undefined) {
      kp = [commentIndex, 'replies', index, 'images'];
    }
  });
  return kp;
}
