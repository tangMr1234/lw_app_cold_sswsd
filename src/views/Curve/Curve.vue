<template>
  <div>
    <!-- 日期选择器 -->
    <group>
      <calendar @on-change="onChange" v-model="demo4" title="选择查看日期" show-popup-header popup-header-title="选择查看日期"
                disable-future :replace-text-list="replaceTextList"></calendar>
    </group>
    <!-- F2图表 -->
    <v-chart :data="data">
      <v-scale x type="timeCat" mask="MM/DD" :tick-count="3"/>
      <v-scale y :min="0" alias="日均温度" :tick-count="5"/>
      <v-point
        :style="{
          stroke: '#fff',
          lineWidth: 1
        }"
        shape="smooth"/>
      <v-line shape="smooth"/>
    </v-chart>
  </div>
</template>

<script>
  import {VChart, VLine, VPoint, VScale, VTooltip, Group, Calendar} from 'vux'

  export default {
    components: {
      VChart,
      VPoint,
      VLine,
      VScale,
      VTooltip,
      Group, Calendar
    },
    data() {
      return {
        demo4: 'TODAY',
        replaceTextList: {
          'TODAY': '今'
        },
        data: [
          {time: '2016-08-08 00:00:00', tem: 10},
          {time: '2016-08-08 00:10:00', tem: 22},
          {time: '2016-08-08 00:30:00', tem: 20},
          {time: '2016-08-09 00:35:00', tem: 26},
          {time: '2016-08-09 01:00:00', tem: 20},
          {time: '2016-08-09 01:20:00', tem: 26},
          {time: '2016-08-10 01:40:00', tem: 28},
          {time: '2016-08-10 02:00:00', tem: 20},
          {time: '2016-08-10 02:20:00', tem: 18}
        ]
      }
    },
    methods: {
      //日历事件
      onChange(val) {
        console.log('on change', val);
      },
    },
    mounted() {
      this.loadingRemove();
    }
  }
</script>

<style lang='css'>
</style>
