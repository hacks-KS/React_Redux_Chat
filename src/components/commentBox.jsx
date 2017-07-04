import React from 'react'
import $      from 'jquery';
import CommentList from './commentList.jsx';
import CommentForm from './commentForm.jsx';

//親コンポーネントの作成
//export defaultで複数の関数を扱いたいときはclassで宣言すると良い
export default class CommentBox extends React.Component{
  //componentDidMountは最初に一度だけ呼ばれる(Dom配置後)
  //全コメントの読み込みに使われる関数
  componentDidMount() {
    //urlが空ならば，実行されない
    if (this.props.url.length > 0){
      this.loadCommentsFromServer();
      //setIntervalは一定時間ごとに処理を繰り返す
      setInterval( () => this.loadCommentsFromServer(), this.props.pollInterval);
    }
  }

　//componentDidMountで呼ばれるサーバからのデータ読み込みを行う関数
  loadCommentsFromServer() {
    //ajaxは非同期でサーバとのデータのやり取りを行える
    $.ajax({
      type: 'GET',
      url: this.props.url,
      dataType: 'json',
      //キャッシュを使うかどうか
      cache: false,
      //通信に成功したら動く
      success: (data) => {
        this.props.set_comments(data)
      },
      //通信に失敗したら動く
      error: (xhr, status, err) => console.error(this.props.url, status, err.toString())
    });
  }

　//新しいコメントの追加に使われる関数
  handleCommentSubmit(comment) {
    //全コメント
    let comments = this.props.comments;
    //コメントにidの付与(日にち)
    comment.id = Date.now();

　　//新しいコメント
    let newComments = comments.concat([comment]);
    this.props.set_comments(newComments)

    if (this.props.url.length > 0){
      //サーバとの通信
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: comment,
        success: (data) => {
          this.props.set_comments(data)
        },
        error: (xhr, status, err) => {
          this.setState({data: comments});
          console.error(this.props.url, status, err.toString());
        }
      });
    }
  }

　//renderが実行されるのは,外部からpropsを受け取った時
  //子コンポーネントを呼ぶ
  //子コンポーネントに先ほど定義した関数(handleCommentSubmit)を
  //onCommentSubmitとして渡す
  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.comments} />
        <CommentForm onCommentSubmit={(e) => this.handleCommentSubmit(e)} />
      </div>
    );
  }
};
