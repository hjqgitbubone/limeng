<template>
  <div>
    <el-button
      type="primary"
      plain
      size="mini"
      v-hasPermi="['setting-system-admin']"
    >新增</el-button>
      <el-button
      type="primary"
      plain
      size="mini"
      v-hasPermi="['setting-system-role']"
    >删除</el-button>
      管理员列表
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style scoped>
</style>