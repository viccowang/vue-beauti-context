/**
 * BeautiContext
 * =================================
 * Author: Vicco Wang
 * Date: 2019.04.19
 * =================================
 * Lisence: MIT
 * =================================
 *
 */
import Vue from 'vue'
import BeautiContext from '../Component'
import { _unbindingDirectiveContext } from '../Utils'

const BeautiConstructor = Vue.extend(BeautiContext)

let BeautiInstance = null

export default function createBeautiContext (options) {
  // deal options
  const opts = __initOptions(options)

  if (!BeautiInstance) {
    // create instance
    window._$$BeautiContextInstance = BeautiInstance = __createContext(opts)
    //
    const beautiContextEl = BeautiInstance.$mount().$el
    //
    if (opts.appendToBody) {
      document.body.appendChild(beautiContextEl)
    } else {
      opts.event.target.appendChild(beautiContextEl)
    }
  } else {
    Object.assign(BeautiInstance, {
      event: opts.event,
      props: opts.props,
      text: opts.text,
      customStyle: {},
      useSlot: false
    }, opts)
  }
  // set visible
  BeautiInstance.visible = true
  // 不论初次构建还是复用，都手动构建一下自定义component,保证每次context率先展示，而component后载入
  if (opts._component) {
    __createContextComponent(BeautiInstance, opts)
  }
  // 隐藏其他通过指令生成的context实例
  _unbindingDirectiveContext(BeautiInstance)
}

/**
 * 通过Vue component生成context实例
 */
function __createContext (options) {
  return new BeautiConstructor({ data: options })
}
/**
 * 创建context中引入的Vue component
 */
async function __createContextComponent (instance, options) {
  instance.component = await getUserComponentAsync(options._component)
}
/**
 * 初始化传入的参数
 */
function __initOptions (options) {
  if (options.component) {
    options._component = options.component
    options.component = null
  } else {
    options._component = options.component = null
  }
  return { ...options }
}
/**
 * 异步加载NextPage需要加载的Component
 * @param {*} userOptions
 */
function getUserComponentAsync (component) {
  return new Promise(resolve => {
    if (typeof component === 'function') {
      try {
        component().then(res => {
          resolve(res.default)
        })
      } catch (e) {
        console.error(e)
      }
    } else {
      resolve(component)
    }
  })
}
