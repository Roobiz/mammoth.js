var _ = require("underscore");


exports.Result = Result;
exports.warning = warning;


function Result(value, messages) {
    this.value = value;
    this.messages = messages || [];
}

Result.prototype.map = function(func) {
    return new Result(func(this.value), this.messages);
};

Result.prototype.flatMapThen = function(func) {
    var that = this;
    return func(this.value).then(function(otherResult) {
        return new Result(otherResult.value, combineMessages([that, otherResult]));
    });
};

Result.combine = function(results) {
    var values = _.flatten(_.pluck(results, "value"));
    var messages = combineMessages(results);
    return new Result(values, messages);
};

function warning(message) {
    return {
        type: "warning",
        message: message
    };
}

function combineMessages(results) {
    var messages = [];
    _.flatten(_.pluck(results, "messages"), true).forEach(function(message) {
        if (!containsMessage(messages, message)) {
            messages.push(message);
        }
    });
    return messages;
}

function containsMessage(messages, message) {
    return _.find(messages, isSameMessage.bind(null, message)) !== undefined;
}

function isSameMessage(first, second) {
    return first.type === second.type && first.message === second.message;
}
