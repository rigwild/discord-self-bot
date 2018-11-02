'use strict'

/**
 * This module sends a message converting the text to letters emojies
 * Usage : google(query)
 *
 * @param query {string} search terms
 */

// Minimum arguments required by the module. Does not include the "Channel" arg.
const minArgsCount = 1

const convert = [
  { char: 'a', emoji: ':regional_indicator_a:' },
  { char: 'b', emoji: ':regional_indicator_b:' },
  { char: 'c', emoji: ':regional_indicator_c:' },
  { char: 'd', emoji: ':regional_indicator_d:' },
  { char: 'e', emoji: ':regional_indicator_e:' },
  { char: 'f', emoji: ':regional_indicator_f:' },
  { char: 'g', emoji: ':regional_indicator_g:' },
  { char: 'h', emoji: ':regional_indicator_h:' },
  { char: 'i', emoji: ':regional_indicator_i:' },
  { char: 'j', emoji: ':regional_indicator_j:' },
  { char: 'k', emoji: ':regional_indicator_k:' },
  { char: 'l', emoji: ':regional_indicator_l:' },
  { char: 'm', emoji: ':regional_indicator_m:' },
  { char: 'n', emoji: ':regional_indicator_n:' },
  { char: 'o', emoji: ':regional_indicator_o:' },
  { char: 'p', emoji: ':regional_indicator_p:' },
  { char: 'q', emoji: ':regional_indicator_q:' },
  { char: 'r', emoji: ':regional_indicator_r:' },
  { char: 's', emoji: ':regional_indicator_s:' },
  { char: 't', emoji: ':regional_indicator_t:' },
  { char: 'u', emoji: ':regional_indicator_u:' },
  { char: 'v', emoji: ':regional_indicator_v:' },
  { char: 'w', emoji: ':regional_indicator_w:' },
  { char: 'x', emoji: ':regional_indicator_x:' },
  { char: 'y', emoji: ':regional_indicator_y:' },
  { char: 'z', emoji: ':regional_indicator_z:' },
  { char: '0', emoji: ':zero:' },
  { char: '1', emoji: ':one:' },
  { char: '2', emoji: ':two:' },
  { char: '3', emoji: ':three:' },
  { char: '4', emoji: ':four:' },
  { char: '5', emoji: ':five:' },
  { char: '6', emoji: ':six:' },
  { char: '7', emoji: ':seven:' },
  { char: '8', emoji: ':eight:' },
  { char: '9', emoji: ':nine:' },
  { char: '.', emoji: ':record_button:' },
  { char: '?', emoji: ':grey_question:' },
  { char: '!', emoji: ':grey_exclamation:' },
  { char: '\'', emoji: ':white_small_square:' },
  { char: ' ', emoji: '   ' }
]

// Function started by the module manager
const start = async (channel, ...commandArgs) => {
  const newMessage = commandArgs[0]
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split('')
    .map(x => {
      const res = convert.find(y => y.char === x.toLowerCase())
      return res ? res.emoji : x
    })
    .join('')

  channel.send(newMessage)
}

module.exports = {
  minArgsCount,
  start
}
