<template>
  <main>
    <h1>Zoom Meeting SDK Sample Vue.js 2</h1>

    <!-- For Component View -->
    <div id="meetingSDKElement">
      <!-- Zoom Meeting SDK Component View Rendered Here -->
    </div>

    <button @click="getSignature">Join Meeting</button>
  </main>
</template>

<script>
import axios from "axios";
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';

export default {
  name: 'HelloWorld',
  created () {
  },
  data () {
    return {
      client: ZoomMtgEmbedded.createClient(),
      authEndpoint: "",
      sdkKey: "",
      meetingNumber: "123456789",
      passWord: "",
      role: 0,
      userName: "Vue.js",
      userEmail: "",
      registrantToken: '',
      zakToken: ''
    }
  },
  methods: {
    getSignature() {
      axios.post(this.authEndpoint, {
        meetingNumber: this.meetingNumber,
        role: this.role
      })
      .then(res => {
        console.log(res.data.signature);
        this.startMeeting(res.data.signature);
      })
      .catch(error => {
        console.log(error);
      });
    },
    startMeeting(signature) {
      let meetingSDKElement = document.getElementById('meetingSDKElement');

      this.client.init({
        debug: true,
        zoomAppRoot: meetingSDKElement,
        language: 'en-US',
        customize: {
          meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
          toolbar: {
            buttons: [
              {
                text: 'Custom Button',
                className: 'CustomButton',
                onClick: () => {
                  console.log('custom button');
                }
              }
            ]
          }
        }
      });

      this.client.join({
        signature: signature,
        sdkKey: this.sdkKey,
        meetingNumber: this.meetingNumber,
        password: this.passWord,
        userName: this.userName,
        userEmail: this.userEmail,
        tk: this.registrantToken,
        zak: this.zakToken
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  width: 70%;
  margin: auto;
  text-align: center;
}

main button {
  margin-top: 20px;
  background-color: #2D8CFF;
  color: #ffffff;
  text-decoration: none;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 40px;
  padding-right: 40px;
  display: inline-block;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  outline: none;
}

main button:hover {
  background-color: #2681F2;
}
</style>
