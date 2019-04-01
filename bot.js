console.log('The bot is starting')
var strings
var Twit = require('twit');
var markov = require('string-markov-js');


var fs = require('fs');
var strings = fs.readFileSync('generated.txt').toString().split("\n");

var count = 0;
var limit = strings.length;

var config = require('./config');

var T = new Twit(config);

tweetIt();
setInterval(tweetIt,1000*10);


function tweetIt(){
var text = strings[count];
console.log(text);
if(count<limit){
    count++;
}
var tweet = {
    status: text
}

//get() Search by hashtag, location
//post() tweeting!
//stream()  continuous connection, @mention auto reply example

T.post('statuses/update', tweet, tweeted);

function tweeted(err, data, response){
    if(err){
        console.log('Oops, something went wrong');
    }
    else{
        console.log("It worked!");
    }
}
}
 