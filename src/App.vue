<template>
  <n-config-provider :theme-overrides="themeOverrides" :hljs="hljs">
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
  </n-config-provider>
</template>

<script setup>
import { useStore } from '@/store'
import { resultTitleMapping } from '@/utils/mappings'
import hljs from 'highlight.js/lib/core'
import cpp from 'highlight.js/lib/languages/cpp'

// 注入代码高亮器
hljs.registerLanguage('cpp', cpp)

const store = useStore()

/**
 * js 文件下使用这个做类型提示
 * @type import('naive-ui').GlobalThemeOverrides
 */
const themeOverrides = {
  common: {
    primaryColor: '#3352ff',
    primaryColorHover: '#26d4ff',
    primaryColorPressed: '#3352ff',
  },
  Button: {
    textColor: '#FF0000',
    primaryColor: '#FF0000',
    primaryColorHover: '#FF0000',
  },
}
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
