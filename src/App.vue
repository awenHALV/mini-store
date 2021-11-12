<template>
  <div>
    <button @click="addClick">点击按钮+1</button>
    {{count}}
  </div>
</template>

<script setup>
import { useStore } from './store/store';
import { computed } from 'vue';
const store = useStore();
let count = computed(() => {
  return store.state.count;
});
function addClick() {
  store.commit('addCount');
}
</script>

<style lang="scss" scoped>
</style>