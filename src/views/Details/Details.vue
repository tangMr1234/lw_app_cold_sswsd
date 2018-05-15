<template>
  <div class="details" style="height:100%;">
    <pull-to>
      <!-- 装备信息table -->
      <group :title="details.compony">
        <x-table>
          <tbody>
          <tr>
            <td rowspan="6" width="30%"><img
              :src="details.coolerimg"
              alt=""></td>
            <td style="text-align:left;padding:0 30px;"><span style="color:#666;">{{details.coolername.label}}：</span>
              {{details.coolername.value}}
            </td>
          </tr>
          <tr v-for="(data,index) in details.cooler" :key="index">
            <td style="text-align:left;padding:0 30px;"><span style="color:#666;">{{data.label}}：</span>
              {{data.value}}
            </td>
          </tr>
          </tbody>
        </x-table>
      </group>
      <!-- 装备温区table -->
      <group :title="details.spacetitle">
        <x-table>
          <tbody v-for="(data, index) in details.space" :key="index">
          <tr>
            <td rowspan="2" width="30%">{{data.label}}：</td>
            <td style="text-align:left;padding:0 30px;"><span
              style="color:#666;display:inline-block;width:90px;text-align:right;">{{data.label1}}：</span>
              {{data.value1}}
            </td>
          </tr>
          <tr>
            <td style="text-align:left;padding:0 30px;"><span
              style="color:#666;display:inline-block;width:90px;text-align:right;">{{data.label2}}：</span>
              {{data.value2}}
            </td>
          </tr>
          </tbody>
        </x-table>
      </group>
      <!-- 分割线 -->
      <divider></divider>
      <divider>该装备拥有探头信息</divider>
      <!-- 装备探头信息 -->
      <group :gutter="10" v-for="(data, index) in sensor" :key="index">
        <cell :title="data.name.label+'：'+data.name.value" :inline-desc="data.sn.label+'：'+data.sn.value">
          <div slot="default">{{data.model.label}}：{{data.model.value}}
            <br>
            {{data.enabledate.label}}：{{data.enabledate.value}}
          </div>
        </cell>
      </group>
    </pull-to>
  </div>
</template>

<script type="es6">
  import {Group, Cell, Divider, XTable} from 'vux'
  import PullTo from 'vue-pull-to'

  export default {
    components: {
      PullTo, Group, Cell, Divider, XTable
    },
    data() {
      return {
        details: {
          "compony": "天津市某某区疾控中心",
          "spacetitle": "温区详情",
          "coolerimg": "https://m.360buyimg.com/mobilecms/s357x357_jfs/t3181/129/4040202/36427/7b68fc5a/579f23ccN5e22e48f.jpg!q50.jpg",
          "coolername": {
            label: '装备名称',
            value: '江桥一号冰箱'
          },
          "cooler": [{
            label: '装备编号',
            value: 'BX001'
          }, {
            label: '装备类型',
            value: '医用普通冰箱'
          }, {
            label: '装备品牌',
            value: '美的'
          }, {
            label: '装备型号',
            value: 'MD001'
          }, {
            label: '启用日期',
            value: '2018-03-08'
          }],
          "space": [{
            label: '冷藏温区',
            label1: '容积',
            value1: '100L',
            label2: '温度上下限',
            value2: '2℃~8℃'
          }, {
            label: '冷冻温区',
            label1: '容积',
            value1: '100L',
            label2: '温度上下限',
            value2: '-20℃~-8℃'
          }]
        },
        sensor: [
          {
            name: {label: "探头名", value: "探头01"},
            sn: {label: "SN", value: "109101010"},
            model: {label: "型号", value: "LWGT310"},
            enabledate: {label: "启用日期", value: "2018-03-22"}
          },
          {
            name: {label: "探头名", value: "探头02"},
            sn: {label: "SN", value: "209131010"},
            model: {label: "型号", value: "LWGT310"},
            enabledate: {label: "启用日期", value: "2018-03-22"}
          }
        ]
      }
    },
    mounted() {
      this.loadingRemove();
    }
  }
</script>

<style>
  .vux-header-back {
    color: #fff !important;
  }

  .vux-header .vux-header-left .left-arrow:before {
    border-color: #fff !important;
  }

  .details img {
    width: 100%;
  }
</style>
