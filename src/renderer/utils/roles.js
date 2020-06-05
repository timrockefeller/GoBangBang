export const EMPTY = 0
export const PLAYER = 1
export const CONSOLE = 2
/**
 * 你变我 我变你
 * @param {Number} role
 */
export const reverse = function (role) {
  return role === PLAYER ? CONSOLE : PLAYER
}
