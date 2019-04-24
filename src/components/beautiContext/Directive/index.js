/**
 * BeautiContext Directives
 * =================================
 * Author: Vicco Wang
 * Date: 2019.04.19
 * =================================
 * Lisence: MIT
 * =================================
 *
 */
import { _unbindingDirectiveContext, _getEventPath } from '../Utils'
import eventTypes from '../Utils/mouseEventTypes'

/**
 * 如果是鼠标悬停类事件，内部统一使用mouseenter进行触发，其他会导致重复触发
 * @param {*} type
 */
function _getCurrectTypes (type) {
  type = type.toLowerCase()
  if (_isOverTypes(type)) return eventTypes.mouseenter
  return type
}

/**
 * 判断当前事件是否是鼠标悬停移动事件，该类事件需要绑定延迟以及同时绑定移出事件
 * @param {*} type
 */
function _isOverTypes (type) {
  return /^mouse(move|over|enter)$/.test(type)
}

/**
 *
 * @param {*} event
 */
function _getCtxParams (event) {
  const path = _getEventPath(event)
  for (const value of path) {
    if (value.$$beautiCtxParams) return value.$$beautiCtxParams
  }
}

/**
 * 绑定延迟响应事件
 * @param {*} el
 * @param {*} fn
 * @param {*} debounceTime
 */
function _bindDebounceEvent (el, fn, debounceTime) {
  const timer = setTimeout(fn, debounceTime)
  el.addEventListener(eventTypes.mouseleave, function _bindingMouseLeaveHandler () {
    clearTimeout(timer)
    el.removeEventListener(eventTypes.mouseleave, _bindingMouseLeaveHandler)
  })
}

/**
 *
 *
 * @param {*} event
 * @param {*} contextmenu
 */
function _bindingEventHandle (event) {
  // 通过event.target拿到参数
  let { el, binding, contextmenu, isOverType } = _getCtxParams(event)
  // 根据用户配置是否需要延迟
  let { debounce, debounceTime } = contextmenu
  isOverType && debounce
    ? _bindDebounceEvent(el, eventHandler, debounceTime)
    : eventHandler()

  function eventHandler () {
    if (el.contains(event.target) || el === event.target) {
      event.preventDefault()
      // update and binding values
      Object.assign(contextmenu, {
        event,
        useSlot: true, // 这里需要保证必须使用slot来生成contextmenu
        slotData: binding.value, // 传递给slot的数据对象
        visible: true
      })
    }
    // 不论多少指令生成多少个context实例，同时只显示一个实例context
    _unbindingDirectiveContext(contextmenu)
    // 如果当前有通过原型生成的context，则在打开当前context时隐藏它，保证页面同时只有一个context
    if (window._$$BeautiContextInstance) {
      window._$$BeautiContextInstance.visible = false
    }
  }
}

/**
 *
 * @param {*} contextmenu
 */
function _initContextmenu (el, binding, vnode, contextmenu) {
  let { type } = contextmenu
  if (!window._$$BeautiContextDirectiveInstance.some(ctx => ctx._uid === contextmenu._uid)) {
    window._$$BeautiContextDirectiveInstance.push(contextmenu)
  }
  // 保证types的输入正确
  type = _getCurrectTypes(type)
  // 是否是悬停类事件，该类事件需要同时自动绑定一个延迟事件给target
  const isOverType = _isOverTypes(type)
  /**
   * 当前对象指令在更新后需要先移除掉之前绑定的事件
   */
  el.removeEventListener(type, _bindingEventHandle)
  /**
   * 匿名函数无法在传参的同时方便的注销，因此这里将参数直接绑定在event.target对象上
   * 偷个巧 :P
   */
  el.$$beautiCtxParams = { el, binding, contextmenu, isOverType }
  // 绑定触发
  el.addEventListener(type, _bindingEventHandle)
}

/**
 *
 */
export default {
  inserted (el, binding, vnode) {
    _initContextmenu(el, binding, vnode, vnode.context.$refs[binding.arg])
  },
  componentUpdated (el, binding, vnode) {
    _initContextmenu(el, binding, vnode, vnode.context.$refs[binding.arg])
  }
}
