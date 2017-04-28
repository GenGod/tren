define(['underscore', 'backbone', 'models/Comment'], function (_, Backbone, Comment) {
    var CommentsCollection = Backbone.Collection.extend({
        model: Comment
    });
    return CommentsCollection;
});