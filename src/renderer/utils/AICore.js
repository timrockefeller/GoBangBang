import * as ROLES from './roles.js'
export default {
  install: function (Vue, options) {
    Vue.prototype.$Next = function (boards) {
      return {
        position: [0, 0],
        role: ROLES.CONSOLE
      }
    }
  }

}
