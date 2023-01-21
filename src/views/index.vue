<template>
  <div>
    <ItalicTitle>
      {{ $t($route.meta.title) }}
    </ItalicTitle>
    <div id="demoChart" style="width: 600px; height: 840px;"></div>
  </div>
</template>

<script setup>
let echarts = inject("echarts")

/**
 * 折线图
 * */
const changeType = () => {
  // 获取组件实例
  const demoChart = echarts.init(document.getElementById("demoChart"))
  // 设置配置项
  const option = {
    xAxis: {
      data: ["A", "B", "C", "D", "E"],
    },
    yAxis: {},
    series: [
      {
        data: [10, 22, 28, 43, 49],
        type: "line",
        stack: "x",
      },
      {
        data: [5, 4, 3, 5, 10],
        type: "line",
        stack: "x",
      },
    ],
  }
  // 复制
  demoChart.setOption(option)
  // 根据页面大小自动响应图表大小
  window.addEventListener("resize", function () {
    demoChart.resize()
  })
}

onMounted(() => {
  changeType()
})
</script>