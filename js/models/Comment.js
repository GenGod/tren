/**
 * Created by Богдан on 28.04.2017.
 */
define(['underscore', 'backbone'], function (_, Backbone) {
    var Comment = Backbone.Model.extend({
        default: {
            userName: "Аноним",
            theme: "Без темы",
            comment: ""
        }
    });
    return Comment;
});