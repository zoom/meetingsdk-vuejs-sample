<script setup>
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';

var client = ZoomMtgEmbedded.createClient()
var authEndpoint = ''
var sdkKey = ''
var meetingNumber = '123456789'
var passWord = ''
var role = 0
var userName = 'Vue.js'
var userEmail = ''
var registrantToken = ''
var zakToken = ''

function getSignature() {
  fetch(authEndpoint, {
    method: 'POST',
    body: JSON.stringify({
      meetingNumber: meetingNumber,
      role: role
    })
  }).then((response) => {
    return response.json()
  }).then((data) => {
    console.log(data)
    startMeeting(data.signature)
  }).catch((error) => {
    console.log(error)
  })
}

function startMeeting(signature) {
  let meetingSDKElement = document.getElementById('meetingSDKElement');

  client.init({zoomAppRoot: meetingSDKElement, language: 'en-US'}).then(() => {
    client.join({
      signature: signature,
      sdkKey: sdkKey,
      meetingNumber: meetingNumber,
      password: passWord,
      userName: userName,
      userEmail: userEmail,
      tk: registrantToken,
      zak: zakToken
    }).then(() => {
      console.log('joined succesfully')
    }).catch((error) => {
      console.log(error)
    })
  }).catch((error) => {
    console.log(error)
  })
}
</script>

<template>
  <h1>Zoom Meeting SDK Vue.js Sample</h1>

  <!-- For Component View -->
  <div id='meetingSDKElement'>
    <!-- Zoom Meeting SDK Component View Rendered Here -->
  </div>

  <button @click='getSignature'>Join Meeting</button>
</template>

<style scoped>

</style>
