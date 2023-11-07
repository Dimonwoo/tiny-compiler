<template>
  <n-message-provider>
    <div id="root">
      <h1 class="my-header">Araden的C语言语法分析器</h1>
      <MainView class="my-mainview"> </MainView>
      <div class="my-footer">使用 Vue + vite + JavaScript + naive-ui</div>
    </div>
  </n-message-provider>

  <n-modal
    v-model:show="store.show"
    :on-after-leave="() => (store.modal = null)"
  >
    <n-card
      :title="resultTilteMapping[store.modal]"
  aria-modal="true"
      style="width: 90vw; height: 90vh; left: 5vw; overflow: scroll"
    >
      <LexicalTable v-if="store.modal === 'lex'"></LexicalTable>
      <ActionTable v-if="store.modal === 'action'"></ActionTable>
      <GotoTable v-if="store.modal === 'goto'"></GotoTable>
      <SLRLog v-if="store.modal === 'slr'"></SLRLog>
</n-card>
  </n-modal>
</template>

<script setup>
import MainView from '@/components/MainView.vue'
import LexicalTable from '@/components/result/LexicalTable.vue'
import ActionTable from '@/components/result/ActionTable.vue'
import GotoTable from '@/components/result/GotoTable.vue'
import SLRLog from '@/components/result/SLRLog.vue'
import { useStore } from '@/store'
import { resultTilteMapping } from '@/utils/mappings'

const store = useStore()
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

#root {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 8vh 1fr 4vh;
  grid-auto-columns: auto;
  background: url('@/assets/bg.svg');
}

.my-header {
  line-height: 8vh;
  font-family: serif;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.6);
}

.my-mainview {
  padding: 20px 10vw;
}

.my-footer {
  font: 300 12px/4vh cursive;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
