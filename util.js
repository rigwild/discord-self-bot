'use strict'

const { delay, timestamp, logger, apiCall, convertSpecialChars } = require('rigwild.js')
const fs = require('fs')

const personalUserId = process.env.personalUserId
const selfBotTrigger = process.env.selfBotTrigger

// Catch an error
const catchedError = (trueMessage, commandName, err) => {
  console.error(
    `\n${timestamp()} - Error from module "${commandName}". Received command : ${trueMessage}\n`,
    err.stack
  )
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
          mod
            .start(message.channel, ...commandArgs)
            .catch(e => catchedError(trueMessage, selectedModule, e))
        }
        else {
          // Not enough parameter to start the module
          logger(
            `Module "${selectedModule}" requires ${
              mod.minArgsCount
            } parameter(s). Received command : ${trueMessage}`
          )
        }
      }
      catch (e) {
        logger(e)
      }
    } // Required module not found
    else logger(`Requested module not found. Received command : ${trueMessage}`)
  }
}

const emojis = [
  { char: 'a', emoji: { str: ':regional_indicator_a:', unicode: '🇦' } },
  { char: 'b', emoji: { str: ':regional_indicator_b:', unicode: '🇧' } },
  { char: 'c', emoji: { str: ':regional_indicator_c:', unicode: '🇨' } },
  { char: 'd', emoji: { str: ':regional_indicator_d:', unicode: '🇩' } },
  { char: 'e', emoji: { str: ':regional_indicator_e:', unicode: '🇪' } },
  { char: 'f', emoji: { str: ':regional_indicator_f:', unicode: '🇫' } },
  { char: 'g', emoji: { str: ':regional_indicator_g:', unicode: '🇬' } },
  { char: 'h', emoji: { str: ':regional_indicator_h:', unicode: '🇭' } },
  { char: 'i', emoji: { str: ':regional_indicator_i:', unicode: '🇮' } },
  { char: 'j', emoji: { str: ':regional_indicator_j:', unicode: '🇯' } },
  { char: 'k', emoji: { str: ':regional_indicator_k:', unicode: '🇰' } },
  { char: 'l', emoji: { str: ':regional_indicator_l:', unicode: '🇱' } },
  { char: 'm', emoji: { str: ':regional_indicator_m:', unicode: '🇲' } },
  { char: 'n', emoji: { str: ':regional_indicator_n:', unicode: '🇳' } },
  { char: 'o', emoji: { str: ':regional_indicator_o:', unicode: '🇴' } },
  { char: 'p', emoji: { str: ':regional_indicator_p:', unicode: '🇵' } },
  { char: 'q', emoji: { str: ':regional_indicator_q:', unicode: '🇶' } },
  { char: 'r', emoji: { str: ':regional_indicator_r:', unicode: '🇷' } },
  { char: 's', emoji: { str: ':regional_indicator_s:', unicode: '🇸' } },
  { char: 't', emoji: { str: ':regional_indicator_t:', unicode: '🇹' } },
  { char: 'u', emoji: { str: ':regional_indicator_u:', unicode: '🇺' } },
  { char: 'v', emoji: { str: ':regional_indicator_v:', unicode: '🇻' } },
  { char: 'w', emoji: { str: ':regional_indicator_w:', unicode: '🇼' } },
  { char: 'x', emoji: { str: ':regional_indicator_x:', unicode: '🇽' } },
  { char: 'y', emoji: { str: ':regional_indicator_y:', unicode: '🇾' } },
  { char: 'z', emoji: { str: ':regional_indicator_z:', unicode: '🇿' } },
  { char: '0', emoji: { str: ':zero:', unicode: '0️⃣' } },
  { char: '1', emoji: { str: ':one:', unicode: '1️⃣' } },
  { char: '2', emoji: { str: ':two:', unicode: '2️⃣' } },
  { char: '3', emoji: { str: ':three:', unicode: '3️⃣' } },
  { char: '4', emoji: { str: ':four:', unicode: '4️⃣' } },
  { char: '5', emoji: { str: ':five:', unicode: '5️⃣' } },
  { char: '6', emoji: { str: ':six:', unicode: '6️⃣' } },
  { char: '7', emoji: { str: ':seven:', unicode: '7️⃣' } },
  { char: '8', emoji: { str: ':eight:', unicode: '8️⃣' } },
  { char: '9', emoji: { str: ':nine:', unicode: '9️⃣' } },
  { char: '.', emoji: { str: ':record_button:', unicode: '⏺' } },
  { char: '?', emoji: { str: ':grey_question:', unicode: '❔' } },
  { char: '!', emoji: { str: ':grey_exclamation:', unicode: '❕' } },
  { char: '\'', emoji: { str: ':white_small_square:', unicode: '▫' } },
  { char: ' ', emoji: { str: '   ', unicode: undefined } }
]

const strToEmojiArr = str =>
  convertSpecialChars(str)
    .split('')
    .map(x => {
      const res = emojis.find(y => y.char === x.toLowerCase())
      return res ? res.emoji : x
    })

module.exports = {
  delay,
  timestamp,
  logger,
  searchCommand,
  apiCall,
  convertSpecialChars,
  strToEmojiArr
}
