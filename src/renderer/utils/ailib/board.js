import * as Role from '../roles.js'
import * as Score from '../score.js'
/**
 * @param {Number[][]} board
 *
 */

// 冲四的分其实肯定比活三高，但是如果这样的话容易形成盲目冲四的问题，所以如果发现电脑有无意义的冲四，则将分数降低到和活三一样
// 而对于冲四活三这种杀棋，则将分数提高。
// iamcopycatyeah
var GainScore = function (type) {
  if (type < Score.FOUR && type >= Score.BLOCKED_FOUR) {
    if (type >= Score.BLOCKED_FOUR && type < (Score.BLOCKED_FOUR + Score.THREE)) {
      // 单独冲四，意义不大
      return Score.THREE
    } else if (type >= Score.BLOCKED_FOUR + Score.THREE && type < Score.BLOCKED_FOUR * 2) {
      return Score.FOUR // 冲四活三，比双三分高，相当于自己形成活四
    } else {
      // 双冲四 比活四分数也高
      return Score.FOUR * 2
    }
  }
  return type
}
let Board = function (board) {
  this.board = board
  this.length = board.length
  this.comMaxScore = 0
  this.humMaxScore = 0
  /**
     * @param {Number[]} p
     * @param {Number} role
     */
  this.put = function ([x, y], role) {
    if (x < this.length && y < this.length) {
      this.board[x][y] = role
    }
  }

  this.remove = function ([x, y]) {
    this.put([x, y], Role.EMPTY)
  }

  this.evaluate = function (role) { // 获取当前操作对象
    let comMaxScore = 0
    let humMaxScore = 0
    for (var i = 0; i < 15; i++) { // 遍历整个棋盘获取所有空位点分数值的总和
      for (var j = 0; j < 15; j++) {
        if (this.board[i][j] === Role.CONSOLE) {
          comMaxScore += GainScore(this.comScore[i][j])
        } else if (this.board[i][j] === Role.PLAYER) {
          humMaxScore += GainScore(this.humScore[i][j])
        }
      }
    }
    var score = (role === Role.CONSOLE ? 1 : -1) * (comMaxScore - humMaxScore)
    return score
  }
  this.hasNeighbor = function ([x, y], distance, count) {
    var len = this.length
    var startX = x - distance
    var endX = x + distance
    var startY = y - distance
    var endY = y + distance
    for (var i = startX; i <= endX; i++) {
      if (i < 0 || i >= len) continue
      for (var j = startY; j <= endY; j++) {
        if (j < 0 || j >= len) continue
        if (i === x && j === y) continue
        if (board[i][j] !== Role.EMPTY) {
          count--
          if (count <= 0) return true
        }
      }
    }
    return false
  }
}

export default Board
