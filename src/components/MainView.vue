<template>
  <div>
    <!-- 输入区 -->
    <div style="display: flex">
      <n-card title="源代码" style="margin-right: 10px">
        <n-input
          v-model:value="sourceCode"
          type="textarea"
          placeholder="请在这里输入C语言源码"
          :autosize="{
            minRows: 20,
            maxRows: 20,
          }" />
      </n-card>
      <n-card title="语法高亮">
        <n-code :code="sourceCode" language="cpp" show-line-numbers />
      </n-card>
    </div>
    <!-- 按钮区 -->
    <nav class="btnNav">
      <div v-for="item of navBtn" :key="item" class="buttonContainer">
        <n-button
          type="success"
          size="medium"
          @click="handleStartAnalyze"
          v-if="item === 'analyze'">
          <span class="triangle" style="margin-right: 2px"></span>
          开始分析
        </n-button>
        <n-button
          v-else
          secondary
          type="info"
          v-show="analyzeDone"
          @click="showModal(item)">
          {{ resultTitleMapping[item] }}
        </n-button>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { exampleSourceCode } from '@/utils/constants'
import { resultTitleMapping } from '@/utils/mappings'
import { lexicalAnalyze, syntaxAnalyze } from '@/utils/tools'
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { useStore } from '@/store'

const sourceCode = ref(exampleSourceCode)
const analyzeDone = ref(false)
const message = useMessage()
const store = useStore()
const navBtn = ['lex', 'action', 'analyze', 'goto', 'slr']

// 开始分析
const handleStartAnalyze = function () {
  store.token = null
  store.action = null
  store.goto = null
  store.log = null

  store.token = lexicalAnalyze(sourceCode.value)
  // 词法分析出错
  if (store.token.some((v) => v.code === -1)) {
    message.error('词法分析出现错误，请检查')
    analyzeDone.value = true
    return
  }
  const { ACTION, GOTO, log } = syntaxAnalyze(store.token)
  // 语法分析出错
  if (log.some((v) => v.err)) {
    message.error('语法分析出现错误，请检查')
    store.action = ACTION
    store.goto = GOTO
    store.log = log
    analyzeDone.value = true
    return
  }
  store.action = ACTION
  store.goto = GOTO
  store.log = log
  message.success('分析成功')
  analyzeDone.value = true
}

const showModal = function (modalName) {
  store.show = true
  store.modal = modalName
}
</script>

<style scoped>
.btnNav {
  margin-top: 2vh;
  height: 10vh;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.buttonContainer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.triangle {
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-left: 8px solid #fff;
  transform: translateX(4px);
}
</style>
