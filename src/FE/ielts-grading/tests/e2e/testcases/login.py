from fixtures.homepage import Homepage
from fixtures.signup_login import LoginPage
from fixtures.dashboard_page import DashboardPage
from fixtures.common import *
import random

EMAIL = 'testemail@gmail.com'
INVALID_PASSWORDS = ['a', '123']

def test_login(homepage: Homepage, logger, request):
    global EMAIL
    login_page = homepage.goto_login()
    login_page.verify()

    # Đăng nhập với username và password đúng
    login_page.get_username_input().send_keys(request.session.username)
    login_page.get_password_input().send_keys(request.session.password)
    logger.screenshot('login_filled.png')
    login_page.verify_submit_success()
    logger.screenshot('login_success.png')
    request.session.logged_in = True

def test_logout(dashboard_page: DashboardPage, logger, request):
    dashboard_page.click_sign_out_button()
    dashboard_page.driver.switch_to.alert.accept()
    login_page = LoginPage(dashboard_page.driver)
    login_page.verify()
    request.session.logged_in = False

def test_wrong_password(login_page: LoginPage, logger, request):
    login_page.verify()

    # Đăng nhập với username và password sai
    login_page.get_username_input().send_keys(request.session.username)
    login_page.get_password_input().send_keys('wrong password wrong password')
    login_page.get_submit_button().click()
    logger.screenshot('wrong_password_filled.png')
    assert login_page.has_error_message()
    logger.screenshot('wrong_password_filled.png')