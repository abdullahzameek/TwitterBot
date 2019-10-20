import time
import os
import re
from random import randint
from dotenv import load_dotenv 
from bs4 import BeautifulSoup
from selenium import webdriver

PAGELOAD_WAIT_TIME = 4.5 
SCROLL_LIMIT = 5 # number of iterations to scroll through 

# range for random noise to be added 
LOWER_LIMIT = -200
UPPER_LIMIT = 200

# URL to NYUAD Confessions' Mobile Facebook Page
TARGET_URL = 'https://m.facebook.com/profile.php?id=250320155116643&ref=content_filter/'

STRING_START = 6 # number of characters at the start of the string to ignore
load_dotenv() # loads the path to chromedriver as an environment variable

scraped_text= open("scrapedText.txt","w+") 

driver = webdriver.Chrome(os.getenv("CHROMEDRIVER_PATH"))
driver.get(TARGET_URL)

# Get scroll height
last_height = driver.execute_script("return document.body.scrollHeight")

for i in range(SCROLL_LIMIT):
    # scroll based on the last height calculated, pass last height as an argument to the JS component
    driver.execute_script("window.scrollTo(0, arguments[0]);", last_height)
    
    # Wait for the page to load
    time.sleep(PAGELOAD_WAIT_TIME)

    # Calculate new scroll height and then add some random noise to make the behaviour less bot-like
    new_height = driver.execute_script("return document.body.scrollHeight")
    
    # create some random noise that would be added to the new scroll height
    last_height = new_height + randint(LOWER_LIMIT, UPPER_LIMIT)


soup = BeautifulSoup(driver.page_source, "html.parser")
result = soup.find_all("p") # The posts are enclosed in <p> tags so we retrieve those

for r in result:
    # clean up scraped data
    confession = str(r.getText()).strip()
    try: # not all confessions have the ID tag so we try to remove it from the ones that do
        confession = confession.replace(re.findall("#[0-9]{4}:", confession)[0],'')
    except:
        pass
    scraped_text.write(confession)
    scraped_text.write("\n")
scraped_text.close()