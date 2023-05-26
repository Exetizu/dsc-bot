module.exports = client => {
    client.on('voiceStateUpdate', (oldMember, newMember) => {
        (async () => {
            let newUserChannel = newMember.channelID;
            let oldUserChannel = oldMember.channelID;
            //////////////////////////////kopo 
            if (newUserChannel === "759736623327215687") {
                var target = client.users.cache.find(user => user.id == "321313905693687820")
                var user = client.users.cache.find(user => user.id == newMember)
                target.send(user.username + " wszedł na twoją poczekanię.");
            }
            //////////////////////////////tobi 
            else if (newUserChannel === "801174476666306600") {
                var target = client.users.cache.find(user => user.id == "710185038414872626")
                var user = client.users.cache.find(user => user.id == newMember)
                target.send(user.username + " wszedł na twoją poczekanię.");
            }
            //////////////////////////////wodzu 
            else if (newUserChannel === "787342292272283668") {
                var target = client.users.cache.find(user => user.id == "731841596261400618")
                var user = client.users.cache.find(user => user.id == newMember)
                target.send(user.username + " wszedł na twoją poczekanię.");
            }
            //////////////////////////////Wujek   
            else if (newUserChannel === "808357475233169438") {
                var target = client.users.cache.find(user => user.id == "401444051221479426")
                var user = client.users.cache.find(user => user.id == newMember)
                target.send(user.username + " wszedł na twoją poczekanię.");
            }
            //////////////////////////////pomoc
            else if (newUserChannel === "769554838928228364") {
                var user = client.users.cache.find(user => user.id == newMember)

                client.channels.cache.get("823667583541706792").send(`<@&769559605738471454>, ` + user.username + " potrzebuje pomocy");
            }
        })();
        
    });
}


