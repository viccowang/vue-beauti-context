<template>
  <ul class="beauti-contextmenu-ul">
    <slot></slot>
  </ul>
</template>
<script>
export default {
  name: 'BeautiContextmenu',
  provide () {
    return {
      $$BeautiContextmenu: this
    }
  },
  data () {
    return {
      zIndex: 1001
    }
  }
}
</script>
<style lang="scss">
.beauti-contextmenu-ul {
  padding:4px 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .beauti-contextmenu-submenu {
    padding: 6px 8px 6px 10px;
    cursor: pointer;

    &:hover {
      background-color: #f2f2f2;
    }
  }

  li.beauti-contextmenu-item {
    min-width:100px;
    padding: 6px 8px 6px 10px;
    cursor: pointer;

    .beauti-contextmenu-submenu {
      padding: 0;
    }
  }
}
</style>
