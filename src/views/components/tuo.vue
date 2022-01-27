<template>
  <div>
   <div class="item" v-for="(item, index) in divList" :key="index" draggable="true"
   @dragstart="handleDragStart($event, item)"
  @dragenter="handleDragEnter($event, item)"
   :style="{ background: item.color }"
  @dragover.prevent="handleDragover($event, item)"
  @drop="handleDrop($event, item)"
  @dragend="handleDragEnd($event, item)">
  {{item.name}}
</div>
  </div>
</template>

<script>
export default {
 data () {
	return {
		divList: [
          { name: "默认", key: 1, color: "#ED4014" },
          { name: "拼团", key: 2, color: "#009688" },
          { name: "砍价", key: 3, color: "#1E9FFF" },
          { name: "秒杀", key: 4, color: "#FEB900" },
        ],
		dragging: null
	}
},
methods: {
	// 当元素被拖动时
    handleDragStart(e, item) {
      this.dragging = item
    },
    // 当被鼠标拖动的对象进入其容器范围内时触发此事件
    handleDragEnter(e) {
      // 为需要移动的元素设置dragstart事件
      e.dataTransfer.effectAllowed = 'move'
    },
    // 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
    handleDragover(e) {
      // 首先把div变成可以放置的元素，即重写dragenter/dragover
      // 在dragenter中针对放置目标来设置!
      e.dataTransfer.dropEffect = 'move'
    },
    // 当放置被拖元素时
    handleDrop(e, item) {
      e.dataTransfer.dropEffect = 'move'
      if(item === this.dragging){
        return
      }
      const newItems = [...this.divList]
      const from = newItems.indexOf(this.dragging)
      const to = newItems.indexOf(item)
      newItems[from] = item
      newItems[to] = this.dragging
      this.divList = newItems
    },
    // 完成元素拖动后触发
    handleDragEnd() {
      this.dragging = null
    }
}

}
</script>
  
<style>
.item {
	display: inline-block;
	margin-left: 20px;
	margin-bottom: 20px;
	width: 50px;
	height: 35px;
	border-radius: 4px;
    text-align: center;
    line-height: 35px;
    color: white;
	box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
</style>
