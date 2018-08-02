const config = require("./config.json");
const Discord = require("discord.js");
const Solo = new Discord.Client({disableEveryone: true});
const GoogleImages = require('google-images');
const searchClient = new GoogleImages('001297346813276896387:lubuqwrcgss', 'AIzaSyB7cPhacMIUD2AMxQrzgBLY9q0kWngGF0Q');

Solo.on("ready", async () => { //Solo "playing..."
  console.log("Solo is online!");
  Solo.user.setActivity("over the Server", {type: "WATCHING"});
});

Solo.on("message", async message => {
  if(message.author.Solo) return;
  if(message.channel.type === "dm") return;

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

  //"!flee => Fokz!"-Blocker
  if(message.content == "Fokz!") {
    return message.channel.send({embed: {
      color: config.embedColor,
      title: "Fuck you Dan",
      description: "no u"
}});
  }


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

        .addField("Information", "**>help** - Returns this Helppage \n **>server** - Displays some Information about this Guild")
        .addField("Moderation", "**>report [@user] [reason]** - Reports a User.")
        .addField("Fun", "**>pickle** - WIP, tells you your pickle size")
        .addField("Admincommands", "**>state [PLAYING|STREAMING|LISTENING|WATCHING] [Activity, max. 5 Words]** - Changes the displayed activity of the bot.")
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

    let pickle = getRandomInt(35);
    let embed = new Discord.RichEmbed()
    .setTitle("Solobot - Pickle")
    .setAuthor(Solo.user.username, Solo.user.avatarURL)
    .setThumbnail("https://vignette.wikia.nocookie.net/clubpenguin/images/7/71/Pickle.png")
    .setDescription("A command to crappily display the size of your pickle.")
    .setColor(config.embedSuccess)

    .setTimestamp()

    .addField("Your Pickle size is", "~" + pickle + "cm");
    if(message.member.roles.find("name", "King of Lewd") || message.member.roles.find("name", "Vice King of Lewd")){
// TODO: Fix
      let pickletwo = 38;
      let embedtwo = new Discord.RichEmbed()
      .setTitle("Solobot - Pickle")
      .setAuthor(Solo.user.username, Solo.user.avatarURL)
      .setThumbnail("https://vignette.wikia.nocookie.net/clubpenguin/images/7/71/Pickle.png")
      .setDescription("A command to crappily display the size of your pickle.")
      .setColor(config.embedSuccess)

      .setTimestamp()

      .addField("Your Pickle size is", "~" + pickletwo + "cm");
      return message.channel.send(embedtwo);
    } else {
      return message.channel.send(embed);
    }

  }

  //Neko-CMD Department
  //tags neko, shifty
/*
  if(cmd === config.prefix + "neko") {
    if(args === null || args.length == 0) {
      let embed = new Discord.RichEmbed()
      .setTitle("Solobot - Neko")
      .setAuthor(Solo.user.username, Solo.user.avatarURL)
      .setColor(config.embedWarning)

      .setTimestamp()

      .addField("Help", "Usage: >neko [male|female] (lewd). Square brackets indicate mandatory arguments.");
      return message.channel.send(embed);
    } else if(args == "male") {an
      return message.channel.send(searchClient.search("Male Neko"));
    }
  }*/

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
    let states = ["WATCHING", "STREAMING", "LISTENING", "PLAYING"];
    let stateActivity;
    let rEmbed = new Discord.RichEmbed()
    .setTitle("Solobot - Error")
    .setAuthor(Solo.user.username, Solo.user.avatarURL)
    .setColor(config.embedFailure)
    .setTimestamp()
    .setThumbnail("https://i.imgur.com/3m6n5Lk.png")
    //^ Exclamation Mark surrounded by triangle, 128px
    // TODO: Remove)
    .addField("Error", "Please only use WATCHING, STREAMING, LISTENING or PLAYING for the first argument.");
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
        if(message.member.roles.find("name", config.adminRoles[0]) || message.member.roles.find("name", config.adminRoles[1])){

          let finalACS = 0;
          let argLength = args.length;
          for(let finalACS = 0; finalACS < argLength; finalACS++) {
            console.log("Solo - State-Command: There are " + finalACS + " args given.");
          }
          if(finalACS == 1) {
            stateActivity = args[1];
          } else if(finalACS == 2) {
            stateActivity = args[1] + " " + args[2];
          } else if(finalACS == 3) {
            stateActivity = args[1] + " " + args[2] + " " + args[3];
          } else if(finalACS == 4) {
            stateActivity = args[1] + " " + args[2] + " " + args[3] + " " + args[4];
          } else if(finalACS == 5) {
            stateActivity = args[1] + " " + args[2] + " " + args[3] + " " + args[4] + " " + args[5];
          }
          Solo.user.setActivity(stateActivity, {type: args[0]});


          let sSuccessInfo = new Discord.RichEmbed()
          .setTitle("Solobot - State")
          .setAuthor(Solo.user.username, Solo.user.avatarURL)
          .setColor(config.embedWarning)
          .setTimestamp()
          .setThumbnail("https://i.imgur.com/ADRsqLY.png")
          //^ Info-Icon blue, 128px

          .addField("Information", "Updating the State could take a Minute.");

          let sSuccess = new Discord.RichEmbed()
          .setTitle("Solobot - State")
          .setAuthor(Solo.user.username, Solo.user.avatarURL)
          .setColor(config.embedSuccess)
          .setTimestamp()
          .setThumbnail("https://i.imgur.com/ycwGUG3.png")
          //^ Info-Icon blue, 128px
          // TODO: Remove)
          .addField("Success", "Success! The Bot state will be updated.");

          message.channel.send(sSuccess);
          return message.channel.send(sSuccessInfo);
        } else {
          return message.channel.send(embedNoPerms);
        }

      }
    } else {
    return message.channel.send(rEmbed);
  }
  }




});

Solo.login(config.token);
