<template>
  <div class="addShopBox">
    <div class="returnBox">
      <el-button
        size="mini"
        icon="el-icon-arrow-left"
        class="returnBtnBox"
        @click="returnBtn"
        >返回按钮</el-button
      >
      <h3>商品添加</h3>
    </div>
    <el-form ref="form" :model="form" label-width="99.999975px" size="mini">
      <el-tabs v-model="activeName">
        <el-tab-pane label="商品信息" name="first">
          <el-form-item label="商品名称" :required="true">
            <el-input
              v-model="form.store_name"
              placeholder="商品名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品分类" :required="true">
            <el-select
              v-model="form.cate_id"
              placeholder="请选择商品分类"
              multiple
            >
              <el-option
                :disabled="item.pid === 0 ? true : false"
                v-for="item in category"
                :key="item.id"
                :label="item.html + item.cate_name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="商品关键字">
            <el-input
              v-model="form.keyword"
              placeholder="商品关键字"
            ></el-input>
          </el-form-item>
          <el-form-item label="单位" :required="true">
            <el-input v-model="form.unit_name" placeholder="单位"></el-input>
          </el-form-item>
          <el-form-item label="商品简介">
            <el-input
              rows="3"
              type="textarea"
              placeholder="请输入商品简介"
              style="width: 200.000025px"
              v-model="form.store_info"
              show-word-limit
            >
            </el-input>
          </el-form-item>
          <el-form-item label="商品封面图" :required="true">
            <input
              type="text"
              hidden
              disabled
              v-model="form.image"
              style="width: 200.000025px"
              placeholder="商品封面图路径"
              id=""
            />
            <el-upload
              name="headfile"
              class="avatar-uploader"
              action=" http://vueshop.glbuys.com/api/user/myinfo/formdatahead?token=1ec949a15fb709370f"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="商品轮播图">
            <Swiper :dialogVisible="dialogVisible" :ruleForm="form"></Swiper>
          </el-form-item>
          <el-form-item label="商品规格">
            <el-radio v-model="radio" :label="true">单规格</el-radio>
            <el-radio v-model="radio" :label="false">多规格</el-radio>
            <div class="specification">
              <!-- 单规格 -->
              <template v-if="radio" >
                <el-table :data="form.attrs" style="width: 100%" >
                  <el-table-column prop="pic" label="图片" width="100">
                    <Swiper
                      :dialogVisible="dialogVisible"
                      :ruleForm="form"
                    ></Swiper>
                  </el-table-column>
                  <el-table-column prop="price" label="售价">
                    <el-input-number
                      v-model="form.attrs[0].price"
                      
                      style="width: 100px"
                      controls-position="right"
                      @change="handleChange"
                    ></el-input-number>
                  </el-table-column>
                  <el-table-column prop="cost" label="成本价">
                    <el-input-number
                      v-model="form.attrs[0].cost"
                      size="mini"
                      style="width: 100px"
                      controls-position="right"
                      @change="handleChange"
                    ></el-input-number>
                  </el-table-column>
                  <el-table-column prop="ot_price" label="原价">
                    <el-input-number
                    
                      v-model="form.attrs[0].ot_price"
                      size="mini"
                      style="width: 100px"
                      controls-position="right"
                      @change="handleChange"
                    ></el-input-number>
                  </el-table-column>
                  <el-table-column prop="stock" label="库存">
                    <el-input-number
                      v-model="form.attrs[0].stock"
                      
                      size="mini"
                      style="width: 100px"
                      controls-position="right"
                      @change="handleChange"
                    ></el-input-number>
                  </el-table-column>
                  <el-table-column prop="bar_code" label="编码">
                    <el-input
                     
                      style="width: 100px"
                      v-model="form.attrs[0].bar_code"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-table-column>
                  <el-table-column prop="weight" label="重量">
                    <el-input-number
                     
                      v-model="form.attrs[0].weight"
                      style="width: 100px"
                      size="mini"
                      controls-position="right"
                      @change="handleChange"
                    ></el-input-number>
                  </el-table-column>
                  <el-table-column prop="volume" label="体积">
                    <el-input-number
                      size="mini"
                      style="width: 100px"
                      
                      v-model="form.attrs[0].volume"
                      controls-position="right"
                      @change="handleChange"
                    ></el-input-number>
                  </el-table-column>
                </el-table>
              </template>
              <!-- 单规格 -->
              <!-- 多规格 -->
              <template v-else>
                <div>
                  <el-select placeholder="请选择" v-model="get_ruleId">
                    <el-option
                      v-for="item in get_ruleList"
                      :key="item.id"
                      :label="item.rule_name"
                      :value="item.id"
                    />
                  </el-select>
                  <el-button slot="append" @click="get_ruleIdBtn"
                    >确认</el-button
                  >
                </div>
                <div v-for="(v, i) in get_ruleInfo" :key="i">
                  <div>
                    <el-tag closable type="info">
                      {{ v.value }}
                    </el-tag>
                  </div>
                  <div>
                    <el-tag closable v-for="(j, k) in v.detail" :key="k">
                      {{ j }}
                    </el-tag>
                  </div>

                  <Zujian :i="i" @shijian="shijian"></Zujian>
                </div>
              </template>
            </div>
          </el-form-item>
          <el-form-item label="运费模板" :required="true">
            <el-select v-model="form.temp_id" placeholder="请选择运费模板">
              <el-option
                v-for="item in template"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="nextFirstBtn"
              >下一步</el-button
            >
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品详情" name="second">
          <el-form-item label="商品详情">
            <Editor
              :height="500"
              :value="form.description"
              @on-change="cha"
            ></Editor>
          </el-form-item>
          <el-form-item>
            <el-button size="small" @click="RollbackBtn">上一步</el-button>
            <el-button type="primary" size="small" @click="nextThreeBtn"
              >下一步</el-button
            >
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="其他设置" name="third">
          <div class="salesBox">
            <el-form-item label="虚拟销量">
              <el-input-number
                v-model="form.ficti"
                controls-position="right"
                @change="handleChangeFicti"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="积分">
              <el-input-number
                v-model="form.give_integral"
                controls-position="right"
                @change="handleChangeIntegral"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="排序">
              <el-input-number
                v-model="form.sort"
                controls-position="right"
                @change="handleChangeSort"
              ></el-input-number>
            </el-form-item>
          </div>
          <div class="salesBox">
            <el-form-item label="特殊资源">
              <el-radio-group v-model="form.is_sub">
                <el-radio label="0">单独设置</el-radio>
                <el-radio label="1">默认设置</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="salesBox">
            <el-form-item label="商品状态">
              <el-radio-group v-model="form.is_show">
                <el-radio label="0">上架</el-radio>
                <el-radio label="1">下架</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="热卖单品">
              <el-radio-group v-model="form.is_hot">
                <el-radio label="0">开启</el-radio>
                <el-radio label="1">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="salesBox">
            <el-form-item label="促销单品">
              <el-radio-group v-model="form.is_benefit">
                <el-radio label="0">开启</el-radio>
                <el-radio label="1">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="精品推荐">
              <el-radio-group v-model="form.is_best">
                <el-radio label="0">开启</el-radio>
                <el-radio label="1">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="salesBox">
            <el-form-item label="首发新品">
              <el-radio-group v-model="form.is_new">
                <el-radio label="0">开启</el-radio>
                <el-radio label="1">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="优品推荐">
              <el-radio-group v-model="form.is_good">
                <el-radio label="0">开启</el-radio>
                <el-radio label="1">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="salesBox1">
            <el-form-item label="活动优先级">
              <div
                class="item"
                v-for="(item, index) in form.activity"
                :key="index"
                :style="{ background: item.color }"
                draggable="true"
                @dragstart="handleDragStart($event, item)"
                @dragenter="handleDragEnter($event, item)"
                @dragover.prevent="handleDragover($event, item)"
                @drop="handleDrop($event, item)"
                @dragend="handleDragEnd($event, item)"
              >
                {{ item.name }}
              </div>
            </el-form-item>
          </div>
          <el-button type="primary" size="small" @click="nextFirstBtn"
            >上一步</el-button
          >
          <el-button type="primary" size="small" @click="onSubmit">{{
            btnInfo
          }}</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import Editor from "@/components/Editor";
