<template>
  <main>
    <h1>Zoom Meeting SDK Sample Vue.js 2</h1>
    <button @click="getSignature">Join Meeting</button>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: 'HelloWorld',
  created () {
    this.ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.7/lib', '/av');
    this.ZoomMtg.preLoadWasm();
    this.ZoomMtg.prepareWebSDK();
    // loads language files, also passes any error messages to the ui
    this.ZoomMtg.i18n.load('en-US');
    this.ZoomMtg.i18n.reload('en-US');
  },
  mounted() {
    this.ZoomMtg.inMeetingServiceListener("onUserJoin", (data) => {
      console.log("inMeetingServiceListener onUserJoin", data);
    });
  },
  data () {
    return {
      apiKey: "",
      leaveUrl: "http://localhost:8080",
      meetingNumber: "123456789",
      passWord: "",
      role: 0,
      signatureEndpoint: "",
      userEmail: "",
      userName: "Vue.js",
      // pass in the registrant's token if your meeting or webinar requires registration. More info here:
      // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/build/meetings/join#join-registered
      // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/build/webinars/join#join-registered-webinar
      registrantToken: ''
    }
  },
  methods: {
    getSignature() {
      axios.post(this.signatureEndpoint, {
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

      this.ZoomMtg.init({
        leaveUrl: this.leaveUrl,
        success: (success) => {
          console.log(success);
          this.ZoomMtg.join({
            meetingNumber: this.meetingNumber,
            userName: this.userName,
            signature: signature,
            apiKey: this.apiKey,
            userEmail: this.userEmail,
            passWord: this.passWord,
            tk: this.registrantToken,
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
