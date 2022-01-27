<template>
  <div class="box">
    <div class="h3">
      <h3>商品规格</h3>
    </div>

    <div class="rulebox">
      <div>
        <div class="searchBox">
          商品搜索:
          <div class="inputBox">
            <el-input
              placeholder="请输入内容"
              v-model="input"
              size="mini"
              class="input-with-select"
            >
              <el-button
                slot="append"
                @click="searchBtn"
                icon="el-icon-search"
              ></el-button>
            </el-input>
          </div>
        </div>
        <div>
          <el-button type="primary" @click="addShopBtn">+添加商品</el-button>
          <el-button type="success" @click="allDel">批量删除</el-button>
        </div>
        <template>
          <el-table
            v-loading="loading"
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="ID" width="120" prop="id">
            </el-table-column>
            <el-table-column prop="rule_name" label="规格名称">
            </el-table-column>
            <el-table-column
              prop="attr_name"
              label="商品规格"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="attr_value"
              label="商品属性"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div v-for="(v, i) in scope.row.attr_value" :key="i">
                  {{ v }}
                </div>
              </template>
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
        <el-pagination
          :page-sizes="[5, 10, 15, 20]"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="80%"
    >
      <span>
        <div>
          <el-input v-model="inputTitle" placeholder="请输入内容"></el-input>
        </div>
        <div v-for="(v, i) in spec" :key="i">
          <div>
            <el-tag closable type="info" @close="handleCloseTag(i)">
              {{ v.value }}
            </el-tag>
          </div>
          <div class="tagbox">
            <el-tag
              closable
              v-for="(j, k) in v.detail"
              :key="k"
              @close="handleCloseTags(j, k, i)"
            >
              {{ j }}
            </el-tag>

            <Zujian :i="i" @shijian="shijian"></Zujian>
          </div>
        </div>
        <el-button type="primary" @click="addDomain" v-if="isshow"
          >添加新规格</el-button
        >
        <div class="gui_ge" v-else>
          规格名称:
          <el-input
            v-model="input1"
            placeholder="请输入内容"
            style="width: 200px"
          ></el-input>
          规格值:
          <el-input
            v-model="input2"
            placeholder="请输入内容"
            style="width: 200px"
          ></el-input>
          <el-button type="primary" @click="sureBtn">确定</el-button>
          <el-button @click="quxiao">取消</el-button>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tuichu">取 消</el-button>
        <el-button type="primary" @click="addSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  get_rules,
  get_delete,
  get_ruleId,
  get_ruleEdit,
  get_ruleAdd,
} from "@/api/rule.js";
import Zujian from "../zujian/index.vue";
export default {
  components: { Zujian },
  props: {},
  data() {
    return {
      page: 1,
      limit: 5,
      tableData: [],
      inputTitle: "",
      total: 0,
      input: "",
      multipleSelection: [],
      dialogVisible: false,
      spec: [],
      inputTitle: "",
      rule_name: "",
      loading: false,
      isshow: true,
      input1: "",
      input2: "",
      get_ruleList: {},
      get_ruleAddObj: {},
    };
  },
  computed: {},
  methods: {
    addSure() {
      let newone = {
        rule_name: this.inputTitle,
        spec: this.spec,
      };
      this.get_ruleAddObj = newone;
      if (this.inputTitle !== "") {
        this.dialogVisible = false;
        if (this.get_ruleList.id) {
          get_ruleEdit(this.get_ruleList).then((res) => {
            this.get_rules();
          });
        } else {
          get_ruleAdd(this.get_ruleAddObj).then((res) => {
            this.get_rules();
          });
        }
        this.spec = [];
        this.inputTitle = "";
        this.input1 = "";
        this.input2 = "";
      }
    },
    //添加新规格
    addDomain() {
      this.input1 = "";
      this.input2 = "";
      this.isshow = false;
    },
    sureBtn() {
      this.isshow = true;
      let newObj = { value: this.input1, detail: [this.input2] };
      if (this.input1 != "" && this.input2 != "") {
        let flag = this.spec.some((v) => {
          return v.value == newObj.value;
        });
        if (!flag) {
          this.spec.push(newObj);
        }
      }
    },
    tuichu() {
      this.dialogVisible = false;
      this.spec = [];
    },
    quxiao() {
      this.isshow = true;
    },
    handleCloseTag(tag) {
      this.spec.splice(tag, 1);
    },
    handleCloseTags(j, k, i) {
      this.spec[i].detail.splice(k, 1);
    },
    shijian(val) {
      if (val.sui !== "") {
        this.spec[val.is].detail.push(val.sui);
      }
      this.spec[val.is].detail = [...new Set(this.spec[val.is].detail)];
    },
    async get_rules() {
      this.loading = true;
      const params = {
        page: this.page,
        limit: this.limit,
        rule_name: this.rule_name,
      };
      const result = await get_rules(params);
      this.loading = false;
      this.tableData = result.data.list;
      this.total = result.data.count;
    },
    handleCurrentChange(e) {
      this.page = e;
      this.get_rules();
    },

    //分页--当前条数
    handleSizeChange(val) {
      this.limit = val;
      this.get_rules();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addShopBtn() {
      this.dialogVisible = true;
      this.inputTitle = "";
      this.get_ruleList = {};
    },
    allDel() {
      let arr = [];
      this.multipleSelection.forEach((v) => {
        arr.push(v.id);
      });

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          get_delete({ ids: arr.join(",") }).then((res) => {
            if (res.status === 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });

              this.get_rules();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    searchBtn() {
      this.rule_name = this.input;
      this.get_rules();
    },
    delFn(v) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          get_delete({ ids: v.id }).then((res) => {
            if (res.status === 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });

              this.get_rules();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleClick1(val) {
      this.dialogVisible = true;
      get_ruleId(val.id).then((res) => {
        this.inputTitle = res.data.info.rule_name;
        this.spec = res.data.info.spec;
        this.get_ruleList = res.data.info;
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
          this.spec = [];
        })
        .catch((_) => {});
    },
  },
  created() {
    this.get_rules();
  },
  mounted() {},
};
</script>
<style scoped>
.tagbox {
  display: flex;
}
.gui_ge {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.h3 {
  width: 100%;
  height: 50.000025px;
  display: flex;
  background: #fff;
  justify-content: left;
}
.rulebox {
  width: 95%;
  height: 95%;
  margin: 20.000025px;
  background: white;
}
.box {
  width: 100%;
  height: 100%;
  background: #f5f7f9;
}
.inputBox {
  width: 200.000025px;
}
.searchBox {
  display: flex;
  align-items: center;
  font-size: 12px;
  margin: 20.000025px 0;
}

</style>