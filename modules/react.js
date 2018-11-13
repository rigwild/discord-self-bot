'use strict'

/**
 * This module converts a string to emojis and set them as a reaction to message
 * Usage : react(messageId, text)
 *
 * @param messageId {string} target message id
 * @param text {string} search terms
 */

const { strToEmojiArr } = require('../util')

// Minimum arguments required by the module. Does not include the "Channel" arg.
const minArgsCount = 2

// Function started by the module manager
const start = async (channel, ...commandArgs) => {
  // Get the message
  const id = commandArgs[0]
  const message = await channel.fetchMessage(id)

  // Convert the string into unicode emojis
  const emojis = strToEmojiArr(commandArgs[1])
  const reactions = emojis.map(x => x.unicode).filter(x => x && x.trim().length > 0)

  // Send reactions
  for (const aReaction of reactions) await message.react(aReaction)
}

module.exports = {
  minArgsCount,
  start
}
