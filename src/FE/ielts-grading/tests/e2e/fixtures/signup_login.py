from selenium.webdriver import Remote as WebDriver
from selenium.webdriver.common.by import By
from fixtures.common import *
from fixtures.dashboard_page import DashboardPage
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pytest
import os

class BasePage:
    def __init__(self, driver: WebDriver):
        self.driver = driver
    
    def get_username_input(self) -> WebElement | None:
        return wait_element(self.driver, By.XPATH, label_sibling_xpath('Username', 'input'))

    def get_password_input(self) -> WebElement | None:
        return wait_element(self.driver, By.XPATH, label_sibling_xpath('Password', 'div/input'))

    def get_email_input(self) -> WebElement | None:
        return element_or_none(self.driver, By.XPATH, label_sibling_xpath('Email', 'input'))

    def get_confirm_password_input(self) -> WebElement | None:
        return element_or_none(self.driver, By.XPATH, label_sibling_xpath('Confirm Password', 'div/input'))
    
    def get_submit_button(self):
        return self.driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]')

    def has_error_message(self):
        return wait_elements(self.driver, By.CSS_SELECTOR, 'p.error-message')
    
    def verify(self):
        assert self.get_username_input().is_displayed(), "Username textbox is not displayed"
        assert self.get_password_input().is_displayed(), "Password textbox is not displayed"
        assert self.get_submit_button().is_displayed(), "Submit button is not displayed"

class LoginPage(BasePage):
    def verify(self):
        super().verify()
        assert self.get_email_input() is None, "Email textbox is displayed"
        assert self.get_confirm_password_input() is None, "Confirm Password textbox is displayed"
    
    def verify_submit_success(self):
        self.get_submit_button().click()
        result = DashboardPage(self.driver)
        result.verify()
        return result

class SignupPage(BasePage):
    def verify(self):
        super().verify()
        assert self.get_email_input().is_displayed(), "Email textbox is not displayed"
        assert self.get_confirm_password_input().is_displayed(), "Confirm Password textbox is not displayed"
    
    def verify_submit_success(self):
        self.get_submit_button().click()
        WebDriverWait(self.driver, 10).until(EC.invisibility_of_element(self.get_confirm_password_input()))
        result = LoginPage(self.driver)
        result.verify()
        return result

@pytest.fixture(scope='function')
def signup_page(logged_out, request):
    logged_out.get(os.path.join(request.session.address, 'register'))
    return SignupPage(logged_out)

@pytest.fixture(scope='function')
def login_page(logged_out, request):
    logged_out.get(os.path.join(request.session.address, 'login'))
    return LoginPage(logged_out)

@pytest.fixture(scope='function')
def logged_in(driver, request):
    if not request.session.logged_in:
        request.session.logged_in = True
        driver.get(os.path.join(request.session.address, 'login'))
        login_page = LoginPage(driver)
        login_page.get_username_input().send_keys(request.session.username)
        login_page.get_password_input().send_keys(request.session.password)
        login_page.verify_submit_success()
    return driver

@pytest.fixture(scope='function')
def logged_out(driver, request):
    if request.session.logged_in:
        request.session.logged_in = False
        driver.get(os.path.join(request.session.address, 'dashboard'))
        dashboard_page = DashboardPage(driver)
        dashboard_page.click_sign_out_button()
        dashboard_page.driver.switch_to.alert.accept()
    return driver
        
