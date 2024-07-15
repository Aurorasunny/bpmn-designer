<script setup></script>
<template>
  <div class="circle">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70">
      <circle
        cx="33"
        cy="33"
        r="30"
        fill="#ffffff"
        stroke="#79bbff"
        stroke-width="3"
      />
    </svg>
  </div>
</template>
<style scoped lang="scss">
.circle {
  padding: 5px;
  width: 60px;
  height: 60px;
  svg {
    filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.12));
  }
}
</style>
