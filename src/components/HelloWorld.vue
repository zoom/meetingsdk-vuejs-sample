<template>
  <main>
    <h1>Zoom Meeting SDK Sample Vue.js 2</h1>
    <button @click="getSignature">Join Meeting</button>
  </main>
</template>

<script>
import axios from "axios";
import { ZoomMtg } from '@zoomus/websdk';

export default {
  name: 'HelloWorld',
  created () {
    ZoomMtg.setZoomJSLib('https://source.zoom.us/2.16.0/lib', '/av');
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();
    // loads language files, also passes any error messages to the ui
    ZoomMtg.i18n.load('en-US');
    ZoomMtg.i18n.reload('en-US');
  },
  mounted() {
    ZoomMtg.inMeetingServiceListener("onUserJoin", (data) => {
      console.log("inMeetingServiceListener onUserJoin", data);
    });
  },
  data () {
    return {
      authEndpoint: "",
      sdkKey: "",
      meetingNumber: "123456789",
      passWord: "",
      role: 0,
      userName: "Vue.js",
      userEmail: "",
      registrantToken: '',
      zakToken: '',
      leaveUrl: "http://localhost:8080"
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
      document.getElementById("zmmtg-root").style.display = "block";

      ZoomMtg.init({
        leaveUrl: this.leaveUrl,
        success: (success) => {
          console.log(success);
          ZoomMtg.join({
            signature: signature,
            sdkKey: this.sdkKey,
            meetingNumber: this.meetingNumber,
            passWord: this.passWord,
            userName: this.userName,
            userEmail: this.userEmail,
            tk: this.registrantToken,
            zak: this.zakToken,
            success: (success) => {
              console.log(success);
            },
            error: (error) => {
              console.log(error);
            }
          });
        },
        error: (error) => {
          console.log(error);
        }
      });
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
