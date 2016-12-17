module.exports = function(robot) {
    //process user's message
    robot.hear(/[+]{2}/, function(res) {
    	var target = res.message.text.split(' ')[0]

    	if (robot.brain.data.users[target] === undefined) {
    		robot.brain.data.users[target] = 1
    	} else {
    		robot.brain.data.users[target] = robot.brain.data.users[target]+1
    	}
    	res.reply('thats so nice of you')
    })
    robot.hear(/[-]{2}/, function(res) {
    	var target = res.message.text.split(' ')[0]

    	if (robot.brain.data.users[target] === undefined) {

    		robot.brain.data.users[target] = -1
    	} else {
    		robot.brain.data.users[target] = robot.brain.data.users[target]-1
    	}

    	res.reply('sad times')
    })
    robot.hear(/(leaderboard)/i, function(res) {
    	var obj = robot.brain.data.users;
    	var scoreBoard = obj.keys(points).sort((a,b) {
    	 return points[a] - points[b]
    	})

    	res.reply(JSON.stringify(scoreBoard))
    	
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