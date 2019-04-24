import BeautiContext from './Component'
import createBeautiContext from './Service/createBeautiContext'
import BeautiContextDirective from './Directive'
import BeautiContextmenu from './Component/contextmenu/contextmenu'
import BeautiContextmenuItem from './Component/contextmenu/contextmenuItem'
import BeautiContextSubmenu from './Component/contextmenu/contextsubmenu'
/**
 * BeautiContext
 * ================================
 * 使用原型对象创建实例模式：
 * ================================
 * Author: Vicco Wang
 * Date: 2019/04/22
 */

 function install (Vue) {
    // _$$BeautiContextDirectiveInstance 通过指令绑定的context实例
    // _$$BeautiContextInstance 通过原型对象函数生成的context实例
    window._$$BeautiContextDirectiveInstance = window._$$BeautiContextInstance = []
    // register comp
    Vue.prototype.$beautiContext = createBeautiContext
    //
    Vue.component(BeautiContext.name, BeautiContext)
    Vue.component(BeautiContextmenu.name, BeautiContextmenu)
    Vue.component(BeautiContextmenuItem.name, BeautiContextmenuItem)
    Vue.component(BeautiContextSubmenu.name, BeautiContextSubmenu)
    //
    Vue.directive('beautiContext', BeautiContextDirective)
 }

 if( typeof window !== 'undefined' && window.Vue) {
   install (window.Vue)
 }

export default {
  install
}
