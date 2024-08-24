const AuthService = require('sools-auth-hedera/AuthService')
const NotificationsService = require('sools-hedera/notifications/NotificationsService')
const global = require('sools-hedera/global')
const Navigator = require('sools-hedera/routing/Navigator')
const MenuService = require('sools-core-hedera/MenuService')
const config = require('./config')

Object.assign(global, {
  auth: new AuthService(config.api.url),
  notifications: new NotificationsService(),
  navigator: new Navigator(),
  menu: new MenuService(),
})

module.exports = global
