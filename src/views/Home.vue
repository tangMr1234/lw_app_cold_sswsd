<template>
  <div style="height: 100%;overflow: hidden;">
    <x-header :title="this.$route.name" @on-click-back="goBack" :left-options="{preventGoBack: true}"
              style="z-index: 100;background-color:#409eff;">
      <a slot="right" style="color:#fff;"
         @click="showFilter">
        <i class="iconfont icon-sousuo" style="font-size:20px;"></i>
        <small style="vertical-align: top;">筛选</small>
      </a>
    </x-header>
    <!-- 统计结果展示条 -->
    <group gutter="0">
      <cell :inline-desc="TableData.total"></cell>
    </group>
    <div style="height:calc(100% - 81px);overflow: hidden;">
      <pull-to :top-load-method="refresh" @infinite-scroll="infinite" @top-state-change="stateChange">
        <!-- 下拉刷新 -->
        <template slot="top-block" slot-scope="props">
          <div class="top-load-wrapper">
            <svg class="icon"
                 :class="{
						'icon-arrow': props.state === 'trigger',
						'icon-loading': props.state === 'loading'
					}"
                 aria-hidden="true">
              <use :xlink:href="iconLink"></use>
            </svg>
            {{ props.stateText }}
          </div>
        </template>
        <!-- 数据展示列表 -->
        <div v-for="item in TableData.data">
          <!-- 区县单位结果 -->
          <sticky>
            <group gutter="10">
              <cell>
                <div slot="title"><span
                  style="color: rgb(64, 158, 255);">{{item.region.city}}</span> > <span
                  style="color: rgb(64, 158, 255);">{{item.region.area}}</span> > {{item.region.unit}}
                </div>
              </cell>
            </group>
          </sticky>
          <!-- 数据列表型展示 -->
          <flexbox :gutter="0">
            <flexbox-item>
              <group class="TableBorderNone" label-width="6em" v-for="item in item.cooler">
                <group-title slot="title">{{item.title}}<span :style="'color:'+item.bgColor+';float:right;'">{{item.type}}</span>
                </group-title>
                <cell primary="content" @click.native="showComment"><img
                  :src="item.img"
                  alt="" slot="title">
                  <div slot="value" style="text-align:left;">
                    <x-table :cell-bordered="false" :content-bordered="false" v-for="data in item.sensorData">
                      <tbody>
                      <tr>
                        <td style="color:#444;text-align:left;padding-left:30px;">{{data.sensor}}</td>
                        <td style="text-align:right;">{{data.date}}</td>
                      </tr>
                      <tr>
                        <td style="color:#333;text-align:left;padding-left:30px;" :style="'color:'+data.bgColor">
                          {{data.temp}}
                          <badge v-if="data.type!='正常'" :text="data.type" :style="'background:'+data.bgColor"
                                 :class="item.type==='正常'?'':'warn'"></badge>
                        </td>
                        <td style="text-align:right;">{{data.humi}}</td>
                      </tr>
                      </tbody>
                    </x-table>
                  </div>
                </cell>
              </group>
            </flexbox-item>
          </flexbox>
        </div>
        <!-- 加载更多 -->
        <load-more :show-loading="infiniteLoading" :tip="infiniteTip"></load-more>
      </pull-to>
    </div>
    <!-- 详情弹出层 -->
    <p-filter ref="popup" :popupWidth="popupWidth">
      <s-list slot="Popup" @reset="showFilter" v-show="Filter"></s-list>
      <s-comment slot="Popup" @reset="showComment" v-show="Comment"></s-comment>
    </p-filter>
  </div>
</template>

