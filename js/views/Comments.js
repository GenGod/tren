/**
 * Created by Богдан on 28.04.2017.
 */
define(['jquery', 'underscore', 'backbone', 'text!templates/todos.html', 'common'], function ($, _, backbone, todosTemplate, Common) {
    var CommentsView = Backbone.View.extend({
        render: function () {
            this.collection.each(function (comment) {
                var commentView = new CommentView({model: comment});
                console.log(model);
                this.$el.append(commentView.render().el);
            }, this);

            return this;
        }
    });
    return CommentsView;
});