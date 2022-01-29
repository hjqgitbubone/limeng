<template>
  <div>
    <div>
      <h2 class="user_Guanli">用户管理</h2>
    </div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first">
          <div>
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="用户搜索">
                <el-input
                  v-model="form.name"
                  style="width: 150px"
                  placeholder="请输入"
                ></el-input>
                <el-button type="primary" style="margin-left: 550px"
                  >搜索</el-button
                >
                <el-button>重置</el-button>
                <span @click="zhanFn"> {{ zhankai }}</span>
              </el-form-item>

              <div v-show="show_start" class="form_All">
                <div class="form_Box">
                  <el-form-item label="会员等级">
                    <el-select
                      v-model="form.region"
                      placeholder="请选择活动区域"
                      style="width: 130px"
                    >
                      <el-option
                        :label="v.name"
                        :value="v.id"
                        v-for="(v, i) in vipArr"
                        :key="i"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="活动区域">
                    <el-select
                      v-model="form.a1"
                      placeholder="请选择活动区域"
                      style="width: 130px"
                    >
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="活动区域">
                    <el-select
                      v-model="form.a2"
                      placeholder="请选择活动区域"
                      style="width: 130px"
                    >
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item label="国家">
                    <el-select
                      v-model="form.a3"
                      placeholder="请选择活动区域"
                      style="width: 130px"
                    >
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </el-form>
            <!-- 表格 -->
            <div>
              <el-table :data="allBox" border style="width: 100%">
                <el-table-column fixed prop="uid" label="ID" width="150">
                </el-table-column>
                <el-table-column fixed prop="date" label="头像" width="150">
                  <template slot-scope="scope">
                    <div class="img_box">
                      <img
                        :src="scope.row.avatar"
                        alt=""
                        :onerror="defaultImg"
                      />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column fixed prop="nickname" label="姓名" width="150">
                </el-table-column>
                <el-table-column
                  fixed
                  prop="level"
                  label="会员等级"
                  width="150"
                >
                </el-table-column>
                <el-table-column fixed prop="group_id" label="分组" width="150">
                </el-table-column>
                <el-table-column
                  fixed
                  prop="spread_uid_nickname"
                  label="推荐人"
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  fixed
                  prop="user_type"
                  label="用户类型"
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  fixed
                  prop="now_money"
                  label="余额"
                  width="150"
                >
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button
                      @click="handleClick(scope.row)"
                      type="text"
                      size="small"
                      >查看</el-button
                    >
                    <el-button type="text" size="small">编辑</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 分页 -->
               <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="page"
                  :page-size="pageSize"
                  :total="this.totalNum"
                >
                </el-pagination>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="微信公众号" name="second">微信公众号</el-tab-pane>
        <el-tab-pane label="微信小程序" name="third">微信小程序</el-tab-pane>
        <el-tab-pane label="H5" name="fourth">H5</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { get_userList, listMenus } from "../../api/user";
let flag = 1;

export default {
  components: {},
  props: {},
  data() {
    return {
      activeName: "first",
      zhankai: "展开",
      show_start: false,
      allBox: [], //总数据渲染
      //会员等级option1111
      vipArr: [],
      form: {
        name: "",
        region: "",
      },
      //分页
       totalNum: 0,
      page: 1,
      pageSize: 9,
    };
  },
  computed: {},
  methods: {
    //分页
     handleSizeChange(val) {
       // console.log(`每页 ${val} 条`);
         this.pageSize= val,
        this.listMenus()
       
      },
      handleCurrentChange(val) {
       // console.log(`当前页: ${val}`);
        this.page= val,
         this.listMenus()
      },
    async get_userList() {
      const result = await get_userList();
      //console.log("cccc", result);
      if (result.status == 200) {
        this.vipArr = result.data.list;
      }
    },
    //总数据

    async listMenus() {
      const params = {
          page: this.page,
        limit: this.pageSize
      }
      const result = await listMenus(params);
      console.log("all", result);
      if (result.status == 200) {
        this.allBox = result.data.list;
        this.totalNum = result.data.count;
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log("submit!");
    },
    //展开收起切换
    zhanFn() {
      if (flag == 1) {
        this.zhankai = "收起";
        this.show_start = true;
        flag = 0;
      } else {
        this.zhankai = "展开";
        this.show_start = false;
        flag = 1;
      }
    },
  },
  created() {
    this.get_userList();
    this.listMenus();
  },
  mounted() {},
  computed: {
    //默认图片
    defaultImg() {
      return 'this.src="' + require("../../../public/imgs/a1.jpg") + '"';
    },
  },
};
</script>
<style scoped>
.user_Guanli {
  margin-left: 15px;
}
.form_Box {
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.img_box {
  width: 50px;
  height: 50px;
}
.img_box img {
  width: 100%;
  height: 100%;
  display: block;
}
</style>