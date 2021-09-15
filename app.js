const dotenv = require("dotenv");
const { App } = require("@slack/bolt");
const axios = require("axios");
const getCatImg = require("./modules/getCatImg");
const getWeather = require("./modules/getWeather");

dotenv.config();

const bot = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Listens to incoming messages that contain "hello"
bot.message(`hello`, async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Hey there <@${message.user}>!`,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Click Me",
          },
          action_id: "button_click",
        },
      },
    ],
    text: `Hey there <@${message.user}>!`,
  });
});

bot.action("button_click", async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

// Event test
// You need to subscribe to the event in "event subscription" for the app to see the event
// Bot says hello when it is mentioned
bot.event(`app_mention`, async ({ event, client }) => {
  try {
    // Call chat.postMessage with the built-in client
    console.log(event);
    const result = await client.chat.postMessage({
      channel: event.channel,
      text: `Hello, <@${event.user}>`,
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
});

// Command test
// You must setup the command, in this case "hello-world", in the app dashboard in order for the command to work
bot.command("/hello-world", async ({ command, ack, respond }) => {
  // Acknowledge command request
  await ack();
  console.log(command);
  await respond(`Hello World`);
});

// Command to get a cat image
bot.command("/get-cat", async ({ command, ack, respond }) => {
  // Acknowledge command request
  await ack();
  const catImgUrl = await getCatImg();
  await respond({
    blocks: [
      {
        type: "image",
        title: {
          type: "plain_text",
          text: "Cat image",
          emoji: true,
        },
        image_url: catImgUrl,
        alt_text: "alt text for image",
      },
    ],
  });
});

// Command to get weather
bot.command("/weather", async ({ command, ack, respond }) => {
  // Acknowledge command request
  await ack();
  const city = command.text.replace(/\s+/g, " ").trim();
  try {
    const res = await getWeather(city);

    if (res.status === 200) {
      let weatherData = res.data;
      let temp = (
        ((Number(weatherData.main.temp) - 273.15) * 9) / 5 +
        32
      ).toFixed(2);
      let temperatureText = `*${city.toUpperCase()}*\nTemperature: ${temp}°F\n Description: ${
        weatherData.weather[0].description
      } \n Humidity: ${weatherData.main.humidity}`;
      const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;
      const message = {
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: temperatureText,
            },
            accessory: {
              type: "image",
              image_url: iconUrl,
              alt_text: "alt text for image",
            },
          },
        ],
      };
      await respond(message);
    } else {
      await respond(res);
    }
  } catch (err) {
    console.log("error:", err);
  }
});

(async () => {
  // Start your app
  await bot.start(process.env.PORT || 4390);

  console.log("⚡️ Bolt app is running!");
})();
