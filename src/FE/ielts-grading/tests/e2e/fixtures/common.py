from selenium.webdriver import Remote as WebDriver
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def label_sibling_xpath(label: str, locator: str):
    return f'//label[text()="{label}"]/following-sibling::{locator}'

def element_or_none(driver: WebDriver, by, value):
    elements = driver.find_elements(by, value)
    if len(elements) > 0: return elements[0]
    return None

def wait_element(driver: WebDriver, by: By, value: str, wait_time = 1, ping_interval = 0.2):
    for i in range(int(wait_time/ping_interval)):
        elements = driver.find_elements(by, value)
        if len(elements) > 0:
            return elements[0]
        time.sleep(ping_interval)
    return None

def wait_elements(driver: WebDriver, by: By, value: str, count = 1, wait_time = 10, ping_interval = 0.2, accept_other_counts = False):
    elements = driver.find_elements(by, value)
    for i in range(int(wait_time/ping_interval)):
        if len(elements) == count:
            return elements
        time.sleep(ping_interval)
        elements = driver.find_elements(by, value)
    return elements if accept_other_counts else None

def wait_any(driver: WebDriver, locators, wait_time = 10, ping_interval = 0.2, return_element=False):
    for _ in range(int(wait_time/ping_interval)):
        for i, locator in enumerate(locators):
            elements = driver.find_elements(*locator)
            if len(elements) > 0:
                return elements[0] if return_element else i
        time.sleep(ping_interval)
    return None if return_element else -1

def wait_and_click(driver, element):
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable(element))
    element.click()

def clear_send_key(element: WebElement, text):
    element.clear()
    element.send_keys(text)

def press_enter(driver):
    ActionChains(driver).send_keys(Keys.ENTER)

def scroll_to_element(driver, element):
    ActionChains(driver).move_to_element(element).perform()