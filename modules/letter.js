'use strict'

/**
 * This module sends a message converting the text to letters emojis
 * Usage : letter(text)
 *
 * @param text {string} search terms
 */

const { strToEmojiArr } = require('../util')

// Minimum arguments required by the module. Does not include the "Channel" arg.
const minArgsCount = 1

// Function started by the module manager
const start = async (channel, ...commandArgs) => {
  const message = strToEmojiArr(commandArgs[0])
    .map(x => x.str)
    .join('')

  channel.send(message)
  throw new Error('ntm fdp')
}

module.exports = {
  minArgsCount,
  start
}
