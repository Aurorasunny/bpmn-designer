<script setup>
import { inject, ref, onMounted } from "vue";
const nodeFuc = inject("getNode");
const nodeData = ref(null);
onMounted(() => {
  const node = nodeFuc?.();
  nodeData.value = node?.getData();
});
</script>
<template>
  <div>
    <el-card class="userTask">
      <el-icon class="avatar" color="#a5c4ff" :size="20">
        <UserFilled />
      </el-icon>
      <el-text class="desc" tag="b">{{
        nodeData ? nodeData.nodeName : "用户任务"
      }}</el-text>
    </el-card>
  </div>
</template>
<style scoped lang="scss">
.userTask {
  width: 120px;
  height: 70px;
  background-color: #eff4ff;
  border-radius: 10px;
  position: relative;
  .avatar {
    position: absolute;
    top: 13%;
    left: 7%;
  }
  .desc {
    font-size: 13px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
}
</style>
