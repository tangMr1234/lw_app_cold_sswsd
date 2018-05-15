<template>
  <div class="gridCheck">
    <div ref="textareaHeight">
      <!-- 日期选择器 -->
      <group>
        <calendar @on-change="onChange" v-model="demo4" title="选择查看日期" show-popup-header popup-header-title="选择查看日期"
                  disable-future :replace-text-list="replaceTextList"></calendar>
      </group>
      <!-- 探头单选组 -->
      <checklist title="选择探头" :options="commonList" v-model="radioValue" :max="1" @on-change="change"></checklist>
      <!-- table表头 -->
      <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
        <thead>
        <tr style="background-color: #F7F7F7">
          <th width="40%">日期</th>
          <th width="30%">温度</th>
          <th width="30%">湿度</th>
        </tr>
        </thead>
      </x-table>
    </div>
    <!-- 可滚动的Table数据 -->
    <!-- 数据加载loading -->
    <div v-show="load"
         :style="'height:'+scrollHeight+'px;overflow: hidden;text-align:center;position:absolute;bottom:0;left:0;z-index:99;background:#fff;width:100%;'">
      <spinner type="spiral" style="position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;"></spinner>
    </div>
    <div :style="'height:'+scrollHeight+'px;overflow: hidden;'" v-show="!load">
      <pull-to>
        <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
          <tbody>
          <tr v-for="(data, index) in tableData" :key="index">
            <td width="40%">{{data.date}}</td>
            <td width="30%">{{data.temp}}℃</td>
            <td width="30%">{{data.humi}}% RH</td>
          </tr>
          </tbody>
        </x-table>

      </pull-to>
    </div>

  </div>
</template>

<script type="es6">
  import {Group, Calendar, Checklist, XTable, Spinner} from 'vux'
  import PullTo from 'vue-pull-to'

  export default {
    components: {
      PullTo, Group, Calendar, Checklist, XTable, Spinner
    },
    data() {
      return {
        demo4: 'TODAY',
        replaceTextList: {
          'TODAY': '今'
        },
        commonList: ['探头01', '探头02', '探头03'],
        radioValue: ['探头01'],
        scrollHeight: 0, //设置可滚动区域初始高度
        //  表格数据
        tableData: [
          {date: "2018-03-23 13:54", temp: "30", humi: "70"},
          {date: "2018-03-23 13:54", temp: "30", humi: "70"},
          {date: "2018-03-23 13:54", temp: "30", humi: "70"},
          {date: "2018-03-23 13:54", temp: "30", humi: "70"},
          {date: "2018-03-23 13:54", temp: "30", humi: "70"},
          {date: "2018-03-23 13:54", temp: "30", humi: "70"},
          {date: "2018-03-23 13:54", temp: "30", humi: "70"},
          {date: "2018-03-23 13:54", temp: "39", humi: "70"},
          {date: "2018-03-23 13:54", temp: "10", humi: "90"},
          {date: "2018-03-23 13:54", temp: "30", humi: "20"},
          {date: "2018-03-23 13:54", temp: "10", humi: "90"},
          {date: "2018-03-23 13:54", temp: "30", humi: "20"},
          {date: "2018-03-23 13:54", temp: "10", humi: "90"},
          {date: "2018-03-23 13:54", temp: "130", humi: "20"},
        ],
        types: 'spiral',
        load: true
      }
    },
    methods: {
      //日历事件
      onChange(val) {
        console.log('on change', val);
        this.loadData();
      },
      //单选按钮组事件
      change(val, label) {
        console.log('change', val, label);
        this.loadData();
      },
      //数据加载
      loadData() {
        this.load = true;
        setTimeout(() => {
          this.load = false;
        }, 1000)
      },
      //计算可滚动区域的高度
      setscrollHeight() {
        var height = document.documentElement.clientHeight;
        var heightCss = this.$refs.textareaHeight.offsetHeight + 64;
        this.scrollHeight = height - heightCss;
      },
    },
    mounted() {
      this.setscrollHeight();
      this.loadingRemove();
    }
  }
</script>
<style lang="less">
  .gridCheck .weui-check_label {
    float: left;
  }

  .gridCheck .weui-cell:before {
    border-top: none;
  }

  .gridCheck tr:nth-child(even) {
    background: #f7f7f7;
  }
</style>
