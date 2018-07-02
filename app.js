var Twitter = require( 'twitter' );
var config = require( './config.js' );
var mimimify = require( './mimimification.js' );

const albertParams = {
	screen_name: 'albert_rivera',
	count: 1,
	result_type: 'recent',
	tweet_mode: 'extended',
	lang: 'es',
	trim_user: true,

}	
const twitterClient = new Twitter(config);

const postTweet = function( id, origText ) {
	const permalink = 'https://twitter.com/albert_rivera/status/' + id;
	const text = '"' + mimimify( origText ) + '"';
	let params = {
		status:  text + ' ' + permalink,
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
let checklastTweet = function() {
	twitterClient.get( 
		'statuses/user_timeline', 
		albertParams, 
		function( err, data, response ) {
		  	if( !err ) {
		  		for( let i = 0; i < data.length; i++ ) {
		  			if ( data[i].full_text.indexOf( 'RT' ) === 0) {
		  				if ( Math.rand() < 0.90 ) {
		  					return;
		  				}
		  			} else if( data[i].full_text.length > 100 ) {
		  				if ( Math.rand() < 0.70 ) {
		  					return;
		  				}
		  			}
		  			postTweet( data[ i ].id_str, data[ i ].full_text );
		      	} 
		     } else {
				console.log(err);
	  		}
		} 
	);
	let timeout = 30 * 60 * 1000 + Math.ceil( Math.random() * 30 * 60 * 1000 );
	setTimeout( checklastTweet, timeout );	
}
let checkRandomTweet = function() {
	let albertParamsRandom = {
		screen_name: 'albert_rivera',
 		result_type: 'recent',
		tweet_mode: 'extended',
		lang: 'es',
		count: Math.ceil( 3200 * Math.random() ),
		exclude_replies: true,
		trim_user: true, 	
	}
	twitterClient.get( 
		'statuses/user_timeline', 
		albertParamsRandom, 
		function( err, data, response ) {
		  	if( !err ) {
	  			postTweet( data[ data.length - 1 ].id_str, data[ data.length - 1 ].full_text );
		     } else {
				console.log(err);
	  		}
		} 
	);
	let timeout2 = 30 * 60 * 1000 + Math.ceil( Math.random() * 600 * 60 * 1000 );
	setTimeout( checkRandomTweet, timeout2 );
}

let start = function() {
	checklastTweet();
	checkRandomTweet();
}

start();