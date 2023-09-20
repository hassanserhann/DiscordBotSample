const { REST, Routes } = require("discord.js");
const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = require("./config");
const fs = require("node:fs");
const path = require("node:path");

const commands = [];
// Create the path to the commands folder
const foldersPath = path.join(__dirname, "commands");
// Get the folders in commands
const commandFolders = fs.readdirSync(foldersPath);

// Loop on each folder
for(const folder of commandFolders){
    // Create the path to 1 folder
    const commandsPath = path.join(foldersPath, folder);
    // Get the JS files in the folder
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
    
    // Lopp on the files
    for(const file of commandFiles){
        // Create the path to the file
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        // Check if we have data AND execute in the file
        if("data" in command && "execute" in command){
            commands.push(command.data.toJSON());
        }else{
            console.log("One of the two attributes at least is missing");
        }
    }
}

// Initiate the REST API
const rest = new REST().setToken(BOT_TOKEN);

// Deploy the commands
(async () => {
    try{
        console.log(`Start of refreshment of ${commands.length} the commandes`);

        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID,GUILD_ID),
            { body: commands }
        );

        console.log(`Start of refreshment of ${data.length} the commandes`);
    }catch(error){
        console.error(error);
    }
})();