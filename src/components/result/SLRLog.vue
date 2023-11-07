<template>
  <n-steps vertical v-model:current="current">
    <n-step
      v-for="item of store.log"
      :key="item.title"
      size="small"
      :title="item.title"
      :description="item.description"
      :status="item.err ? 'error' : ''"
      style="font-size: 12px"
    />
  </n-steps>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/store'

const store = useStore()
const current = ref(1)
</script>
