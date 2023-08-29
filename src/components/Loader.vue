<template>
  <div class="load-wrapper">
    <div class="loader" />
  </div>
</template>

<style scoped>
.load-wrapper {
  z-index : 10;
  position : absolute;
  top : 0;
  left : 0;
  height: 100%;
  width: 100%;
  background-color: rgba(120, 120, 120, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.loader {
  border: 16px solid #e369d554; 
  border-top: 16px solid #ff6666;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  opacity: 0.5;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>