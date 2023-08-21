<template>
  <h2>Share your cat:</h2>
  <div class="wrapper">
    <img v-if="previewImage" :src="previewImage" />
    <input
      ref="fileInput"
      type="file"
      accept="image/gif, image/jpeg, image/png"
      @input="pickFile"
    />
  </div>
  <button v-if="file" @click="sendImg()">
    Send
  </button>
</template>
<script setup>
import {ref} from 'vue';
import { shareKity } from '@/api'
const previewImage = ref(null);
const fileInput = ref(null);
const file = ref();
function pickFile () {
  let input = fileInput.value;
  file.value = input.files;
  if (file.value && file.value[0]) {
    let reader = new FileReader
    reader.onload = e => {
      previewImage.value = e.target.result
    }
    reader.readAsDataURL(file.value[0]);
    
  }
}
const sendImg = async() => {
  const formData = new FormData();
  formData.append("filename", file.value);
  shareKity(formData); 
}
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
input[type=file]::file-selector-button {
  margin-right: 20px;
  border: none;
  background: #df08b1bb;
  padding: 10px 20px;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: background .2s ease-in-out;
}

input[type=file]::file-selector-button:hover {
  background: #0d45a5;
}
button {
  margin-right: 20px;
  margin-top: 10px;
  border: none;
  background: #df08b1bb;
  padding: 10px 20px;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: background .2s ease-in-out;
}
</style>