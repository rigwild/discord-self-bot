'use strict'

const { logger, catchedError, delay } = require('../util')

const minArgsCount = 3

const start = (...commandArgs) => {
  console.log(commandArgs)
}

module.exports = {
  minArgsCount,
  start
}
