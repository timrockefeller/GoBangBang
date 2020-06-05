import * as ROLES from './roles.js'
import Method from './ailib/method'
export default {
  install: function (Vue, options) {
    /**
     * option:{
     *  depth
     * }
     */
    Vue.prototype.$Next = function (boards, options) {
      return {
        position: Method.next(
          boards, options
        ),
        role: ROLES.CONSOLE
      }
    }
  }

}
