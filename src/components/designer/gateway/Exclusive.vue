<script setup>
</script>

<template>
  <div class="gateway">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70" class="diamond">
      <polygon points="35,0 70,35 35,70 0,35" stroke="#79bbff" stroke-width="3" fill="none"/>
      <line x1="25" y1="25" x2="45" y2="45" stroke="#79bbff" stroke-width="5"/>
      <line x1="25" y1="45" x2="45" y2="25" stroke="#79bbff" stroke-width="5"/>
    </svg>
  </div>
</template>

<style scoped>
.gateway {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  svg {
    filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.12));
  }
}

.diamond {
  width: 100%;
  height: 100%;
  padding: 5px;
}
</style>
