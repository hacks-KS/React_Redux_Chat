//reducerは，現在のstateとactionから新しいstateの生成を行う
export default function Reducer(state={comments : []}, action) {
  switch(action.type){
    case "ADD_COMMENT":
      return {comments: state.comments.concat([action.comment])}
    case "SET_COMMENTS":
      return {comments: action.comments}
    default:
      return state;
  }
}
