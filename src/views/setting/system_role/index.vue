<template>
  <div>
    <h2>身份管理</h2>
    <!-- 添加 -->
    <div>
      <el-button type="text" @click="addFn">添加</el-button>
      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.role_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="特殊资源" :label-width="formLabelWidth">
            <el-radio-group v-model="form.status">
              <el-radio label="1">开启</el-radio>
              <el-radio label="0">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="权限" :label-width="formLabelWidth">
            <el-tree
              :data="this.menusArr"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[2, 3]"
              :default-checked-keys="[5]"
              :props="defaultProps"
            >
            </el-tree>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureFn">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- table -->
    <div>
      <el-table :data="dataArr" border style="width: 100%">
        <el-table-column fixed prop="id" label="ID" width="150">
        </el-table-column>
        <el-table-column prop="role_name" label="身份管理" width="120">
        </el-table-column>
        <el-table-column prop="rules" label="权限" width="1020">
          <template slot-scope="scope">
            <span class="zhi">{{ scope.row.rules }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
          <template slot-scope="scope">
            <el-switch
              :value="scope.row.status === 1 ? true : false"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="cutFn(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  getIdList,
  getCutStatusList,
  getAddList,
  getAddCutList,
} from "../../../api/identityManagement";
export default {
  components: {},
  props: {},
  data() {
    return {
      dataArr: [],
      //状态
      cutStatus: "",
      //添加数据
      form: {
        checked_menus: [
          7, 369, 368, 367, 366, 1, 22, 685, 620, 191, 187, 186, 105, 3, 578,
          177, 176, 175, 174, 173, 172, 171,
        ],
        id: "0",
        role_name: "",
        status: "1",
      },
      formLabelWidth: "120px",
      dialogFormVisible: false,
      //菜单
      menusArr: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    };
  },
  computed: {},
  methods: {
    handleClick(row) {
      //console.log(row);
    },
    //添加按钮
    addFn() {
      this.dialogFormVisible = true;
    },
    //状态切换
    cutFn(v) {
      this.cutStatus = !v.status;
      console.log("status", v);
      const params = {
        id: v.id,
        status: this.cutStatus == true ? 1 : 0,
      };
      getCutStatusList(params).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.$message({
            showClose: true,
            message: "切换成功",
          });
          this.getIdList();
        }
      });
    },
    //确认添加
    sureFn() {
      console.log(this.form);
      this.dialogFormVisible = false;
      //   getAddCutList(this.form).then(res=>{
      //       console.log(res);
      //   })
    },
    //页面数据
    async getIdList() {
      const params = {
        status: "",
        role_name: "",
        page: 1,
        limit: 20,
      };
      const result = await getIdList(params);
      this.dataArr = result.data.list;
    },
    //添加接口
    async getAddList() {
      const result = await getAddList();
      console.log(result);
      this.menusArr = result.data.menus;
    },
  },
  created() {
    this.getIdList();
    this.getAddList();
  },
  mounted() {},
};
</script>
<style scoped>
.zhi {
  width: 500px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>