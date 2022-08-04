<template>
  <main>
    <div class="form-group">
      <label for="user-name">Display name</label>
      <input
        id="user-name"
        v-model="userName"
        type="text"
        name="user-name"
        class="form-control"
        maxlength="128"
      />
    </div>
    <div class="form-group">
      <label for="meeting_number">Meeting number</label>
      <input
        id="meeting_number"
        v-model="meetingNumber"
        type="text"
        name="meeting_number"
        class="form-control"
        @input="onInputChange"
      />
    </div>
    <div class="form-group">
      <label for="meeting_password">Meeting password</label>
      <input
        id="meeting_password"
        v-model="passWord"
        type="password"
        name="meeting_password"
        class="form-control"
      />
    </div>
    <div class="form-group">
      <label for="user_email">Email</label>
      <input
        id="user_email"
        v-model="userEmail"
        type="email"
        name="user_email"
        class="form-control"
      />
    </div>
    <div class="form-radio-group">
      <div class="radio-group-wrapper">
        <input type="radio" id="attendee" value="0" v-model="role" />
        <label for="attendee">Attendee</label>
      </div>
      <div class="radio-group-wrapper">
        <input type="radio" id="host" value="1" v-model="role" />
        <label for="host">Host</label>
      </div>
      <div class="radio-group-wrapper">
        <input type="radio" id="assistant" value="5" v-model="role" />
        <label for="assistant">Assistant</label>
      </div>
    </div>
    <button @click="getSignature">Join Meeting</button>
  </main>
</template>

<script>
import { ZoomMtg } from "@zoomus/websdk";
import generateSignature from "../services/generateSignature";

export default {
  name: "Zoom",
  created() {
    ZoomMtg.setZoomJSLib("https://source.zoom.us/2.6.0/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();
    // loads language files, also passes any error messages to the ui
    ZoomMtg.i18n.load("en-US");
    ZoomMtg.i18n.reload("en-US");
  },
  mounted() {
    ZoomMtg.inMeetingServiceListener("onUserJoin", function (data) {
      console.log("inMeetingServiceListener onUserJoin", data);
    });

    ZoomMtg.inMeetingServiceListener("onUserLeave", function (data) {
      console.log("inMeetingServiceListener onUserLeave", data);
    });

    ZoomMtg.inMeetingServiceListener("onUserIsInWaitingRoom", function (data) {
      console.log("inMeetingServiceListener onUserIsInWaitingRoom", data);
    });

    ZoomMtg.inMeetingServiceListener("onMeetingStatus", function (data) {
      console.log("inMeetingServiceListener onMeetingStatus", data);
    });
  },
  data() {
    return {
      leaveUrl: window.location.origin,
      meetingNumber: null, // 5979355876
      passWord: null, // NnpLSnByeVhkV3BDdDN0dEYzOU5RUT09
      role: 0,
      userEmail: null, // "kostadin.draganov@jiminny.com"
      userName: "",
      defaultUserName: "notetaker",
      registrantToken: null,
    };
  },
  methods: {
    getSignature() {
      const sig = generateSignature({
        meetingNumber: this.meetingNumber,
        role: this.role,
      });
      this.startMeeting(sig);
    },

    onInputChange() {
      let tmpMn = this.meetingNumber.replace(/([^0-9])+/i, "");

      if (tmpMn.match(/([0-9]{9,11})/)) {
        tmpMn = tmpMn.match(/([0-9]{9,11})/)[1];
      }

      let tmpPwd = this.meetingNumber.match(/pwd=([\d,\w]+)/);

      if (tmpPwd) {
        this.passWord = tmpPwd[1];
      }

      this.meetingNumber = tmpMn;
    },

    startMeeting(signature) {
      document.getElementById("zmmtg-root").style.display = "block";

      ZoomMtg.init({
        leaveUrl: this.leaveUrl,
        success: (success) => {
          console.log(success);
          ZoomMtg.join({
            meetingNumber: this.meetingNumber,
            userName: this.userName || this.defaultUserName,
            signature: signature,
            sdkKey: process.env.VUE_APP_ZOOM_SDK_KEY,
            userEmail: this.userEmail,
            passWord: this.passWord,
            tk: this.registrantToken,
            success: (success) => {
              console.log(success);
              ZoomMtg.getAttendeeslist({
                success: function (res) {
                  console.log("success getAttendeeslist", res.result);
                },
              });
              ZoomMtg.getCurrentUser({
                success: function (res) {
                  console.log("success getCurrentUser", res.result.currentUser);
                },
              });
            },
            error: (error) => {
              console.log(error);
            },
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  width: 70%;
  margin: auto;
  text-align: center;
}

.form-group {
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  color: #ffffff;
  margin: 15px 50px;
}

.form-radio-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 21px;
  color: #ffffff;
  margin: 20px 50px;
  padding: 10px 15px;
  border: 2px solid white;
}

.radio-group-wrapper {
  display: flex;
  align-items: flex-start;
}

input[type="radio"] {
  width: 22px;
  height: 22px;
  margin-right: 8px;
  vertical-align: middle;
}

button {
  font-size: 24px;
  font-weight: 500;
  text-transform: uppercase;
  margin-top: 20px;
  background-color: #ffffff;
  color: #f1458e;
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

button:hover {
  color: #ffffff;
  background-color: #038aff;
}
</style>
