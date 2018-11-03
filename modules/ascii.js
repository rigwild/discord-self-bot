'use strict'

/**
 * This module sends a message converting the text to ASCII Art text
 * Usage : ascii(message)
 *
 * @param text {string} your text
 */

const { convertSpecialChars } = require('../util')

// Minimum arguments required by the module. Does not include the "Channel" arg.
const minArgsCount = 1

// ASCII Art font to use. Use my .flf parser to parse ASCII Art fonts :
// https://github.com/rigwild/flf-ascii-font-parser
// Font here : JS Stick Letters
// prettier-ignore
const font = [{'letter': '!', 'ascii': '  /\n / \n.  \n   '}, {'letter': '"', 'ascii': '..\n\'\'\n  \n  '}, {'letter': '#', 'ascii': '\n\n\n'}, {'letter': '$', 'ascii': '\n\n\n'}, {'letter': '%', 'ascii': '\n\n\n'}, {'letter': '&', 'ascii': '\n\n\n'}, {'letter': '\'', 'ascii': '. \n\' \n  \n  '}, {'letter': '(', 'ascii': '\n\n\n'}, {'letter': ')', 'ascii': '\n\n\n'}, {'letter': '*', 'ascii': '\n\n\n'}, {'letter': '+', 'ascii': '\n\n\n'}, {'letter': ',', 'ascii': '  \n  \n. \n\' '}, {'letter': '-', 'ascii': '   \n__ \n   \n   '}, {'letter': '.', 'ascii': ' \n \n.\n '}, {'letter': '/', 'ascii': '  / \n /  \n/   \n    '}, {'letter': '0', 'ascii': '\n\n\n'}, {'letter': '1', 'ascii': '\n\n\n'}, {'letter': '2', 'ascii': '\n\n\n'}, {'letter': '3', 'ascii': '\n\n\n'}, {'letter': '4', 'ascii': '\n\n\n'}, {'letter': '5', 'ascii': '\n\n\n'}, {'letter': '6', 'ascii': '\n\n\n'}, {'letter': '7', 'ascii': '\n\n\n'}, {'letter': '8', 'ascii': '\n\n\n'}, {'letter': '9', 'ascii': '\n\n\n'}, {'letter': ':', 'ascii': '\n.\n.\n '}, {'letter': ';', 'ascii': '\n.\n,\n '}, {'letter': '<', 'ascii': '\n\n\n'}, {'letter': '=', 'ascii': '\n\n\n'}, {'letter': '>', 'ascii': '\n\n\n'}, {'letter': '?', 'ascii': '__ \n _|\n . \n   '}, {'letter': '@', 'ascii': '\n\n\n'}, {'letter': 'A', 'ascii': '     \n /\\  \n/~~\\ \n     '}, {'letter': 'B', 'ascii': ' __  \n|__) \n|__) \n     '}, {'letter': 'C', 'ascii': ' __  \n/  ` \n\\__, \n     '}, {'letter': 'D', 'ascii': ' __  \n|  \\ \n|__/ \n     '}, {'letter': 'E', 'ascii': ' ___ \n|__  \n|___ \n     '}, {'letter': 'F', 'ascii': ' ___ \n|__  \n|    \n     '}, {'letter': 'G', 'ascii': ' __  \n/ _` \n\\__> \n     '}, {'letter': 'H', 'ascii': '     \n|__| \n|  | \n     '}, {'letter': 'I', 'ascii': '  \n| \n| \n  '}, {'letter': 'J', 'ascii': '     \n   | \n\\__/ \n     '}, {'letter': 'K', 'ascii': '     \n|__/ \n|  \\ \n     '}, {'letter': 'L', 'ascii': '     \n|    \n|___ \n     '}, {'letter': 'M', 'ascii': '      \n |\\/| \n |  | \n      '}, {'letter': 'N', 'ascii': '     \n|\\ | \n| \\| \n     '}, {'letter': 'O', 'ascii': ' __  \n/  \\ \n\\__/ \n     '}, {'letter': 'P', 'ascii': ' __  \n|__) \n|    \n     '}, {'letter': 'Q', 'ascii': ' __  \n/  \\ \n\\__X \n     '}, {'letter': 'R', 'ascii': ' __  \n|__) \n|  \\ \n     '}, {'letter': 'S', 'ascii': ' __  \n/__` \n.__/ \n     '}, {'letter': 'T', 'ascii': '___ \n |  \n |  \n    '}, {'letter': 'U', 'ascii': '     \n|  | \n\\__/ \n     '}, {'letter': 'V', 'ascii': '     \n\\  / \n \\/  \n     '}, {'letter': 'W', 'ascii': '     \n|  | \n|/\\| \n     '}, {'letter': 'X', 'ascii': '    \n\\_/ \n/ \\ \n    '}, {'letter': 'Y', 'ascii': '    \n\\ / \n |  \n    '}, {'letter': 'Z', 'ascii': '__ \n / \n/_ \n   '}, {'letter': '[', 'ascii': '\n\n\n'}, {'letter': '\\', 'ascii': '\\   \n \\  \n  \\ \n    '}, {'letter': ']', 'ascii': '\n\n\n'}, {'letter': '^', 'ascii': '\n\n\n'}, {'letter': '_', 'ascii': '    \n    \n___ \n    '}, {'letter': '`', 'ascii': '. \n` \n  \n  '}, {'letter': 'a', 'ascii': '     \n /\\  \n/~~\\ \n     '}, {'letter': 'b', 'ascii': ' __  \n|__) \n|__) \n     '}, {'letter': 'c', 'ascii': ' __  \n/  ` \n\\__, \n     '}, {'letter': 'd', 'ascii': ' __  \n|  \\ \n|__/ \n     '}, {'letter': 'e', 'ascii': ' ___ \n|__  \n|___ \n     '}, {'letter': 'f', 'ascii': ' ___ \n|__  \n|    \n     '}, {'letter': 'g', 'ascii': ' __  \n/ _` \n\\__> \n     '}, {'letter': 'h', 'ascii': '     \n|__| \n|  | \n     '}, {'letter': 'i', 'ascii': '  \n| \n| \n  '}, {'letter': 'j', 'ascii': '     \n   | \n\\__/ \n     '}, {'letter': 'k', 'ascii': '     \n|__/ \n|  \\ \n     '}, {'letter': 'l', 'ascii': '     \n|    \n|___ \n     '}, {'letter': 'm', 'ascii': '      \n |\\/| \n |  | \n      '}, {'letter': 'n', 'ascii': '     \n|\\ | \n| \\| \n     '}, {'letter': 'o', 'ascii': ' __  \n/  \\ \n\\__/ \n     '}, {'letter': 'p', 'ascii': ' __  \n|__) \n|    \n     '}, {'letter': 'q', 'ascii': ' __  \n/  \\ \n\\__X \n     '}, {'letter': 'r', 'ascii': ' __  \n|__) \n|  \\ \n     '}, {'letter': 's', 'ascii': ' __  \n/__` \n.__/ \n     '}, {'letter': 't', 'ascii': '___ \n |  \n |  \n    '}, {'letter': 'u', 'ascii': '     \n|  | \n\\__/ \n     '}, {'letter': 'v', 'ascii': '     \n\\  / \n \\/  \n     '}, {'letter': 'w', 'ascii': '     \n|  | \n|/\\| \n     '}, {'letter': 'x', 'ascii': '    \n\\_/ \n/ \\ \n    '}, {'letter': 'y', 'ascii': '    \n\\ / \n |  \n    '}, {'letter': 'z', 'ascii': '__ \n / \n/_ \n   '}, {'letter': '{', 'ascii': '\n\n\n'}, {'letter': '|', 'ascii': '| \n| \n| \n| '}, {'letter': '}', 'ascii': '\n\n\n'}, {'letter': '~', 'ascii': '\n\n\n'}, {'letter': 'Ä', 'ascii': '\n\n\n'}, {'letter': 'Ö', 'ascii': '\n\n\n'}, {'letter': 'Ü', 'ascii': '\n\n\n'}, {'letter': 'ä', 'ascii': '\n\n\n'}, {'letter': 'ö', 'ascii': '\n\n\n'}, {'letter': 'ü', 'ascii': '\n\n\n'}, {'letter': 'ß', 'ascii': '\n\n\n'}]

// Function started by the module manager
const start = async (channel, ...commandArgs) => {
  const asciiArr = convertSpecialChars(commandArgs[0])
    .split('')
    .map(x => {
      const res = font.find(y => y.letter === x)
      return res ? res.ascii : ' ' + x + ' '
    })

  if (asciiArr.length > 0) {
    let str = ''
    const lines = asciiArr.map(x => x.split('\n'))
    const letterSize = asciiArr[0].length
    for (let i = 0; i < letterSize; i++) {
      str += lines.map(x => x[i]).join('  ') + '\n'
    }
    channel.send('```' + str.trim() + '```')
  }
}

module.exports = {
  minArgsCount,
  start
}
