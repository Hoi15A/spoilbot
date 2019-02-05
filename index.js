require('dotenv').config()
if (!process.env.TOKEN) {
  console.error('Token missing')
  process.exit()
}

const Discord = require('discord.js')
const client = new Discord.Client({ 'disableEveryone': true })

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity('out for spoilers', { type: 'WATCHING' }).then(presence => {
    console.log('Activity Set.')
  }).catch(err => {
    console.error(err)
  })
})

client.on('message', msg => {
  let count = (msg.content.match(/[|]{2}/g) || []).length
  if (count >= 4) { // contains 2 or more spoilers
    msg.react(process.env.EMOTE).catch(err => {
      // if cant react whats the fukin point tbh
      // annoy server owner to enable reactions for the bot
      reportError(err, msg)
    })
  }
})

client.on('messageReactionAdd', reaction => {
  if (reaction._emoji.name === process.env.EMOTE && reaction.count > 1 && reaction.users.get(client.user.id) !== undefined) {
    let nospoil = reaction.message.content.replace(/[|]{2}/g, '')
    let message = '**' + reaction.message.author.username + '**: ' + nospoil
    reaction.message.channel.send(message).then(msg => {
      reaction.message.clearReactions().then(m => {
        m.react('✅')
      }).catch(err => {
        // Cant clear all reactions only clear bot's
        reportError(err, reaction.message)
        reaction.message.reactions.map(r => {
          r.remove(client.user)
          reaction.message.react('✅')
        })
      })
    }).catch(err => {
      // again cant send msg annoy server owner
      reportError(err, reaction.message)
    })
  }
})

function reportError (err, msg) {
  if (err.message === 'Missing Permissions') {
    // annoy server owner
    msg.guild.owner.send('Hello, I have noticed that my permissions for your guild **' + msg.guild.name + '** make it harder/impossible for me to do my job. Please make sure that I have the following perms:\n- Add reactions\n- Send messages\n- Manage messages')
      .catch(err => {
        console.log('Insufficient perms + no DM: ' + msg.guild.owner.displayName + ' @ ' + msg.guild.name)
        console.err(err)
      })
  } else {
    // send to bot owner
    client.fetchUser(process.env.BOT_OWNER).then(user => {
      user.send('Non permission error message:\n```json\n' + JSON.stringify(err) + '\n```')
    }).catch(err => {
      console.error(err)
    })
  }
}

client.login(process.env.TOKEN)
