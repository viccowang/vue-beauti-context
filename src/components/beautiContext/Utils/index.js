/**
 * BeautiContext Utils
 * =========================================================
 * Author: Vicco Wang
 * Date: 2019/04/22
 * =================================
 * Lisence: MIT
 * =================================
 **/

/**
 * 不论多少指令生成多少个context实例，同时只显示一个实例context
 * 这里用来移除非当前展示的其他context
 * @param {*} contextmenu   当前打开的context实例
 */
export function _unbindingDirectiveContext (contextmenu) {
  if (!window._$$BeautiContextDirectiveInstance.length) return
  window._$$BeautiContextDirectiveInstance.forEach(ctx => {
    if (ctx._uid !== contextmenu._uid) {
      ctx.visible = false
    }
  })
}

/**
 * 设置contextmenu的位置并修正其在窗口边缘溢出的问题
 * @param {*} eventTarget
 * @param {*} context
 */
export function _fixesContextPos (eventTarget, context, type) {
  const style = { left: 0, top: 0 }
  // event target
  const evRect = eventTarget.getBoundingClientRect()
  // context
  const contextRect = context.getBoundingClientRect()
  const docWidth = document.documentElement.clientWidth
  const docHeight = document.documentElement.clientHeight
  if (type === 'contextmenu') {
    // fixes pos
    style.left = evRect.right + contextRect.width + 10 > docWidth ? docWidth - contextRect.width - 10 : evRect.right
    style.top = evRect.bottom + contextRect.height + 10 > docHeight ? docHeight - contextRect.height - 10 : evRect.bottom
  }
  if (type === 'submenu') {
    style.left = evRect.right + contextRect.width + 10 > docWidth ? -contextRect.width : evRect.width
    style.top = evRect.bottom + contextRect.height + 10 > docHeight ? -(contextRect.bottom - docHeight + 10) : 0
  }

  return style
}

/**
 *
 * @param {*} event
 */
export function _getEventPath (event) {
  return event.path || (event.composedPath && event.composedPath())
}
