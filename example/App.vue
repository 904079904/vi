<template>
  <vi-container class="app">
    <vi-header class="app-header">
      <router-link to="/"><img class="app-header-logo" alt="logo" src="./assets/logo.png"></router-link>
      <h1 class="app-header-title heading-middle">Vue Components</h1>
      <ul class="app-header-nav">
        <li><router-link class="heading-small" to="/">Home</router-link></li>
        <li><router-link class="heading-small" to="/component/快速上手">Components</router-link></li>
        <li><a class="heading-small" target="_blank" href="https://github.com/luyibiao/vi">Github</a></li>
      </ul>
    </vi-header>
    <vi-container class="app-container">
      <router-view></router-view>
    </vi-container>
  </vi-container>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  .app {
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    &-header {
      box-sizing: border-box;
      height: 80px;
      background-color: #FFF;
      display: flex;
      align-items: center;
      padding: 10px 20px;
      z-index: 100;
      box-shadow: 0 1px 4px 0 rgba(213,218,224,0.5);
      &-logo {
        width: 45px;
      }
      &-title {
        cursor: default;
        margin: 0 20px;
      }
      &-nav {
        margin-left: auto;
        li {
          display: inline-block;
          padding: 0 20px;
          position: relative;
          list-style: none;
          margin-left: 20px;
          a {
            position: relative;
            color: lighten(#5575c8, 10%);
            &:after {
              content: '';
              display: inline-block;
              width: 100%;
              height: 3px;
              position: absolute;
              top: 130%;
              left: 0;
              background-color: #5575c8;
              transform-origin: 50%;
              transform: scaleX(0);
              transition: all .2s .1s ease-in-out;
            }
          }
          &:hover a {
            color: #5575c8;
            &:after {
              transform: scaleX(1);
            }
          }
        }
      }
    }
    &-container {
      flex: 1;
      // overflow-y: hidden;
      overflow: hidden;
    }
  }
</style>
