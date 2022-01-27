<template>
  <div class="inpBox">
    <el-form :model="forms">
      <el-input style="width:100px" placeholder="请输入内容" v-model="forms.sui"></el-input>
      <el-button type="primary" size="mini" @click="addFn">确认</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["i"],
  data() {
    return {
      forms: {
        sui: "",
        is: this.i,
      },
    };
  },
  computed: {},
  methods: {
    addFn() {
      console.log(this.forms);
     
      this.$emit("shijian", this.forms);
       this.forms.sui=""
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="scss">
.inpBox {
  width: 100%;
  height: 100%;
  .el-input__inner {
    width: 100px;
  }
}
</style>