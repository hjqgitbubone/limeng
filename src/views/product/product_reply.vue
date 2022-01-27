<template>
  <div>
    <div class="timeBox">
      <div>
        <el-radio-group
          v-model="weekvalue"
          v-for="(v, i) in timeArr"
          @change="timebtn(v)"
          :key="i"
        >
          <el-radio-button :label="v.value">{{ v.title }}</el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <el-date-picker
          v-model="time1"
          type="daterange"
          @change="xzrq"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
       <!-- 下拉筛选 -->
       
       <div class="div_sou">
           <div>
        <el-select
          v-model="searchval"
          clearable
          placeholder="请输入名称"
          @change="seleFun()"
        >
          <el-option
            v-for="item in optionsArr"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <!-- 搜索 -->
      <div>
        <el-input
          placeholder="请输入用户名称"
          v-model="sousuo"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchFn"></el-button>
        </el-input>
      </div>
       </div>
     
    </div>

    <!-- Form -->
    <el-button type="text" @click="outerVisible = true">添加</el-button>

    <el-dialog title="添加虚拟评论" :visible.sync="outerVisible">
      <!-- 商品 -->
      <el-dialog
        width="90%"
        title="商品"
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-table :data="maskOneArr" stripe style="width: 100%">
          <el-table-column label="图片" width="180">
            <template slot-scope="scope">
              <el-radio v-model="radios" :label="scope.row" @change="radfun()"
                >备选项</el-radio
              >
            </template>
          </el-table-column>
          <el-table-column prop="id" label="ID" width="180"> </el-table-column>
          <el-table-column label="图片" width="180">
            <template slot-scope="scope">
              <div class="maskoneimg">
                <img :src="scope.row.image" alt="aa" />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="store_name" label="名称"> </el-table-column>
        </el-table>
      </el-dialog>

      <!-- 用户头像 -->
      <el-dialog
        width="30%"
        title="头像"
        :visible.sync="touxiang"
        append-to-body
      >
      </el-dialog>
      <!-- 评价图片 -->
      <el-dialog
        width="50%"
        title="评价图片"
        :visible.sync="talkimg"
        append-to-body
      >
        <el-upload
          name="headfile"
          class="avatar-uploader"
          action=" http://vueshop.glbuys.com/api/user/myinfo/formdatahead?token=1ec949a15fb709370f"
          :show-file-list="false"
          :on-success="handleAvatarSuccessss"
          :before-upload="beforeAvatarUploadss"
        >
          <img v-if="imageUrlss" :src="imageUrlss" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-dialog>

      <el-form :model="form">
        <el-form-item label="商品" :label-width="formLabelWidth">
          <span class="el-icon-plus" @click="innerVisibleFn"></span>
          <img :src="form.image.image" alt="dd" v-if="img_show" />
        </el-form-item>

        <el-form-item label="用户头像" :label-width="formLabelWidth">
          <input
            type="text"
            disabled
            v-model="form.avatar"
            style="width: 200.000025px"
            placeholder="商品封面图路径"
            id=""
            hidden
          />
          <el-upload
            class="avatar-uploader"
            name="headfile"
            action="http://vueshop.glbuys.com/api/user/myinfo/formdatahead?token=1ec949a15fb709370f"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.nickname"
            autocomplete="off"
            placeholder="输入用户名"
          ></el-input>
        </el-form-item>

        <el-form-item label="评价文字" :label-width="formLabelWidth">
          <el-input
            v-model="form.comment"
            autocomplete="off"
            placeholder="输入评价文字"
          ></el-input>
        </el-form-item>

        <!-- 星星1 -->
        <el-form-item
          label="商品分数"
          prop="product_score"
          :label-width="formLabelWidth"
        >
          <div class="block">
            <el-rate v-model="form.product_score"></el-rate>
          </div>
        </el-form-item>

        <!-- 星星2 -->
        <el-form-item
          label="服务分数"
          prop="service_score"
          :label-width="formLabelWidth"
        >
          <div class="block">
            <el-rate v-model="form.service_score"></el-rate>
          </div>
        </el-form-item>

        <el-form-item label="评价图片" :label-width="formLabelWidth">
          <span class="el-icon-plus" @click="talkimgFn"></span>
          <div class="maskoneimg" v-for="(v, i) in form.pics" :key="i">
            <img :src="v" alt="aa" />
          </div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisibleFn">提交</el-button>
      </div>
    </el-dialog>

    <div>
      <el-table :data="dataArr" border style="width: 100%">
        <el-table-column fixed prop="id" label="评论ID" width="150">
        </el-table-column>
        <el-table-column prop="store_name" label="商品信息" width="160">
          <template slot-scope="scope">
            <div class="all_img">
              <div class="img_one">
                <img :src="scope.row.image" alt="aa" />
              </div>
            </div>
            <p>{{ scope.row.store_name }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="account" label="用户名称" width="160">
        </el-table-column>
        <el-table-column prop="score" label="评分" width="160" sortable>
        </el-table-column>
        <el-table-column prop="comment" label="评论内容" width="400">
          <template slot-scope="scope">
            <p>{{ scope.row.comment }}</p>
            <div class="all_img">
              <div class="img_one" v-for="(v, i) in scope.row.pics" :key="i">
                <img :src="v" alt="aa" />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="评论时间"
          width="250"
          sortable
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="huifuFn(scope.row)" type="text" size="small"
              >回复</el-button
            >
            <el-button type="text" size="small" @click="delFn(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 回复遮罩层 -->
      <el-dialog title="回复内容" :visible.sync="dialogFormVisible">
        <el-form :model="form1">
          <el-form-item label="内容" :label-width="formLabelWidth">
            <el-input
              v-model="form1.content"
              autocomplete="off"
              placeholder="请输入回复内容"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="queHui">确 定</el-button>
        </div>
      </el-dialog>
    </div>
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
</template>

<script>
import {
  getCommentList,
  maskOneAddTableList,
  replyapi,
  maskOneTableList,
  getCommentDelList,
} from "../../api/goodsComment";
export default {
  components: {},
  props: {},
  data() {
    return {
      //搜索
      searchval: "",
      sousuo:'',
      optionsArr: [
        {
          value: "1",
          label: "已回复",
        },
        {
          value: "0",
          label: "未回复",
        },
      ],
      //时间数据
      timeArr: [
        {
          title: "全部",

          value: "",
        },
        {
          title: "今天",
          value: "today",
        },
        {
          title: "昨天",
          value: "yesterday",
        },
        {
          title: "最近7天",
          value: "lately7",
        },
        {
          title: "最近三十天",
          value: "lately30",
        },
        {
          title: "本月",
          value: "month",
        },
        {
          title: "本年",
          value: "year",
        },
      ],
      weekvalue: "",
      time1: "",
      dialogFormVisible: false,
      //五角星
      value1: null,
      value2: null,
      //总数据
      dataArr: [],
      outerVisible: false,
      tijiaoouterVisible: true,
      //三个内置遮罩层
      innerVisible: false,
      touxiang: false,
      talkimg: false,
      form: {
        avatar: "", //这是用户头像的
        pics: [], //这是评价图片的
        image: {
          image: "",
          product_id: "",
        },
        nickname: "",
        comment: "",
        product_score: null,
        service_score: null,
      },
      //回复
      content_id: "",
      form1: {
        content: "",
      },
      imageUrl: "",
      imageUrlss: "",
      formLabelWidth: "120px",
      //第一个遮罩层的table数据
      maskOneArr: [],
      multipleSelection: [],
      img_show: false,
      //分页
      totalNum: 0,
      page: 1,
      pageSize:6,

    };
  },
  computed: {},
  methods: {
    //分页
    handleSizeChange(val) {
      //  console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.page = val;
      this.getList();
    },
    
    //搜索
    searchFn(){
      console.log(this.sousuo);
      this.getCommentList()
    },
    //下拉筛选
    seleFun() {
      console.log(this.searchval);
      this.getCommentList();
    },
    //时间日期
    //开始的日期  结束的日期
    timebtn(v) {
      console.log(v);
      console.log(11);
      this.times = v.value;
      this.weekvalue = v.value;
      this.getCommentList();
    },
    xzrq() {
      let result =
        new Date(this.time1[0]).toLocaleDateString() +
        "-" +
        new Date(this.time1[1]).toLocaleDateString();
      this.times = result;
      this.getCommentList();
    },
    //评价图片
    talkimgFn() {
      this.talkimg = true;
    },
    //评价图片(多张)
    handleAvatarSuccessss(res, file) {
      console.log(file.response.data.msbox);
      let tu =
        "http://vueshop.glbuys.com/userfiles/head/" + file.response.data.msbox;
      this.form.pics.push(tu);
      this.imageUrlss = URL.createObjectURL(file.raw);
      this.talkimg = false;
    },
    beforeAvatarUploadss(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //用户头像(单张)
    handleAvatarSuccess(res, file) {
      console.log(file.response.data.msbox);
      let tu =
        "http://vueshop.glbuys.com/userfiles/head/" + file.response.data.msbox;
      console.log(tu);
      this.form.avatar = tu;
      this.imageUrl = tu;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //点击提交
    outerVisibleFn() {
      this.tijiaoouterVisible = false;
      console.log(this.form);
      maskOneAddTableList(this.form).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.getCommentList();
          this.outerVisible = false;
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
    },
    //单选上传图片
    radfun() {
      //console.log(this.radios);
      this.img_show = true;
      this.form.image.image = this.radios.image;
      this.form.image.product_id = this.radios.id;
      this.innerVisible = false;
    },
    //第一个maskone 遮罩层
    innerVisibleFn() {
      (this.innerVisible = true), this.maskOneTableList();
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //总数据方法
    async getCommentList() {
      const params = {
        page: this.page,
        limit: this.pageSize,
        account:this.sousuo,
        is_reply: this.searchval,
        store_name:'',
        data: this.times,
        product_id: 0,
      };
      const result = await getCommentList(params);
      console.log(result);
      this.dataArr = result.data.list;
      this.totalNum = result.data.count;
    },
    //第一个遮罩层的table数据
    async maskOneTableList() {
      const params = {
        store_name: "",
        page: 1,
        limit: 15,
        cate_id: "",
        is_live: 0,
      };
      const result = await maskOneTableList(params);
      console.log("table", result);
      this.maskOneArr = result.data.list;
    },

    //回复
    huifuFn(val) {
      this.dialogFormVisible = true;
      this.content_id = val.id;
    },
    //确定回复
    queHui() {
      //console.log(this.form1);
      const params = {
        id: this.content_id,
        content: this.form1.content,
      };
      //console.log(params);
      replyapi(params).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.getCommentList();
          this.form1 = {};
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
      this.dialogFormVisible = false;
    },
    //删除
    delFn(v) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let ids = v.id;
          const params = {
            id: ids,
          };
          getCommentDelList(params).then((res) => {
            console.log(res);
            if (res.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getCommentList();
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
    this.getCommentList();
  },
};
</script>
<style scoped>
.maskoneimg {
  width: 60px;
  height: 60px;
}
.maskoneimg img {
  width: 100%;
  height: 100%;
  display: block;
}
.all_img {
  width: 200px;
  height: 50px;
  display: flex;
}
.img_one {
  width: 30px;
  height: 30px;
}
.img_one img {
  width: 100%;
  height: 100%;
  display: block;
}
.div_sou{
  width: 100%;
  height: 50px;
  display: flex;
}
.input-with-select{
    width: 200px;
    margin-left: 100px;
  }
.all_img img {
  width: 100%;
  height: 100%;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>