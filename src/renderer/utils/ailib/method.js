// options为树枝深度deep
// 负极大值算法-极大极小值的简化版，双方均力求分数极大值
import * as R from '../roles.js'
import * as S from '../score.js'
import * as math from '../math.js'
import Board from './board.js'

var SCORE = S
var MAX = SCORE.FIVE * 10
var MIN = -1 * MAX
var count = 0 // 每次思考的节点数

var boardPut = function (board, p, role) {
  if (board[p[0]][p[1]] == R.EMPTY) { board[p[0]][p[1]] = role }
}

var negamax = function (board, role, deep, alpha, beta) {
  var roots = gen(board, deep)// 生成可下棋子位置的列表
  for (var i = 0; i < roots.length; i++) {
    var p = roots[i]
    boardPut(board, p, role) // 假设点
    var steps = [p]
    var v = r(deep - 1, -beta, -alpha, R.reverse(role), 1, steps.slice(0))// 迭代,r是包含了剪枝的寻找best_score的算法，跟这个类似
    v.score *= -1// 负极大值算法精髓
    alpha = Math.max(alpha, v.score)
    boardPut(board, p, R.EMPTY) // 回溯
    p.v = v
  }
  return alpha
}
var r = function (deep, alpha, beta, role, step, steps) {
  var _e = evaluate(role)
  var leaf = {
    score: _e,
    step: step,
    steps: steps
  }
  if (deep <= 0 || math.greatOrEqualThan(_e, S.FIVE) || math.littleOrEqualThan(_e, -S.FIVE)) {
    return leaf
  }
  var best = {
    score: MIN,
    step: step,
    steps: steps
  }
  var points = gen(role, count > 10 ? step > 1 : step > 3, step > 1)
  for (var i = 0; i < points.length; i++) {
    var p = points[i]
    board.put(p, role)

    var _deep = deep - 1
  }
  var _steps = steps.slice(0)
  _steps.push(p)
  var v = r(_deep, -beta, -alpha, R.reverse(role), step + 1, _steps)
  v.score *= -1
  board.remove(p)
  if (v.score > best.score) {
    best = v
  }
  alpha = Math.max(best.score, alpha)
  return best
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
/**
 *  策略处理
 * @param {Number[][]} board
 * @param {Object} options
 * @returns {Number[]}
 */
const next = function (_board, options = {}) {
  let board = Board(_board)
  var p = [0, 0]
  // board.push(p,role) 等一个有缘人来补充board类，p是位置
  // return p
  // if (count <=0 ) p=[7,7] return p  要是电脑先起手的话直接下在7,7的位置即可
  return p
}

export default {
  next: next
}
