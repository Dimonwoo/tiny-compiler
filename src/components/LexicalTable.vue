<template>
  <n-data-table
    size="small"
    :columns="columns"
    :data="store.token"
    :row-class-name="rowClassName"
    max-height="70vh"
  />
</template>

<script setup>
import { useStore } from '@/store'
const store = useStore()
const columns = [
  {
    title: '序号',
    key: 'index',
  },
  {
    title: '类型',
    key: 'type',
  },
  {
    title: '种别码',
    key: 'code',
  },
  {
    title: '值',
    key: 'value',
  },
]
const rowClassName = (row) => (row.code === -1 ? 'err' : '')
</script>

<style scoped>
:deep(.err td) {
  color: rgba(255, 0, 0, 0.75) !important;
}
</style>
