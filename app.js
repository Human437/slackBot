const dotenv = require("dotenv");
const { App } = require("@slack/bolt");
const axios = require("axios");

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

bot.message(/weather/i, async ({ message, say }) => {
  let city = message.text.split(" ")[1];
  if (city) {
    try {
      const res = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: city,
            appid: process.env.WEATHER_TOKEN,
          },
        }
      );
      if (res.status === 200) {
        let weatherData = res.data;
        let temp = (
          ((Number(weatherData.main.temp) - 273.15) * 9) / 5 +
          32
        ).toFixed(2);
        let generalText = `Temperature: ${temp}°F \n Pressure: ${weatherData.main.pressure} \n Humidity: ${weatherData.main.humidity}`;
        let windText = `Speed: ${weatherData.wind.speed}\n Degree: ${weatherData.wind.deg}`;
        const message = {
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "*General*",
              },
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: generalText,
              },
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "*Wind*",
              },
            },
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: windText,
              },
            },
          ],
        };
        await say(message);
      } else {
        await say(res.statusText);
      }
    } catch (err) {
      // console.log("error:", err);
    }
  } else {
    await say("You may want to try this: weather {city name}");
  }
});

(async () => {
  // Start your app
  await bot.start(process.env.PORT || 4390);

  console.log("⚡️ Bolt app is running!");
})();
