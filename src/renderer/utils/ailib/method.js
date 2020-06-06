// options为树枝深度deep
// 负极大值算法-极大极小值的简化版，双方均力求分数极大值
import * as R from '../roles.js'
import S from '../score.js'
import math from '../math.js'
import Board from './board.js'

var SCORE = S
var MAX = SCORE.FIVE * 10
var MIN = -1 * MAX
// var count = 0 // 每次思考的节点数
// var ABcut = 0
/**
 *
 * @param {Board} board
 * @param {Number[][]} roots
 * @param {Number} role
 * @param {Number} deep
 * @param {Number} alpha
 * @param {Number} beta
 */
var negamax = function (board, roots, role, deep, alpha, beta) {
  for (var i = 0; i < roots.length; i++) {
    var p = roots[i]
    board.put(p, role) // 假设点
    var steps = [p]
    var v = r(board, deep - 1, -beta, -alpha, R.reverse(role), 1, steps.slice(0))// 迭代,r是包含了剪枝的寻找best_score的算法，跟这个类似
    v.score *= -1// 负极大值算法精髓
    alpha = Math.max(alpha, v.score)
    board.remove(p, R.EMPTY) // 回溯
    // return params
    p.score = v.score
    p.step = v.step
  }
  return alpha
}
/**
 * @param {Board} board
 * @param {Number} deep
 * @param {Number} alpha
 * @param {Number} beta
 * @param {Number} role
 * @param {Number} step
 * @param {Number[][]} steps
 */
var r = function (board, deep, alpha, beta, role, step, steps) {
  var _e = board.evaluate(role)
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
  // var points = gen(role, count > 10 ? step > 1 : step > 3, step > 1)
  var points = gen(board, deep)
  if (!points.length) return leaf
  for (var i = 0; i < points.length; i++) {
    var p = points[i]
    board.put(p, role)

    var _deep = deep - 1

    var _steps = steps.slice(0)
    _steps.push(p)
    var v = r(board, _deep, -beta, -alpha, R.reverse(role), step + 1, _steps)
    v.score *= -1
    board.remove(p)
    if (v.score > best.score) {
      best = v
    }
    alpha = Math.max(best.score, alpha)

    // AB 剪枝
    // 这里不要直接返回原来的值，因为这样上一层会以为就是这个分，实际上这个节点直接剪掉就好了，根本不用考虑，也就是直接给一个很大的值让他被减掉
    // 这样会导致一些差不多的节点都被剪掉，但是没关系，不影响棋力
    // 一定要注意，这里必须是 greatThan 即 明显大于，而不是 greatOrEqualThan 不然会出现很多差不多的有用分支被剪掉，会出现致命错误
    if (math.greatThan(v.score, beta)) {
    // config.debug && console.log('AB Cut [' + p[0] + ',' + p[1] + ']' + v.score + ' >= ' + beta + '')
      //      ABcut++
      v.score = MAX - 1 // 被剪枝的，直接用一个极大值来记录，但是注意必须比MAX小
      //      v.abcut = 1 // 剪枝标记
      // cache(deep, v) // 别缓存被剪枝的，而且，这个返回到上层之后，也注意都不要缓存
      return v
    }
  }
  return best
}
/**
 * 生成可以下棋子的位置列表
 * 因为不需要遍历棋盘所有位置，这个函数主要是把搜索范围放在有棋子的周围一两格范围内
 * @param {Board} board
 * @param {Number} deep
 */
var gen = function (board, deep) {
  var neighbors = []
  var nextNeighbors = []
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      if (board.board[i][j] === R.EMPTY) {
        if (board.hasNeighbor([i, j], 1, 1)) { // 必须是有邻居的才行
          neighbors.push([i, j])
        } else if (deep >= 2 && board.hasNeighbor([i, j], 2, 2)) {
          nextNeighbors.push([i, j])
        }
      }
    }
  }
  return neighbors.concat(nextNeighbors)// 返回可以下棋子的列表
}
/**
 *  策略处理
 * @param {Number[][]} board
 * @param {Object} options
 * @returns {Number[]}
 */
const next = function (_board, options = {}) {
  let depth = options.depth
  let board = new Board(_board)

  let bestScore = 0
  let candidates = gen(board, depth)
  if (!candidates.length) return [7, 7]
  for (var i = 2; i <= depth; i += 2) {
    bestScore = negamax(board, candidates, R.CONSOLE, i, MIN, MAX)
    if (math.greatOrEqualThan(bestScore, SCORE.FIVE)) break
  }// hanyichennb hanyichen nb hanyichen nb hanyi chen nb han yichen nb hanyi chennb han yichennb
  // FIXME
  // candidates[i] = [x,y] => [x, y, score, step]
  candidates.sort(function (a, b) {
    if (math.equal(a.score, b.score)) {
      // 大于零是优势，尽快获胜，因此取步数短的
      // 小于0是劣势，尽量拖延，因此取步数长的
      if (a.score >= 0) {
        if (a.step !== b.step) return a.step - b.step
        else return b.score - a.score // 否则 选取当前分最高的（直接评分)
      } else {
        if (a.step !== b.step) return b.step - a.step
        else return b.score - a.score // 否则 选取当前分最高的（直接评分)
      }
    } else return (b.score - a.score)
  })
  // board.push(p,role) 等一个有缘人来补充board类，p是位置
  // return p
  // if (count <=0 ) p=[7,7] return p  要是电脑先起手的话直接下在7,7的位置即可
  return candidates[0]
}

export default {
  next: next
}
