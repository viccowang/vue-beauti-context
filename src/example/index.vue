<template>
  <div class="beauti-context-example">
    <!-- 实例模式 -->
    <button @click="showCtx">创建一个context实例</button>

    <!-- 指令模式 -->
    <beauti-context 
    ref="menu" 
    style="padding: 10px;"
    @show="showEventHandler" 
    @hide="hideEventHandler"
    >
      hello World
    </beauti-context>
    <button v-beautiContext:menu>通过指令创建一个context</button>

    <!-- 创建一个右键菜单 -->
    <beauti-context ref="ctxmenu" type="contextmenu">
      <beauti-contextmenu>
        <beauti-contextmenu-item>新建</beauti-contextmenu-item>
        <beauti-contextmenu-item>编辑</beauti-contextmenu-item>
        <beauti-contextmenu-item>删除</beauti-contextmenu-item>
        <beauti-contextmenu-item divider></beauti-contextmenu-item>
        <beauti-context-submenu label="其他操作">
          <beauti-contextmenu-item>锁定</beauti-contextmenu-item>
          <beauti-contextmenu-item>报警</beauti-contextmenu-item>
        </beauti-context-submenu>
      </beauti-contextmenu>
    </beauti-context>
    <button v-beautiContext:ctxmenu>通过指令创建一个右键菜单</button>

    <hr>
    <span>* 更多使用办法还请参考<a href="https://github.com/viccowang/vue-beauti-context" target="blank">文档</a></span>
    或者Pen上的<a href="https://codepen.io/vicco/pen/WWaoZe" target="blank">一些其他例子</a>
  </div>
</template>
<script>
import Vue from 'vue'
import BeautiContext from '../components/beautiContext'

Vue.use(BeautiContext)

export default {
  name: 'BeautiCtxExample',
  methods: {
    showCtx (event) {
      this.$beautiContext({
        event,
        text: 'Hello World!',
        customStyle: {
          padding: '10px'
        },
        show () { },
        hide () { }
      })
    },
    showEventHandler () { },
    hideEventHandler () { }
  }
}
</script>
<style lang="scss" scoped>
.beauti-context-example {
  font-size:.8rem;

  hr {
    height: 1px;
    background-color: darken(#e5eaf0, 8%);
    border: transparent;
  }

  button {
    margin: 15px;
  }

}
</style>
