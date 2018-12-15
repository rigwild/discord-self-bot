'use strict'

/**
 * This module deletes the last messages sent by the user.
 * Usage : delete(userId, amount)
 *
 * @param userId {string} the id of the users to delete messages from
 * @param amount {integer} amount of messages find (others included)
 * @param before {string} fetch messages before this id
 */

// Minimum arguments required by the module. Does not include the "Channel" arg.
const minArgsCount = 1

// Function started by the module manager
const start = async (channel, ...commandArgs) => {
  if (commandArgs[1] && isNaN(commandArgs[1]))
    throw new Error('The second parameter is not a number')

  const amount = parseInt(commandArgs[1] || 50, 10)

  // Fetch messages in the current channel
  const options = { limit: amount, before: commandArgs[2] }
  let messages = await channel.fetchMessages(options)
  messages = messages.filter(x => x.author.id === commandArgs[0] && x.deletable && !x.deleted)

  // Delete the messages with a delay
  let delay = 200
  messages.forEach(aMessage => {
    aMessage.delete(delay)
    delay += 200
  })
}

module.exports = {
  minArgsCount,
  start
}
