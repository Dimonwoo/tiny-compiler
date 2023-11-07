<template>
  <div>
    <n-input
      v-model:value="source"
      type="textarea"
      placeholder="在这里输入C语言源码"
      :autosize="{
        minRows: 20,
        maxRows: 20,
      }"
    />
    <nav class="funcNav">
      <div v-for="item of navFunc" :key="item" class="button-container">
        <n-popover v-if="item === 'analyse'" trigger="hover">
          <template #trigger>
            <n-button type="success" @click="startAnalyse">
              <div id="tri"></div>
            </n-button>
          </template>
          <span>开始分析</span>
        </n-popover>
        <n-button
          v-else
          secondary
          type="info"
          :disabled="analyseDone"
          @click="showModal(item)"
          >{{ resultTilteMapping[item] }}</n-button
        >
      </div>
    </nav>
  </div>
</template>

<script setup>
import { exampleSourceCode } from '@/utils/constants'
import { resultTilteMapping } from '@/utils/mappings'
import { lexicalAnalyse, syntaxAnalyse } from '@/utils/tools'
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { useStore } from '@/store'

const source = ref(exampleSourceCode)
const analyseDone = ref(true)
const message = useMessage()
const store = useStore()
const navFunc = ['lex', 'action', 'analyse', 'goto', 'slr']

const startAnalyse = function () {
  store.token = null
  store.action = null
  store.goto = null
  store.log = null

  store.token = lexicalAnalyse(source.value)
  if (store.token.some((v) => v.code === -1)) {
    message.error('词法分析出现错误，请检查')
    analyseDone.value = false
    return
  }
  const { ACTION, GOTO, log } = syntaxAnalyse(store.token)
  if (log.some((v) => v.err)) {
    message.error('语法分析出现错误，请检查')
    store.action = ACTION
    store.goto = GOTO
    store.log = log
    analyseDone.value = false
    return
  }
  store.action = ACTION
  store.goto = GOTO
  store.log = log
  message.success('分析成功')
  analyseDone.value = false
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

.button-container {
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
