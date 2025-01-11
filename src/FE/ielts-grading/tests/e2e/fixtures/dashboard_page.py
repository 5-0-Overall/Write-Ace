from selenium.webdriver import Remote as WebDriver
from selenium.webdriver.common.by import By
from fixtures.common import *
import pytest
import os
import time

class DashboardPage:
    def __init__(self, driver: WebDriver):
        self.driver = driver

    def verify(self):
        assert wait_elements(self.driver, By.CSS_SELECTOR, 'a.nav-link.active[href="/dashboard"]', 1), "not on Dashboard page"
        
    def get_stats(self):
        # Đợi đến khi các thông số đã tải xong, số element "N/A" bằng 0
        wait_elements(self.driver, By.XPATH, '//*[text()="N/A"]', 0)
        items = self.driver.find_elements(By.CSS_SELECTOR, '.content-grid .content-card')
        map = {}
        for item in items:
            map[item.find_element(By.TAG_NAME, 'h3').text] = item.find_element(By.CLASS_NAME, 'card-value').text
        return map
    
    def get_profile_image(self):
        return self.driver.find_element(By.CSS_SELECTOR, 'img.profile-image')
    
    def click_sign_out_button(self):
        self.get_profile_image().click()
        wait_and_click(self.driver, self.driver.find_element(By.XPATH, '//span[text()="Sign out"]'))

@pytest.fixture(scope='function')
def dashboard_page(logged_in, request):
    logged_in.get(os.path.join(request.session.address, 'dashboard'))
    return DashboardPage(logged_in)