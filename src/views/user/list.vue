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
                        v-for="(v,i) in vipArr"
                        :key = 'i' 
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
import {get_userList} from '../../api/user'
let flag = 1;

export default {
  components: {},
  props: {},
  data() {
    return {
      activeName: "first",
      zhankai: "展开",
      show_start: false,
      //会员等级option1111
      vipArr:[],
      form: {
        name: "",
        region: "",
      },
    };
  },
  computed: {},
  methods: {
    async get_userList(){
      const result = await get_userList()
      console.log('cccc',result);
      if(result.status == 200){
        this.vipArr = result.data.list
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
    this.get_userList()
  },
  mounted() {},
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
</style>