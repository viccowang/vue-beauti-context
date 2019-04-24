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
 *
 * this.$beautiContext(options)
 * =================================
 * options
 * event: 触发事件的event对象， 必须选项
 * props: 传递给context的数据对象，任意值， 非必须
 * text: 如果你只需要展示一点文字，就可以用这个
 * component: 传递一个Vue组件对象，支持同步和异步两种方式，传递的组件会展示在context中，配合`props`可以动态传值
 * =================================
 * 使用指令模式：
 * <beauti-context ref="menu">
 *  Hello World
 * </beauti-context>
 *
 * <button v-beautiContext:menu></button>
 *
 * 也可以使用内置的组件创建一个右键菜单
 * <beauti-context>
 *    <beauti-contextmenu>
 *        <beauti-contextmenu-item>Menu 01</beauti-contextmenu-item>
 *    </beauti-contextmenu>
 * </beauti-context>
 */
export default {
  install (Vue) {
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
}
