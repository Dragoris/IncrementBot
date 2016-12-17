module.exports = function(robot) {
    //process user's message
    robot.hear(/[+]{2}/, function(res) {
    	var target = res.message.text.split(' ')[0]

    	console.log(robot.brain.data)
    	if (robot.brain.data.users[target] === undefined) {
    		console.log('not there')
    		robot.brain.data.users[target] = 1
    		console.log(robot.brain.data.users)
    	} else {
    		console.log('have another')
    		robot.brain.data.users[target] = robot.brain.data.users[target]+1
    		console.log(robot.brain.data.users)
    	}
    	res.reply('thats so nice of you')
    })
    robot.hear(/[-]{2}/, function(res) {
    	var target = res.message.text.split(' ')[0]

    	if (robot.brain.data.users[target] === undefined) {
    		console.log('negitives??')
    		robot.brain.data.users[target] = -1
    		console.log(robot.brain.data.users)
    	} else {
    		console.log('minus for you')
    		robot.brain.data.users[target] = robot.brain.data.users[target]-1
    		console.log(robot.brain.data.users)
    	}

    	res.reply('sad times')
    })
    robot.hear(/(leaderboard)/i, function(res) {
    	res.reply(JSON.stringify(robot.brain.data.users))
    	
    })

};

/*{ data: { users: {}, _private: {} },
  autoSave: false,
  saveInterval: 
   { _idleTimeout: 5000,
     _idlePrev: 
      { _idleTimeout: 5000,
        _idlePrev: [Object],
        _idleNext: [Circular],
        _idleStart: 1481701416672,
        _onTimeout: [Function: wrapper],
        _repeat: true },
     _idleNext: 
      { _idleNext: [Object],
        _idlePrev: [Circular],
        msecs: 5000,
        ontimeout: [Function: listOnTimeout] },
     _idleStart: 1481701415467,
     _onTimeout: [Function: wrapper],
     _repeat: true },
  _events: { save: [Function], close: [Function] } }
*/