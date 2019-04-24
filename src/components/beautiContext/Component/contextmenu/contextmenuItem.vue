<template>
  <li class="beauti-contextmenu-item" :class="{divider, disabled}" @click="handleClick">
    <span class="icon" v-if="icon"></span>
    <span class="content">
      <slot v-if="!divider"></slot>
    </span>
  </li>
</template>
<script>
export default {
  name: 'BeautiContextmenuItem',
  inject: ['$$BeautiContext'],
  props: {
    icon: {
      type: String
    },
    divider: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    }
  },
  methods: {
    handleClick () {
      if (!this.disabled) {
        // 回传点击事件
        this.$emit('click', this, this.$$BeautiContext.event, this.$$BeautiContext.slotData)
        // 点击contextmenu item 需要自动隐藏 contextmenu
        this.$$BeautiContext.visible = false
      }
    }
  }
}
</script>
<style lang="scss">
.beauti-contextmenu-item {

  span {
    display: inline-block;

    &.icon {
      width: 25px;
    }

    &.content {

    }
  }

  &.divider {
    height:1px;
    display: flex;
    line-height: 1px;
    overflow: hidden;

    &:after {
      content: '';
      align-items: center;
      display: inline-block;
      width: 100%;
      height: 1px;
      background-color: #f2f2f2;
    }
  }

  &.disabled{
    color: #cbcbcb;
    cursor: default;
  }

  &:hover:not(.divider):not(.disabled) {
    background-color: #f2f2f2;
  }

}
</style>
