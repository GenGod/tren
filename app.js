var express = require('express');
var app = express();
app.set('view engine', 'jade');
app.use(express.static(__dirname));
var jsonParser = require('body-parser').json();

app.get('/', function (request, response) {
    response.render('index', {
        title: "Комментарии"
    });
});

app.post('/', function (request, response) {
    var mongo = require('mongodb').MongoClient;
    var temp = mongo.connect("mongodb://127.0.0.1:27017/commentsdb", function (err, db) {
        if (err) return [];
        console.log("Connected!");
        var t = db.collection("comments").find().toArray(function (err, result) {
            if (err) {
                console.log("Can't collection 'comments'");
                return [];
            }
            var arr = [];
            for (var i in result) {
                arr.push({
                    userName: result[i].userName,
                    theme: result[i].theme,
                    comment: result[i].comment,
                    time: result[i].time
                });
            }
            db.close();
            return arr;
        });
        return t;
    });
    response.end(temp.toJSON());
});

app.post('/index', jsonParser, function (request, response) {
    if (!request.body)
        return response.sendStatus(400);
    //Открытие соединения с БД для вставки данных из формы
    var mongo = require('mongodb').MongoClient;
    var mongoURL = "mongodb://127.0.0.1:27017/commentsdb";//Адрес БД
    mongo.connect(mongoURL, function (err, db) {
        var comment = {
            userName: request.body.userName,
            theme: request.body.theme,
            comment: request.body.comment,
            time: +request.body.time
        };
        var conform = require('conform');
        var isComrom = conform.validate(comment, {
            properties: {
                userName: {
                    type: "string",
                    required: true
                },
                theme: {
                    type: "string",
                    required: true
                },
                comment: {
                    type: "any",
                    required: true
                },
                time: {
                    type: "number",
                    required: true
                }
            }
        });
        if (isComrom.valid) {
            db.collection("comments").insertOne(comment, function (err, result) {
                if (err)
                    return console.log(err);
                db.close();
            });
        }
        else {
            console.dir(isComrom.errors);
        }
    });
    response.end(JSON.stringify({
        userName: request.body.userName,
        theme: request.body.theme,
        comment: request.body.comment,
        time: request.body.time
    }));
});

app.listen(4000);

/**
 * Created by Богдан on 28.04.2017.
 */
