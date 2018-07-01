var Twitter = require( 'twitter' );
var config = require( './config.js' );
var mimimify = require( './mimimification.js' );

let twitea = function() {
	var twitterClient = new Twitter(config);
	var params = {
	  screen_name: 'albert_rivera',
	  count: 1,
	  result_type: 'recent',
	  tweet_mode: 'extended',
	  lang: 'es'
	}


	twitterClient.get( 
		'statuses/user_timeline', 
		params, 
		function( err, data, response ) {
		  	if( !err ) {
		  		for( let i = 0; i < data.length; i++ ) {
		  			const permalink = 'https://twitter.com/JohnHackworth/status/' + data[ i ].id_str;
		  			console.log( data[i] );
		  			const text = '"' + mimimify( data[ i ].full_text ) + '"';
				    let params = {
		      			status:  text + permalink,
			  		}
		      		twitterClient.post('statuses/update', params, function( err, response ) {
				        if(err){
		        		  console.log(err);
		        		} else {
		          			let username = response.user.screen_name;
		          			let tweetId = response.id_str;      
		      			}; 
		      		} );
		      	} 
		     } else {
				console.log(err);
	  		}
		} 
	);
}

setInterval( twitea, 30000 );
