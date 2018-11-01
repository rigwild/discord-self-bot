'use strict'

/**
 * This module sends a link to Let Me Google That For You
 * Usage : google(query)
 *
 * @param query {string} search terms
 */

// Minimum arguments required by the module. Does not include the "Channel" arg.
const minArgsCount = 1

// Function started by the module manager
const start = async (channel, ...commandArgs) => {
  channel.send(`http://lmgtfy.com/?q=${commandArgs[0].split(' ').join('+')}`)
}

module.exports = {
  minArgsCount,
  start
}
