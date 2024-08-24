const config = require('./config')

// hedera
require('sools-modeling-hedera/setup')
require('sools-auth-hedera/setup')
require('sools-core-hedera/setup')
require('sools-hedera/setup')

const global = require('./global')
const Loader = require('./components/Loader')
const Interface = require('./components/Interface')
const { buildCollections } = require('sools-modeling-client')
buildCollections(config.api.url)

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
require('sools-auth-hedera')
require('sools-modeling-hedera')


// local sources
require('./style.scss')