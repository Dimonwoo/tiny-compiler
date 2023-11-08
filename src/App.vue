<template>
  <n-message-provider>
    <div id="root">
      <h1 class="header">C语言语法分析器</h1>
      <MainView class="mainView"></MainView>
    </div>
  </n-message-provider>

  <!-- 模态框 -->
  <n-modal
    v-model:show="store.show"
    :on-after-leave="() => (store.modal = null)">
    <n-card
      :title="resultTitleMapping[store.modal]"
      aria-modal="true"
      style="width: 90vw; height: 90vh; left: 5vw; overflow: scroll">
      <LexicalTable v-if="store.modal === 'lex'"></LexicalTable>
      <ActionTable v-if="store.modal === 'action'"></ActionTable>
      <GotoTable v-if="store.modal === 'goto'"></GotoTable>
      <SLRLog v-if="store.modal === 'slr'"></SLRLog>
    </n-card>
  </n-modal>
</template>

<script setup>
import { useStore } from '@/store'
import { resultTitleMapping } from '@/utils/mappings'

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
}

.header {
  line-height: 8vh;
  font-family: serif;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.6);
}

.mainView {
  padding: 20px 10vw;
}
</style>
