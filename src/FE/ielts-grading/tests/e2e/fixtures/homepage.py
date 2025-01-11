from selenium.webdriver import Remote as WebDriver
from selenium.webdriver.common.by import By
from fixtures.signup_login import SignupPage, LoginPage
import pytest

class Homepage:
    def __init__(self, driver: WebDriver):
        self.driver = driver

    def goto_signup(self):
        self.driver.find_element(By.CLASS_NAME, 'btn-started').click()
        return SignupPage(self.driver)

    def goto_login(self):
        self.driver.find_element(By.CLASS_NAME, 'btn-login').click()
        return LoginPage(self.driver)

@pytest.fixture(scope='function')
def homepage(driver, request):
    driver.get(request.session.address)
    return Homepage(driver)