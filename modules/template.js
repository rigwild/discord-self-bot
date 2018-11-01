'use strict'

/**
 * This module is used to serve as an example.
 * Usage : template(1, 2, 3, ...other)
 *
 * @param one {integer} the first parameter
 * @param two {string} the second parameter
 * @param three {integer} the third parameter
 * @param other {integer} all other parameters to the last one
 */

const { logger, delay } = require('../util')

// Minimum arguments required by the module. Does not include the "Channel" arg.
const minArgsCount = 3

// Function started by the module manager
const start = async (channel, ...commandArgs) => {
  console.log(commandArgs)
}

module.exports = {
  minArgsCount,
  start
}
