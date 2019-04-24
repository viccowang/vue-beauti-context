<template>
  <li
    class="beauti-contextmenu-submenu"
    ref="submenu"
    @mouseenter="showSubmenuHandler"
    @mouseleave="hideSubmenuHandler"
  >
    <span v-if="icon" class="icon"></span>
    <span class="content">{{ label }}</span>
    <span class="more"><img width="16" height="16" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTU1OTE0OTE1MTYxIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI5MDYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNjg5LjYyMSA1MTJsLTMyOC44MzItMzI4LjgzMi02MC4zMzEgNjAuMzMxIDI2OC41MDEgMjY4LjUwMS0yNjguNTAxIDI2OC41MDEgNjAuMzMxIDYwLjMzMXoiIHAtaWQ9IjI5MDciIGZpbGw9IiNiZmJmYmYiPjwvcGF0aD48L3N2Zz4="/></span>

    <ul class="beauti-contextmenu-sub-ul" ref="subMenuListRef" v-show="showSubmenu" :style="menuPos">
      <slot></slot>
    </ul>
  </li>
</template>
<script>
import { _fixesContextPos } from '../../Utils'
export default {
  name: 'BeautiContextSubmenu',
  inject: ['$$BeautiContextmenu'],
  props: {
    icon: {
      type: String
    },
    label: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      enterTimer: null,
      outTimer: null,
      menuPos: {},
      showSubmenu: false
    }
  },
  watch: {
    showSubmenu (isShow) {
      if (isShow) {
        const subMenuRef = this.$refs.submenu
        const subMenuListRef = this.$refs.subMenuListRef
        const zIndex = this.$$BeautiContextmenu.zIndex
        this.$$BeautiContextmenu.zIndex++
        if (subMenuRef) {
          this.$nextTick(() => {
            const menuPos = _fixesContextPos(subMenuRef, subMenuListRef, 'submenu')
            this.menuPos = {
              left: `${menuPos.left}px`,
              top: `${menuPos.top}px`,
              zIndex
            }
          })
        }
      } else {
        this.menuPos = {}
        this.$$BeautiContextmenu.zIndex--
      }
    }
  },
  methods: {
    showSubmenuHandler () {
      clearTimeout(this.outTimer)
      this.enterTimer = setTimeout(() => {
        this.showSubmenu = true
      }, 300)
    },
    hideSubmenuHandler () {
      clearTimeout(this.enterTimer)
      this.outTimer = setTimeout(() => {
        this.showSubmenu = false
      }, 300)
    }
  }
}
</script>
<style lang="scss" scoped>
.beauti-contextmenu-submenu {
  position: relative;
  display: flex;
  box-sizing: border-box;

  span {
    display: inline-block;

    &.icon {
      width: 25px;
    }

    &.content {
      flex:1;
    }

    &.more {
      position: relative;
      width: 15px;
      margin-left: 15px;

      img {
        position: absolute;
      }
    }
  }

  .beauti-contextmenu-sub-ul {
    position: absolute;
    padding:4px 0;
    border-radius:5px;
    box-shadow: 0 5px 10px rgba(0,0,0,.15);
    background-color: #fff;
    opacity: .97;
  }
}
</style>
