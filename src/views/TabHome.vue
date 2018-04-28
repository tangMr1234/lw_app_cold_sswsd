<template>
  <div style="height: 100%;width:100%;">
    <div v-for="(item, index) in $router.options.routes" :key="index"
         v-if="item.NewRouter&&item.NewRouter===loadJudge()&&!item.hidden">
      <tab :line-width="2" active-color="rgb(64, 158, 255)" bar-active-color="rgb(64, 158, 255)">
        <tab-item v-for="(data, index) in item.children" :key="index" v-if="!data.hidden"
                  @on-item-click="onItemClick(data.path)" :selected="$route.path === data.path">
          {{data.name}}
        </tab-item>
      </tab>
    </div>
    <div style="height:calc(100vh - 44px);overflow: hidden;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="es6">
  import {Tab, TabItem} from 'vux'

  export default {
    components: {
      Tab, TabItem
    },
    data() {
      return {
        screenWidth: '100%' //tab应设置的宽度
      }
    },
    methods: {
      //Tab点击跳转事件
      onItemClick(link) {
        this.$router.push(link);
      },
      //加载时页面验证事件
      loadJudge() {
        return this.$route.path.split("/")[1];
      }
    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';

</style>
