<script setup>
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';

var client = ZoomMtgEmbedded.createClient()
var authEndpoint = ''
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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      meetingNumber: meetingNumber,
      role: role,
      videoWebRtcMode: 1
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

  client.init({zoomAppRoot: meetingSDKElement, language: 'en-US', patchJsMedia: true, leaveOnPageUnload: true}).then(() => {
    client.join({
      signature: signature,
      meetingNumber: meetingNumber,
      password: passWord,
      userName: userName,
      userEmail: userEmail,
      tk: registrantToken,
      zak: zakToken
    }).then(() => {
      console.log('joined successfully')
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
