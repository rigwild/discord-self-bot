'use strict'

/**
 * This module sends a link to the first picture on Google Image
 * Requires a Google Custom Search API key + a Custom Search Engine ID
 * https://developers.google.com/custom-search/docs/overview
 * Usage : img(query)
 *
 * @param query {string} image requested
 */

const { apiCall } = require('../util')

// Minimum arguments required by the module. Does not include the "Channel" arg.
const minArgsCount = 1

const gApiKey = process.env.googleCustomSearchApiKey
const searchEngineId = process.env.googleCustomSearchEngineId

const getFromGoogleImage = query =>
  apiCall({
    hostname: 'www.googleapis.com',
    path: `/customsearch/v1?key=${gApiKey}&cx=${searchEngineId}&prettyPrint=false&searchType=image&q=${query}`,
    method: 'GET',
    port: 443,
    headers: { 'User-Agent': 'bot' }
  })

// Function started by the module manager
const start = async (channel, ...commandArgs) => {
  const res = await getFromGoogleImage(encodeURIComponent(commandArgs[0]))

  if (res && res.hasOwnProperty('items')) {
    channel.send(res.items[0].image.thumbnailLink)
  }
}

module.exports = {
  minArgsCount,
  start
}
