from fixtures.homepage import Homepage
from fixtures.signup_login import SignupPage
from fixtures.common import *
import random
import pytest

EMAIL = 'testemail@gmail.com'
INVALID_PASSWORDS = ['a', '123']

@pytest.mark.skip()
def test_signup(homepage: Homepage, logger, request):
    global EMAIL
    signup_page = homepage.goto_signup()
    signup_page.verify()

    # Tạo tài khoản ngẫu nhiên
    request.session.username += str(random.randrange(1000000))
    EMAIL = EMAIL.replace('email', str(random.randrange(1000000)))
    signup_page.get_username_input().send_keys(request.session.username)
    signup_page.get_email_input().send_keys(EMAIL)
    signup_page.get_password_input().send_keys(request.session.password)
    signup_page.get_confirm_password_input().send_keys(request.session.password)
    logger.screenshot('filled.png')
    signup_page.verify_submit_success()
    logger.screenshot('success.png')

def test_duplicate(signup_page: SignupPage, logger, request):
    # Tạo tài khoản bị trùng username: phải báo lỗi
    signup_page.get_username_input().send_keys(request.session.username)
    signup_page.get_email_input().send_keys(EMAIL)
    signup_page.get_password_input().send_keys(request.session.password)
    signup_page.get_confirm_password_input().send_keys(request.session.password)
    logger.screenshot('duplicate.png')
    signup_page.get_submit_button().click()
    logger.screenshot('duplicate_submitted.png')
    assert signup_page.has_error_message()

def test_invalid_password(signup_page: SignupPage, logger, request):
    signup_page.verify()

    # Chọn password quá ngắn: phải báo lỗi
    signup_page.get_username_input().send_keys(request.session.username)
    signup_page.get_email_input().send_keys(EMAIL)
    for password in INVALID_PASSWORDS:
        clear_send_key(signup_page.get_password_input(), password)
        clear_send_key(signup_page.get_confirm_password_input(), password)
        logger.screenshot(f'{password}.png')
        signup_page.get_submit_button().click()
        logger.screenshot(f'{password}_submitted.png')
        assert signup_page.has_error_message()