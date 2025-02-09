<template>
  <el-card class="custom-card" v-loading="loading">
    <template #header>
      <div class="card-title">
        <img :src="icon" class="card-title-icon" />
        {{ title }}热榜
        <span class="update-time">{{ formattedUpdateTime }}</span>
      </div>
    </template>
    <div class="cell-group-scrollable">
      <div
          v-for="item in hotSearchData"
          :key="item.hotSearchOrder"
          :class="getRankingClass(item.hotSearchOrder)"
          class="cell-wrapper"
      >
        <span class="cell-order">{{ item.hotSearchOrder }}</span>
        <span
            class="cell-title hover-effect"
            @click="openLink(item.hotSearchUrl)"
        >
          {{ item.hotSearchTitle }}
        </span>
        <span class="cell-heat">{{ formatHeat(item.hotSearchHeat) }}</span>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import apiService from "../config/apiService.js";

const props = defineProps({
  title: String,
  icon: String,
  type: String
});

const hotSearchData = ref([]);
const updateTime = ref(null);
const loading = ref(false);

const formattedUpdateTime = computed(() => {
  const updateDate = new Date(updateTime.value ?? ''); // 使用可选链操作符和空值合并运算符
  if (isNaN(updateDate.getTime())) return ''; // 检查日期是否有效

  const now = new Date();
  const timeDiff = now - updateDate;
  const minutesDiff = Math.floor(timeDiff / 1000 / 60);

  if (minutesDiff < 1) {
    return '刚刚更新';
  } else if (minutesDiff < 60) {
    return `${minutesDiff}分钟前更新`;
  } else if (minutesDiff < 1440) {
    return `${Math.floor(minutesDiff / 60)}小时前更新`;
  } else {
    return updateDate.toLocaleString();
  }
});

const fetchData = async (type) => {
  loading.value = true;
  try {
    const res = await apiService.get(`/hotSearch/queryByType?type=${type}`);
    hotSearchData.value = res.data.data.hotSearchDTOList;
    updateTime.value = res.data.data.updateTime;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData(props.type);
});

const getRankingClass = (order) => {
  if (order === 1) return "top-ranking-1";
  if (order === 2) return "top-ranking-2";
  if (order === 3) return "top-ranking-3";
  return "";
};

const formatHeat = (heat) => {
  if (typeof heat === "string" && heat.endsWith("万")) {
    return heat;
  }
  let number = parseFloat(heat);
  if (isNaN(number)) {
    return heat;
  }
  if (number < 1000) {
    return number.toString();
  }
  if (number >= 1000 && number < 10000) {
    return (number / 1000).toFixed(1) + "k";
  }
  if (number >= 10000) {
    return (number / 10000).toFixed(1) + "万";
  }
};

const openLink = (url) => {
  if (url) {
    window.open(url, "_blank");
  }
};
</script>

<style scoped>
.custom-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width:100%;
}
.custom-card:hover {
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.25);
}
>>> .el-card__body{
  padding: 8px
}
.el-card__header {
  padding: 10px 18px;
  display: flex;
  justify-content: space-between; /* Added to space out title and update time */
  align-items: center;
}
.card-title {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  flex-grow: 1;
}
.card-title-icon {
  fill: currentColor;
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
.update-time {
  font-size: 12px;
  color: #b7b3b3;
  margin-left: auto; /* Ensures it is pushed to the far right */
}
.cell-group-scrollable {
  max-height: 350px;
  overflow-y: auto;
  padding-right: 16px;
  flex: 1;
}
.cell-wrapper {
  display: flex;
  align-items: center;
  padding: 8px 8px;
  border-bottom: 1px solid #e8e8e8;
}
.cell-order {
  width: 20px;
  text-align: left;
  font-size: 16px;
  font-weight: 700;
  margin-right: 8px;
  color: #7a7a7a;
}
.cell-heat {
  min-width: 50px;
  text-align: right;
  font-size: 12px;
  color: #7a7a7a;
}
.cell-title {
  font-size: 13px;
  color: #495060;
  line-height: 22px;
  flex-grow: 1;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
}
.top-ranking-1 .cell-order {
  color: #fadb14; /* 金色 */
}
.top-ranking-2 .cell-order {
  color: #a9a9a9; /* 银色 */
}
.top-ranking-3 .cell-order {
  color: #d48806; /* 铜色 */
}
.cell-title.hover-effect {
  cursor: pointer;
  transition: color 0.3s ease;
}
.cell-title.hover-effect:hover {
  color: #409eff;
}
</style>
