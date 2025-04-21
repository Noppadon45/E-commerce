<script setup>
import Userlayout from "@/layouts/Userlayout.vue"
import { ref , onMounted } from "vue"

const profileImageUrl = ref('https://image.cdn2.seaart.me/2023-09-22/17842173328257029/f37d3a603fccb9fa994204c38161592e11ab8d22_high.webp')
const email = ref('')
const name = ref('')
const UploadImage = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      profileImageUrl.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}


const SubmitProfile = () => {
  const profileData = {
    email: email.value,
    name: name.value,
    imageUrl: profileImageUrl.value,
  }
  localStorage.setItem('profile-data', JSON.stringify(profileData))
  alert('Profile updated successfully!')
}

onMounted(() => {
  let profileData = localStorage.getItem('profile-data')
  if (profileData) {
    profileData = JSON.parse(profileData)
    profileImageUrl.value = profileData.imageUrl
    name.value = profileData.name
    email.value = profileData.email
  }
})

</script>

<template>
  <Userlayout>
    <div class="border border-base-200 shadow-xl max-w-4xl mx-auto p-10 my-4">
      <div class="font-bold text-2xl">
        Profile
      </div>
      <div class="flex flex-col items-center">
      <div class="w-40 avatar">
        <div class="w-40 rounded-full">
        <img :src="profileImageUrl" >
      </div>
      </div>
      <input type="file" @change="UploadImage">
    </div>
      <fieldset class="fieldset">
  <legend class="fieldset-legend">Email</legend>
  <input v-model="email" type="text" class="input input-accent input-md w-full" placeholder="Email" />
</fieldset>
<fieldset class="fieldset">
  <legend class="fieldset-legend">Name</legend>
  <input v-model="name" type="text" class="input input-accent input-md w-full" placeholder="Name" />
</fieldset>
<div>
  <button @click="SubmitProfile" class="btn btn-primary w-full mt-5">Update Profile</button>
</div>
    </div>  
    </Userlayout>
</template>
