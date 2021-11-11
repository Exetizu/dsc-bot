module.exports = client => {

const channelId = '755871461608259594'

const updateMembers = guild => {
const channel = guild.channels.cache.get(channelId)
channel.setName(`Gracze: ${guild.memberCount}`)
}
    client.on('guildMemberAdd', (member) => {
        member.roles.add("744313266234327041")
        updateMembers(member.guild)
    })
client.on('guildMemberRemove', (member) => updateMembers(member.guild))

const guild = client.guilds.cache.get('743734191677505627')
updateMembers(guild)
}