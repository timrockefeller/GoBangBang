/**
 *  策略处理
 * @param {Number[][]} board
 * @param {Object} options
 * @returns {Number[]}
 */
// options为树枝深度deep
// 负极大值算法-极大极小值的简化版，双方均力求分数极大值
import * as R from '../roles.js'
import * as S from '../score.js'

var negamax = function (board, role, deep, alpha, beta) {
  var best = 0
  var point = gen(board, deep)
  for (var i = 0; i < point.length; i++) {
    var p = point[i]
    board.put(p, role)
    var steps = [p]
    var v = r(deep - 1, -beta, -alpha, R.reverse(role), 1, steps.slice(0), 0)// 迭代,r是包含了剪枝的寻找best_score的算法，跟这个类似
    v.score *= -1// 负极大值算法精髓
    alpha = Math.max(alpha, v.score)
    board.remove(p)
    p.v = v
    return alpha
  }
}
// 生成可以下棋子的位置列表
// 因为不需要遍历棋盘所有位置，这个函数主要是把搜索范围放在有棋子的周围一两格范围内
var gen = function (board, deep) {
  var neighbors = []
  var nextNeighbors = []

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] == R.EMPTY) {
        if (hasNeighbor(board, [i, j], 1, 1)) { // 必须是有邻居的才行
          neighbors.push([i, j])
        } else if (deep >= 2 && hasNeighbor(board, [i, j], 2, 2)) {
          nextNeighbors.push([i, j])
        }
      }
    }
  }
  return neighbors.concat(nextNeighbors)// 返回可以下棋子的列表
}
// 检测一个棋子周围是否有邻居
var hasNeighbor = function (board, [x, y], distance, count) {
  var len = board.length
  var startX = x - distance
  var endX = x + distance
  var startY = y - distance
  var endY = y + distance
  for (var i = startX; i <= endX; i++) {
    if (i < 0 || i >= len) continue
    for (var j = startY; j <= endY; j++) {
      if (j < 0 || j >= len) continue
      if (i == x && j == y) continue
      if (board[i][j] != R.empty) {
        count--
        if (count <= 0) return true
      }
    }
  }
  return false
}

var evaluate = function (role) { // 获取当前操作对象
  let comMaxScore = 0
  let humMaxScore = 0
  var board = that.board// 需要获取当前棋盘信息,不知道在哪定义的，先放一个在这里.jpg
  for (var i = 0; i < board.length; i++) { // 遍历整个棋盘获取所有空位点分数值的总和
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] == R.CONSOLE) {
        comMaxScore += GainScore(comScore[i][j])
      } else if (board[i][j] == R.PLAYER) {
        humMaxScore += GainScore(humScore[i][j])
      }
    }
  }
  var score = (role == R.CONSOLE ? 1 : -1) * (comMaxScore - humMaxScore)
  return score
}
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

const next = function (board, options = {}) {
  var p = [0, 0]
  // board.push(p,role) 等一个有缘人来补充board类，p是位置
  // return p
  // if (count <=0 ) p=[7,7] return p  要是电脑先起手的话直接下在7,7的位置即可
  return p
}

export default {
  next: next
}
