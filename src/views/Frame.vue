<template>
  <div style="height:100%;overflow: hidden;">
    <x-header :title="this.$route.name" @on-click-back="goBack" :left-options="{preventGoBack: true}"
              style="z-index: 100;background-color:#409eff;">
    </x-header>
    <iframe :src="link" style="width:100%;height:calc(100% - 46px);border:0;"></iframe>
  </div>
</template>

<script type="es6">
  import {XHeader} from 'vux'

  export default {
    components: {
      XHeader
    },
    data() {
      return {
        link: ''
      }
    },
    mounted() {
      this.link = this.$route.meta.link;
    },
    methods: {
      //  调用父组件的方法
      goBack() {
        this.$emit('reset');
      },
    }
  }
</script>

<style scoped>

</style>
