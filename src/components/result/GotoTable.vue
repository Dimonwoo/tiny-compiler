<template>
  <n-data-table
    size="small"
    :columns="store.gotoColumns"
    :data="store.gotoData"
    :single-line="false"
    max-height="70vh"
    style="font-size: 12px"
  />
</template>

<script setup>
import { useStore } from '@/store'
const store = useStore()
</script>
