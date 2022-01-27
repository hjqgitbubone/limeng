<template>
  <div>
    <h3>商品管理</h3>
    <el-tabs @tab-click="handleClick" v-model="activeName">
      <el-tab-pane
        v-for="(v, i) in type_header"
        :key="i"
        :label="v.name + v.count"
        :name="v.name"
      ></el-tab-pane>
    </el-tabs>
    <div class="box">
      <div class="searchBox">
        商品分类:
        <el-select
          clearable
          v-model="value"
          placeholder="请选择"
          @change="Classification"
          :loading="loading"
        >
          <el-option
            v-for="item in options"
            :key="item.cate_name"
            :label="item.html + item.cate_name"
            :value="item.id"
          >
          </el-option>
        </el-select>

        <div class="inputBox">
          商品搜索:
          <el-input
            placeholder="请输入内容"
            v-model="input"
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
        <el-button type="success" @click="daochu">导出</el-button>
      </div>
      <template>
        <el-table :data="tableData" style="width: 100%" v-loading="loadingMenu">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="商品价格">
                  <span>{{ props.row.price }}</span>
                </el-form-item>
                <el-form-item label="商品分类">
                  <span>{{ props.row.cate_name }}</span>
                </el-form-item>
                <el-form-item label="虚拟销量">
                  <span>{{ props.row.sales }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="商品 ID" prop="id"> </el-table-column>
          <el-table-column prop="image" label="商品图片">
            <template slot-scope="scope">
              <img :src="scope.row.image" alt="" />
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="store_name">
          </el-table-column>
          <el-table-column prop="price" label="商品价格"> </el-table-column>
          <el-table-column prop="sales" label="销量"> </el-table-column>
          <el-table-column prop="stock" label="库存"> </el-table-column>
          <el-table-column prop="is_show" label="上架状态">
            <template slot-scope="scope">
              <el-switch
                @change="isshowBtn(scope.row)"
                :value="scope.row.is_show === 1 ? true : false"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
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
    </div>
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
</template>

<script>
import {
  getcategory,
  gettype_header,
  getproduct,
  isshowFns,
  dataDel,
  getProductFn,
} from "@/api/menu.js";
export default {
  components: {},
  props: {},
  data() {
    return {
      input: "",
      activeName: "出售中的商品",
      value: "",
      options: [],
      page: 1,
      limit: 5,
      total: 1,
      loading: true,
      type_header: [],
      tableData: [],
      type: 1,
      loadingMenu: false,
      cate_id: "",
      ids: "",
      isshow: "",
    };
  },
  computed: {},
  methods: {
    handleClick1(row) {
      console.log(row);
      this.$router.push({
        path: "/product/add_product",
        query: { objrow: row.id },
      });
    },
    //状态
    isshowBtn(v) {
      console.log(v);
      (this.ids = v.id), (this.isshow = !v.is_show);
      this.isshowFns();
    },
    //分类数据
    async getcategory() {
      if (this.loading) {
        const result = await getcategory();
        this.options = result.data;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    },
    async isshowFns() {
      const data = {
        id: this.ids,
        is_show: this.isshow === true ? 1 : 0,
      };
      const result = await isshowFns(data);
      console.log(result);
      this.gettype_header();
      this.getproduct();
    },
    //获取列表数据
    async getproduct() {
      this.loadingMenu = true;
      const params = {
        limit: this.limit,
        page: this.page,
        total: this.total,
        type: this.type,
        cate_id: this.card_id,
        store_name: this.input,
        excel: 0,
      };
      const result = await getproduct(params);
      this.loadingMenu = false;
      console.log(result);
      this.total = result.data.count;
      this.tableData = result.data.list;
    },
    //tabs 页数据 请求
    async gettype_header() {
      const result = await gettype_header();
      this.type_header = result.data.list;
    },
    //分页--当前页数
    handleCurrentChange(e) {
      this.page = e;
      this.getproduct();
    },

    //分页--当前条数
    handleSizeChange(val) {
      this.limit = val;
      this.getproduct();
      console.log(`当前页: ${val}`);
    },
    //循环判断type值
    handleClick(tab, event) {
      console.log(tab.name);
      this.type_header.forEach((v) => {
        if (v.name === tab.name) {
          this.type = v.type;
        }
      });
      this.getproduct();
    },
    //导出
    daochu() {
      getProductFn(this.type, this.cate_id, this.input).then((res) => {
        console.log(res);
        if (res.status === 200) {
          location.href = `${res.data[0]}`;
        }
      });
    },
    //搜索按钮
    searchBtn() {
      this.getproduct();
    },
    //分类搜索
    Classification(v) {
      this.card_id = v;
      this.getproduct();
    },
    addShopBtn() {
      this.$router.push("/product/add_product");
    },
    delFn(v) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          dataDel(v.id).then((res) => {
            if (res.status === 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });

              this.getproduct();
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
  },
  created() {
    this.getcategory();
    this.gettype_header();
    this.getproduct();
  },
  mounted() {},
};
</script>
<style scoped>
.box {
  margin: 20.000025px;
}
.inputBox {
  margin-left: 9.999975px;
}
.searchBox {
  display: flex;
  align-items: center;
  font-size: 12px;
  margin: 9.999975px;
}
.el-input {
  width: 219.999975px;
}
.demo-table-expand {
  font-size: 0;
  background: #f5f7f9;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
img {
  width: 50.000025px;
  height: 50.000025px;
}
</style>