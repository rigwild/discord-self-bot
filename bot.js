'use strict'

require('dotenv').config()

const discordAuthToken = process.env.discordAuthToken

const Discord = require('discord.js')
const { searchCommand } = require('./util')

const bot = new Discord.Client()

bot.login(discordAuthToken)

bot.on('message', message => searchCommand(message))
