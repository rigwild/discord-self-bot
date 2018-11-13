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
const start = (channel, ...commandArgs) => {
  const message = strToEmojiArr(commandArgs[0])
    .map(x => x.str)
    .join('')

  channel.send(message)
}

module.exports = {
  minArgsCount,
  start
}