import Swiper from "@/components/Swiper";
import Zujian from "../zujian/index.vue";
import {
  gettemplate,
  getCategory,
  addList,
  dataEditInfo,
  get_rule,
} from "@/api/menu";
export default {
  components: { Editor, Swiper, Zujian },
  props: {},
  data() {
    return {
      gui: [],
      get_ruleInfo: [],
      radio: true,
      btnInfo: "",
      imageUrl: "",
      activeName: "first",
      template: [],
      get_ruleList: [],
      get_ruleId: "",
      category: [],
      dialogVisible: false,
      dragging: null,
      forms: {},
      form: {
        id: "",
        activity: [
          { name: "默认", key: 1, color: "#ED4014" },
          { name: "拼团", key: 2, color: "#009688" },
          { name: "砍价", key: 3, color: "#1E9FFF" },
          { name: "秒杀", key: 4, color: "#FEB900" },
        ],
        store_name: "",
        unit_name: "",
        cate_id: [],
        image: "",
        slider_image: false,
        temp_id: "",
        description: "",
        is_show: "0",
        is_sub: "0",
        is_new: "0",
        is_benefit: "0",
        is_good: "0",
        is_hot: "0",
        is_best: "0",
        store_info: "",
        keyword: "",
        sort: 0,
        give_integral: 0,
        ficti: 0,
        attrs: [
          {
            bar_code: "iufbiuwiu",
            brokerage: 11, // 佣金
            brokerage_two: 11, // 佣金
            cost: 99,
            ot_price: 99,
            pic: "http://47.93.101.203/upload26ad30336770fdbb7ff2773d.png",
            price: 99,
            stock: 99,
            volume: 99,
            weight: 99,
          },
        ],
        slider_image: [],
      },
    };
  },
  computed: {},
  methods: {
    shijian(val) {
      console.log();
      this.get_ruleInfo[val.is].detail.push(val.sui);
    },
    addFn(k) {
      console.log(this.get_ruleInfo);
      console.log(k, this.gui);
    },
    //编辑
    async dataEditInfo() {
      const data = this.$route.query.objrow;
      const result = await dataEditInfo(data);
      let newObj = result.data.productInfo;
      console.log(newObj.cate_id.map(Number));
      this.form.id = newObj.id;
      this.form.slider_image = newObj.slider_image;
      2;
      this.form.store_name = newObj.store_name;
      this.form.temp_id = newObj.temp_id;
      this.form.cate_id = newObj.cate_id.map(Number);
      this.form.image = newObj.image;
      this.form.keyword = newObj.keyword;
      this.form.is_benefit = newObj.is_benefit.toString();
      this.form.is_best = newObj.is_best.toString();
      this.form.is_del = newObj.is_del.toString();
      this.form.is_good = newObj.is_good.toString();
      this.form.is_hot = newObj.is_hot.toString();
      this.form.is_new = newObj.is_new.toString();
      this.form.is_postage = newObj.is_postage.toString();
      this.form.is_seckill = newObj.is_seckill.toString();
      this.form.is_show = newObj.is_show.toString();
      this.form.is_sub = newObj.is_sub.toString();
      this.form.ficti = newObj.ficti;
      this.form.give_integral = newObj.give_integral;
      this.form.sort = newObj.sort;
      this.form.unit_name = newObj.unit_name;
      this.form.description = newObj.description;
      this.form.store_info = newObj.store_info;
      this.form.keyword = newObj.keyword;
      this.imageUrl = newObj.image;
    },
    handleChange() {},
    //拖动
    handleDragStart(e, item) {
      this.dragging = item;
    },
    // 当被鼠标拖动的对象进入其容器范围内时触发此事件
    handleDragEnter(e) {
      // 为需要移动的元素设置dragstart事件
      e.dataTransfer.effectAllowed = "move";
    },
    // 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
    handleDragover(e) {
      // 首先把div变成可以放置的元素，即重写dragenter/dragover
      // 在dragenter中针对放置目标来设置!
      e.dataTransfer.dropEffect = "move";
    },
    // 当放置被拖元素时
    handleDrop(e, item) {
      e.dataTransfer.dropEffect = "move";
      if (item === this.dragging) {
        return;
      }
      const newItems = [...this.form.activity];
      const from = newItems.indexOf(this.dragging);
      const to = newItems.indexOf(item);
      newItems[from] = item;
      newItems[to] = this.dragging;
      this.form.activity = newItems;
    },
    // 完成元素拖动后触发
    handleDragEnd() {
      this.dragging = null;
    },
    //关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //虚拟销量
    handleChangeFicti(v) {
      this.form.ficti = v;
    },
    //积分
    handleChangeIntegral(v) {
      this.form.integral = v;
    },
    //排行
    handleChangeSort(v) {
      this.form.sort = v;
    },
    cha(val) {
      this.form.description = val.text;
      console.log();
    },
    nextThreeBtn() {
      this.activeName = "third";
    },
    async gettemplate() {
      const result = await gettemplate();
      console.log(result);
      this.template = result.data;
    },
    async getCategory() {
      const result = await getCategory();
      this.category = result.data;
    },
    async get_rule() {
      const result = await get_rule();
      console.log(result);
      this.get_ruleList = result.data;
    },
    returnBtn() {
      this.$router.go(-1);
    },
    nextFirstBtn() {
      this.activeName = "second";
    },
    RollbackBtn() {
      this.activeName = "first";
    },
    onSubmit() {
      let porams = this.form;
      console.log(porams);
      addList(porams).then((res) => {
        console.log(res);
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      let tu = `http://vueshop.glbuys.com/userfiles/head/${res.data.msbox}`;
      console.log(file);
      this.form.image = tu;
      this.imageUrl = tu;
      console.log(this.form.image);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    get_ruleIdBtn() {
      this.get_ruleList.map((v) => {
        if (v.id === this.get_ruleId) {
          this.get_ruleInfo = v.rule_value;
          console.log(this.get_ruleInfo);
        }
      });
    },
  },
  created() {
    this.gettemplate();
    this.getCategory();
    this.get_rule();
    console.log(this.form.attrs[0]);
    if (this.$route.query.objrow) {
      this.btnInfo = "立即编辑";
      this.dataEditInfo();
    } else {
      this.btnInfo = "立即添加";
    }
  },
  mounted() {},
};
</script>
<style scoped>
.el-tabs {
  width: 100%;
  height: 100%;
  padding: 20px;
}
.addShopBox {
  width: 100%;
  height: 100%;
}
.returnBox {
  width: 100%;
  height: 80.000025px;
  display: flex;
  align-items: center;
}
.salesBox1 {
  width: 100%;
  height: 50.000025px;
}
.salesBox {
  width: 70%;
  display: flex;
}
inp-textarea {
  width: 50%;
}
.returnBtnBox {
  margin-left: 30px;
  margin-right: 30px;
}
.avatar-uploader .el-upload {
  border: 0.999975px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 27.999975px;
  color: #8c939d;
  width: 177.999975px;
  height: 177.999975px;
  line-height: 177.999975px;
  text-align: center;
}
.avatar {
  width: 177.999975px;
  height: 177.999975px;
  display: block;
}
.el-input {
  width: 50%;
}
.el-select {
  width: 50%;
}
.item {
  display: inline-block;
  margin-left: 20.000025px;
  margin-bottom: 20.000025px;
  width: 50.000025px;
  height: 40 px;
  border-radius: 2.000025px;
  text-align: center;
  box-shadow: 0 2.000025px 3.999975px rgba(0, 0, 0, 0.12),
    0 0 6px rgba(0, 0, 0, 0.04);
  color: white;
}
</style>