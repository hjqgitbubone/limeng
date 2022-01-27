<template>
  <div id="box">
    <div class="h3">
      <h3>订单管理</h3>
    </div>
    <div class="h3">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          :label="'全部订单' + '(' + ordertype.all + ')'"
          name="0"
        ></el-tab-pane>
        <el-tab-pane
          :label="'普通订单' + '(' + ordertype.general + ')'"
          name="1"
        ></el-tab-pane>
        <el-tab-pane
          :label="'拼团订单' + '(' + ordertype.complete + ')'"
          name="2"
        ></el-tab-pane>
        <el-tab-pane
          :label="'秒杀订单' + '(' + ordertype.seckill + ')'"
          name="3"
        ></el-tab-pane>
        <el-tab-pane
          :label="'砍价订单' + '(' + ordertype.bargain + ')'"
          name="4"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <div class="order_box">
      <div class="order_box_dl">
        <dl v-for="(v, i) in stat" :key="i" class="">
          <dt>
            {{ v.count === null ? 0 : v.count }}
          </dt>
          <dd>
            {{ v.name }}
          </dd>
        </dl>
      </div>
      <div class="list_box">
        <div class="status_box">
          <span class="status_title"> 订单状态: </span>
          <div class="status_box_smill">
            <el-radio-group
              v-model="status"
              size="mini"
              @change="radioStatusFn"
            >
              <el-radio-button border label=""
                >全部({{ orderStatus.statusAll }})</el-radio-button
              >
              <el-radio-button border label="0"
                >未支付({{ orderStatus.unpaid }})</el-radio-button
              >
              <el-radio-button border label="1"
                >未发货({{ orderStatus.unshipped }})</el-radio-button
              >
              <el-radio-button border label="2"
                >待收货({{ orderStatus.untake }})</el-radio-button
              >
              <el-radio-button border label="3"
                >待评价({{ orderStatus.unevaluate }})</el-radio-button
              >
              <el-radio-button border label="4"
                >交易完成({{ orderStatus.complete }})</el-radio-button
              >
              <el-radio-button border label="5"
                >待核销({{ orderStatus.write_off }})</el-radio-button
              >
              <el-radio-button border label="-1"
                >退款中({{ orderStatus.refunding }})</el-radio-button
              >
              <el-radio-button border label="-2"
                >已退款({{ orderStatus.refund }})</el-radio-button
              >
              <el-radio-button border label="-4"
                >已删除({{ orderStatus.del }})</el-radio-button
              >
            </el-radio-group>
          </div>
        </div>
        <div class="create_time_box">
          <div class="block">
            <span class="demonstration">创建时间:</span>
            <el-date-picker
              v-model="value2"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="table_box">
          <template>
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%;font-size: 10px"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="expand">
                <template slot-scope="props" >
                  <el-form
                    label-position="left"
                    inline
                    class="demo-table-expand"
                  >
                    <el-form-item label="商品总价">
                      <span>{{ props.row.total_price }}</span>
                    </el-form-item>
                    <el-form-item label="用户备注">
                      <span>{{ props.row.mark }}</span>
                    </el-form-item>
                    <el-form-item label="下单时间">
                      <span>{{ props.row.add_time }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column label="订单号" prop="order_id" width="200">
              </el-table-column>
              <el-table-column prop="pink_name" label="订单类型" width="100">
              </el-table-column>
              <el-table-column prop="nickname" label="用户信息" width="150">
              </el-table-column>
              <el-table-column label="商品信息" width="300">
                <template slot-scope="scope">
                  <dl class="shopinfo_box" style="width:300px">
                    <dt>
                      <img :src="
                          scope.row._info[scope.row['cart_id'][0]].cart_info
                            .productInfo.attrInfo.image" style="width:30px;height:30px"
                      />
                       
                    </dt>
                    <dd class="dd_one">
                      {{
                        scope.row._info[scope.row["cart_id"][0]].cart_info
                          .productInfo.store_name +
                        "|" +
                        scope.row._info[scope.row["cart_id"][0]].cart_info
                          .productInfo.attrInfo.suk
                      }}
                    </dd>
                    <dd class="dd_two">
                        ￥{{scope.row.total_price+'*'+scope.row.total_num}}
                    </dd>
                  </dl>
                </template>
                <!-- {{v._info[item["cart_id"][0]]}} -->
              </el-table-column>
                <el-table-column prop="pay_price" label="实际支付" width="100">
              </el-table-column>
               <el-table-column prop="pay_type_name" label="支付状态" width="100">
              </el-table-column>
              <el-table-column prop="status_name" label="订单状态" width="100">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="delFn(scope.row)"
                    >删除</el-button
                  >
                  <el-button
                    @click="handleClick1(scope.row)"
                    type="text"
                    size="small"
                    >编辑</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getorderList,
  getorderType,
  getorderListStatus,
} from "../../api/orderform";
export default {
  components: {},
  props: {},
  data() {
    return {
      multipleTable: [],
      activeName: "0",
      ordertype: {},
      orderStatus: {},
      page: 1,
      limit: 5,
      tableData: [],
      real_name: "",
      total: 0,
      stat: [],
      status: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
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
        ],
      },
      value2: "",
    };
  },
  computed: {},
  methods: {
    handleSelectionChange() {},
    radioStatusFn() {
      this.getorderType();
      this.getorderList();
    },
    handleClick(tab, event) {
      this.activeName = tab.name;
      console.log(tab);
      this.getorderList();
      this.getorderListStatus();
    },
    async getorderType() {
      const params = {
        type: this.activeName,
        data: "",
      };
      const result = await getorderType(params);
      this.ordertype = result.data;
    },
    async getorderListStatus() {
      const params = {
        type: this.activeName,
      };
      const result = await getorderListStatus(params);
      this.orderStatus = result.data;
    },
    async getorderList() {
      const params = {
        page: this.page,
        limit: this.limit,
        status: this.status,
        data: "",
        real_name: "",
        type: this.activeName,
      };
      const result = await getorderList(params);
      this.total = result.data.count;
      this.stat = result.data.stat;
      this.tableData = result.data.data;
      console.log(this.tableData);
    },
  },
  created() {
    this.getorderType();
    this.getorderList();
    this.getorderListStatus();
  },
};
</script>
<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}
.demonstration {
  font-size: 12px;
}
.list_box {
  width: 100%;
  height: 100%;
  background: white;
}
#box {
  flex: 1;
  background: #f5f7f9;
}
.h3 {
  width: 100%;
  height: 50.000025px;
  display: flex;
  background: #fff;
  justify-content: left;
  align-items: center;
}
.order_box {
  width: 95%;
  height: 100%;
  margin: 20px;
  background: #f5f7f9;
  .order_box_dl {
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 20px;
    dl {
      width: 23%;
      height: 100%;
      background: white;

      dt {
        width: 100%;
        height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 24px;
      }
      dd {
        width: 100%;
        height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 12px;
        color: #ccc;
      }
    }
  }
}
.status_box {
  width: 100%;
  display: flex;
  font-size: 12px;
  align-items: center;
  padding: 10px 0;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 220px;
  margin: 0 10px;
}
.create_time_box {
  padding: 0 0 10 0;
  .block {
    padding: 0 10px;
  }
}
.status_title {
  display: inline-block;
  margin: 0 0 0 10px;
}
.status_box_smill {
  margin: 0 10px;
}
.shopinfo_box{
  display: flex;
  align-items: center;
  font-size: 12px;
  .dd_one{
    width: 200px;

    white-space: wrap;
  }
  .dd_two{
    white-space: nowrap;
  }
}

.table_box{
  font-size: 12px;
}
</style>