<template>
  <div id="app">
    <el-row :gutter="10">
      <el-col :span="20">
        <el-row :gutter="10">
          <el-col :span="6" v-for="(board, index) in hotBoards" :key="index">
            <hot-search-board
                :title="board.title"
                :icon="board.icon"
                :fetch-url="board.fetchUrl"
                :type="board.type"
            />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <visitor-log />
        <word-cloud />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import HotSearchBoard from "../src/components/HotSearchBoard.vue";
import VisitorLog from "../src/components/VisitorLog.vue";
import WordCloud from "../src/components/WordCloud.vue";
import baiduIcon from "../src/assets/icons/baidu-icon.svg";
import douyinIcon from "../src/assets/icons/douyin-icon.svg";
import zhihuIcon from "../src/assets/icons/zhihu-icon.svg";
import bilibiliIcon from "../src/assets/icons/bilibili-icon.svg";
import tiebaIcon from "../src/assets/icons/tieba-icon.svg";
import sougouIcon from "../src/assets/icons/sougou-icon.svg";
import tencentIcon from "../src/assets/icons/tencent-icon.svg";
import toutiaoIcon from "../src/assets/icons/toutiao-icon.svg";
import weiboIcon from "../src/assets/icons/weibo-icon.svg";
import hupuIcon from "../src/assets/icons/hupu-icon.svg";
import juejinIcon from "../src/assets/icons/juejin-icon.svg";
import csdnIcon from "../src/assets/icons/csdn-icon.svg";

const searchQuery = ref("");
const lastSearchQuery = ref("");
const suggestions = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(20);
const sentence = ref("");
const hotBoards = reactive([
  {
    title: "百度",
    icon: baiduIcon,
    type: "baidu",
  },
  {
    title: "抖音",
    icon: douyinIcon,
    type: "douyin",
  },
  {
    title: "知乎",
    icon: zhihuIcon,
    type: "zhihu",
  },
  {
    title: "B站",
    icon: bilibiliIcon,
    type: "bilibili",
  },
  {
    title: "贴吧",
    icon: tiebaIcon,
    type: "tieba",
  },
  {
    title: "搜狗",
    icon: sougouIcon,
    type: "sougou",
  },
  {
    title: "腾讯",
    icon: tencentIcon,
    type: "tencent",
  },
  {
    title: "头条",
    icon: toutiaoIcon,
    type: "toutiao",
  },
  {
    title: "微博",
    icon: weiboIcon,
    type: "weibo",
  },
  {
    title: "虎扑",
    icon: hupuIcon,
    type: "hupu",
  },
  {
    title: "掘金",
    icon: juejinIcon,
    type: "juejin",
  },
  {
    title: "CSDN",
    icon: csdnIcon,
    type: "csdn",
  },
]);

</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background: #f8f9fa;
  min-height: 100vh;
  padding: 0;
}
</style>