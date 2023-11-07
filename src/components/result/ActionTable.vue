<template>
  <n-data-table
    size="small"
    :columns="store.actionColumns"
    :data="store.actionData"
    :single-line="false"
    max-height="70vh"
    style="font-size: 12px"
  />
</template>

<script setup>
import { useStore } from '@/store'
const store = useStore()
</script>
