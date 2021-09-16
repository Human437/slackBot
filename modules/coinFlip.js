module.exports = async () => {
  const headResponse = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "*Heads*",
    },
    accessory: {
      type: "image",
      image_url:
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages.clipartpanda.com%2Fquarter-clipart-quarter_1213.png&f=1&nofb=1",
      alt_text: "alt text for quarter heads",
    },
  };
  const tailResponse = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "*Tails*",
    },
    accessory: {
      type: "image",
      image_url:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fresearchmaniacs.com%2FRandom%2FImages%2FQuarter-Tails.png&f=1&nofb=1",
      alt_text: "alt text for quarter heads",
    },
  };

  const value = Math.floor(Math.random() * 2);
  if (value == 1) {
    return headResponse;
  } else {
    return tailResponse;
  }
};
