<template>
  <n-config-provider :hljs="hljs">
    <n-message-provider>
      <div id="root">
        <h1 class="header">C语言语法分析器</h1>
        <MainView class="mainView"></MainView>
      </div>
    </n-message-provider>
    <!-- 模态框 -->
    <n-modal
      v-model:show="store.show"
      close-on-esc
      :on-after-leave="() => (store.modal = null)"
      style="width: 90vw; height: 90vh; left: 5vw">
      <n-card
        :title="resultTitleMapping[store.modal]"
        aria-modal="true"
        :style="getCardStyle(store.modal)">
        <LexicalTable v-if="store.modal === 'lex'"></LexicalTable>
        <ActionTable v-if="store.modal === 'action'"></ActionTable>
        <GotoTable v-if="store.modal === 'goto'"></GotoTable>
        <SLRLog v-if="store.modal === 'slr'"></SLRLog>
      </n-card>
    </n-modal>
  </n-config-provider>
</template>

<script setup>
import { useStore } from '@/store'
import { resultTitleMapping } from '@/utils/mappings'
import hljs from 'highlight.js/lib/core'
import cpp from 'highlight.js/lib/languages/cpp'

// 注入代码高亮器
hljs.registerLanguage('cpp', cpp)
// 注入log高亮器
hljs.registerLanguage('naive-log', () => ({
  contains: [
    {
      className: 'number',
      begin: /\d+/,
    },
  ],
}))
function getCardStyle(modal) {
  if (modal === 'slr') {
    return {
      overflow: 'scroll',
    }
  } else {
    return {}
  }
}
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
