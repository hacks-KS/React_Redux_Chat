import React from 'react'
import Comment from './comment.jsx';

//commentBoxから全コメントが送られてくるので，コメントの表示の処理を行うコンポーネント
export default class CommentList extends React.Component{
  //mapは配列の要素すべてに同じ処理をするもの
  render() {
    let commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
};
