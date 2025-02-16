<template>
  <div class="stats-card-container">
    <el-card class="stats-card-main">
      <div class="stats-section">
        <div class="stats-value-main">{{ statsData.todayPv }}</div>
        <div class="stats-label-main">今日 PV</div>
      </div>
      <div class="stats-section stats-others">
        <div class="stats-item">
          <div class="stats-value-small">{{ statsData.todayUv }}</div>
          <div class="stats-label-small">今日 UV</div>
        </div>
        <div class="stats-item">
          <div class="stats-value-small">{{ statsData.allPv }}</div>
          <div class="stats-label-small">总 PV</div>
        </div>
        <div class="stats-item">
          <div class="stats-value-small">{{ statsData.allUv }}</div>
          <div class="stats-label-small">总 UV</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import apiService from "../config/apiService.js";

export default {
  name: "VisitorLog",
  setup() {
    const statsData = ref({
      todayPv: 0,
      todayUv: 0,
      allPv: 0,
      allUv: 0,
    });
    let polling;

    const fetchVisitorCount = async () => {
      try {
        const res = await apiService.get("/welcome/queryVisitorCount");
        statsData.value = res.data.data;
      } catch (error) {
        console.error(error);
      }
    };

    const startPolling = () => {
      polling = setInterval(fetchVisitorCount, 1000 * 60 * 60); // 每小时调用一次
    };

    const stopPolling = () => {
      clearInterval(polling);
    };

    onMounted(() => {
      fetchVisitorCount();
      startPolling();
    });

    onBeforeUnmount(() => {
      stopPolling();
    });

    return { statsData };
  },
};
</script>

<style scoped>
.el-card__body {
  padding: 10px;
}

.stats-card-container {
  max-width: 400px;
  margin-bottom: 10px;
}

.stats-card-main {
  padding: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stats-section {
  text-align: center;
}

.stats-value-main {
  font-size: 24px;
  font-weight: bold;
  color: #0A74DA;
  margin-bottom: 4px;
}

.stats-label-main {
  font-size: 14px;
  color: #333;
}

.stats-others {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
}

.stats-item {
  text-align: center;
}

.stats-value-small, .stats-label-small {
  font-size: 12px; /* 减小字体尺寸以实现更紧凑的布局 */
}

.stats-value-small {
  font-weight: bold;
  color: #333;
  margin-bottom: 2px;
}

.stats-label-small {
  color: #666;
}

@media (max-width: 400px) {
  .stats-others {
    flex-direction: column;
    align-items: center;
  }

  .stats-item {
    margin-bottom: 8px;
  }
}
</style>
