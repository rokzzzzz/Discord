const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() { //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: 'America/New_York', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('1229458471666319452')
    .setType('STREAMING')
    .setURL('https://www.youtube.com/watch?v=_7vB_RX1TOU') //Must be a youtube video link 
    .setState('a,l')
    .setName('a,l')
    .setDetails(`/dmv [${formatTime()}]`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://cdn.discordapp.com/attachments/1096884010048819241/1229463108729438333/IMG_5011.jpg?ex=662fc5bf&is=661d50bf&hm=639e67b42ffade2833ec07098210bea08a18cfaa162dff8d10aee545c9010820&') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('--') //Text when you hover the Large image
    .setAssetsSmallImage('https://cdn.discordapp.com/attachments/1226636743642714205/1229485289269886986/Black.png?ex=662fda67&is=661d6567&hm=0099b6ba1307f01e4ed55668918971d2a61ec7d7b6b35aedd19af64dfbb31c03&') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('#') //Text when you hover the Small image
    .addButton('#', 'https://www.youtube.com/watch?v=72noANFOhdA')
    .addButton('#', 'https://www.youtube.com/watch?v=Gbqa9n1XOes');

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `/dmv`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
