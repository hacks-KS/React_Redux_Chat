var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//コメントファイルの読み込み(データベースの役割)
var COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.set('port', (process.env.PORT || 3000));

app.use("/", express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//client側のソースからコメント取得のためにgetが来る
app.get('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    //エラー処理
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.setHeader('Cache-Control', 'no-cache');
    //取得したデータの送信
    res.json(JSON.parse(data));
  });
});

//client側のソースからコメント追加のためにpostが来る
app.post('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    //エラー処理
    if (err) {
      console.error(err);
      process.exit(1);
    }
    //取得したデータを格納
    var comments = JSON.parse(data);

    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.

    //新しいデータの格納
    var newComment = {
      id: Date.now(),
      author: req.body.author,
      text: req.body.text,
    };
    //格納したデータに新しいデータを追加
    comments.push(newComment);
    //ファイルに書き込む
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
      //エラー処理
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.setHeader('Cache-Control', 'no-cache');
      //取得したデータの送信
      res.json(comments);
    });
  });
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
