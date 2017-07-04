//actionの定義

//新しいコメントの追加
export function add_comment(comment) {
  return {
    type: "ADD_COMMENT",
    comment: comment
  };
}

//全コメントの読み込み
export function set_comments(comments) {
  return {
    type: "SET_COMMENTS",
    comments: comments
  };
}
