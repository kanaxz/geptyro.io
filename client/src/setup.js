const config = require('./config')
require('sools-core/setup')

// hedera
require('sools-modeling-hedera/setup')
require('sools-management-hedera/setup')
require('sools-core-hedera/setup')
require('sools-hedera/setup')

const global = require('./global')
const Loader = require('./components/Loader')
const Interface = require('./components/Interface')
const { buildCollections } = require('sools-modeling-client')
buildCollections(config.server.url)

Object.assign(global.components, {
  Loader,
  Interface,
})

global.menu.links.push({
  label: 'Home',
  class: 'fa-solid fa-house',
  url: '/',
})

// index
require('sools-hedera')
require('sools-management-hedera')
require('sools-modeling-hedera')


// local sources
require('./style.scss')