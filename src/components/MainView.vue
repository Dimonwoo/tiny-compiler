<template>
  <div>
    <!-- 输入区 -->
    <n-input
      v-model:value="sourceCode"
      type="textarea"
      placeholder="请在这里输入C语言源码"
      :autosize="{
        minRows: 20,
        maxRows: 20,
      }" />
    <!-- 按钮区 -->
    <nav class="funcNav">
      <div v-for="item of navFunc" :key="item" class="buttonContainer">
        <n-popover v-if="item === 'analyze'" trigger="hover">
          <template #trigger>
            <n-button type="success" @click="handleStartAnalyze">
              <div id="tri"></div>
            </n-button>
          </template>
        </n-popover>
        <n-button
          v-else
          secondary
          type="info"
          :disabled="analyzeDone"
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
const analyzeDone = ref(true)
const message = useMessage()
const store = useStore()
const navFunc = ['lex', 'action', 'analyze', 'goto', 'slr']

// 开始分析
const handleStartAnalyze = function () {
  store.token = null
  store.action = null
  store.goto = null
  store.log = null

  store.token = lexicalAnalyze(sourceCode.value)
  if (store.token.some((v) => v.code === -1)) {
    message.error('词法分析出现错误，请检查')
    analyzeDone.value = false
    return
  }
  const { ACTION, GOTO, log } = syntaxAnalyze(store.token)
  if (log.some((v) => v.err)) {
    message.error('语法分析出现错误，请检查')
    store.action = ACTION
    store.goto = GOTO
    store.log = log
    analyzeDone.value = false
    return
  }
  store.action = ACTION
  store.goto = GOTO
  store.log = log
  message.success('分析成功')
  analyzeDone.value = false
}

const showModal = function (modalName) {
  store.show = true
  store.modal = modalName
}
</script>

<style scoped>
.funcNav {
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

#tri {
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-left: 8px solid #fff;
  transform: translateX(4px);
}
</style>
