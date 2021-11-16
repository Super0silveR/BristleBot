//****[Imports]****


const Discord = require('discord.js');
//Bot Token from Discord Developer application
const token = "Nzc1NTM4ODA1NDgxNTM3NTM2.X6nyzA.LuX7C_2SjmRxaHVB0RBswetSYYw";
//Client User that represent the bot.
const client = new Discord.Client();
//'fs' Library that allows the file writting
const fs = require('fs');
//JSON file that store the warning and rooms watched by Bristle
client.warnings = require ("./warnings.json");

//**********************************************[]





//**********************************************[]



//On Every message sended
client.on('message', async msg => {

//    Ignore bots    //
  if(msg.author.bot) {
    return;



  }
// If the messages either doesn't content an image AND doesn't content 'https://' AND is poster in one of the channels with that IDs THEN:
  if((msg.attachments.size == 0 && !(msg.content.includes("https://"))) && (msg.channel.id === '682134114224308224' || msg.channel.id === '673872351317852192' || msg.channel.id === '684538814605295627' || msg.channel.id === '690876025206210601')) {
//Register the botlog channel
    let botSpam = client.channels.cache.find(channel => channel.id === '685792956350988290');

//If the message is sent either by someone who has 0 roles, or the shut up role THEN: Delete the message and save it to the console
    if(!(msg.member.roles.member._roles.includes('685059622083756043') || msg.member.roles.member._roles.includes('685059593365094406') || msg.member.roles.member._roles.includes('681628788526022661'))) {
      console.log("Deleted message from User "+msg.author.username+" And was :"+msg.content);
      console.log(msg.attachments.size);
      console.log(!(msg.content.includes("https://")));
      msg.reply('no chatter allowed in the picture channels.')
  .then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(console.error);
      msg.delete().catch();

      id = msg.author.id;
      warn = {"warning": 1, "id": id};

//search if he already has a warning:
      for(i = 0; i<client.warnings.table.length; i++) {

        if(client.warnings.table[i].id === id) {

          console.log('ID found');

//search he the poster has the shut up role
          if((msg.member.roles.member._roles.includes('755119912476999760'))) {

            console.log('He has role so no need for botSpam');

            msg.author.send('It\'s no use, you\'ve already been punished.')

            return;
          }

          //if not, then he gives the roles and logs it
          if(client.warnings.table[i].warning === 2) {

            console.log('he has two warnings so he gets the role');
            let role = msg.guild.roles.cache.find(r => r.id === '755119912476999760');
            msg.member.roles.add(role);

            //update the warning counter in the warning file.
            fs.writeFile ("./warnings.json", JSON.stringify (client.warnings, null, 4), err => {
              if (err) throw err;
            });

            botSpam.send('User <@'+id+'> received the <@&755119912476999760> role.');
            msg.author.send('You are now restricted from chatting in the picture channels. Good job.')
            return;

          }

          console.log('he has only '+client.warnings.table[i].warning);

          warn = {"warning": client.warnings.table[i].warning+1, "id": id}
          client.warnings.table[i] = warn;
          console.log(client.warnings.table[i].warning);
            //update the warning counter in the warning file.
          fs.writeFile ("./warnings.json", JSON.stringify (client.warnings, null, 4), err => {
            if (err) throw err;
          });
          botSpam.send('User <@'+id+'> got his/her second and last warning.');
          msg.author.send("I told you not to chat in there, I'll trample you!");
          return;
        }
      }
      console.log('no warning so create');
      client.warnings.table.push(warn);

      fs.writeFile ("./warnings.json", JSON.stringify (client.warnings, null, 4), err => {
        if (err) throw err;
      });
      botSpam.send('User <@'+id+'> got his/her first warning.');
      msg.author.send("Don't chat in the picture channels. You're only allowed to post pictures, videos or links containing either of them.");
    }
//    console.log(msg.member.roles.member._roles.length);
//    console.log(msg.member.roles.member._roles.includes('776146343709769759'));
  }

  if (msg.content === '!warnings') {
    w = '';
    for(i = 0;i<client.warnings.table.length;i++) {
      w = w+"User :<@"+client.warnings.table[i].id+"> As been warned "+client.warnings.table[i].warning+" times.\n"
    }
    msg.channel.send(w);
  }

//All this block is basicly old and unsued code // (Well.. technically trash)
  if (msg.content === '!tipiAvatar') {

    image = msg.attachments.first().url;
    client.user.setAvatar (image);
  }

  if (msg.content === '!tipiChannels') {

  }
})

// Classic boot from a Discord bot.
client.on('ready', () => {
  console.log('Bot is now connected');
  client.user.setStatus('dnd')
  console.log('Bot is now playing');
  time();


});
client.login(token);

async function time() {
  while(true) {
    let nowTime = Date.now();
    console.log(nowTime);
    await sleep(6000)
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
