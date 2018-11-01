'use strict'

const fs = require('fs')
const moment = require('moment')
const personalUserId = process.env.personalUserId
const selfBotTrigger = process.env.selfBotTrigger

// Wait some time
const delay = ms => new Promise(res => setTimeout(res, ms))

// Get current time
const timestamp = () => moment().format('YYYY-MM-DD HH:mm:ss')

// Log something to console
const logger = (...x) => console.log(timestamp() + ' - ', ...x)

// Catch an error
const catchedError = (commandName, err) => {
  console.error(`${timestamp()} Command error "${commandName}" :\n`, err.stack)
}

// Get all available modules name
const getModules = () => fs.readdirSync('./modules/').map(x => x.replace('.js', '').toLowerCase())

// Get command args
const getCommandArgs = messageContent => {
  let res = /^.*?\((.*?)\)[\s\S]*$/.exec(messageContent)
  res = res && res.length > 0 ? res[1] : null
  return res ? res.split(',').map(x => x.trim()) : []
}

// Check if selfbot call and if is a valid module
const searchCommand = message => {
  if (message.author.id === personalUserId && message.content.startsWith(selfBotTrigger)) {
    message.delete()

    // Remove file extension
    const trueMessage = message.content.slice(selfBotTrigger.length).trim()

    if (trueMessage.length === 0) return

    // Find which module was selected
    const modules = getModules()
    const selectedModule = modules.find(x => trueMessage.toLowerCase().startsWith(x.toLowerCase()))

    if (selectedModule) {
      // The required module was found, we can start it
      const commandArgs = getCommandArgs(trueMessage)

      try {
        const mod = require(`./modules/${selectedModule}`)

        if (commandArgs.length >= mod.minArgsCount) {
          // Everything is fine, module starts
          mod.start(...commandArgs)
        }
        else {
          // Not enough parameter to start the module
          logger(`Module "${selectedModule}" requires ${mod.minArgsCount} parameter(s). Received command : ${trueMessage}`)
        }
      }
      catch (e) {
        logger(e)
      }
    } // Required module not found
    else logger(`Requested module not found. Received command : ${trueMessage}`)
  }
}

module.exports = {
  delay,
  timestamp,
  logger,
  searchCommand,
  catchedError
}
