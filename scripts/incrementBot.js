module.exports = function(robot) {
    robot.hear(/(@[a-z_.-]* [+]{2})/, function(res) {
    	var recipient = res.message.text.split(' ')[0];
    	var sender = res.message.user.name;
    	var msg = res.message.text.split('++')[1]
    	var random = function(arr) {
    		return Math.floor(Math.random() * arr.length)
    	};
    	var lolNo = ['http://reactiongifs.com/?p=25434','http://reactiongifs.com/?p=24785','http://reactiongifs.com/?p=24469',
    				'http://reactiongifs.com/?p=24194','http://reactiongifs.com/?p=22145','http://reactiongifs.com/?p=21937' ]
    	//prevent people ++ themselves
        if (recipient === '@' + sender) {
    		return res.send(lolNo[random(lolNo)])
    	} else { //if the recip is new set to 1, otherwise add 1
	    	if (robot.brain.data.users[recipient] === undefined) {
	    		robot.brain.data.users[recipient] = 1
	    	} else {
	    		robot.brain.data.users[recipient] = robot.brain.data.users[recipient]+1
	    	}
    	}
        //send a random compliment with a ++
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
    	
        //if the recip is new set to -1, otherwise subtract 1
    	if (robot.brain.data.users[recipient] === undefined) {
    		robot.brain.data.users[recipient] = -1
    	} else {
    		robot.brain.data.users[recipient] = robot.brain.data.users[recipient]-1
    	}
    	if (recipient === '@' + sender) { // -- yourself gets a gif
    		res.send('http://www.reactiongifs.com/r/but-why.gif')
    	} else {
    		res.send(recipient + ', ' + '@' + sender + ' has unspeakable things to say about you, your family, and your way of life! \n Suffice it to say, you just lost a point :(')
    	}
    })
    robot.hear(/(scoreboard)/i, function(res) {
    	var scoreBoard = [];
    	var people = robot.brain.data.users;
        //transform brain obj into associative arrays
    	for (var points in people) {
    		scoreBoard.push([points, people[points]]);
    	}
        //sort by point count
    	var sorted = scoreBoard.sort(function(a,b) {
    	 return b[1] - a[1]
    	});
        //add emojis
    	sorted[0].push(':crown:');
    	sorted[1].push(':trophy:');
    	sorted[2].push(':medal:');
    	if (sorted[sorted.length-1][1] < 0) sorted[sorted.length-1].push(':smiling_imp:');
        //format scoreboard output
    	sorted = sorted.map(function(scoreArr) {
    		return scoreArr.join(' = ')
    	}).map(function(scoreStr) {
    		return scoreStr = scoreStr.replace(/(= :)/g, '\t:')
    	}).join('\n')

    	res.send('The current standings are :\n' + sorted)	
    })
    robot.hear(/(nuke it [+]{2})/, function(res) {
      var sender = res.message.user.name;
    	robot.brain.data.users = {};
    	res.send('The standings have been reset by ' + sender)
    })
};

