'use strict'

/**
 * This module deletes the last messages sent by the user.
 * Usage : delete(userId, amount)
 *
 * @param amount {integer} amount of messages find (others included)
 * @param userId {string} the id of the users to delete messages from
 * @param before {string} fetch messages before this id
 */

// Minimum arguments required by the module. Does not include the "Channel" arg.
const minArgsCount = 1

// Function started by the module manager
const start = async (channel, ...commandArgs) => {
  if (commandArgs[0] && isNaN(commandArgs[0]))
    throw new Error('The first parameter is not a number')

  const amount = parseInt(commandArgs[0] || 50, 10)

  const userId = commandArgs[1] || process.env.personalUserId
  if (!userId) throw new Error('No user id was specified')

  // Fetch messages in the current channel
  const options = { limit: amount, before: commandArgs[2] }
  let messages = await channel.fetchMessages(options)
  messages = messages.filter(x => x.author.id === userId && x.deletable && !x.deleted)

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
