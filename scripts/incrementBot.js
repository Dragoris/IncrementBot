module.exports = function(robot) {
    //process user's message
    robot.hear(/(@[a-z_.-]* [+]{2})/, function(res) {

    	var recipient = res.message.text.split(' ')[0];
    	var sender = res.message.user.name;
    	var msg = res.message.text.split('++')[1]
    	var random = function(arr) {
    		return Math.floor(Math.random() * arr.length)
    	};
    	var lolNo = ['http://reactiongifs.com/?p=25434','http://reactiongifs.com/?p=24785','http://reactiongifs.com/?p=24469',
    				'http://reactiongifs.com/?p=24194','http://reactiongifs.com/?p=22145','http://reactiongifs.com/?p=21937' ]
    	if (recipient === '@' + sender) {
    		return res.send(lolNo[random(lolNo)])
    	} else {
	    	if (robot.brain.data.users[recipient] === undefined) {
	    		robot.brain.data.users[recipient] = 1
	    	} else {
	    		robot.brain.data.users[recipient] = robot.brain.data.users[recipient]+1
	    	}
    	}
    	robot.http('https://spreadsheets.google.com/feeds/list/1eEa2ra2yHBXVZ_ctH4J15tFSGEu-VTSunsrvaCAV598/od6/public/values?alt=json')		
    		.get()(function(err, resp, body){ 
    			var list = JSON.parse(body).feed.entry;
    			var compliment = list[random(list)].gsx$compliments.$t;
    			if (msg.length) {
    				res.send(recipient + ', ' + '@' + sender + ' wants you to know that ' + compliment + '\n They go on to elaborate: ' + msg + '\n +1')
    			} else {
    			res.send(recipient + ', ' + '@' + sender + ' wants you to know that ' + compliment + '\n +1')
    			}
    	})

    })
    robot.hear(/(@[a-z_.-]* [--]{2})/, function(res) {
    	var recipient = res.message.text.split(' ')[0];
    	var sender = res.message.user.name;
    	

    	if (robot.brain.data.users[recipient] === undefined) {
    		robot.brain.data.users[recipient] = -1
    	} else {
    		robot.brain.data.users[recipient] = robot.brain.data.users[recipient]-1
    	}
    	if (recipient === '@' + sender) {
    		res.send('http://www.reactiongifs.com/r/but-why.gif')
    	} else {
    		res.send(recipient + ', ' + '@' + sender + ' has unspeakable things to say about you, your family, and your way of life! \n Suffice it to say, you just lost a point :(')
    	}
    })
    robot.hear(/(scoreboard)/i, function(res) {
    	var scoreBoard = [];
    	var people = robot.brain.data.users;

    	for (var points in people) {
    		scoreBoard.push([points, people[points]])
    	}

    	var sorted = scoreBoard.sort(function(a,b) {
    	 return b[1] - a[1]
    	}).map(function(x) {
    		return x.join(' = ')
    	}).join('\n');
    	/*sorted[0][2] = ':crown:';
    	console.log(sorted[0][2], sorted[0], sorted)
    	robot.http('https://slack.com/api/emoji.list/xoxb-118260580103-fOctuK0xKky1X5sLdhZEqbcv')
    		.get()(function(err, resp, body){
    			console.log(resp)
    		})*/

    	res.send('The current score is :\n' + sorted)
    	
    })
};

