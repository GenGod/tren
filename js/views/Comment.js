define(['backbone', 'jquery'], function(Backbone, $) {
    var CommentView = Backbone.View.extend({
        el: '#comments',
        initialize: function() {
            this.render();
        },

        events: {
            "click .btn.btn-success": "send"
        },

        template: _.template('<div class=row>' +
            '<h4 class="h4"><%= userName %> <i class="small">   <%= time %></i></h4>' +
            '<h5 class="h5"><b><%= theme %></b></h5><br/>' +
            '<p class="text-justify"><%= comment %></p><hr>' +
            '</div>'),

        render: function() {
            console.log(this.model.toJSON());
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        send: function() {
            //Парсинг полей формы
            var registerForm = document.forms["commentsForm"];
            var userName = registerForm.elements["userName"].value;
            var theme = registerForm.elements["theme"].value;
            var comment = registerForm.elements["comment"].value;
            var time = Date.now().toString();

            //AJAX-запрос, передающий данные формы на сервер
            $.ajax({
                type: "POST",
                url: "/index",
                data: JSON.stringify({userName: userName, theme: theme, comment: comment, time: time}),
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    var date = moment(+data.time).fromNow();
                    var dateStamp = moment(new Date(+data.time)).locale('ru').fromNow();
                    console.log(date);
                    var text = '<div class="row">' +
                        '<h4 class="h4">' + data.userName + '<i class="small">   ' + dateStamp + '</i></h4>' +
                        '<h5 class="h5"><b>' + data.theme + '</b></h5><br/>' +
                        '<p class="text-justify">' + data.comment +' </p>' +
                        '<hr>' +
                        '</div>';
                    $("#comments").prepend(text);
                }
            });
        }
    });
    return CommentView;
});