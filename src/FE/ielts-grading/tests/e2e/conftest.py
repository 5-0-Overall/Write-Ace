import pytest
from selenium import webdriver
from fixtures.homepage import homepage
from fixtures.signup_login import signup_page, login_page, logged_in, logged_out
from fixtures.dashboard_page import dashboard_page
from fixtures.problems_page import problems_page
import os

def pytest_addoption(parser):
    parser.addoption(
        "--address",
        action="store",
        metavar="URL",
        help="address for the tested website.",
    )
    parser.addoption(
        "--result-path",
        action="store",
        metavar="PATH",
        help="save the resulting screenshots to.",
    )
    parser.addoption(
        "--username",
        action="store",
        metavar="USERNAME",
        help="the username used to login.",
    )
    parser.addoption(
        "--password",
        action="store",
        metavar="PASSWORD",
        help="the password used to login.",
    )

@pytest.fixture(scope='session')
def driver(request):
    request.session.address = request.config.getoption('--address')
    request.session.username = request.config.getoption('--username')
    request.session.password = request.config.getoption('--password')
    request.session.logged_in = False
    driver = webdriver.Chrome()
    yield driver
    driver.quit()

@pytest.fixture(scope='session')
def logger(request, driver):
    class Logger:
        def __init__(self, path: str | None, driver: webdriver.Remote, request):
            self.path = path
            self.driver = driver
            self.request = request
        
        def screenshot(self, path):
            if self.path != None:
                self.driver.save_screenshot(os.path.join(self.path, os.environ.get('PYTEST_CURRENT_TEST').split(':')[-1].split(' ')[0] + '_' + path))
    
    request.session.result_path = request.config.getoption('--result-path', None)
    if not os.path.isdir(request.session.result_path):
        os.makedirs(request.session.result_path)
    return Logger(request.session.result_path, driver, request)

@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    rep = outcome.get_result()
    setattr(item, "rep_" + rep.when, rep)

@pytest.fixture(scope="function", autouse=True)
def test_failed_check(request, logger):
    yield
    if request.node.rep_setup.failed:
        pass
    elif request.node.rep_setup.passed:
        if request.node.rep_call.failed:
            logger.screenshot('error.png')
