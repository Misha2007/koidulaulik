from selenium import webdriver
from bs4 import BeautifulSoup
from time import sleep
import re
import requests

import os
from time import strptime
from selenium.webdriver.chrome.options import Options

import locale

# Scraping part
base_url = "https://kultuuriaken.tartu.ee"
url = base_url + "/et/events"

options = Options()
options.add_argument("--headless=new") 
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")


driver = webdriver.Chrome(options=options)
driver.get(url)
sleep(2)

response = driver.page_source
soup = BeautifulSoup(response, "html.parser")

for div in soup.find_all('div', class_='col'):
    link_tag = div.find('a')
    location_time = div.find_all('p')

    if link_tag and location_time:
        title = link_tag.get_text(strip=True)
        href = link_tag['href']
        full_url = href if href.startswith("http") else base_url + href

        # Visit individual event page to get coordinates and category
        driver.get(full_url)
        sleep(2)
        event_soup = BeautifulSoup(driver.page_source, "html.parser")

        img_url = None
        image_div = event_soup.find("div", class_="image")

        if image_div and image_div.get("style"):
            style = image_div["style"]
            match = re.search(r"url\(['\"]?(.*?)['\"]?\)", style)
            if match:
                image_url = match.group(1)

        # Coordinates
        scripts = event_soup.find_all("script")
        latitude = longitude = None
        for script in scripts:
            if "kultuuriaken" in script.text:
                match_lat = re.search(r'"latitude":([0-9\.\-]+)', script.text)
                match_lon = re.search(r'"longitude":([0-9\.\-]+)', script.text)
                if match_lat and match_lon:
                    latitude = float(match_lat.group(1))
                    longitude = float(match_lon.group(1))
                break

        # Category
        category = "Other"
        ul_tag = event_soup.find("ul", class_="tags")
        if ul_tag:
            li_tag = ul_tag.find("li")
            if li_tag:
                category = li_tag.get_text(strip=True)
                # print(category)

        # Other info
        description = f"Event: {title}"

        strong_tag = event_soup.select_one(
            "#block-kultuuriaken-kultuuriaken-system-main article div strong"
        )

        if strong_tag and strong_tag.get_text(strip=True):
            description = strong_tag.get_text(strip=True)

        price = None

        for p in event_soup.find_all("p"):
            text = p.get_text(strip=True)

            if "€" in text:
                price = text
                break
            elif "tasuta" in text.lower():
                price = "Free"
                break
        
        location_name = location_time[0].get_text(strip=True) if location_time else ""

        date_time_tag = event_soup.find("h3", class_="mb-4")
        event_date_start = None
        event_date_end = None
        event_time_start = None
        event_time_end = None
        month_abbreviations = [
            "jaan",  
            "veebr", 
            "märts",
            "apr",
            "mai",
            "juuni",
            "juuli",
            "aug",
            "sept",
            "okt",
            "nov",
            "dets"
        ]
        newList = []
        try:
            for i in date_time_tag.get_text(strip=True).split("-"):
                newList2 = []
                for x in i.split(" "):
                    if x:
                        if x in month_abbreviations or i.split(" ").index(x) == 0 or x.isnumeric() or ":" in x:
                            if ":" in x:
                                newList2.append(x[:5]) 
                            else:
                                if i.split(" ").index(x) == 0: 

                                    newList2.append(x[1:3]) 
                                else:
                                    print("aaaaaa",x)
                            
                                    newList2.append(x) 
                newList.append(newList2)  
        except Exception as e:
            print(f"Date parsing error for event '{title}': {e}")
            continue
       
        locale.setlocale(locale.LC_TIME, "et_EE.UTF-8")
        month_num = strptime(newList[0][1], '%b').tm_mon
        month_str = f"{month_num:02d}"  

        event_date_start = f"{month_str}-{newList[0][0]}-{newList[0][2]}"

        if len(newList[0]) > 3:
            event_time_start = newList[0][3]

        if len(newList) > 1:
            second_entry = newList[1]
            
            if len(second_entry) > 3:
                event_date_end = f"{month_str}-{second_entry[0]}-{second_entry[2]}"
                event_time_end = second_entry[3]
            else:
                event_time_end = second_entry[0]
        
        event_data = {
            "url": full_url,
            "name": title,
            "description": description,
            "event_date_start": event_date_start,
            "event_time_start": event_time_start,
            "event_date_end": event_date_end,
            "event_time_end": event_time_end,
            "location_name": location_name,
            "category": category,
            "latitude": latitude,
            "longitude": longitude,
            "price": price,
            "image_url": image_url
        }

        try:
            response = requests.post(
                "http://localhost:3000/events",  
                json=event_data
            )

            if response.status_code == 200 or response.status_code == 201:
                print(f"Sent to API: {title}")
            else:
                print(f"API error: {response.status_code} - {response.text}")

        except Exception as e:
            print(f"POST error for '{title}': {e}")

driver.quit()
print("Scraping and insertion complete.")