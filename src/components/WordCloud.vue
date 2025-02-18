<template>
  <el-card class="word-cloud-card">
    <VueWordCloud
        class="word-cloud"
        :words="processedWords"
        :color="colorHandler"
        :spacing="0.5"
        font-family="Microsoft YaHei"
        @word-click="handleWordClick"
    />
  </el-card>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue'
import VueWordCloud from 'vue3-word-cloud'
import apiService from '../config/apiService.js'

// 响应式数据
const words = ref([])

// 处理后的词云数据
const processedWords = computed(() => {
  return words.value.map(item => [item.name, item.value])
})

// 颜色生成函数
const colorHandler = () => {
  return `hsl(${Math.random() * 360}, 70%, 50%)`
}

// 点击事件处理
const handleWordClick = (word) => {
  console.log('Word clicked:', word)
  // 这里可以添加业务逻辑，比如跳转搜索页面等
}

// 生命周期钩子
onMounted(async () => {
  try {
    const response = await apiService.get('/hotSearch/wordCloud/queryWordCloud?topN=100')
    words.value = response.data.data.map(item => ({
      name: item.word,
      value: item.rate
    }))
  } catch (error) {
    console.error('词云数据加载失败:', error)
    // 这里可以添加错误处理逻辑
  }
})
</script>

<style scoped>
.word-cloud-card {
  padding: 0;
  margin-top: 10px;
  height: 300px;
  position: relative;
}

.word-cloud {
  height: 300px;
  width: 100%;
}

:deep(.el-card__body) {
  padding: 0;
  height: 100%;
}
</style>