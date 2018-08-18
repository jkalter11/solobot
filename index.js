const config = require("./config.json");
const Discord = require("discord.js");
const Solo = new Discord.Client({disableEveryone: true});



Solo.on("ready", async () => { //Solo "playing..."
  console.log("'Solo.' has loaded successfully.");
  Solo.user.setActivity("over the Server", {type: "WATCHING"});
});

Solo.on("message", async message => {
  if(message.author.Solo) return;
  if(message.channel.type === "dm") return;
  //if(message.channel.name != "solo-nightly-testing") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let embedNoPerms = new Discord.RichEmbed()
  .setTitle("Solobot - Error")
  .setAuthor(Solo.user.username, Solo.user.avatarURL)
  .setColor(config.embedFailure)
  .setTimestamp()
  .setThumbnail("https://i.imgur.com/ADRsqLY.png")

  .addField("Error", "You do not have the right permissions to perform this Action.");

  


  //HELP-Command
  //Tags:
  // help helpcommand command: help
  if(cmd === config.prefix + "help") {
      let embed = new Discord.RichEmbed()
        .setTitle("Solobot - Help")
        .setAuthor(Solo.user.username, Solo.user.avatarURL)
        .setThumbnail(Solo.user.avatarURL)
        .setDescription("You are looking at Solobots' Helppage.")
        .setColor(config.embedInformation)

        .addField("Information", "**>help** :exclamation: - Returns this Helppage \n **>server** :globe_with_meridians: - Displays some Information about this Guild")
        .addField("Moderation", "**>report [@user] [reason]** :mega: - Reports a User.")
        .addField("Fun", "**>pickle** :no_mouth: - WIP, tells you your pickle size")
        .addField("Admincommands", "**>state [PLAYING|STREAMING|LISTENING|WATCHING] [Activity, max. 5 Words]** :speech_left: - Changes the displayed activity of the bot.")
        .setFooter("© iamflee_")
        .setTimestamp()
      return message.channel.send(embed);
  }

  if(cmd === config.prefix + "server") {
    let serverIcon = message.guild.iconURL;
    let embed = new Discord.RichEmbed()
    .setTitle("Solobot - Serverinfo")
    .setAuthor(Solo.user.username, Solo.user.avatarURL)
    .setThumbnail(serverIcon)
    .setDescription("Displaying Information about this Guild.")
    .setColor(config.embedInformation)

    .setTimestamp()
    .addField("Server Name", message.guild.name)
    .addField("Created on", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);


    return message.channel.send(embed);
  }

  if(cmd === config.prefix + "user") {
    if(args === null) {
      return message.reply("Test");
    } else {
      return message.reply(args);
    }
  }

  if(cmd === config.prefix + "pickle") {
    function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
    }

    let pickle = getRandomInt(37);
    let pickleFloat = getRandomInt(9);
    let embed = new Discord.RichEmbed()
    .setTitle("Solobot - Pickle")
    .setAuthor(Solo.user.username, Solo.user.avatarURL)
    .setThumbnail("https://vignette.wikia.nocookie.net/clubpenguin/images/7/71/Pickle.png")
    .setDescription("A command to crappily display the size of your pickle.")
    .setColor(config.embedSuccess)

    .setTimestamp()

    .addField("Your Pickle size is", "~" + pickle + "." + pickleFloat + "cm");
    if(message.member == message.guild.owner || message.member.hasPermission("ADMINISTRATOR")){
// TODO: Fix
      let pickletwo = 39;
      let pickleFloatTwo = getRandomInt(9);
      let embedtwo = new Discord.RichEmbed()
      .setTitle("Solobot - Pickle")
      .setAuthor(Solo.user.username, Solo.user.avatarURL)
      .setThumbnail("https://vignette.wikia.nocookie.net/clubpenguin/images/7/71/Pickle.png")
      .setDescription("A command to crappily display the size of your pickle.")
      .setColor(config.embedSuccess)

      .setTimestamp()

      .addField("Your Pickle size is", "~" + pickletwo + "." + pickleFloatTwo + "cm");
      return message.channel.send(embedtwo);
    } else {
      return message.channel.send(embed);
    }

  }

  if(cmd === config.prefix + "report") {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) {
      let errEmbed = new Discord.RichEmbed()
      .setTitle("Solobot - Report")
      .setAuthor(Solo.user.username, Solo.user.avatarURL)
      .setColor(config.embedFailure)
      .setThumbnail("https://i.imgur.com/3m6n5Lk.png")
      .setTimestamp()

      .addField("Error", "The specified user could not be found.");
      return message.channel.send(errEmbed);
    }
    let reason = args.join(" ").slice(22);
    let rEmbed = new Discord.RichEmbed()
    .setTitle("Solobot - Report")
    .setAuthor(Solo.user.username, Solo.user.avatarURL)
    .setColor(config.embedSuccess)
    .setThumbnail("https://i.imgur.com/6bVURkq.png")
    .setTimestamp()
    // TODO: Remove
    .addField("INFO", "This command does not work fully yet.")
    .addField("Success", "The User you specified was successfully reported for the given reason.");
    return message.channel.send(rEmbed);
  }



  if(cmd === config.prefix + "state") {
    let states = ["watching", "streaming", "listening", "playing"];
    var stateActivity = String(args.slice(1).join(" "));
    let typeActivity;
    switch(args[0]) {
      case "watching":
        typeActivity = "WATCHING";
        break;
      case "streaming":
        typeActivity = "STREAMING";
        break;
      case "listening":
        typeActivity = "LISTENING";
        break;
      case "playing":
        typeActivity = "PLAYING";
        break;
    }

    let rEmbed = new Discord.RichEmbed()

    

    .setTitle("Solobot - Error")
    .setAuthor(Solo.user.username, Solo.user.avatarURL)
    .setColor(config.embedFailure)
    .setTimestamp()
    .setThumbnail("https://i.imgur.com/3m6n5Lk.png")
    //^ Exclamation Mark surrounded by triangle, 128px
    // TODO: Remove)
    .addField("Error", "Please only use `watching`, `streaming`, `listening` or `playing` for the first argument.");
    if (states.indexOf(args[0]) > -1) {
      if(stateActivity.length <= 1) {
        let rEmbedd = new Discord.RichEmbed()
        .setTitle("Solobot - Error")
        .setAuthor(Solo.user.username, Solo.user.avatarURL)
        .setColor(config.embedFailure)
        .setTimestamp()
        .setThumbnail("https://i.imgur.com/3m6n5Lk.png")
        //^ Exclamation Mark surrounded by triangle, 128px
        // TODO: Remove)
        .addField("Error", "Your second Argument is too short. It must be at least 2 characters long.");

        return message.channel.send(rEmbedd);
      } else {
        if(message.member.roles.find("name", config.adminRoles)){

          
          
          
          Solo.user.setActivity(stateActivity, {type: typeActivity});



          let sSuccess = new Discord.RichEmbed()
          .setTitle("Solobot - State")
          .setAuthor(Solo.user.username, Solo.user.avatarURL)
          .setColor(config.embedSuccess)
          .setTimestamp()
          .setThumbnail("https://i.imgur.com/ycwGUG3.png")
          //^ Info-Icon blue, 128px
          // TODO: Remove)
          .addField("Success", "Success! The Bot state will be updated.");

          return message.channel.send(sSuccess);
        } else {
          return message.channel.send(embedNoPerms);
        }

      }
    } else {
    return message.channel.send(rEmbed);
  }
  }


