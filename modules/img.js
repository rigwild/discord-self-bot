'use strict'

/**
 * This module sends a link to the first picture on Google Image
 * Requires a Google Custom Search API key + a Custom Search Engine ID
 * https://developers.google.com/custom-search/docs/overview
 * Usage : img(query)
 *
 * @param query {string} image requested
 */

const https = require('https')

// Minimum arguments required by the module. Does not include the "Channel" arg.
const minArgsCount = 1

const gApiKey = process.env.googleCustomSearchApiKey
const searchEngineId = process.env.googleCustomSearchEngineId

const getFromGoogleImage = query => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'www.googleapis.com',
      path: `/customsearch/v1?key=${gApiKey}&cx=${searchEngineId}&prettyPrint=false&searchType=image&q=${query}`,
      method: 'GET',
      port: 443,
      headers: { 'User-Agent': 'bot' }
    }
    let body = ''
    const req = https.request(options, res => {
      res.on('data', chunk => (body += chunk))
      res.on('end', () => {
        if (res.statusCode === 200) resolve(JSON.parse(body))
        else reject({ res, body: JSON.parse(body) })
      })
    })
    req.on('error', e => reject(e))
    req.end()
  })
}

// Function started by the module manager
const start = async (channel, ...commandArgs) => {
  const res = await getFromGoogleImage(commandArgs[0])

  if (res && res.hasOwnProperty('items')) {
    channel.send(res.items[0].image.thumbnailLink)
  }
}

module.exports = {
  minArgsCount,
  start
}
