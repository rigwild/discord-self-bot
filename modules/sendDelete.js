'use strict'

/**
 * This module sends messages then deletes them after a delay.
 * Discord has a limit of 10 messages per 5 seconds so don't abuse.
 * Usage : sendDelete(delayBeforeDelete, ...messages)
 *
 * @param delayBeforeDelete {integer} delay in ms to wait before deleting the messages
 * @param messages {string} messages to send
 */

const { delay } = require('../util')

// Minimum arguments required by the module. Does not include the "Channel" arg.
const minArgsCount = 2

// Function started by the module manager
const start = async (channel, ...commandArgs) => {
  if (isNaN(commandArgs[0])) throw new Error('The first parameter is not a number')

  const delayBeforeDelete = parseInt(commandArgs[0], 10)
  commandArgs.shift()

  let sentMessages = []

  // Send the messages
  for (const messageContent of commandArgs) {
    const message = await channel.send(messageContent)
    sentMessages.push(message)
  }
  // Wait some time before deleting
  await delay(delayBeforeDelete)

  // Start deleting from the last sent messages
  sentMessages = sentMessages.reverse()

  // Delete the messages
  for (const message of sentMessages) await message.delete()
}

module.exports = {
  minArgsCount,
  start
}
