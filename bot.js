console.log('The bot is starting')

var Twit = require('twit');
var markov = require('string-markov-js');
var fs = require('fs');

var dataset = markov.newDataSet();
var filename = './training.txt';
var ngram = 15;
var preserveLineBreaks = true;

var string = 'PROFUNDITIES, WITTICISMS AND GENERAL WISDOM It is morally wrong to allow suckers to keep their money. Addenduma Smith and Wesson beats four aces. (Canada Bill Jones) A pipe gives a wise man time to think and a fool something to put in his mouth. Never underestimate the power of human stupidity. Whatever goes around, comes around. There is only one right way for a machine to run. The number of ways it can go wrong is so infinite that every operating engineer lives in constant terror. ON WAR Dont rejoice at the defeat, you men, Now that you have killed the bastard. The bitch that bore him is in heat again. ON DYING - REMEMBRANCE Bring back my name On wings of flame. Winds of the plains, Dance once for me. SOULS They will come back - come back - as long as the red earth rolls. He never wasted a leaf or a tree. Do you think he would squander souls? ***COLDÄ IRON Gold is for the mistress - silver for the maid - Copper for the craftsman, cunning at his trade. But Iron - Cold Iron - is master of them all. The number of people who agree or disagree with you has absolutely no bearing on whether youre right. The universe has a way of deciding that for itself. The truth of any proposition has nothing to do with its credibility...and vice versa.ARISTOCRATS CODE The last thing you want is an educated, affluent and emancipated population. Power hinges on the restriction and control of wealth. Science and technology offer unlimited wealth. Therefore, science and technology have to be controlled. Knowledge and reason are enemies. Myth and unreason are the weapons you fight them with. If you dont like yourself, you cant like other people. Money is a powerful aphrodisiac. But flowers work almost as well. It may be better to be a live jackal than a dead lion, but it is better still to be a live lion. And usually easier. Men rarely, if ever, manage to dream up a god superior to themselves. Most gods have the morals and manners of a spoiled child. Place your clothes and weapons where you can find them in the dark. An Elephant; A Mouse built to government specifications. Democracy is based on the assumption that a million men are wiser than one man. Hows that again? I missed something. Autocracy is based on the assumption that one man is wiser than a million men. Lets play that over again too. Who decides? Taxes are not levied for the benefit of the taxed. Money is the sincerest form of flattery. Women love to be flattered. So do men. You live and learn. Or you dont live long. *** Only a sadistic scoundrel - or a fool - tells the bald truth on social occasions. *** Be wary of strong drink. It can make you shoot at tax collectors - and miss.';
//var string = 'Its sad to see how fast administrators are willing to do away with study away opportunities. Semesters, J-Terms, and summers abroad are what defined my time here as a senior. Given the current trajectory, students will only get 1 semester away, 1 J-Term away, and, for the lucky ones, funding for 1 summer internship or course. That would undermine the core spirit of this place, and make it pretty much no different from any other school in the UAE. Why would people come here over actual "worlds honor colleges" where you can achieve and travel far more?My phone has been ringing for several days because of all these messages and emails from my friends, my friends friends and people I have never talked to asking me to vote for this person that person. Seriously guys, if you gonna disturb a not-at-all-into-politic guys quiet afternoon, I am gonna rank my preference in terms of whoever disturbing me least! Invisible things on this campus: 1) Conservative values 2) Pro Israel views 3) The sign at D2 cashier telling people not to use their FUCKING CASH OR CARD IN THE FAST LINE JESUS CHRIST Whats worse: knowing that this universitys suicide-proofing has flaws and gaps, or not telling anyone about them in case you ever need to use one? Things CDC wont tell you: do all phone interviews naked. im two breakdowns away from a face tattoo I feel out of place posting here as Im not a student at NYUAD yet, but I wanted your guys opinions. I fell in love with NYUAD during CW, and was in awe with how great everyone was (especially all the current students I met who were ready to help at any point and were generally really nice). But, I got accepted into both NYUAD and this other school which ranks higher, is more prestigious, and gives me the same scholarship. Everyone keeps telling me that Id be stupid to let go of that chance, so at this point Im very conflicted. Yes, I fell in love with NYUAD during CW, but was it just because they made everything seem ideal for this exact reason? Is this school the way you see it during CW? Are people really as nice and as friendly as they seemed to me? Anyone similar experiences? Good try professor, but I still will attend the minimum number of your boring, waste of time lectures needed to receive an A. The culture of mandatory attendance here is so weird compared to pretty much every other American university. I will "get the fuck out this university" in May with a degree and a solid job. Oh, and its hilarious to see multiple people like this post despite themselves having skipped classes due to hangovers (or still being drunk), to watch Netflix, or to get laid. You know who you are! P.S. No one cares how rich or poor your parents are here, so you can get rid of that chip on your shoulder.'
var ngram = 2;

var startWithCapitalNGram = true;
 
dataset.trainOnString(string, ngram, preserveLineBreaks);
 
// generate 5 words of text, beginning with an ngram that was capitalized in the training corpus


var config = require('./config');

var T = new Twit(config);

tweetIt();
setInterval(tweetIt,1000*60*60);


function tweetIt(){
var text = dataset.generate(8, startWithCapitalNGram);
console.log(text);

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
 