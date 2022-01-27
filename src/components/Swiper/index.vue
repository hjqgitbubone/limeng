<template>
  <div>
    <template v-if="ruleForm.slider_image.length > 0">
      <img
        :style="{ width: '110px', height: '100px' }"
        v-for="(v, i) in ruleForm.slider_image"
        :key="i"
        :src="v"
        alt=""
      />
    </template>
    <i
      class="el-icon-plus avatar-uploader-icon"
      @click="newdialogVisible = true"
    ></i>
    <el-dialog
      title="上传商品图"
      :visible.sync="newdialogVisible"
      width="65%"
      :before-close="handleClose"
    >
      <div class="Box">
        <div class="left">
          <el-input
            :style="{ width: '40%' }"
            v-model="input"
            placeholder="请输入内容"
          ></el-input>
          <el-button type="primary" icon="el-icon-search"></el-button>
        </div>
        <div class="rit">
          <div>
            <el-button type="primary" :disabled="Disabled" @click="imgUrlsFn"
              >使用选中图片</el-button
            >
            <el-button type="primary">上传图片</el-button>
            <el-button type="success">添加分类</el-button>
            <el-button type="danger" :disabled="Disabled" @click="DelFn"
              >删除图片</el-button
            >
          </div>
          <div class="imgBox">
            <div v-for="(v, i) in img" :key="i">
              <img
                :src="v.att_dir"
                alt=""
                @click="imgUrlFn(v)"
                :class="v.imgS ? 'on' : ''"
              />
            </div>
          </div>
          <el-pagination
          class="pageBox"
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="newdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="newdialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Del, File } from "@/api/menu";
export default {
  components: {},
  props: ["dialogVisible", "ruleForm"],
  data() {
    return {
      page: 1,
      limit: 6,
      total: 1,
      input: "",
      img: [],
      total: 0,
      Disabled: false,
      newdialogVisibleone: this.dialogVisible,
    };
  },
  computed: {
    newdialogVisible: {
      get() {
        return this.newdialogVisibleone;
      },
      set(v) {
        console.log("v", v);
        this.newdialogVisibleone = v;
      },
    },
  },
  methods: {
    //点击使用选中图片
    imgUrlsFn() {
      let arr = [...this.img];
      arr.filter((v) => {
        if (v.imgS) {
          this.ruleForm.slider_image.push(v.att_dir);
          console.log(this.ruleForm.slider_image);
        }
      });
      this.newdialogVisible = false;
    },
    handleCurrentChange(e) {
      this.page = e;
      this.File();
    },

    //分页--当前条数
    handleSizeChange(val) {
      this.limit = val;
      this.File();
      console.log(`当前页: ${val}`);
    },
    handleClose() {},
    // 点击删除选中图片
    DelFn() {
      let arr = [];
      this.img.forEach((v) => {
        if (v.imgS) {
          arr.push(v.att_id);
        }
      });
      Del(arr.join(",")).then((res) => {
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.Disabled = !arr.some((v) => {
            return v.imgS == true;
          });
          File(this.page, this.limit).then((res) => {
            console.log(res);
            this.img = res.data.list;
            this.total = res.data.count;
          });
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    imgUrlFn(val) {
      // console.log(val.time);
      let arr = [...this.img];
      if (val.imgS) {
        arr.forEach((v) => {
          if (v.time == val.time) {
            v.imgS = false;
          }
        });
        this.img = arr;
      } else {
        arr.forEach((v) => {
          if (v.time == val.time) {
            v.imgS = true;
          }
        });
        this.img = arr;
      }
      this.Disabled = !arr.some((v) => {
        return v.imgS == true;
      });
    },
    async File() {
      const params = {
        page: this.page,
        limit: this.limit,
      };
      const result = await File(params);
      console.log(result.data);
      this.img = result.data.list;
      this.total = result.data.count;
    },
  },
  created() {
    this.File();
    console.log(this.ruleForm);
  },
  mounted() {},
};
</script>
<style scoped lang="scss">
.pageBox{
    width: 80%;
}
.Box {
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    width: 25%;
    height: 100%;
    float: left;
    border-right: 1px solid #ccc;
  }
  .rit {
    flex: 1;
    display: flex;
    flex-direction: column;
    .imgBox {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      div {
        width: 30%;
        display: flex;
        padding: 10px;
        box-sizing: border-box;
        img {
          width: 80%;
        
          display: block;
        }
        .on {
          border: 2px solid green;
        }
      }
    }
  }
}
</style>