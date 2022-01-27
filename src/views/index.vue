<template>
  <div>
   <p>首页</p>
   <div style="display:flex">
      <div id="myChart" :style="{ width: '500px', height: '500px' }" />
      <div id="firstChart" :style="{ width: '500px', height: '500px',border:'1px solid red' }" />
   </div>
  
  </div>
</template>

<script>
import { proxyFn,proxyFirstFn } from "../api/select";

export default {
  components: {},
  props: {},
  data() {
    return {
      dataBJ: [],
      dataGZ: [],
      dataSH: [],
    };
  },
  computed: {},
  methods: {
    async proxyFn() {
      const result = await proxyFn();
      this.dataBJ = result.data[0].TianJinXiaoQu;
      this.dataGZ = result.data[1].ShangHaiXiaoQu;
      this.dataSH = result.data[2].BeiJingXiaoQu;
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let lineStyle = {
        width: 1,
        opacity: 0.5,
      };
      // 绘制图表
      myChart.setOption({
        backgroundColor: "#161627",
        title: {
          text: "AQI - Radar",
          left: "center",
          textStyle: {
            color: "#eee",
          },
        },
        legend: {
          bottom: 5,
          data: ["Beijing", "Shanghai", "Guangzhou"],
          itemGap: 20,
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
          selectedMode: "single",
        },
        radar: {
          indicator: [
            { name: "AQI", max: 300 },
            { name: "PM2.5", max: 250 },
            { name: "PM10", max: 300 },
            { name: "CO", max: 5 },
            { name: "NO2", max: 200 },
            { name: "SO2", max: 100 },
          ],
          shape: "circle",
          splitNumber: 5,
          axisName: {
            color: "rgb(238, 197, 102)",
          },
          splitLine: {
            lineStyle: {
              color: [
                "rgba(238, 197, 102, 0.1)",
                "rgba(238, 197, 102, 0.2)",
                "rgba(238, 197, 102, 0.4)",
                "rgba(238, 197, 102, 0.6)",
                "rgba(238, 197, 102, 0.8)",
                "rgba(238, 197, 102, 1)",
              ].reverse(),
            },
          },
          splitArea: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "rgba(238, 197, 102, 0.5)",
            },
          },
        },
        series: [
          {
            name: "Beijing",
            type: "radar",
            lineStyle: lineStyle,
            data: this.dataBJ,
            symbol: "none",
            itemStyle: {
              color: "#F9713C",
            },
            areaStyle: {
              opacity: 0.1,
            },
          },
          {
            name: "Shanghai",
            type: "radar",
            lineStyle: lineStyle,
            data: this.dataGZ,
            symbol: "none",
            itemStyle: {
              color: "#B3E4A1",
            },
            areaStyle: {
              opacity: 0.05,
            },
          },
          {
            name: "Guangzhou",
            type: "radar",
            lineStyle: lineStyle,
            data: this.dataSH,
            symbol: "none",
            itemStyle: {
              color: "rgb(238, 197, 102)",
            },
            areaStyle: {
              opacity: 0.05,
            },
          },
        ],
      });
    
    },
    //firstEXs
    async proxyFirstFn(){
      const result = await proxyFirstFn()
      console.log(result);
    }
 },
  created() {
    this.proxyFn();
    this.proxyFirstFn()
  },
};
</script>
<style scoped>
</style>