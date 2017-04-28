define(['underscore', 'backbone', 'models/Comment'], function (_, Backbone, Store, Todo) {
    var CommentsCollection = Backbone.Collection.extend({
        model: Comment
    });
    return CommentsCollection;
});