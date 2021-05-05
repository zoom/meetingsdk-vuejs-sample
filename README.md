# Zoom Web SDK Sample Vue.js 2

Use of this sample app is subject to our [Terms of Use](https://zoom.us/docs/en-us/zoom_api_license_and_tou.html).

This repo is a [Vue.js 2](https://vuejs.org/) app generated via the [Vue CLI](https://cli.vuejs.org/) that uses the [Zoom Web SDK](https://marketplace.zoom.us/docs/sdk/native-sdks/web) to start and join Zoom meetings and webinars.

## Installation

To get started, clone the repo:

`$ git clone https://github.com/zoom/websdk-sample-vuejs.git`

## Setup

1. Once cloned, navigate to the `websdk-sample-vuejs` directory:

   `$ cd websdk-sample-vuejs`

1. Then install the dependencies:

   `$ yarn install`

1. Open the `websdk-sample-vuejs` directory in your code editor.

1. Open the `src/components/HelloWorld.vue` file, and enter values for the variables:

   | Variable                   | Description |
   | -----------------------|-------------|
   | signatureEndpoint          | Required, the endpoint url that returns a signature. [Get a signature endpoint here.](https://github.com/zoom/websdk-sample-signature-node.js) |
   | apiKey                   | Required, your Zoom JWT App API Key. [You can get yours here](https://marketplace.zoom.us/develop/create). |
   | meetingNumber                   | The Zoom Meeting / webinar number. |
   | role                   | Required, 0 to join the meeting / webinar, 1 to start the meeting. |
   | leaveUrl                   | Required, the url the user is taken to once the meeting is over. |
   | userName                   | Required, A name for the user joining / starting the meeting / webinar. |
   | userEmail                   | Optional, the user joining / starting the meeting / webinar. |
   | passWord                   | Optional, meeting password. Leave as empty string if the meeting does not require a password. |

   Example:

   ```js
   signatureEndpoint = 'http://localhost:4000'
   apiKey = 'xu3asdfaJPaA_RJW2-9l5_HAaLA'
   meetingNumber = '123456789'
   role = 0
   leaveUrl = 'http://localhost:8080'
   userName = 'Vue.js'
   userEmail = ''
   password = ''
   ```

1. Save `HelloWorld.vue`.

1. Run the app:

   `$ yarn serve`

## Usage

1. Navigate to http://localhost:8080.

   ![Zoom Vue.js Web SDK](https://s3.amazonaws.com/user-content.stoplight.io/19808/1615228749397)

1. Click "Join Meeting" to join the meeting number specified in `src/components/HelloWorld.vue`.

   ![Zoom Vue.js Web SDK](https://s3.amazonaws.com/user-content.stoplight.io/19808/1615228763524)

## Deployment

The Vue.js Sample App can be easily deployed to [GitHub Pages](#github-pages), or [another static web hosting service](#other-static-web-hosting), like an AWS S3 bucket.

### GitHub Pages

1. Create a repo on [GitHub](https://github.com).

1. Add the remote to your project:

   `$ git remote add origin GITHUB_URL/GITHUB_USERNAME/GITHUB_REPO_NAME.git`

1. Open the `vue.config.js` file and on line 3 replace `/GITHUB_REPO_NAME/` with your GitHub repo name surrounded by slashes like this: `/GITHUB_REPO_NAME/`.

1. Build your project:

   `$ yarn build`

1. Rename the `dist` folder to `docs`

1. Git add, commit, and push your project:

   `$ git add -A`

   `$ git commit -m "deploying to github"`

   `$ git push origin master`

1. On GitHub, in your repo, navigate to the "settings" page, scroll down to the "GitHub Pages" section, and choose the "master branch /docs folder" for the source.

1. Now your project will be deployed to https://GITHUB_USERNAME.github.io/GITHUB_REPO_NAME.

### Other Static Web Hosting

1. Build your project:

   `$ yarn build`

1. Deploy the complied `/dist` directory to a static web hosting service, like an AWS S3 bucket.

### Advanced Deployment

For more advanced instructions on deployment, [see the Vue.js Deployment docs](https://cli.vuejs.org/guide/deployment.html).

## Need Support?

The first place to look for help is on our [Developer Forum](https://devforum.zoom.us/), where Zoom Marketplace Developers can ask questions for public answers.

If you can’t find the answer in the Developer Forum or your request requires sensitive information to be relayed, please email us at developersupport@zoom.us.
