from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
from time import sleep
import requests
import re

api_url = "http://localhost:3000/articles"

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

start_url = "https://rahvakultuur.ee/mis-toimub/"

existing_urls = set()

def safe_text(e):
    return e.get_text(strip=True) if e else ""

def send_to_db(item):
    try:
        response = requests.post(api_url, json=item)
        if response.status_code == 201:
            print(f"Saved to DB: {item['name']}")
        else:
            print(f"Failed to save: {response.text}")
    except Exception as e:
        print("Error sending to DB:", e)

def get_posts(current_url):
    driver.get(current_url)
    sleep(2)
    soup = BeautifulSoup(driver.page_source, "html.parser")
    posts = soup.find_all(class_="post-item")
    print(f"Found {len(posts)} posts on page {current_url}")

    for post in posts:
        title_tag = post.find("a", class_="full-link")
        if not title_tag:
            continue
        title = safe_text(title_tag)
        link = title_tag['href']
        link = "https://rahvakultuur.ee/mis-toimub/" + link if not link.startswith("http") else link
        if link in existing_urls:
            print(f"Skipping existing URL: {link}")
            continue

        img_tag = post.find("div", class_="post-photo")
        img_url = None
        if img_tag and img_tag.has_attr("style"):
            style = img_tag["style"]
            match = re.search(r"url\(['\"]?(.*?)['\"]?\)", style)
            if match:
                img_url = match.group(1)

        driver.get(link)
        sleep(2)
        post_soup = BeautifulSoup(driver.page_source, "html.parser")
        content_div = post_soup.find(class_="excerpt")
        content = safe_text(content_div.find("p")) if content_div else ""

        item = {
            "name": title,
            "url": link,
            "image_url": img_url,
            "content": content,
            "source": "rahvakultuur.ee"
        }

        send_to_db(item)
        existing_urls.add(link)
        print(f"Added: {title}, {link}, {img_url}, {content[:30]}...")

        driver.back()
        sleep(1)

driver.get(start_url)
sleep(2)
soup = BeautifulSoup(driver.page_source, "html.parser")

while True:
    get_posts(driver.current_url)

    next_btn = soup.find("a", class_="next.page-numbers")
    if next_btn and next_btn.has_attr("href"):
        next_url = next_btn['href']
        print(f"Navigating to next page: {next_url}")
        driver.get(next_url)
        sleep(2)
        soup = BeautifulSoup(driver.page_source, "html.parser")
    else:
        print("No more pages to scrape.")
        break

driver.quit()
print("Scraping and insertion complete.")