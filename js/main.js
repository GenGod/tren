require.config({
    baseUrl: '../',
    paths: {
        jquery: 'libs/jquery/jquery-3.1.1',
        bootstrap: 'libs/bootstrap/bootstrap.min',
        underscore: 'libs/underscore/underscore.min',
        backbone: 'libs/backbone/backbone-min',
        text: 'libs/require/text'
    }
});

require(['views/Comments'], function (AppView) {
    collection = new CommentsCollection();
    $.ajax({
        type: "POST",
        url: "/",
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            for (var a in data) {
                var dateStamp = getDateStamp(+data[a].time);
                var dateStamp = moment(+data.time).fromNow();
                //console.log(dateStamp);
                var i = new Comment({
                    userName: data[a].userName,
                    theme: data[a].theme,
                    comment: data[a].comment,
                    time: dateStamp
                });
                //console.log(i);
                collection.add(i);
            }
        }
    });
    var app_view = new AppView({collection: collection});
    app_view.render();
});