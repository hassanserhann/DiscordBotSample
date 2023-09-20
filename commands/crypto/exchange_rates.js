const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { COIN_API_KEY } = require("../../config.js");
const https = require('https');

var options = {
    "method": "GET",
    "hostname": "rest.coinapi.io",
    "path": "/v1/exchangerate/BTC?invert=false",
    "headers": {'X-CoinAPI-Key': COIN_API_KEY}
};

module.exports = {
    data: new SlashCommandBuilder()
            .setName("rates")
            .setDescription("Get all exchange rates for BTC"),
    async execute(interaction){
        await interaction.deferReply();  // Defer the reply

        var request = https.request(options, function (response) {
            var chunks = [];
            response.on("data", function (chunk) {
              chunks.push(chunk);
            }).on("end", async function () {
              var body = Buffer.concat(chunks);
              var data = JSON.parse(body.toString());

              let rateChunks = [];
              for (let i = 0; i < data.rates.length; i += 10) {
                  rateChunks.push(data.rates.slice(i, i + 10));
              }

              for (const rates of rateChunks) {
                  let rateFields = rates.map(rate => ({
                      name: `BTC to ${rate.asset_id_quote}`,
                      value: `${rate.rate.toFixed(2)}`,
                      inline: true
                  }));

                  const rateEmbed = new EmbedBuilder()
                      .setColor(0x0099FF) // color
                      .setTitle("Exchange Rates for BTC")
                      .addFields(rateFields)
                      .setFooter({ text: "Data provided by CoinAPI" });

                  await interaction.followUp({ embeds: [rateEmbed] });
              }
            });
        });
           
        request.end();
    }
}
