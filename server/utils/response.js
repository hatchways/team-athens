const HTTP = require ('./httpCodes')

const Send = function (res, status, body = null) {
    return res.status (status).send (body)
}

const ErrorBody = (error, details) => ({error, details})

module.exports = {
    ErrorBody,
    Send: {
        Raw: function (res, status, body) {
            return Send (res, status, body)
        },
        Success: function (res, body) {
            return Send (res, HTTP.Success, body)
        },
        Created: function (res, body) {
            return Send (res, HTTP.Created, body)
        },
        SuccessNoContent: function (res) {
            return Send (res, HTTP.SuccessNoContent)
        },
        ServerError: function (res, errBody) {
            return Send (res, HTTP.ServerError, errBody)
        },
        BadRequest: function (res, errBody) {
            return Send (res, HTTP.BadRequest, errBody)
        },
        NotFound: function (res, errBody) {
            return Send (res, HTTP.NotFound, errBody)
        },
        Unauthorized: function (res, errBody) {
            return Send (res, HTTP.Unauthorized, errBody)
        },
        Unprocessable: function (res, errBody) {
            return Send (res, HTTP.Unprocessable, errBody)
        },
        Unauthenticated: function (res, errBody) {
            return Send (res, HTTP.Unauthenticated, errBody)
        }
    }
}
