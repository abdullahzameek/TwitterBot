import requests
import time
import os
import re
import string
from random import randint
from dotenv import load_dotenv 
from bs4 import BeautifulSoup
from selenium import webdriver

SCROLL_PAUSE_TIME = 4.5 
SCROLL_LIMIT = 5 #number of iterations to scroll through 

#range for random noise to be added 
LOWER_LIMIT = -200
UPPER_LIMIT = 200

TARGET_URL = 'https://m.facebook.com/profile.php?id=250320155116643&ref=content_filter/'

STRING_START = 6 #number of characters at the start of the string to ignore
load_dotenv() #loads the path to chromedriver as an environment variable

scrapedText= open("scrapedText.txt","w+") 

driver = webdriver.Chrome(os.getenv("CHROMEDRIVER_PATH"))
driver.get(TARGET_URL)

#Get scroll height
last_height = driver.execute_script("return document.body.scrollHeight")

for i in range(SCROLL_LIMIT):
    # scroll based on the last height calculated, pass last height as an argument to the JS component
    driver.execute_script("window.scrollTo(0, arguments[0]);", last_height)
    
    # Wait for the page to load
    time.sleep(SCROLL_PAUSE_TIME)

    # Calculate new scroll height and then add some random noise to make the behaviour less bot-like
    new_height = driver.execute_script("return document.body.scrollHeight")
    
    #create some random noise that would be added to the new scroll height
    last_height = new_height + randint(LOWER_LIMIT, UPPER_LIMIT)


soup = BeautifulSoup(driver.page_source, "html.parser")
result = soup.find_all("p")

for r in result:
    #clean up scraped data
    confession = str(r.getText()).strip()
    try: #not all confessions have the ID tag so we try to remove it from the ones that do
        confession = confession.replace(re.findall("#[0-9]{4}:", confession)[0],'')
    except:
        pass #do nothing otherwise
    scrapedText.write(confession)
    scrapedText.write("\n")
scrapedText.close()