<template>
  <div>
    <popup v-model="show9" position="right" :width="popupWidth">
      <slot name="Popup"></slot>
    </popup>
  </div>
</template>

<script type="es6">
  import {TransferDom, Popup} from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Popup
    },
    props:['popupWidth'],
    data() {
      return {
        show9: false,
      }
    },
    methods: {
      show() {
        this.show9 = !this.show9;
      }
    },
    mounted() {

    }
  }
</script>
<style lang="less" scoped>
  @import '~vux/src/styles/close.less';

  .popup0 {
    padding-bottom: 15px;
    height: 200px;
  }

  .popup1 {
    width: 100%;
    height: 100%;
  }

  .popup2 {
    padding-bottom: 15px;
    height: 400px;
  }

  .position-vertical-demo {
    background-color: #ffe26d;
    color: #000;
    text-align: center;
    padding: 15px;
  }

  .position-horizontal-demo {
    position: relative;
    height: 100%;
    .vux-close {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%) scale(4);
      color: #000;
    }
  }
</style>
