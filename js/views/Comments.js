define(['underscore', 'backbone'], function (_, Backbone) {
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