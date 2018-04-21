console.log('The bot is starting')

var Twit = require('twit');
var markov = require('string-markov-js');

var dataset = markov.newDataSet();
var filename = './training.txt';
var ngram = 3;
var preserveLineBreaks = true;

var string = 'PROFUNDITIES, WITTICISMS AND GENERAL WISDOM It is morally wrong to allow suckers to keep their money. Addenduma Smith and Wesson beats four aces. (Canada Bill Jones) A pipe gives a wise man time to think and a fool something to put in his mouth. Never underestimate the power of human stupidity. Whatever goes around, comes around. There is only one right way for a machine to run. The number of ways it can go wrong is so infinite that every operating engineer lives in constant terror. ON WAR Dont rejoice at the defeat, you men, Now that you have killed the bastard. The bitch that bore him is in heat again. ON DYING - REMEMBRANCE Bring back my name On wings of flame. Winds of the plains, Dance once for me. SOULS They will come back - come back - as long as the red earth rolls. He never wasted a leaf or a tree. Do you think he would squander souls? ***COLDÄ IRON Gold is for the mistress - silver for the maid - Copper for the craftsman, cunning at his trade. But Iron - Cold Iron - is master of them all. The number of people who agree or disagree with you has absolutely no bearing on whether youre right. The universe has a way of deciding that for itself. The truth of any proposition has nothing to do with its credibility...and vice versa.ARISTOCRATS CODE The last thing you want is an educated, affluent and emancipated population. Power hinges on the restriction and control of wealth. Science and technology offer unlimited wealth. Therefore, science and technology have to be controlled. Knowledge and reason are enemies. Myth and unreason are the weapons you fight them with. If you dont like yourself, you cant like other people. Money is a powerful aphrodisiac. But flowers work almost as well. It may be better to be a live jackal than a dead lion, but it is better still to be a live lion. And usually easier. Men rarely, if ever, manage to dream up a god superior to themselves. Most gods have the morals and manners of a spoiled child. Place your clothes and weapons where you can find them in the dark. An Elephant; A Mouse built to government specifications. Democracy is based on the assumption that a million men are wiser than one man. Hows that again? I missed something. Autocracy is based on the assumption that one man is wiser than a million men. Lets play that over again too. Who decides? Taxes are not levied for the benefit of the taxed. Money is the sincerest form of flattery. Women love to be flattered. So do men. You live and learn. Or you dont live long. *** Only a sadistic scoundrel - or a fool - tells the bald truth on social occasions. *** Be wary of strong drink. It can make you shoot at tax collectors - and miss.';

var ngram = 2;

var startWithCapitalNGram = true;
 
dataset.trainOnString(string, ngram, preserveLineBreaks);
 
// generate 5 words of text, beginning with an ngram that was capitalized in the training corpus
var text = dataset.generate(5, startWithCapitalNGram);
console.log(text);

var config = require('./config');

var T = new Twit(config);
tweetIt();


function tweetIt(){

var r = Math.floor(Math.random()*100);
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
