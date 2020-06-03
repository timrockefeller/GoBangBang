/**
 *  策略处理
 * @param {Number[][]} board
 * @param {Object} options
 * @returns {Number[]}
 */
//options为树枝深度deep
//负极大值算法-极大极小值的简化版，双方均力求分数极大值

var negamax = function(candidates, role, deep, alpha, beta){
  return alpha
}
import * as R from './roles.js'
import * as S from './score.js'
var evaluate = function (role) {//获取当前操作对象
  let comMaxScore=0
  let humMaxScore=0
  var board = that.board//需要获取当前棋盘信息,不知道在哪定义的，先放一个在这里.jpg
  for(var i=0;i<board.length;i++) {//遍历整个棋盘获取所有空位点分数值的总和
    for(var j=0;j<board[i].length;j++) {
      if(board[i][j] == R.CONSOLE) {
        comMaxScore += GainScore(comScore[i][j])
      } else if (board[i][j] == R.PLAYER) {
        humMaxScore += GainScore(humScore[i][j])
      }
    }
  }
  var score = (role == R.CONSOLE ? 1 : -1) * (comMaxScore - humMaxScore)
  return score
}
//冲四的分其实肯定比活三高，但是如果这样的话容易形成盲目冲四的问题，所以如果发现电脑有无意义的冲四，则将分数降低到和活三一样
//而对于冲四活三这种杀棋，则将分数提高。
//iamcopycatyeah
var GainScore = function (type){
  if(type < S.FOUR && type >= S.BLOCKED_FOUR){

    if(type >= S.BLOCKED_FOUR && type < (S.BLOCKED_FOUR + S.THREE)) {
      //单独冲四，意义不大
      return S.THREE
    } else if(type >= S.BLOCKED_FOUR + S.THREE && type < S.BLOCKED_FOUR * 2) {
      return S.FOUR  //冲四活三，比双三分高，相当于自己形成活四
    } else {
      //双冲四 比活四分数也高
      return S.FOUR * 2
    }
  }
  return type
}

const next = function (board, options = {}) {
  return [0, 0]
}

export default {
  next: next
}
