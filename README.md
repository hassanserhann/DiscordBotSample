# Discord-Bot-Sample

<h1 align="center">🤖 DiscordBotSample: Your Friendly Discord Bot Using discord.js@14 🎉</h1>

<p align="center">
  <img src="https://media.discordapp.net/attachments/1154115914749460540/1154120339756945408/pb.png?width=286&height=270" alt="DiscordBotSample Logo" width="200">
</p>

<p align="center">
  Dive into DiscordBotSample, a fun and friendly bot for Discord. Here's how to get started!
</p>

---

## 🚀 Getting Started

Follow these steps to set up DiscordBotSample on your local machine:

### 1️⃣ Clone the Project

```bash
git https://github.com/hassanserhann/DiscordBotSample.git
cd DiscordBotSample
```

### 2️⃣ Rename Config File and Set API Key

- Rename `config.js.example` to `config.js` and fill in the variable values.
- Obtain an API key from [CoinAPI](https://www.coinapi.io/market-data-api/pricing) and fill it in the `config.js`.

### 3️⃣ Install Prerequisites

Ensure you have **Node.js v18.18.0 or newer** installed.

🔗 [Download Node.js](https://nodejs.org/)

### 4️⃣ Install Dependencies

```bash
npm install discord.js@14
npm install
```

### 5️⃣ Deploy Commands

Run the command below to deploy the bot commands:

```bash
node deploy-commands.js
```

### 6️⃣ Start the Bot

It's recommended to run the project using `nodemon`:

```bash
nodemon index
```

---

<p align="center">
  Enjoy your journey with DiscordBotSample!
</p>

## 🎮 Available Slash Commands

- `/ping`: Basic command to check if the bot is active.
- `/test`: A test command to see if the bot is processing commands.
- `/rates`: Fetches the current exchange rates.

## 📚 Resources

For additional information and best practices, check out:

- [Discord.js Guide](https://discordjs.guide/#before-you-begin)
