import React from 'react'

//コメントの投稿に関するコンポーネント
export default class CommentForm extends React.Component{

  //値の初期化
  constructor(props) {
    super(props);
    this.state = {author: '', text: ''};
  }

　//authorのstateの変更
　//eはeventの略
  handleAuthorChange(e) {
    this.setState({author: e.target.value});
  }

  //textのstateの変更
  handleTextChange(e) {
    this.setState({text: e.target.value});
  }

  //送信ボタンが押されたときの処理
  handleSubmit(e) {
    e.preventDefault();
    //trimは文字列の両端の空白文字を取り除く
    let author = this.state.author.trim();
    let text = this.state.text.trim();
    //どちらも空ならここで処理を終える
    if (!text || !author) {
      return;
    }
    //親コンポーネントの関数であるhandleCommentSubmitの実行
    //これでサーバにデータを保存できる
    this.props.onCommentSubmit({author: author, text: text});
    //データを送ったら入力値の初期化を行う
    this.setState({author: '', text: ''});
  }

  //onChangeで入力が変更されたらhandleAuthorChangeを呼ぶ
  //handleAuthorChangeによりthis.state.authorが変更されるため，valueも変わる
  //textもauthorと同様
  render() {
    return (
      <form className="commentForm" onSubmit={(e) => this.handleSubmit(e)}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={(e) => this.handleAuthorChange(e)}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={(e) => this.handleTextChange(e)}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
};
