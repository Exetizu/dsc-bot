const Discord = require("discord.js")
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const memberCount = require('./member-count')
const ReactionRole = require('./reaction-role')
const powiadomienia = require('./powiadomienia')
const Config = require('./config.json')
client.login(Config.token);
var jsoning = require('jsoning');
var dataRole = new jsoning("dataRole.json");
var dataPoints = new jsoning("dataPoints.json");
var dataWarn = new jsoning("dataWarn.json");
var postacie = new jsoning("postacie.json");
let fullsplit = []
client.on("ready", () => 
{
    client.user.setActivity("Mentorinkiego 👀", { type: "WATCHING" })
    powiadomienia(client)
    memberCount(client)
    ReactionRole(client)
    memberCount(client)
    console.log("**Bot gotowy**");
    (async () =>
    {
        var a = await dataRole.all()
        var aa = JSON.stringify(a)
        let aa1 = aa.replace(/"/g, "")
        let aa2 = aa1.replace(/{/g, "")
        let aa3 = aa2.replace(/}/g, "")
        let splitdata = aa3.split(",") 
        for (var i = 0; i < splitdata.length; i++)
        {
            let split = splitdata[i].split(":")
            fullsplit.push(split[0])
            fullsplit.push(split[1])
        }
        // console.log(fullsplit)
    })();
})
client.on('message', (message) =>
{
    let fullcommand = message.content.substr(1)
    let splitcommand = fullcommand.split(" ")
    let primarycommand = splitcommand[0]
    let arguments = splitcommand.slice(1) 
    const { guild } = message
    if (!guild && message.content.startsWith(Config.prefix) && primarycommand =="report") {
        reportcommand(arguments, message)
    }
    if (message.author == client.user || !guild) 
    { 
        return
    }

    if (message.content.startsWith(Config.prefix)) 
    {   
         processcommand(message);
    }
     else 
    {
        if(message.channel.id === "750425968803446826")
        {
            message.delete()
            message.reply(`Ten kanał nie służy do pisania`)
        }
        else if(message.channel.id === "767382382965030952")
        {
           if (message.attachments.size <= 0) 
            {
                message.reply(`Ten kanał nie służy do pisania`)
                message.delete()
            }
        }
    }
})

function processcommand(message) 
{

    let fullcommand = message.content.substr(1) 
    let splitcommand = fullcommand.split(" ") 
    let primarycommand = splitcommand[0] 
    let arguments = splitcommand.slice(1) 
    console.log("Otrzymana komenda: " + "'" +primarycommand + "'" + " Od gracza: " + message.author.id)
    
    if (message.channel.id === Config.stats) {
        if (primarycommand == "register") {
            registercommand(arguments, message)
        }
        else if (primarycommand == "update") {
            updaterankcommand(arguments, message)
        }
        else if (primarycommand == "main") {
            maincommand(arguments, message)
        }
        else if (primarycommand == "pomoc") {
            message.reply(`**Oto lista komend: **
            ${Config.prefix}register <nick z apex> - dodaje role związane z apexem
            ${Config.prefix}update - aktualizuje role związane z apexem
            ${Config.prefix}main <nazwa postaci> - ustawia maina`)
        }
        else {
            message.reply(`Liste komend znajdziesz w ${Config.prefix}pomoc`)
        }
    }
    else if (message.channel.id === "761636774275186708") {
        if (primarycommand == "turniej") {
            turniejcommand(arguments, message)
        }
        else if (primarycommand == "turniej_ustaw") {
            turniej_ustawcommand(arguments, message)
        }
        else if (primarycommand == "turniej_akceptuj") {
            turniej_akceptujcommand(arguments, message)
        }
        else if (primarycommand == "pomoc" && arguments[0] == "admin") {
             message.reply(`**Oto lista komend: **
                ${Config.prefix}**turniej_akceptuj** <nazwa drużyny> <oznacz 1 gracza> <oznacz 2 gracza> - akceptuje gracza, tworzy kanał teamowy do turnieju i daje rangę 'turniej'
                np. ${Config.prefix}**turniej_akceptuj** TOGs @nick1 @nick2

                ${Config.prefix}**turniej_ustaw** <numer> - ustawia ilość wolnych składów 
                np. ${Config.prefix}**turniej_ustaw** 19 `)
        }
        else {
            message.reply(`Liste komend znajdziesz w ${Config.prefix}pomoc admin`)
        }
    }
    else if (message.channel.id = "766039965028319243")
    {
        if (primarycommand == "warn") {
            warncommand(arguments, message)
        }
    }
}

function registercommand(arguments, message, member)
{
    const apex = require('apexlegends')
 
    apex('eba0b403-100a-4d17-9980-a9e79b0a29d9', 'pc', arguments[0]).then(a =>
    {
        ///////////////////////////////Statystyki////////////////////////////
        var {platformUserHandle, level, rankName, avatarUrl, rankImage} = a.metadata
        //console.log(a)
        const EmbedRank = new Discord.MessageEmbed()
            .setColor('#b5b5b5')
            .setTitle("**Statystyki**")
            .setThumbnail(avatarUrl)
            .setDescription(platformUserHandle)
            .addField('**Ranga**', rankName, true)
            .addField('**Poziom**', level, true)
            .setImage(rankImage)
            .setTimestamp()
        message.channel.send(`<@${message.author.id}> `, EmbedRank);
        dataRole.set(message.author.id, platformUserHandle);

        ///////////////////////////////Usowanie rang////////////////////////////
        message.member.fetch().then(ab => 
        {
            var ranks = ab._roles
            var i = 0
            var stop = 0
            while(ranks[i] != undefined && stop == 0)
            {  
                switch(ranks[i])
                {
                    case "750423028319518801":
                        message.member.roles.remove("750423028319518801")
                        stop++
                    break;
                    case "750423029309505715":
                        message.member.roles.remove("750423029309505715")
                        stop++
                    break;
                    case "750423029984788570":
                        message.member.roles.remove("750423029984788570")
                        stop++
                    break;
                    case "750423030559408138":
                        message.member.roles.remove("750423030559408138")
                        stop++
                    break;
                    case "750423031062724639":
                        message.member.roles.remove("750423031062724639")
                        stop++
                    break;
                    case "750423031595270225":
                        message.member.roles.remove("750423031595270225")
                        stop++
                    break;
                    case "750423032740184235":
                        message.member.roles.remove("750423032740184235")
                        stop++
                    break;
                    case "750423033533169704":
                        message.member.roles.remove("750423033533169704")
                        stop++
                    break;
                    case "750423034094944257":
                        message.member.roles.remove("750423034094944257")
                        stop++
                    break;
                    case "750423034694991953":
                        message.member.roles.remove("750423034694991953")
                        stop++
                    break;
                    case "750423035206566029":
                        message.member.roles.remove("750423035206566029")
                        stop++
                    break;
                    case "750423036024324146":
                        message.member.roles.remove("750423036024324146")
                        stop++
                    break;
                    case "750423036544548875":
                        message.member.roles.remove("750423036544548875")
                        stop++
                    break;
                    case "750423096363581450":
                        message.member.roles.remove("750423096363581450")
                        stop++
                    break;
                    case "750425283932192879":
                        message.member.roles.remove("750425283932192879")
                        stop++
                    break;
                    case "750425284783767572":
                        message.member.roles.remove("750425284783767572")
                        stop++
                    break;
                    case "750425285127569509":
                        message.member.roles.remove("750425285127569509")
                        stop++
                    break;
                    case "750425285756846262":
                        message.member.roles.remove("750425285756846262")
                        stop++
                    break;
                    case "750425286587318422":
                        message.member.roles.remove("750425286587318422")
                        stop++
                    break;
                    case "750425287233372170":
                        message.member.roles.remove("750425287233372170")
                        stop++
                    break;
                    case "750425449359736863":
                        message.member.roles.remove("750425449359736863")
                        stop++
                        break;
                    default:
                        i++
	            }
            }
        })
        ///////////////////////////////Usowanie poziomu////////////////////////////
        message.member.roles.remove("750421982410965043")//500
        message.member.roles.remove("750421957677154406")
        message.member.roles.remove("750421957190746254")
        message.member.roles.remove("750421956632772910")
        message.member.roles.remove("750421955743842446")
        message.member.roles.remove("750421955462561838")
        message.member.roles.remove("750421952014843915")//10
        ///////////////////////////////Ranga////////////////////////////
        setTimeout(() =>
        {  
            switch(rankName)
            {
                case "Master":
                    message.member.roles.add("750423028319518801")
                break;
                case "Diamond 1":
                    message.member.roles.add("750423029309505715")
                break;
                case "Diamond 2":
                    message.member.roles.add("750423029984788570")
                break;
                case "Diamond 3":
                    message.member.roles.add("750423030559408138")
                break;
                case "Diamond 4":
                    message.member.roles.add("750423031062724639")
                break;
                case "Platinum 1":
                    message.member.roles.add("750423031595270225")
                break;
                case "Platinum 2":
                    message.member.roles.add("750423032740184235")
                break;
                case "Platinum 3":
                    message.member.roles.add("750423033533169704")
                break;
                case "Platinum 4":
                    message.member.roles.add("750423034094944257")
                break;
                case "Gold 1":
                    message.member.roles.add("750423034694991953")
                break;
                case "Gold 2":
                    message.member.roles.add("750423035206566029")
                break;
                case "Gold 3":
                    message.member.roles.add("750423036024324146")
                break;
                case "Gold 4":
                    message.member.roles.add("750423036544548875")
                break;
                case "Silver 1":
                    message.member.roles.add("750423096363581450")
                break;
                case "Silver 2":
                    message.member.roles.add("750425283932192879")
                break;
                case "Silver 3":
                    message.member.roles.add("750425284783767572")
                break;
                case "Silver 4":
                    message.member.roles.add("750425285127569509")
                break;
                case "Bronze 1":
                    message.member.roles.add("750425285756846262")
                break;
                case "Bronze 2":
                    message.member.roles.add("750425286587318422")
                break;
                case "Bronze 3":
                    message.member.roles.add("750425287233372170")
                break;
                case "Bronze 4":
                    message.member.roles.add("750425449359736863")
                break;
                default:
                    message.reply(`Nie odnaleziono rangi`)
	        }
                ///////////////////////////////Poziom////////////////////////////


            if (level >= 500)
            {
                message.member.roles.add("750421982410965043")
            }
            else if (level >= 400)
            {
                message.member.roles.add("750421957677154406")
            }
            else if (level >= 300)
            {
                message.member.roles.add("750421957190746254")
            }
            else if (level >= 200)
            {
                message.member.roles.add("750421956632772910")
            }
            else if (level >= 100)
            {
                message.member.roles.add("750421955743842446")
            }
            else if (level >= 50)
            {
                Message.member.roles.add("750421955462561838")
            }
            else if (level >= 10)
            {
                message.member.roles.add("750421952014843915")
            }
            else
            {
                message.reply(`Nie odnaleziono poziomu`)
            }
        }, 20);
    }).catch(err => 
    {
        const EmbederrorRank = new Discord.MessageEmbed()
            .setColor('#cc3d3d')
            .setTitle('Błąd')
            .setThumbnail('https://freepikpsd.com/wp-content/uploads/2019/10/exclamation-mark-icon-png-5-Transparent-Images.png')
            .setDescription(`Nie odnaleziono konta pod nickiem "**${arguments[0]}**"`)
        client.channels.cache.get(Config.stats).send(`<@${message.author.id}> `, EmbederrorRank);
    })
}

///////////////////////////////Rejestrowanie się do turnieju/////////////////////////////
var turniej_teamy = 0
function turniejcommand(arguments, message)
{
    const { mentions } = message
    if (message.channel.id === "761593891090464808") {

        if(turniej_teamy != 20)
        { 
            const turniej_gracze = message.mentions.users.array()
            if(turniej_gracze[0] != undefined && turniej_gracze[1] != undefined && turniej_gracze[2] != undefined) 
            {
                if(arguments[0] != undefined && arguments[1] != undefined && arguments[2] != undefined && arguments[3] != undefined && arguments[4] == undefined)
                {
                    turniej_teamy++
                    message.reply(`
                    Pomyślnie zarejestrowano czekaj na akceptacje drużyny przez administracje
                    Pozostałe wolne teamy: ${20 - turniej_teamy}`)
                    const channel = client.channels.cache.get('761636774275186708')
                    channel.send(`Nazwa drużyny: ${arguments[0]}
                    Gracz 1: ${arguments[1]} 
                    Gracz 2: ${arguments[2]} 
                    Gracz 2: ${arguments[3]} 
                    **Komenda: ** ${Config.prefix}turniej_akceptuj ${arguments[0]} <@${turniej_gracze[0].id} <@${turniej_gracze[1].id} <@${turniej_gracze[2].id}
                    Pozostałe wolne teamy: ${20 - turniej_teamy}`)
                }
                else
                {
                    message.reply(`Liste komend znajdziesz w ${Config.prefix}pomoc`)
                }
            }
            else 
            {
                message.reply(`Liste komend znajdziesz w ${Config.prefix}pomoc`) 
            }
        }
        else
        {
            message.reply(`Lista drużyn pełna`)
        }
    }  
}

///////////////////////////////ustawia liczbe wolnych teamow//////////////////////////////
function turniej_ustawcommand(arguments, message)
{
    if (message.channel.id === "761636774275186708") 
    {
    
        if(arguments[0] != undefined || arguments[0] != NaN)
        {
            turniej_teamy = 20 - arguments[0]
            message.reply(`Pomyślnie zmieniono liczbę wolnych drużyn
            Pozostałe wolne teamy: ${20 - turniej_teamy}`)
        }
        else
        {
                message.reply(`Liste komend znajdziesz w ${Config.prefix}pomoc admin`)
        }
    }
}

///////////////////////////////Akceptowanie graczy do turnieju////////////////////////////
function turniej_akceptujcommand(arguments, message)
{

    if (message.channel.id === "761636774275186708") 
    {
         if(arguments[0] != undefined && arguments[1] != undefined && arguments[2] != undefined  && arguments[3] != undefined)
         {
             const turniej_gracze_ok = message.mentions.members.array()
             if(turniej_gracze_ok[0] != undefined && turniej_gracze_ok[1] != undefined && turniej_gracze_ok[2] != undefined)
             {
                message.reply(`Dodano drużynę ` + arguments[0] + ` do turnieju`)
                turniej_gracze_ok[0].roles.add("761597529795592232")
                turniej_gracze_ok[1].roles.add("761597529795592232")
                turniej_gracze_ok[2].roles.add("761597529795592232")
                const name = arguments[0]
                message.guild.channels
                .create(name, {
                type:'voice'     
			    })
                .then((channel) => {
                    channel.setParent("761660008428470282")
                    channel.overwritePermissions([
	                    {
			                id: message.guild.id,
			                deny: ['CONNECT'],
		                },
                        {
		                    id: turniej_gracze_ok[2],
		                    allow: ['CONNECT'],
	                    },
	                    {
		                    id: turniej_gracze_ok[1],
		                    allow: ['CONNECT'],
	                    },
                        {
		                    id: turniej_gracze_ok[0],
		                    allow: ['CONNECT'],
	                    },
                    ]);
                })
             }
             else 
             {
                message.reply(`Liste komend znajdziesz w ${Config.prefix}pomoc admin`)
             }
         }
         else 
         {
            message.reply(`Liste komend znajdziesz w ${Config.prefix}pomoc admin`)
         }
    }
}

function updaterankcommand(arguments, message)
{
    (async () => {
        if (await dataRole.has(message.author.id) == false)
        {
            message.reply(`Nie odnaleziono twojego konta. Zarejestruj się komendą 
**${Config.prefix}register**`)
            return
        }
        const apex = require('apexlegends')
        var playerName = await dataRole.get(message.author.id)
        apex('eba0b403-100a-4d17-9980-a9e79b0a29d9', 'pc', playerName).then(a => {
            ///////////////////////////////Statystyki////////////////////////////
            var { platformUserHandle, level, rankName, avatarUrl, rankImage } = a.metadata
            //console.log(a)
            ///////////////////////////////Usowanie rang////////////////////////////
            message.member.fetch().then(ab => {
                var ranks = ab._roles
                var i = 0
                var stop = 0
                while (ranks[i] != undefined && stop == 0) {
                    switch (ranks[i]) {
                        case "750423028319518801":
                            message.member.roles.remove("750423028319518801")
                            stop++
                            break;
                        case "750423029309505715":
                            message.member.roles.remove("750423029309505715")
                            stop++
                            break;
                        case "750423029984788570":
                            message.member.roles.remove("750423029984788570")
                            stop++
                            break;
                        case "750423030559408138":
                            message.member.roles.remove("750423030559408138")
                            stop++
                            break;
                        case "750423031062724639":
                            message.member.roles.remove("750423031062724639")
                            stop++
                            break;
                        case "750423031595270225":
                            message.member.roles.remove("750423031595270225")
                            stop++
                            break;
                        case "750423032740184235":
                            message.member.roles.remove("750423032740184235")
                            stop++
                            break;
                        case "750423033533169704":
                            message.member.roles.remove("750423033533169704")
                            stop++
                            break;
                        case "750423034094944257":
                            message.member.roles.remove("750423034094944257")
                            stop++
                            break;
                        case "750423034694991953":
                            message.member.roles.remove("750423034694991953")
                            stop++
                            break;
                        case "750423035206566029":
                            message.member.roles.remove("750423035206566029")
                            stop++
                            break;
                        case "750423036024324146":
                            message.member.roles.remove("750423036024324146")
                            stop++
                            break;
                        case "750423036544548875":
                            message.member.roles.remove("750423036544548875")
                            stop++
                            break;
                        case "750423096363581450":
                            message.member.roles.remove("750423096363581450")
                            stop++
                            break;
                        case "750425283932192879":
                            message.member.roles.remove("750425283932192879")
                            stop++
                            break;
                        case "750425284783767572":
                            message.member.roles.remove("750425284783767572")
                            stop++
                            break;
                        case "750425285127569509":
                            message.member.roles.remove("750425285127569509")
                            stop++
                            break;
                        case "750425285756846262":
                            message.member.roles.remove("750425285756846262")
                            stop++
                            break;
                        case "750425286587318422":
                            message.member.roles.remove("750425286587318422")
                            stop++
                            break;
                        case "750425287233372170":
                            message.member.roles.remove("750425287233372170")
                            stop++
                            break;
                        case "750425449359736863":
                            message.member.roles.remove("750425449359736863")
                            stop++
                            break;
                        default:
                            i++
                    }
                }
            })
            ///////////////////////////////Usowanie poziomu////////////////////////////
            message.member.roles.remove("750421982410965043")//500
            message.member.roles.remove("750421957677154406")
            message.member.roles.remove("750421957190746254")
            message.member.roles.remove("750421956632772910")
            message.member.roles.remove("750421955743842446")
            message.member.roles.remove("750421955462561838")
            message.member.roles.remove("750421952014843915")//10
            ///////////////////////////////Ranga////////////////////////////
            setTimeout(() => {
                switch (rankName) {
                    case "Master":
                        message.member.roles.add("750423028319518801")
                        break;
                    case "Diamond 1":
                        message.member.roles.add("750423029309505715")
                        break;
                    case "Diamond 2":
                        message.member.roles.add("750423029984788570")
                        break;
                    case "Diamond 3":
                        message.member.roles.add("750423030559408138")
                        break;
                    case "Diamond 4":
                        message.member.roles.add("750423031062724639")
                        break;
                    case "Platinum 1":
                        message.member.roles.add("750423031595270225")
                        break;
                    case "Platinum 2":
                        message.member.roles.add("750423032740184235")
                        break;
                    case "Platinum 3":
                        message.member.roles.add("750423033533169704")
                        break;
                    case "Platinum 4":
                        message.member.roles.add("750423034094944257")
                        break;
                    case "Gold 1":
                        message.member.roles.add("750423034694991953")
                        break;
                    case "Gold 2":
                        message.member.roles.add("750423035206566029")
                        break;
                    case "Gold 3":
                        message.member.roles.add("750423036024324146")
                        break;
                    case "Gold 4":
                        message.member.roles.add("750423036544548875")
                        break;
                    case "Silver 1":
                        message.member.roles.add("750423096363581450")
                        break;
                    case "Silver 2":
                        message.member.roles.add("750425283932192879")
                        break;
                    case "Silver 3":
                        message.member.roles.add("750425284783767572")
                        break;
                    case "Silver 4":
                        message.member.roles.add("750425285127569509")
                        break;
                    case "Bronze 1":
                        message.member.roles.add("750425285756846262")
                        break;
                    case "Bronze 2":
                        message.member.roles.add("750425286587318422")
                        break;
                    case "Bronze 3":
                        message.member.roles.add("750425287233372170")
                        break;
                    case "Bronze 4":
                        message.member.roles.add("750425449359736863")
                        break;
                    default:
                        message.reply(`Nie odnaleziono rangi`)
                }
                ///////////////////////////////Poziom////////////////////////////


                if (level >= 500) {
                    message.member.roles.add("750421982410965043")
                }
                else if (level >= 400) {
                    message.member.roles.add("750421957677154406")
                }
                else if (level >= 300) {
                    message.member.roles.add("750421957190746254")
                }
                else if (level >= 200) {
                    message.member.roles.add("750421956632772910")
                }
                else if (level >= 100) {
                    message.member.roles.add("750421955743842446")
                }
                else if (level >= 50) {
                    Message.member.roles.add("750421955462561838")
                }
                else if (level >= 10) {
                    message.member.roles.add("750421952014843915")
                }
                else {
                    message.reply(`Nie odnaleziono poziomu`)
                } 
            }, 20);
            message.reply(`Pomyślnie zaktualizowano statystyki`)
        }).catch(err =>{
            (async () => {
                message.reply(`Nie odnaleziono twojego konta. Zarejestruj się komendą 
**${Config.prefix}register**`)
                await dataRole.delete(message.author.id)
            })();
            })
    })();
}
function warncommand(arguments, message) {
    (async () => {
        var warny
        var powod = ""
        for (var i = 1; i < arguments.length; i++)
        {
            powod = powod +" "+ arguments[i]
        }
        var gracz_warn = message.mentions.members.array()
        if (await dataWarn.has(gracz_warn[0].user.id) == false) {
            await dataWarn.set(gracz_warn[0].user.id, "1");
            warny= 1
        }
        else {
            warny = parseInt(await dataWarn.get(gracz_warn[0].user.id))
            dataWarn.set(gracz_warn[0].user.id, warny + 1)
        }
        var color
	var img
        if (warny < 3) 
	{
		color = "#ffec17"
		img = "https://img.icons8.com/emoji/452/warning-emoji.png"
	}
        else {
		color = "#cc3d3d"
		img = "https://toppng.com/uploads/preview/banned-stamp-11523437622xs4e82cocq.png"
	}
        const Embedwarn = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle('Warn - ' + warny + '/3')
            .setThumbnail(img)
            .addField('**Kto: **', `<@${gracz_warn[0].user.id}>`, false)
            .addField('**Powód: **', powod, false)
            .setFooter('Nadawca: ' + `${message.author.username}`, message.author.avatarURL())
        client.channels.cache.get(`766039965028319243`).send(Embedwarn);
        message.delete()
    })();
}

function log(text) {
    client.channels.cache.get(`810284437313028161`).send(text)
}

function reportcommand(arguments, message) {
    if (!arguments[0] || arguments[0] == "" || !arguments[1] || arguments[1] == "") {
        message.reply(`**Błąd!**\n Poprawne użycie:\n ${Config.prefix}report <nick reportowaniej osoby> <powód>`)
        return;
    }
    else {
        message.reply(`**Wysłano zgłoszenie!**\n Twoje zgłoszenie zostanie rozpatrzone.\n Znajdziesz je na samym dole discord.`)
    }
    client.guilds.cache.get("743734191677505627").channels.create(`📣║zgloszenie na :${arguments[0]} `, {
        type: "text"
    }).then((channel) => {
        channel.setParent("826170279335690291")
        channel.overwritePermissions([
            {
                id: client.guilds.cache.get("743734191677505627").roles.cache.get("743734191677505627"),
                deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
            },
            {
                id: client.users.cache.get(message.author.id),
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
            },
            {
                id: client.guilds.cache.get("743734191677505627").roles.cache.get("743926352293396541"),
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
            },
        ]);
        var powod = ""
        for (var i = 1; i < arguments.length; i++) {
            powod = powod + " " + arguments[i]
        }
        channel.send(`** ${client.users.cache.get(message.author.id)} zgłasza: "${arguments[0]}" z powodem: **\n`+powod);
    })

    
}


function maincommand(arguments, message)
{
    (async () =>
    {
        if (await postacie.has(arguments[0].toLowerCase()) == true)
        {
            message.member.fetch().then(ab => {
                var ranks = ab._roles
                var i = 0
                var stop = 0
                while (ranks[i] != undefined && stop == 0) {
                    switch (ranks[i]) {
                        case "810156796781395979":
                            message.member.roles.remove("810156796781395979")
                            stop++
                            break;
                        case "810157352262959114":
                            message.member.roles.remove("810157352262959114")
                            stop++
                            break;
                        case "810157740731006977":
                            message.member.roles.remove("810157740731006977")
                            stop++
                            break;
                        case "810160443213611008":
                            message.member.roles.remove("810160443213611008")
                            stop++
                            break;
                        case "810160601820430406":
                            message.member.roles.remove("810160601820430406")
                            stop++
                            break;
                        case "810160824924635138":
                            message.member.roles.remove("810160824924635138")
                            stop++
                            break;
                        case "810161315812343849":
                            message.member.roles.remove("810161315812343849")
                            stop++
                            break;
                        case "810161444544184410":
                            message.member.roles.remove("810161444544184410")
                            stop++
                            break;
                        case "810161593068552212":
                            message.member.roles.remove("810161593068552212")
                            stop++
                            break;
                        case "810161722483933185":
                            message.member.roles.remove("810161722483933185")
                            stop++
                            break;
                        case "810161874661408808":
                            message.member.roles.remove("810161874661408808")
                            stop++
                            break;
                        case "810161989355438122":
                            message.member.roles.remove("810161989355438122")
                            stop++
                            break;
                        case "810162113804369943":
                            message.member.roles.remove("810162113804369943")
                            stop++
                            break;
                        case "810162231706124288":
                            message.member.roles.remove("810162231706124288")
                            stop++
                            break;
                        case "810162523600977981":
                            message.member.roles.remove("810162523600977981")
                            stop++
                            break;
                        case "810162666421092392":
                            message.member.roles.remove("810162666421092392")
                            stop++
                            break;
                            case "842333203229310976":
                            message.member.roles.remove("842333203229310976")
                            stop++
                            break;
                        default:
                            i++
                    }
                }
            })
            message.member.roles.add(await postacie.get(arguments[0].toLowerCase()))
            message.reply(`Ustawiono maina`) 
        }
        else
        {
            message.reply(`Podano złą nazwę postaci`) 
        }
    })();
}


