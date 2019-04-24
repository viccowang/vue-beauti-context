<template>
  <div id="app">
    <div class="logo">
      <img src="./assets/logo.png" width="70" height="70">
    </div>
    <h2>Beauti Context Component 
      <span>for Vue 2.x</span>
    </h2>
    <div class="shield">
      <span>
        <a href="https://www.npmjs.com/package/vue-beauti-context"><img src="https://img.shields.io/npm/v/vue-beauti-context.svg?style=flat-square" /></a>
      </span>
      <span>
        <img src="https://img.shields.io/npm/l/vue-beauti-context.svg" alt="">
      </span>
    </div>

    <section>
      <h4>描述</h4>
      <p>该组件可以通过鼠标事件，使用Vue实例化或者指令的方式生成一个弹出窗口，窗口内容可以是文本，或者同步、异步的Vue组件，可以是任何内容</p>
      <p>该组件集成了一个制作好的右键菜单组件，可以直接通过指令的方式使用</p>
    </section>
    <section>
      <h4>功能</h4>
      <ul>
        <li>两种创建方式，即通过当前实例创建， 也可以通过指令的方式方式创建</li>
        <li>可自定义鼠标事件，例如click,mouseenter或者contextmenu</li>
        <li>可自定义窗口内容，包括文本，组件，任意内容均可</li>
        <li>可自定义窗口内部样式</li>
        <li>集成了完美的多级右键菜单模式，可静态创建也可动态创建，支持参数传递等</li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
html, body {
  padding: 0;
  margin: 0;
  font-size: 16px;
}
#app {
  position: relative;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 50px;

  .logo {
  }

  h2 {
    padding: 10px 0 20px 0;

    span {
      display: inline-block;
      padding: 5px;
      font-weight: 400;
      background-color:#2c3e50;
      color: rgb(214, 214, 214);
      border-radius:5px;
      transform: scale(.7);
    }
  }

  .shield {
    span {
      display: inline-block;
      margin: 0 10px;
    }
  }

  section {
    margin: 20px 0;
    padding: 20px;
    border-radius: 15px;
    background-color:#e5eaf0;
    text-align: left;
    box-shadow: 0 5px 5px rgba(0,0,0,.04);

    h4, p {
     
    }

    p { text-indent: 2rem;}

    ul {

      li {
        padding: 6px;
      }
    }

  }
}
</style>
