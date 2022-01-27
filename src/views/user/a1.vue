<template>
  <div class="box">
    <h1>用户管理</h1>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="">全部</el-menu-item>
      <el-menu-item index="wechat">微信公众号</el-menu-item>
      <el-menu-item index="routin">微信小程序</el-menu-item>
      <el-menu-item index="h5">H5</el-menu-item>
    </el-menu>
    <div>
      <el-form ref="form" :model="form" label-width="80px" class="Formbox">
        <el-form-item label="用户搜索:">
          <el-input
            v-model="form.nickname"
            placeholder="请搜索"
            style="width: 150px"
          ></el-input>
        </el-form-item>
        <div v-show="is_show1">
          <el-row>
            <el-col :span="8">
              <el-form-item label="会员等级:" class="el_form">
                <el-select v-model="form.level" placeholder="请选择" clearable>
                  <el-option label="全部" value=""></el-option>
                  <el-option
                    :label="v.name"
                    :value="v.id"
                    v-for="(v, i) in userList"
                    :key="i"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用户分组:" class="el_form">
                <el-select
                  v-model="form.group_id"
                  placeholder="请选择"
                  clearable
                >
                  <el-option label="全部" value=""></el-option>
                  <el-option
                    :label="v.group_name"
                    :value="v.id"
                    v-for="(v, i) in list"
                    :key="i"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用户标签:" class="el_form">
                <el-select
                  v-model="form.label_id"
                  placeholder="请选择"
                  clearable
                >
                  <el-option label="全部" value=""></el-option>
                  <el-option
                    :label="v.label_name"
                    :value="v.id"
                    v-for="(v, i) in typeArr"
                    :key="i"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="国家:">
                <el-select
                  v-model="form.country"
                  placeholder="请选择"
                  style="width: 150px"
                  @change="seFn"
                  clearable
                >
                  <el-option label="全部" value=" "></el-option>
                  <el-option label="中国" value="domestic"></el-option>
                  <el-option label="外国" value="abroad"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="市区:" v-show="city_show">
                <el-cascader
                  :options="options"
                  :props="{ value: 'label' }"
                  clearable
                  v-model="form.cityArr"
                ></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="性别:" class="el_form">
                <el-radio-group v-model="form.sex">
                  <el-radio-button label="" value=" ">全部</el-radio-button>
                  <el-radio-button label="1" value="1">男</el-radio-button>
                  <el-radio-button label="2" value="2">女</el-radio-button>
                  <el-radio-button label="0" value="0">保密</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份:" class="el_form">
                <el-radio-group v-model="form.is_promoter">
                  <el-radio-button label="">全部</el-radio-button>
                  <el-radio-button label="1">推广员</el-radio-button>
                  <el-radio-button label="0">普通用户</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="访问情况:">
                <el-select v-model="form.user_time_type" placeholder="请选择">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="时间段未访问" value="visitno"></el-option>
                  <el-option label="时间段访问过" value="visit"></el-option>
                  <el-option label="首次访问" value="add_time"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="下单次数:">
                <el-select v-model="form.pay_count" placeholder="请选择">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="0次以上" value="-1"></el-option>
                  <el-option label="1次以上" value="0"></el-option>
                  <el-option label="2次以上" value="1"></el-option>
                  <el-option label="3次以上" value="2"></el-option>
                  <el-option label="4次以上" value="3"></el-option>
                  <el-option label="5次以上" value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker
                ref="time"
                v-model="form.user_time"
                type="datetimerange"
                align="right"
                format="yyyy-MM-dd "
                value-format="yyyy-MM-dd"
                unlink-panels
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>
        </div>
        <el-form-item class="el-from">
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button @click="Close">重置</el-button>
          <el-button type="text" @click="ShowOpen" v-show="open_show"
            >展开 <span class="el-icon-arrow-down"></span>
          </el-button>
          <el-button type="text" @click="ShowClose" v-show="close_show"
            >收起 <span class="el-icon-arrow-up"></span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <hr style="border: 0.5px solid #f1f1f1" />
    <div v-show="but_showTwo">
      <el-button type="primary">发送优惠卷</el-button>
      <el-button>批量设置分组</el-button>
      <el-button>批量设置标签</el-button>
    </div>
    <div v-show="but_showOne">
      <el-button type="primary">发送优惠卷</el-button>
      <el-button>发送图文消息</el-button>
      <el-button>批量设置分组</el-button>
      <el-button>批量设置标签</el-button>
    </div>
    <div class="tabBox">
      <el-table :data="tableData" size="small" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-row type="flex" justify="">
                <el-col :span="6">
                  <el-form-item label="首次访问:">
                    <span>{{ props.row.add_time }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="近期访问:">
                    <span>{{ props.row.last_time }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="身份证号:">
                    <span>{{ props.row.card_id }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="手机号:">
                    <span>{{ props.row.phone }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="">
                <el-col :span="6">
                  <el-form-item label="真实姓名:">
                    <span>{{ props.row.real_name }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="标签:">
                    <span>{{ props.row.labels }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="生日:">
                    <span>{{ props.row.birthday }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="地址:">
                    <span>{{ props.row.addres }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" justify="">
                <el-col :span="6">
                  <el-form-item label="备注:">
                    <span>{{ props.row.mark }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="uid" label="ID" width="100"> </el-table-column>
        <el-table-column prop="avatar" label="头像" width="100">
          <template slot-scope="scope">
            <!-- vue实例外创建 -->
            <el-image
              :src="scope.row.avatar"
              style="width: 40px; height: 40px"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="姓名"> </el-table-column>
        <el-table-column prop="vip_name" label="会员等级"> </el-table-column>
        <el-table-column prop="group_id" label="分组"> </el-table-column>
        <el-table-column prop="spread_uid_nickname" label="推荐人">
        </el-table-column>
        <el-table-column prop="user_type" label="用户类型"> </el-table-column>
        <el-table-column prop="extract_count_price" label="余额">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button type="text" size="small">更多</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paBox">
      <el-pagination
        :background="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="form.page"
        :page-size="1"
        layout="total, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <template v-for="(v, i) in rules">
        <el-form :model="form" :key="i">
          <el-form-item
            label="用户编号"
            :label-width="formLabelWidth"
            v-if="v.field == 'uid'"
          >
            <el-input
              v-model="edform.uid"
              autocomplete="off"
              :value="v.value"
              :placeholder="v.props.placeholder"
              :disabled="v.props.disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="真实姓名"
            :label-width="formLabelWidth"
            v-if="v.field == 'real_name'"
          >
            <el-input
              v-model="edform.real_name"
              autocomplete="off"
              :value="v.value"
              :placeholder="v.props.placeholder"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="手机号码"
            :label-width="formLabelWidth"
            v-if="v.field == 'phone'"
          >
            <el-input
              v-model="edform.phone"
              autocomplete="off"
              :value="v.value"
              :placeholder="v.props.placeholder"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="生日"
            :label-width="formLabelWidth"
            v-if="v.field == 'birthday'"
          >
            <el-date-picker
              v-model="edform.birthday"
              type="date"
              format="yyyy-MM-dd "
              value-format="yyyy-MM-dd"
              :default-value="v.value"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="身份证号"
            :label-width="formLabelWidth"
            v-if="v.field == 'card_id'"
          >
            <el-input
              v-model="edform.card_id"
              autocomplete="off"
              :value="v.value"
              :placeholder="v.props.placeholder"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="用户地址"
            :label-width="formLabelWidth"
            v-if="v.field == 'addres'"
          >
            <el-input
              v-model="edform.addres"
              autocomplete="off"
              :value="v.value"
              :placeholder="v.props.placeholder"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="用户备注"
            :label-width="formLabelWidth"
            v-if="v.field == 'mark'"
          >
            <el-input
              v-model="edform.mark"
              autocomplete="off"
              :value="v.value"
              :placeholder="v.props.placeholder"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="会员等级"
            :label-width="formLabelWidth"
            v-if="v.field == 'level'"
          >
            <el-select
              v-model="edform.level"
              :placeholder="v.props.placeholder"
            >
              <el-option
                :label="v.label"
                :value="v.value"
                v-for="(v, i) in v.options"
                :key="i"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="用户分组"
            :label-width="formLabelWidth"
            v-if="v.field == 'group_id'"
          >
            <el-select
              v-model="edform.group_id"
              :placeholder="v.props.placeholder"
            >
              <el-option
                :label="v.label"
                :value="v.value"
                v-for="(v, i) in v.options"
                :key="i"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="用户标签"
            :label-width="formLabelWidth"
            v-if="v.field == 'label_id'"
          >
            <el-select
              v-model="edform.label_id"
              :placeholder="v.props.placeholder"
              :multiple="v.props.multiple"
            >
              <el-option
                :label="v.label"
                :value="v.value"
                v-for="(v, i) in v.options"
                :key="i"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="推广员:" v-if="v.field == 'is_promoter'">
            <el-radio-group v-model="edform.is_promoter">
              <el-radio-button
                :label="v.value"
                v-for="(v, i) in v.options"
                :key="i"
                >{{ v.label }}</el-radio-button
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态:" v-if="v.field == 'status'">
            <el-radio-group v-model="edform.status">
              <el-radio-button
                :label="v.value"
                v-for="(v, i) in v.options"
                :key="i"
                >{{ v.label }}</el-radio-button
              >
            </el-radio-group>
          </el-form-item>
        </el-form>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button @click="nofn">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import {
  get_jnotice,
  get_userList,
  get_userType,
  get_user,
  edit_user,
  edit_formList,
} from "../../api/user";
export default {
  data() {
    return {
      activeIndex: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "昨天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
              console.log(this.$refs.time);
            },
          },
          {
            text: "年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              var time = new Date(1609430400000);
              var dateDiff = end.getTime() - time.getTime(); //时间差的毫秒数
              var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
              start.setTime(start.getTime() - 3600 * 1000 * 24 * dayDiff);
              picker.$emit("pick", [start, end]);
              console.log(this.$refs.time);
            },
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
              console.log(this.$refs.time);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      form: {
        user_type: "",
        group_id: "",
        level: "",
        sex: "",
        is_promoter: "",
        label_id: "",
        country: "",
        cityArr: [],
        user_time_type: "",
        pay_count: "",
        user_time: "",
        province: "",
        city: "",
        page: 1,
        limit: 15,
        nickname: "",
      },
      edform: {
        uid: "",
        real_name: "",
        phone: "",
        birthday: "",
        card_id: "",
        addres: "",
        mark: "",
        level: [],
        group_id: [],
        label_id: [],
        is_promoter: [],
        status: [],
      },
      total: 1,
      but_showOne: false,
      but_showTwo: true,
      is_show1: false,
      open_show: true,
      close_show: false,
      list: [],
      userList: [],
      typeArr: [],
      options: [],
      city_show: false,
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      uid: "1",
      rules: [],
    };
  },
  created() {
    this.getjin();
    this.getList();
    this.getType();
    this.getUserArr();
    axios.get("/city.json").then((res) => {
      console.log(res.data);
      this.options = res.data;
    });
    this.edituserlist(this.uid);
  },
  components: {},

  computed: {},

  mounted: {},

  methods: {
    async getjin() {
      const result = await get_jnotice({ page: this.form.page });
      if (result.status == 200) {
        this.list = result.data.list;
      }
    },
    async getType() {
      const result = await get_userList({ page: this.page });
      if (result.status == 200) {
        this.userList = result.data.list;
      }
    },
    async getList() {
      const result = await get_userType({ page: this.form.page });
      if (result.status == 200) {
        this.typeArr = result.data.list;
      }
    },
    async getUserArr() {
      const result = await get_user(this.form);
      if (result.status == 200) {
        // result.data.list.add_time=this.$moment(result.data.list.add_time).format("YYYY-MM-DD HH:mm:ss")
        this.tableData = result.data.list;
        this.total = result.data.count;
        if (this.tableData[0].add_time && this.tableData[0].last_time) {
          this.tableData[0].add_time = this.$moment
            .unix(this.tableData[0].add_time)
            .format("YYYY-MM-DD HH:mm:ss");
          this.tableData[0].last_time = this.$moment
            .unix(this.tableData[0].last_time)
            .format("YYYY-MM-DD HH:mm:ss");
        }
      }
    },
    async edituserlist() {
      const result = await edit_user(this.uid);
      if (result.status == 200) {
        this.rules = result.data.rules;
      }
    },
    async editfrom(data) {
      const result = await edit_formList(data);
      if (result.status == 200) {
        console.log(11);
        this.getUserArr(this.form);
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSelect(key, keyPath) {
      if (key == "wechat") {
        this.but_showOne = true;
        this.but_showTwo = false;
      } else {
        this.but_showOne = false;
        this.but_showTwo = true;
      }
      this.form.user_type = key;
      this.getUserArr(this.form);
    },
    onSubmit() {
      if (this.form.cityArr[0] == this.form.cityArr[1]) {
        (this.form.province = this.form.cityArr[0]),
          (this.form.city = this.form.cityArr[2]);
      } else {
        (this.form.province = this.form.cityArr[0]),
          (this.form.city = this.form.cityArr[1]);
      }
      this.form.user_time.length > 0 &&
        this.form.user_time.forEach((v) => {
          this.form.user_time = v + "-" + v;
        });
      this.getUserArr(this.form);
    },
    Close() {
      (this.edform.cityArr = []),
        (this.edform.label_id = ""),
        (this.edform.user_type = ""),
        (this.edform.status = ""),
        (this.edform.sex = ""),
        (this.edform.is_promoter = ""),
        (this.edform.country = ""),
        (this.edform.pay_count = ""),
        (this.edform.user_time_type = ""),
        (this.edform.user_time = ""),
        (this.edform.nickname = ""),
        (this.edform.province = ""),
        (this.edform.city = ""),
        (this.edform.page = 1),
        (this.edform.limit = 15),
        (this.edform.level = ""),
        (this.edform.group_id = "");
      this.getUserArr(this.form);
    },
    seFn(val) {
      console.log(val);
      if (val == "domestic") {
        this.city_show = true;
      } else {
        this.city_show = false;
        this.form.cityArr = [];
        (this.form.province = ""), (this.form.city = "");
      }
    },
    ShowOpen() {
      this.is_show1 = true;
      this.open_show = false;
      this.close_show = true;
    },
    ShowClose() {
      this.is_show1 = false;
      this.close_show = false;
      this.open_show = true;
    },
    handleClick(row) {
      this.uid = row.uid;
      this.edituserlist((this.uid = row.uid));
      
      for (var key in this.edform) {
        this.rules.forEach((v) => {
          if (key == v.field) {
            this.edform[key] = v.value;
          }
        });
      }
      this.dialogFormVisible = true;
    },
    nofn() {
      this.dialogFormVisible = false;
    },
    sure() {
      this.editfrom(this.edform)
        this.dialogFormVisible = false;
        
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  padding: 10px 35px;
  box-sizing: border-box;
  .Formbox {
    margin-top: 20px;
    position: relative;
  }
  .el-from {
    position: absolute;
    right: 0px;
    bottom: -20px;
  }
  hr {
    size: 0.2px;
    color: red;
  }
  .tabBox {
    margin-top: 35px;
    position: relative;
  }
  .paBox {
    position: absolute;
    right: 28px;
    margin-top: 20px;
  }
}
</style>
