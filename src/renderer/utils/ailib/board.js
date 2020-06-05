import * as Role from '../role.js'
import * as Score from '../score.js'
/**
 * @param {Number[][]} board
 *
 */

 // 冲四的分其实肯定比活三高，但是如果这样的话容易形成盲目冲四的问题，所以如果发现电脑有无意义的冲四，则将分数降低到和活三一样
// 而对于冲四活三这种杀棋，则将分数提高。
// iamcopycatyeah
var GainScore = function (type) {
  if (type < S.FOUR && type >= S.BLOCKED_FOUR) {
    if (type >= S.BLOCKED_FOUR && type < (S.BLOCKED_FOUR + S.THREE)) {
      // 单独冲四，意义不大
      return S.THREE
    } else if (type >= S.BLOCKED_FOUR + S.THREE && type < S.BLOCKED_FOUR * 2) {
      return S.FOUR // 冲四活三，比双三分高，相当于自己形成活四
    } else {
      // 双冲四 比活四分数也高
      return S.FOUR * 2
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
  this.put = function (p, role) {
    if (p[0] < this.length && p[1] < this.length) {
      this.board[p[0]][p[1]] = role
    }
  }

  this.remove = function (p) {
    this.put(p, Role.EMPTY)
  }
  

  evaluate(role) { // 获取当前操作对象
    let comMaxScore = 0
    let humMaxScore = 0
    var board = that.board// 需要获取当前棋盘信息,不知道在哪定义的，先放一个在这里.jpg
    for (var i = 0; i < 15; i++) { // 遍历整个棋盘获取所有空位点分数值的总和
      for (var j = 0; j < 15; j++) {
        if (board[i][j] == R.CONSOLE) {
          comMaxScore += GainScore(this.comScore[i][j])
        } else if (board[i][j] == R.PLAYER) {
          humMaxScore += GainScore(this.humScore[i][j])
        }
      }
    }
    var score = (role == R.CONSOLE ? 1 : -1) * (comMaxScore - humMaxScore)
    return score
  }
}

export default Board