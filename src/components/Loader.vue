<template>
  <div class="loader" />
</template>

<style scoped>
.loader {
  border: 16px solid #e369d554; 
  border-top: 16px solid #ff6666;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>