if(cmd === config.prefix + "kick") {
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) {
    let rEmbedd = new Discord.RichEmbed()
        .setTitle("Solobot - Error")
        .setAuthor(Solo.user.username, Solo.user.avatarURL)
        .setColor(config.embedFailure)
        .setTimestamp()
        .setThumbnail("https://i.imgur.com/3m6n5Lk.png")
        .addField("Error", "You didn't specify which user to kick.");

        return message.channel.send(rEmbedd);
  }
  let kReason = args.slice(1).join(" ");
  if(!kReason) {
    kReason = "Unspecified reason.";
  }

  if(message.member != message.guild.owner) {
    if(!message.member.hasPermission("KICK_MEMBERS")) return;
    if(kUser.hasPermission("KICK_MEMBERS") && !message.member.hasPermission("ADMINISTRATOR")) return;
    if(kUser.hasPermission("ADMINISTRATOR")) return;
  }
  
  message.guild.member(kUser).kick(kReason);
  let kMessage = new Discord.RichEmbed()
        .setTitle("Solobot - Kick")
        .setAuthor(Solo.user.username, Solo.user.avatarURL)
        .setColor(config.embedSuccess)
        .setTimestamp()
        .addField("Success", "Successfully kicked " + kUser + " for " + kReason);

        message.channel.send(kMessage);

  return;
}

});

Solo.login(process.env.TOKEN);
