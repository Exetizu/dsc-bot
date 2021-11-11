module.exports = client => {

	let rrole_c = "750428764323840131"
	let rrole_m = "758752340504215582"
	let rrole_m2 = "833775316877967420"

	let regulamin_c = "750439382326050986"
	let regulamin_m = "750440584862498907"

	let regulamin_r = "744313266234327041"
	let regulamin_e = '✅'

	let gry = "813883612440428544"
	let roleApex = "813884301576765490"
	let inne = "813885242360332378"

	let LOL_r = "772106635786846209"
	let LOL_e = 'LeageOfLegends'

	let apex_r = "772106998883418162"
	let apex_e = 'apex_logo'

	let cs_r = "772110233988104282"
	let cs_e = 'cs'

	let valorant_r = "810191180783419462"
	let valorant_e = 'valorant'

	let titanfall_r = "854443092320976897"
	let titanfall_e = 'Titanfall'
	////////////////////////////////Role add/////////////////////////////////////////////////
	client.on('messageReactionAdd', async (reaction, user) => {

		if (reaction.message.partial) await reaction.message.fetch();
		if (reaction.partial) await reaction.fetch();
		if (user.bot) return;
		if (!reaction.message.guild) return;
		////////////////////////////////regulamin/////////////////////////////////////////////////
		if (reaction.message.channel.id === regulamin_c) {
			if (reaction.message.id === regulamin_m) {
				if (reaction.emoji.name === regulamin_e) {
					await reaction.message.guild.members.cache.get(user.id).roles.add(regulamin_r)
					await reaction.message.guild.members.cache.get(user.id).roles.add(gry)
					await reaction.message.guild.members.cache.get(user.id).roles.add(inne)
					await reaction.message.guild.members.cache.get(user.id).send(`**Dziękujemy za zaakceptowanie regulaminu serwera: Community The Old Gentleman's.**
					Zachęcamy także do rejestrowania się na kanale #📒stats-bot.  Rejestracja umożliwia połączenie konta Apex Legends z discord za pomocą następującej komendy:

					**?register** - przypisuje nick Origin do konta 
					**Przykład:** ?register Nick z origin

					Ta sama lista komend znajduje się też w przypiętych komentarzach na kanale #📒stats-bot.`)
					console.log("Zaakceptowano regulamin przez gracza: " + reaction.message.member.id)
				}
			}
		}
		else if (reaction.message.channel.id === rrole_c)
		{
			if (reaction.message.id === rrole_m) {
				////////////////////////////////rola LOL///////////////////////////////////////////////
				if (reaction.emoji.name === LOL_e) {
					await reaction.message.guild.members.cache.get(user.id).roles.add(LOL_r)
					console.log("Dodano range LOL graczowi: " + reaction.message.member.id)
				}
				////////////////////////////////rola APEX///////////////////////////////////////////////
				if (reaction.emoji.name === apex_e) {
					await reaction.message.guild.members.cache.get(user.id).roles.add(apex_r)
					await reaction.message.guild.members.cache.get(user.id).roles.add(roleApex)
					console.log("Dodano range APEX graczowi: " + reaction.message.member.id)
				}
				////////////////////////////////rola CS///////////////////////////////////////////////
				if (reaction.emoji.name === cs_e) {
					await reaction.message.guild.members.cache.get(user.id).roles.add(cs_r)
					console.log("Dodano range CS graczowi: " + reaction.message.member.id)
				}
				////////////////////////////////rola Valorant///////////////////////////////////////////////
				if (reaction.emoji.name === valorant_e) {
					await reaction.message.guild.members.cache.get(user.id).roles.add(valorant_r)
					console.log("Dodano range Valorant graczowi: " + reaction.message.member.id)
				}
			}
			else if (reaction.message.id === rrole_m2)
			{
				////////////////////////////////rola titanfall///////////////////////////////////////////////
				if (reaction.emoji.name === titanfall_e) {
					await reaction.message.guild.members.cache.get(user.id).roles.add(titanfall_r)
					console.log("Dodano range titanfall graczowi: " + reaction.message.member.id)
				}
            }
		}
	})


	////////////////////////////////Role remove///////////////////////////////////////////////
	client.on('messageReactionRemove', async (reaction, user) => {
		if (reaction.message.partial) await reaction.message.fetch();
		if (reaction.partial) await reaction.fetch();
		if (user.bot) return;
		if (!reaction.message.guild) return;
		////////////////////////////////regulamin/////////////////////////////////////////////////
		if (reaction.message.channel.id === rrole_c) 
		{
			if (reaction.message.id === rrole_m) 
			{
				////////////////////////////////rola LOL/////////////////////////////////////////////
				if (reaction.emoji.name === LOL_e) {
					await reaction.message.guild.members.cache.get(user.id).roles.remove(LOL_r)
					console.log("Usunieto range LOL graczowi: " + reaction.message.member.id)
				}
				////////////////////////////////rola APEX/////////////////////////////////////////////
				if (reaction.emoji.name === apex_e) {
					await reaction.message.guild.members.cache.get(user.id).roles.remove(apex_r)
					console.log("Usunieto range APEX graczowi: " + reaction.message.member.id)
				}
				////////////////////////////////rola CS/////////////////////////////////////////////
				if (reaction.emoji.name === cs_e) {
					await reaction.message.guild.members.cache.get(user.id).roles.remove(cs_r)
					console.log("Usunieto range CS graczowi: " + reaction.message.member.id)
				}
				////////////////////////////////rola Valorant/////////////////////////////////////////////
				if (reaction.emoji.name === valorant_e) {
					await reaction.message.guild.members.cache.get(user.id).roles.remove(valorant_r)
					console.log("Usunieto range Valorant graczowi: " + reaction.message.member.id)
				}
			}
			else if (reaction.message.id === rrole_m2) {
				////////////////////////////////rola titanfall///////////////////////////////////////////////
				if (reaction.emoji.name === titanfall_e) {
					await reaction.message.guild.members.cache.get(user.id).roles.remove(titanfall_r)
					console.log("Usunieto titanfall graczowi: " + reaction.message.member.id)
				}
			}
		}
	})
}

