<template>
  <div>
    <!-- 日期选择器 -->
    <group>
      <calendar @on-change="onChange" v-model="demo4" title="选择查看日期" show-popup-header popup-header-title="选择查看日期"
                disable-future :replace-text-list="replaceTextList"></calendar>
    </group>

    <div id="myChart" style="width: 100%; height: 380px;padding-top:20px;"></div>


  </div>
</template>

<script type="es6">
  import {Group, Calendar} from 'vux'
  import PullTo from 'vue-pull-to'

  var echarts = require('echarts/lib/echarts');
  require('echarts/lib/component/title');
  require("echarts/lib/chart/line");
  require("echarts/lib/component/tooltip");
  require("echarts/lib/component/dataZoom");
  require("echarts/lib/component/legendScroll");
  export default {
    components: {
      PullTo, Group, Calendar
    },
    data() {
      return {
        demo4: 'TODAY',
        replaceTextList: {
          'TODAY': '今'
        },
      }
    },
    methods: {
      //日历事件
      onChange(val) {
        console.log('on change', val);
      },
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: {
            text: 'xxx冰箱内所有探头温度曲线',
            subtext: '2018-03-23当天温度曲线',
            x: 'center',
            align: 'right'
          },
          grid: {
            bottom: 100
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              animation: false,
              label: {
                backgroundColor: '#505765'
              }
            }
          },
          legend: {
            data: ['探头上', '探头下'],
            x: 'center',
            bottom: 0,
          },
          dataZoom: [
            {
              show: true,
              realtime: true,
              bottom: 30
            },
            {
              type: 'inside',
              realtime: true
            }
          ],
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              axisLine: {onZero: false},
              data: [
                '03/23 0:00', '03/23 1:00', '03/23 2:00', '03/23 3:00', '03/23 4:00', '03/23 5:00',
                '03/23 6:00', '03/23 7:00', '03/23 8:00', '03/23 9:00', '03/23 10:00', '03/23 11:00',
                '03/23 12:00', '03/23 13:00', '03/23 14:00', '03/23 15:00', '03/23 16:00', '03/23 17:00',
                '03/23 18:00', '03/23 19:00', '03/23 20:00', '03/23 21:00', '03/23 22:00', '03/23 23:00',
              ].map(function (str) {
                return str.replace(' ', '\n')
              })
            }
          ],
          yAxis: [
            {
              name: '温度(℃)',
              type: 'value'
            }
          ],
          series: [
            {
              name: '探头上',
              type: 'line',
              animation: false,
              lineStyle: {
                normal: {
                  width: 2
                }
              },
              data: [
                2, 5, 4, 3, 6, 8, 3, 4, 5, 7, 3, 4, 5, 6, 7, 5, 4, 6, 7, 8, 2, 3, 4, 5
              ]
            },
            {
              name: '探头下',
              type: 'line',
              animation: false,
              lineStyle: {
                normal: {
                  width: 2
                }
              },
              data: [
                -1, -2, -3, -2, -3, -2, -3, -5, -7, -3, -5, -4, -3, -5, -2, -1, -2, -3, -4, -5, -5, -6, -5, -2
              ]
            }
          ]
        });
      }
    },
    mounted() {
      this.drawLine();
      this.loadingRemove();
    }
  }
</script>
<style lang="less">

</style>
