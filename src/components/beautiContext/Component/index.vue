<template>
  <transition name="beauti-context">
    <div class="beauti-context"
    ref="beautiCtx"
    v-show="visible"
    :style="[ctxPos, customStyle, { zIndex }]">
      <template v-if="text && !component && !useSlot">
        {{ text }}
      </template>
      <template v-if="component && !useSlot">
        <component :is="component" v-bind="props"></component>
      </template>
      <template v-if="useSlot">
        <slot :data="slotData"></slot>
      </template>
    </div>
  </transition>
</template>
<script>
/**
 * BeautiContext wrapper
 * =================================
 * Author: Vicco Wang
 * Date: 2019.04.19
 * =================================
 * Lisence: MIT
 * =================================
 *
 */
import { _fixesContextPos } from '../Utils'
export default {
  name: 'BeautiContext',
  provide () {
    return {
      $$BeautiContext: this
    }
  },
  // as a directive
  props: {
    type: {
      type: String,
      default: 'click'
    },
    debounce: {
      type: Boolean,
      default: true
    },
    debounceTime: {
      type: Number,
      default: 300
    }
  },
  data () {
    return {
      // for prototype comp
      visible: false,
      useSlot: false,
      ctxPos: {},
      customStyle: {},
      event: null,
      props: null,
      text: null,
      component: null,
      appendToBody: true,
      slotData: null,
      zIndex: 1000
    }
  },
  watch: {
    event: {
      handler (event, oldEvent) {
        if (event && event !== oldEvent) {
          this.initPos(event.target)
        }
      },
      immediate: true
    },
    visible (isVisible) {
      if (isVisible) {
        this.$emit('beforeShow', this, this.event, this.slotData)
        // binding event
        document.body.addEventListener('click', this.beautiClickEvent)
      } else {
        // unbinding event
        document.body.removeEventListener('click', this.beautiClickEvent)
      }
    }
  },
  methods: {
    initPos (context) {
      this.$nextTick(() => {
        const { left, top } = _fixesContextPos(context, this.$refs.beautiCtx, 'contextmenu')
        this.ctxPos = {
          top: top + 'px',
          left: left + 'px'
        }
      })
    },
    beautiClickEvent (ev) {
      if (this.event.target !== ev.target && !this.$el.contains(ev.target)) {
        this.visible = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.beauti-context {
  position: fixed;
  border-radius:5px;
  box-shadow: 0 5px 10px rgba(0,0,0,.15);
  background-color: #fff;
  opacity: .97;
  transition: all .2s cubic-bezier(0,.5,0,1) 0s;
  transform-origin: center top;

  &.beauti-context-enter, &.beauti-context-leave-to {
    // transform: scaleY(0);
    opacity: 0 !important;
  }
  &.beauti-context-enter-active-to {
    //  transform: scaleY(1);
    opacity: .97 !important;
  }
}
</style>
