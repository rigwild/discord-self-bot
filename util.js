'use strict'

const { delay, timestamp, logger, apiCall, convertSpecialChars } = require('rigwild.js')
const fs = require('fs')

const personalUserId = process.env.personalUserId
const selfBotTrigger = process.env.selfBotTrigger

// Catch an error
const catchedError = (trueMessage, commandName, err) => {
  console.error(`\n${timestamp()} - Error from module "${commandName}". Received command : ${trueMessage}\n`, err.stack)
}

// Get all available modules name
const getModules = () => fs.readdirSync('./modules/').map(x => x.replace('.js', ''))

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
          logger(`Module "${selectedModule}" used. Received command : ${trueMessage}`)
          mod.start(message.channel, ...commandArgs).catch(e => catchedError(trueMessage, selectedModule, e))
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
  apiCall,
  convertSpecialChars
}
