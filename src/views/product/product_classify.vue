<template>
  <div>
    <div class="inpBox">
      <div class="inp2">
        <el-select placeholder="请选择商品分类名" v-model="suai"  @change="filterFn">
          <el-option
            v-for="(v, i) in arr"
            :key="i"
            :label="v.label"
            :value="v.value"
          >
          </el-option>
        </el-select>
      </div>

       <div class="inp3">
        <el-select placeholder="请选择状态" v-model="value" @change="showFn">
            <el-option label="显示" value="1"></el-option>
            <el-option label="隐藏" value="0"></el-option>
        </el-select>
      </div>
      <div class="inp1">
        <el-input
          placeholder="请输入内容"
          v-model="input1"
          class="input-with-select"
        >
        </el-input>
        <el-button icon="el-icon-search" @click="searchFn"></el-button>
      </div>

    </div>

    <button @click="dialogFormVisibleFn">添加</button>
    <!-- 添加遮罩层 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="父级">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option
              :label="v.label"
              :value="v.value"
              v-for="(v, i) in arr"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称">
          <el-input type="text" v-model="form.cate_name"></el-input>
        </el-form-item>

        <el-form-item hidden>
          <el-input v-model="form.pic"></el-input>
        </el-form-item>
        <el-form-item label="分类图标">
          <el-upload
            name="headfile"
            class="avatar-uploader"
            action="http://vueshop.glbuys.com/api/user/myinfo/formdatahead?token=1ec949a15fb709370f"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <div id="tu">
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label="数字">
          <el-input-number
            v-model="form.sort"
            controls-position="right"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="状态">
          <el-radio-group @change="addStatus" v-model="value1">
              <el-radio :label="1" >显示</el-radio>
              <el-radio :label="0">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--编辑遮罩层-->
    <el-dialog title="编辑" :visible.sync="dialogFormEditVisible">
      <el-form ref="formedit" :model="formedit" label-width="100px">
        <el-form-item label="ID" hidden>
          <el-input type="text" v-model="formedit.id"></el-input>
        </el-form-item>
        <el-form-item label="父级">
          <el-select v-model="formedit.pid" placeholder="请选择">
            <el-option
              :label="v.label"
              :value="v.value"
              v-for="(v, i) in arr"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称">
          <el-input type="text" v-model="formedit.cate_name"></el-input>
        </el-form-item>

        <el-form-item hidden>
          <el-input v-model="formedit.pic"></el-input>
        </el-form-item>
        <el-form-item label="分类图标">
          <el-upload
            name="headfile"
            class="avatar-uploader"
            action="http://vueshop.glbuys.com/api/user/myinfo/formdatahead?token=1ec949a15fb709370f"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <div id="tu">
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label="数字">
          <el-input-number
            v-model="formedit.sort"
            controls-position="right"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>

        <el-form-item label="状态">
          <el-radio-group v-model="value2" @change="huanFn">
            <el-radio :label="1" >显示</el-radio>
            <el-radio :label="0">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onEditSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 数据布局 -->
    <el-table :data="dataArr" stripe style="width: 100%"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="cate_name" label="分类名称" width="180">
      </el-table-column>
      <el-table-column prop="pic" label="分类图标" width="180">
        <template slot-scope="scope">
          <div id="tu">
            <img :src="scope.row.pic" alt="aa" sty />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序"> </el-table-column>
      <el-table-column prop="is_show" label="状态">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.is_show === 1 ? true : false"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="cutFn(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="editFn(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delFn(scope.row)"
            >删除</el-button
          >
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
</template>

<script>
import {
  getAddList,
  getDad,
  getList,
  getEditFn,
  getDeltFn,
  getCutStatusFn
} from "../../api/goodsClassify";
export default {
  components: {},
  props: {},
  data() {
    return {
      //options
      options: [],
      dataArr: [],
      value:'',
      value1:'',
      value2:'',
      kai:'',
      guan:'',
      //遮罩层
      dialogFormVisible: false,
      dialogFormEditVisible: false,
      form: {
        cate_name: "",
        pid: "",
        sort: "",
        pic: "",
        is_show: '',
        num: 1,
      },
      formedit: {
        id: "",
        cate_name: "",
        pid: "",
        sort: "",
        pic: "",
        is_show: "",
        num: 1,
      },
      imageUrl: "",
      arr: [],
      formLabelWidth: "120px",
      //分页
      totalNum: 0,
      page: 1,
      pageSize: 5,

      input1: "",
      val: "",
      cutStatus:'',
      suai:''
    };
  },
  computed: {},
  methods: {
    //编辑单选
    huanFn(){
      this.formedit.is_show=this.value2
    },
    //添加时的单选框
    addStatus(){
      console.log(this.value1);
      this.form.is_show = this.value1
    },
    //状态切换
      cutFn(v) {
        this.cutStatus = !v.is_show;
        console.log('status',v);
        console.log(this.cutStatus);
        const params = {
          id:v.id,
          is_show:this.cutStatus == true?1:0
        }
        getCutStatusFn(params).then(res=>{
          console.log(res);
          if(res.status == 200){
             this.$message({
              showClose: true,
              message: "切换成功",
            });
             this.getList();
          }
        })
    },
    //状态筛选
    showFn(){
      this.getList(this.value);
    },
    //筛选
    filterFn() {
      this.getList(this.suai);
    },
    searchFn() {
      this.val = this.input1;
      this.getList();
    },
    dialogFormVisibleFn() {
      this.dialogFormVisible = true;
      this.imageUrl = "";
    },
    //单选按钮
    shownoneFn() {},
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
    //图片上传
    handleAvatarSuccess(res, file) {
      console.log(res.data.msbox);
      let tu = "http://vueshop.glbuys.com/userfiles/head/" + res.data.msbox;
      this.imageUrl = tu;
      this.form.pic = tu;
      this.formedit.pic = tu;

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
    //添加确认
    onSubmit() {
      console.log(this.form);
      const params = this.form;
      getAddList(params).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.$message({
            showClose: true,
            message: "添加成功",
          });
        }
        this.dialogFormVisible = false;
        this.getList();
        this.form = {};
        this.imageUrl = "";
      });
    },
    //编辑确认
    onEditSubmit() {
      console.log(this.formedit);
      const params = this.formedit;
      getEditFn(params).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.$message({
            showClose: true,
            message: "编辑成功",
          });
        }
        this.dialogFormEditVisible = false;
        this.getList();
        this.formedit = {};
        this.imageUrl = "";
      });
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
          getDeltFn(params).then((res) => {
            console.log(res);
            if (res.status == 200) {
              this.$message({
                showClose: true,
                message: "删除成功",
              });
              this.getList();
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
    //接口总数据 接口
    async getList() {
      const params = {
        page: this.page,
        limit: this.pageSize,
        cate_name: this.val,
        pid: this.suai,
        is_show:this.value,
      };
      const result = await getList(params);
      console.log("777", result);
      this.dataArr = result.data.list;
      this.totalNum = result.data.count;
    },
    //打开遮罩层
    open() {},
    handleEdit(index, row) {
    },
    handleDelete(index, row) {
    },
    //添加页面 下拉列表数据
    async getDad() {
      const result = await getDad();
      this.arr = result.data.rules[0].options;
    },
    //编辑回显
    editFn(v) {
      console.log(v);
      this.dialogFormEditVisible = true;
      this.formedit.cate_name = v.cate_name;
      this.formedit.id = v.id;
      this.value2 = v.is_show
    
     if(v.pid == 0){
        this.formedit.pid='顶级菜单'
     }else if(v.pid == 1){
        this.formedit.pid='热门推荐'
     }else if(v.pid == 2){
       this.formedit.pid='yifuasoj'
     }else{
       this.formedit.pid='我是谁?'
     }
      this.formedit.sort = v.sort;
      this.formedit.pic = v.pic;
      this.imageUrl = v.pic;
      this.formedit.num = v.num;
    },
  },
  created() {
    this.getList();
    this.getDad();
  },
};
</script>
<style scoped>
#tu {
  width: 50px;
  height: 50px;
}
#tu img {
  width: 100%;
  height: 100%;
  display: block;
}
.inpBox{
  display: flex;
}
.inpBox div{
  margin-left: 20px;
}
.inp1 {
  width: 250px;
  display: flex;
}
</style>