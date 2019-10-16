Creating a Twitter Bot using Dan Shiffman's tutorial and scraped data from NYUAD Confessions and C&C using BS4 and Selenium Webdriver. Fed the results into an RNN model to generate "confessions" 


The main motivation for the midterm was my obsession with the content of the posts that could be found on the confessions pages of NYU Abu Dhabi. The posts had very amusing content, so I thought it would be interesting to see what would happen if posts were fed to a machine learning algorithm that would in turn generate its own “confessions”. 
Another motivation was a couple of Twitter profiles that I found that were entirely managed by bots and spewed out random tweets at set frequencies.

Putting these two interests together gave rise to the ConfessorBot – A Twitter Bot that would tweet random NYU related confessions. 

Strategy

The first step was to understand exactly how I can train and generate the random confessions. After a quick google search, I noticed the words “RNN” and “LSTM” show up almost on every hit for “Text Generation Machine Learning”.  These were two resources that proved to be useful in understanding the theory behind the networks.
http://colah.github.io/posts/2015-08-Understanding-LSTMs/


https://towardsdatascience.com/learn-how-recurrent-neural-networks-work-84e975feaaf7
https://skymind.ai/wiki/lstm
http://karpathy.github.io/2015/05/21/rnn-effectiveness/

I then began to read up on the technologies, but was soon overwhelmed by the vast intricacies that both of them posed. I then explored the different implementations of RNNs/LSTMs in Keras and Tensorflow (mostly the one shown in the Machine Learning Mastery article linked above).
This was the first major roadblock. Even though I followed the tutorial down to the letter, the code failed to compile and spawned many errors, so I attempted to resolve them one by one. After resolving two errors, I bumped into an error related to a dependency itself, and then came to realise that the article was relatively old, and so it was likely that the said dependency may have been deprecated. I did not want to spend much more time on this model so I began to look for another one.

Then, I came across Tensorflow’s own tutorial for text generation using RNNs and its eager execution module. This seemed much more promising and ultimately, I found out that it was. (More about the actual training and testing at the end) 

After discussing my project with Aven, he suggested that I give more focus to get  a working model first before focusing too heavily on the data collection itself, since the corpus that I wished to train on had to be collected manually by me. What made it tougher to collect this data was the fact that it was to be collected from Facebook. In my midterm proposal I stated that collecting data from Facebook would prove to be one of my biggest challenges, and eventually, it did prove to be quite hard indeed. 
This was primarily because Facebook has heavily restricted the use of its Graph API after the entire Cambridge Analytica scandal. So, the only option was to use some sort of web scraping technique to collect the data.
My idea was to use some combination of BeautifulSoup (A Python HTML Parser) and Selenium (a browser automator) to retrieve the posts one by one. However, once again, I came across two major problems.
1. The HTML architecture was quite complicated – the Facebook feed is quite complex and the data I wanted was buried deep within 8-9 different tags.
2. Facebook is quite strict with their web crawler/bot policies, so it was very likely that I would get blocked early into the scraping. 

Navya suggested that I scrape from the mobile version of Facebook instead due to its simpler structure, and minimal use of Javascript which meant it was less likely to detect bot behaviour. He also told me about a BS4 method called getText() which turned out to be an absolute saviour to retrieve the deep buried text from the site. After writing up a relatively straightforward python script and tweaking with the load times, I was able to get posts out of the Facebook page and into a textfile. The text that I got was quite clean, so it just took me a couple of minutes to clean them manually using basic tools on VSCode. 
One problem, however, was that I would not get all the past since the beginning of time (on that page). Selenium would reach a scroll limit and stop there. I tried to manually scroll past that point, however, I encountered the same roadblock. I’m guessing this is due to the fact that the browser cache has a limit to the amount of data it can hold for a given time so that’s why it failed to load every single post. As a result,  I was only able to get around 300-350 posts per page, giving me a grand total of around 1200 posts. This is far from optimal for training a RNN, and comes across as the first drawback of my current project. However, at the same time, I believe my project has shown the Proof of Concept sufficiently, i.e, it will give better results once the data is scaled up and the current prototype sufficiently demonstrates the base functionality that I wished to achieve. 
Here’s a short demo of the scraper in action (I set it to scrape only for a few seconds so as to keep the video short)

Video Player

00:00
01:28


During this course of trying to get data out of Facebook, I did learn many new concepts with regards to web architecture such as lazy versus eager loading, infinite scrolling, and web tools such as Selenium WebDriver (a browser automation tool) and Python’s BeautifulSoup. (On that note, major shoutout to Navya for pointing me in the right direction with regards to how to approach the problem, from which version of Facebook’s site to use to useful BS4 methods used to retrieve text data).

The next step was to create a very simple Twitter Bot. The main functionality of this bot was to simply tweet something at a set interval, so configuring it was fairly straightforward. I relied heavily on a tutorial by Daniel Shiffman to create the bot, with some additions to suit my use case. I used Node JS and the Twit package to do this, along with some other npm dependencies for some additional functionality. My program would then read a text file containing the generated tweets and tweet them out at set intervals. 

With regards to the actual RNN, I followed the instructions on Tensorflow’s site to write the code. I tested the code with the “shakespeare.txt” text file with three epochs and the results looked promising. I then proceeded to train it with my own dataset. It was at this point, I realized the biggest limitation in my project – since the size of my dataset was small, there would inevitably be a high degree of overfitting. Initially, I planned to use posts only from NYUAD Crushes and Compliments and NYUAD Confessions, but since my scraper had hit a physical limit with regards to the number of posts it could scrape, I decided to also scrape posts off NYU Secrets (which is NYU New York’s Confessions Page). This slightly increased the size of my dataset but not to drastically great extent where it would combat the overfitting problem. However, I believe that the model still highlights the proof of concept of the initial idea and will be able to give more amusing results for  a larger set of confessions. 
Another aspect that I underestimated was the amount of time it would take for the RNN to train. It took a total of 6.5 hours for 200 Epochs on the Intel AI cluster, and three failed attempts because of broken pipes and failed connections. Ultimately, I was able to generate some “confessions” from the network and feed it to the Twitter bot.

Here’s a demo of the bot in action:

Video Player

00:00
01:03


Reflections and Future Enhancements

I really enjoyed working on this project since it introduced me to a lot of new concepts in Machine Learning (such as the theoretical foundations of a RNN)  and Web Scraping, as well as made me aware of practical limitations in training a ML model. 
However, there are certain things that could certainly do with a lot of improving.
1) A more efficient scraping technique – I’m not really sure if there’s another way out there to retrieve posts off Facebook without an API, but the current method does get quite slow and tedious, in addition to the fact that it could only scrape 300 or so posts. before hitting a limit.
2) Use of a much larger dataset – This is important to combat overfitting, and at present, my current model overfits the data to a large extent.
3) Further refinement of the model to create more semantic structure and grammar rules – it would be much better if the model could be trained on more grammar so that it would generate more cohesive and interesting sentences. 

The actual code used for this project can be found here.

The Twitter profile can be found here.
(Initially, I planned to create a completely new account for this project, but my developer account application was rejected. As a result, I used an account that was created as part of a running project and was named after an inside joke from a previous IM class last spring)
