<template>
  <div>
    <div class="imgbox">
      <div class="tuimg" v-for="(v, i) in form.slider_image" :key="i">
        <img :src="v" alt="dd" />
      </div>
    </div>
    <el-button type="text" @click="dialogVisible = true"
      >点击打开 Dialog</el-button
    >

    <el-dialog
      title="上传"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <div class="tubox">
        <div>
          <el-button type="primary" :disabled="disableds" @click="pushFn"
            >使用该图片</el-button
          >
          <el-button type="primary" :disabled="disableds" @click="DelFn"
            >删除</el-button
          >
          <br />
        </div>
        <div v-for="(v, i) in imgArr" :key="i">
          <div class="tu">
            <img
              :src="v.satt_dir"
              alt="aa"
              @click="tuFn(v)"
              :class="v.lol ? 'on' : ''"
            />
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { exportImageAll, DelImgFn } from "@/api/select";
export default {
  components: {},
  props: ["form"],
  //   props: {
  //       form:Array
  //   },
  data() {
    return {
      dialogVisible: false,
      imgArr: [],
      newArr: [],
      disableds: true,
    };
  },
  computed: {},
  methods: {
    DelFn() {
      let arr = [];
      this.imgArr.forEach((v) => {
        if (v.lol) {
          arr.push(v.att_id);
        }
      });
      DelImgFn(arr.join(",")).then((res) => {
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.Disabled = !arr.some((v) => {
            return v.lol == true;
          });
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //pushFn
    pushFn() {
      console.log(this.newArr);
      let arr1 = [...this.imgArr];
      arr1.filter((v) => {
        if (v.lol) {
          // this.newArr.push(v.satt_dir)
          this.form.slider_image.push(v.satt_dir);
          this.dialogVisible = false;
        }
      });
    },
    //多张
    tuFn(val) {
      let arr = [...this.imgArr];
      if (val.lol) {
        arr.forEach((v) => {
          if (v.time == val.time) {
            val.lol = false;
          }
        });
        this.imgArr = arr;
      } else {
        arr.forEach((v) => {
          if (v.time == val.time) {
            val.lol = true;
          }
        });
        this.imgArr = arr;
      }

      console.log(this.imgArr);
      this.disableds = !arr.some((v) => {
        return (v.lol = true);
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  created() {
    const params = {
      page: 1,
      limit: 15,
      pid: "",
    };
    exportImageAll(params).then((res) => {
      console.log(res.data.list);
      this.imgArr = res.data.list;
    });
    console.log(this.form);
  },
};
</script>
<style scoped>
.tubox {
  width: 301px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.imgbox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.tuimg {
  width: 100px;
  height: 100px;
}
.tuimg img {
  width: 100%;
  height: 100%;
  display: block;
}
.on {
  border: 2px solid green;
}
.tu {
  width: 100px;
  height: 100px;
}
.tu img {
  width: 100%;
  height: 100%;
  display: block;
}
</style>