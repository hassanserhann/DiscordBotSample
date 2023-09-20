const { Client, Collection, Events, GatewayIntentBits, Partials } = require("discord.js");
const { BOT_TOKEN } = require("./config");
const path = require("node:path");
const fs = require("node:fs")

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Message,
        Partials.GuildMember
    ]
});

client.commands = new Collection();
// Create the way to the Commands file
const foldersPath = path.join(__dirname, "commands");
//Recover the files in commands
const commandFolders = fs.readdirSync(foldersPath);

// Loop on each file
for(const folder of commandFolders){
    // On crée le chemin vers 1 dossier
    const commandsPath = path.join(foldersPath, folder);
    //Recover the JS files from the folder
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
    
    // File loop
    for(const file of commandFiles){
        //Create the path of the file
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        // Check if we have data and execute in the file
        if("data" in command && "execute" in command){
            client.commands.set(command.data.name, command);
        }
    }
}

client.on("ready", () => {
    client.user.setPresence({
            activities: [{
                name: 'with discord.js'
            }],
            status: 'dnd'
        });
        
    
})

// Manage the execution of commands
client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    try{
        //Try to execute the interaction
        await command.execute(interaction);
    }catch(error){
        console.log(error);
        if(interaction.replied || interaction.deferred){
            await interaction.followUp({ content: "An error occurred by performing this command", ephemeral: true});
        }else{
            await interaction.reply({ content: "An error occurred by performing this command", ephemeral: true});
        }
    }
});


client.login(BOT_TOKEN);