

# testBot



A bot that can 

1. fetch random cat picture 
2. get current weather of a city.

## Requirements

1. Permission to install new apps to your Slack workspace.
2. A publicly accessible URL to serve the bot from. (Slack API recommends using ngrok.)

## Installation

1. Clone this repo.

2. cd to the app folder and install the requirements using `npm i` in the terminal.

3. Create a new Slack app on [Slack API](https://api.slack.com/)

   - add the following bot toke oauth scopes and install in to your workspace:

     * app_mentions:read

     * channels:history

     * commands

     * groups:history

     * im:history

     * im:write

     * incoming-webhook

     * mpim:history

4. Go to the app's "Event Subscriptions" page and add the same URL as above. 

5. Go to the "Interactivity & Shortcuts" page

   1.  switch on the Interactivity
   2. add the URL where the bot is being served + "/slack/events"to Request URL (The URL could be the one generated through [ngrok](https://ngrok.com/) as recommended by Slack API document.) 
   3. Save Changes

6. Go to the "Slash Commands" page and create two new commands and add the same URL as above:

   1. /weather
   2. /get-cat

7. Create a .env file in the app folder and set the variables:

   1. SLACK_BOT_TOKEN=your slack bot token<sup>1</sup>
   2. SLACK_SIGNING_SECRET=your signing secret<sup>2</sup>
   3. WEATHER_TOKEN=your weather API token<sup>3</sup>

   <sup>1</sup>The Bot User Oauth Token showed on oAuth & Permissions page, starts with oxob.

   <sup>2</sup>The Signing Secret showed on Basic Information page, in the App Credentials section.

   <sup>3</sup>The API token get from [Weather API](https://openweathermap.org/api) through signing up.

8. Start the bot using `npm start:dev` in the terminal.

## Usage

Once installed in your slack workspace and invited to a channel, you can use two commands "/weather {city name}" and "/get-cat" to get the result from you want the bot.

<a data-flickr-embed="true" href="https://www.flickr.com/photos/193789791@N03/51484511794/in/dateposted-public/" title="testBot"><img src="https://live.staticflickr.com/65535/51484511794_6e15049f43_o.gif" width="600" height="647" alt="testBot"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>