const Service = require ('../services/product')
const Response = require ('../utils/response')

module.exports = {
    get: function (req, res) {
        Service.get ()
            .then (data => {
                return Response.Send.Success (res, data)
            }).catch (err => {
                return Response.Send.ServerError (res, err)
            })
        },
    getAll: function (req, res) {
        Service.getAll ()
            .then (data => {
                return Response.Send.Success (res, data)
            }).catch (err => {
                return Response.Send.ServerError (res, err)
            })
        },
    create: function (req, res) {
        Service.create ()
            .then (data => {
                return Response.Send.Success (res, data)
            }).catch (err => {
                return Response.Send.ServerError (res, err)
            })
        },
    delete: function (req, res) {
        Service.delete ()
            .then (data => {
                return Response.Send.Success (res, data)
            }).catch (err => {
                return Response.Send.ServerError (res, err)
            })
        },
    update: function (req, res) {
        Service.update ()
            .then (data => {
                return Response.Send.Success (res, data)
            }).catch (err => {
                return Response.Send.ServerError (res, err)
            })
        },
}