<template>
  
  <div class="wrapper">
    <h2>Share your cat:</h2>
    <Loader v-if="loading" />
    <label for="fileInput" class="custom-upload">
      <img v-if="previewImage" :src="previewImage" />
      <h3 v-else>Choose image to download</h3>
    </label>   
    <input
      id="fileInput"
      ref="fileInput"
      type="file"
      accept="image/gif, image/jpeg, image/png"
      @input="pickFile"
    />
  </div>
  <h2 v-if="showUploadMessage"> {{ showUploadMessage }}</h2>
  <button v-if="file" @click="sendImg()">
    Send
  </button>
</template>
<script setup>
import { ref, computed } from 'vue';
import Loader from '@/components/Loader.vue'
import { shareKity, loading } from '@/api'
const previewImage = ref(null);
const fileInput = ref(null);
const file = ref();
const res = ref('')
const showUploadMessage = computed(()=>{
  switch (res.value) {
    case 1: return 'You succesfully share';
    case 0: return 'Your image denied';
    default: return '';
  }
});
const pickFile = () => {
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
  loading.value = true;
  const formData = new FormData();
  const fileData = file.value[0];
  formData.append('file', fileData, fileData.name);
  res.value = await shareKity(formData);
  file.value = null;
  previewImage.value = null;
  loading.value = false;
}
</script>

<style scoped>
h2 {
  text-align: center;
  padding-bottom: 0.5em;
}
.wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
#fileInput {
  display: none;
}
.custom-upload {
  min-height: 250px;
  width: auto;
  margin: 0 auto;
  border: solid #FCBAAD;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
}
input[type=file]::file-selector-button {
  margin-right: 20px;
  border: none;
  background: #E48586;
  padding: 10px 20px;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: background .2s ease-in-out;
}

input[type=file]::file-selector-button:hover {
  background: #916DB3;
}
button {
  margin-right: 20px;
  margin-top: 10px;
  border: none;
  background: #E48586;
  padding: 10px 20px;
  border-radius: 10px;
  color: #916DB3;
  cursor: pointer;
  transition: background .2s ease-in-out;
}
button:hover {
  color: #fff;
}
</style>