<script type="es6">
  import {XHeader, LoadMore, Group, GroupTitle, Cell, Sticky, Flexbox, FlexboxItem, XTable, Badge} from 'vux'
  import PullTo from 'vue-pull-to'

  export default {
    components: {
      PullTo,
      XHeader,
      LoadMore,
      Group,
      GroupTitle,
      Cell,
      Sticky,
      Flexbox,
      FlexboxItem,
      XTable,
      Badge,
      PFilter: resolve => {
        require(['@/components/popupFilter.vue'], resolve)
      },
      SComment: resolve => {
        require(['@/views/Frame.vue'], resolve)
      },
      SList: resolve => {
        require(['@/views/Popup/Filter'], resolve)
      }
    },
    data() {
      return {
        Comment: false,
        Filter: false,
        popupWidth: '100%', //弹出层的宽度设置
        infiniteLoading: true,
        infiniteTip: "正在加载",
        iconLink: '', //下拉刷新的状态
        TableData: {
          total: '"接种门诊..." 的相关结果：100条',
          data: [{
            region: {
              city: '天津市',
              area: '河东区',
              unit: '河东中心医院'
            },
            cooler: [
              {
                title: "冰箱001",
                img: "https://m.360buyimg.com/mobilecms/s357x357_jfs/t3181/129/4040202/36427/7b68fc5a/579f23ccN5e22e48f.jpg!q50.jpg",
                type: "正常",
                bgColor: "",
                sensorData: [
                  {sensor: "探头上", date: "16:23", temp: "50℃", humi: "70%RH", type: "正常", bgColor: ""},
                  {sensor: "探头下", date: "16:20", temp: "20℃", humi: "70%RH", type: "正常", bgColor: ""},
                ]
              },
              {
                title: "冰箱003",
                img: "https://m.360buyimg.com/mobilecms/s357x357_jfs/t3181/129/4040202/36427/7b68fc5a/579f23ccN5e22e48f.jpg!q50.jpg",
                type: "超温",
                bgColor: "#FF4040",
                sensorData: [
                  {sensor: "探头上1", date: "16:23", temp: "33℃", humi: "70%RH", type: "超温", bgColor: "#FF4040"},
                  {sensor: "探头上2", date: "16:23", temp: "20℃", humi: "70%RH", type: "正常", bgColor: ""},
                  {sensor: "探头上3", date: "16:23", temp: "30℃", humi: "70%RH", type: "正常", bgColor: ""},
                  {sensor: "探头下1", date: "16:23", temp: "-10℃", humi: "70%RH", type: "正常", bgColor: ""}
                ]
              }
            ]
          }, {
            region: {
              city: '天津市',
              area: 'xx区',
              unit: 'xx中心医院'
            },
            cooler: [
              {
                title: "冰箱011",
                img: "https://m.360buyimg.com/mobilecms/s357x357_jfs/t3181/129/4040202/36427/7b68fc5a/579f23ccN5e22e48f.jpg!q50.jpg",
                type: "离线",
                bgColor: "#B0B0B0",
                sensorData: [
                  {sensor: "探头上", date: "16:23", temp: "50℃", humi: "70%RH", type: "离线", bgColor: "#B0B0B0"},
                  {sensor: "探头下", date: "16:20", temp: "20℃", humi: "70%RH", type: "正常", bgColor: ""},
                ]
              },
              {
                title: "冰箱022",
                img: "https://m.360buyimg.com/mobilecms/s357x357_jfs/t3181/129/4040202/36427/7b68fc5a/579f23ccN5e22e48f.jpg!q50.jpg",
                type: "低温",
                bgColor: "#00E5EE",
                sensorData: [
                  {sensor: "探头003", date: "16:23", temp: "1℃", humi: "70%RH", type: "低温", bgColor: "#00E5EE"}
                ]
              },
              {
                title: "冰箱13",
                img: "https://m.360buyimg.com/mobilecms/s357x357_jfs/t3181/129/4040202/36427/7b68fc5a/579f23ccN5e22e48f.jpg!q50.jpg",
                type: "正常",
                bgColor: "",
                sensorData: [
                  {sensor: "探头上1", date: "16:23", temp: "33℃", humi: "70%RH", type: "正常", bgColor: ""},
                  {sensor: "探头上2", date: "16:23", temp: "20℃", humi: "70%RH", type: "正常", bgColor: ""},
                  {sensor: "探头下1", date: "16:23", temp: "-10℃", humi: "70%RH", type: "正常", bgColor: ""}
                ]
              },
              {
                title: "冰箱13",
                img: "https://m.360buyimg.com/mobilecms/s357x357_jfs/t3181/129/4040202/36427/7b68fc5a/579f23ccN5e22e48f.jpg!q50.jpg",
                type: "正常",
                bgColor: "",
                sensorData: [
                  {sensor: "探头上1", date: "16:23", temp: "33℃", humi: "70%RH", type: "正常", bgColor: ""},
                  {sensor: "探头上2", date: "16:23", temp: "20℃", humi: "70%RH", type: "正常", bgColor: ""},
                  {sensor: "探头下1", date: "16:23", temp: "-10℃", humi: "70%RH", type: "正常", bgColor: ""}
                ]
              },
              {
                title: "冰箱13",
                img: "https://m.360buyimg.com/mobilecms/s357x357_jfs/t3181/129/4040202/36427/7b68fc5a/579f23ccN5e22e48f.jpg!q50.jpg",
                type: "正常",
                bgColor: "",
                sensorData: [
                  {sensor: "探头上1", date: "16:23", temp: "33℃", humi: "70%RH", type: "正常", bgColor: ""},
                  {sensor: "探头上2", date: "16:23", temp: "20℃", humi: "70%RH", type: "正常", bgColor: ""},
                  {sensor: "探头下1", date: "16:23", temp: "-10℃", humi: "70%RH", type: "正常", bgColor: ""}
                ]
              },
              {
                title: "冰箱13",
                img: "https://m.360buyimg.com/mobilecms/s357x357_jfs/t3181/129/4040202/36427/7b68fc5a/579f23ccN5e22e48f.jpg!q50.jpg",
                type: "正常",
                bgColor: "",
                sensorData: [
                  {sensor: "探头上1", date: "16:23", temp: "33℃", humi: "70%RH", type: "正常", bgColor: ""},
                  {sensor: "探头上2", date: "16:23", temp: "20℃", humi: "70%RH", type: "正常", bgColor: ""},
                  {sensor: "探头下1", date: "16:23", temp: "-10℃", humi: "70%RH", type: "正常", bgColor: ""}
                ]
              },
              {
                title: "冰箱13",
                img: "https://m.360buyimg.com/mobilecms/s357x357_jfs/t3181/129/4040202/36427/7b68fc5a/579f23ccN5e22e48f.jpg!q50.jpg",
                type: "正常",
                bgColor: "",
                sensorData: [
                  {sensor: "探头上1", date: "16:23", temp: "33℃", humi: "70%RH", type: "正常", bgColor: ""},
                  {sensor: "探头上2", date: "16:23", temp: "20℃", humi: "70%RH", type: "正常", bgColor: ""},
                  {sensor: "探头下1", date: "16:23", temp: "-10℃", humi: "70%RH", type: "正常", bgColor: ""}
                ]
              },
              {
                title: "冰箱13",
                img: "https://m.360buyimg.com/mobilecms/s357x357_jfs/t3181/129/4040202/36427/7b68fc5a/579f23ccN5e22e48f.jpg!q50.jpg",
                type: "正常",
                bgColor: "",
                sensorData: [
                  {sensor: "探头上1", date: "16:23", temp: "33℃", humi: "70%RH", type: "正常", bgColor: ""},
                  {sensor: "探头上2", date: "16:23", temp: "20℃", humi: "70%RH", type: "正常", bgColor: ""},
                  {sensor: "探头下1", date: "16:23", temp: "-10℃", humi: "70%RH", type: "正常", bgColor: ""}
                ]
              },
              {
                title: "冰箱13",
                img: "https://m.360buyimg.com/mobilecms/s357x357_jfs/t3181/129/4040202/36427/7b68fc5a/579f23ccN5e22e48f.jpg!q50.jpg",
                type: "正常",
                bgColor: "",
                sensorData: [
                  {sensor: "探头上1", date: "16:23", temp: "33℃", humi: "70%RH", type: "正常", bgColor: ""},
                  {sensor: "探头上2", date: "16:23", temp: "20℃", humi: "70%RH", type: "正常", bgColor: ""},
                  {sensor: "探头下1", date: "16:23", temp: "-10℃", humi: "70%RH", type: "正常", bgColor: ""}
                ]
              }
            ]
          }]
        }
      }
    },
    mounted() {
      if (!sessionStorage.getItem('warn')) {
        this.alert("提示", "试用应用的演示数据，仅供APP体验，试用期间该弹窗可暂时关闭！", "知道了", this.setSession); //使用main中的全局方法调用弹窗
      }
      this.loadingRemove();
    },
    methods: {
      //设置sessionstorage来打开warn弹窗
      setSession() {
        sessionStorage.setItem('warn', 'yes');
      },
      onImgError(item, $event) {
        //console.log(item, $event)
      },
      //  通过postMessage调用iframe父组件的方法
      goBack() {
        let link = parent.window.location.href.split("#");
        window.parent.postMessage('closeLwFrame', link[0]);
      },
      //打开详情
      showComment() {
        this.Comment = true;
        this.Filter = false;
        this.popupWidth = "100%";
        this.$refs.popup.show(); //  调用子组件的方法
      },
      showFilter() {
        this.Filter = true;
        this.Comment = false;
        this.popupWidth = "87%";
        this.$refs.popup.show(); //  调用子组件的方法
      },
      //上拉操作
      infinite(done) {

      },
      //下拉刷新
      refresh(loaded) {
        setTimeout(() => {
          this.infiniteLoading = true;
          this.infiniteTip = "正在加载";
          loaded('done');
        }, 300);
      },
      //下拉时的顶部状态改变
      stateChange(state) {
        if (state === 'pull' || state === 'trigger') {
          this.iconLink = '#icon-arrow-bottom';
        } else if (state === 'loading') {
          this.iconLink = '#icon-loading';
        } else if (state === 'loaded-done') {
          this.iconLink = '#icon-finish';
        }
      }
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .top-load-wrapper {
    line-height: 50px;
    text-align: center;
  }

  .icon-arrow {
    transition: .2s;
    transform: rotate(180deg);
  }

  .icon-loading {
    transform: rotate(0deg);
    animation-name: loading;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  img {
    width: 100%;
  }

  .TableBorderNone .vux-table td:before, .TableBorderNone .vux-table:after {
    border: none;
  }

  .TableBorderNone table + table {
    border-top: 1px solid #C7C7C7;
  }

  .warn {
    color: #fff !important;
  }
</style>
