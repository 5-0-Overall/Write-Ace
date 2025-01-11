from selenium.webdriver import Remote as WebDriver
from selenium.webdriver.common.by import By
from fixtures.common import *
import pytest
import os
import random
import time

class ProblemsPage:
    def __init__(self, driver: WebDriver):
        self.driver = driver

    def verify(self):
        assert wait_elements(self.driver, By.CSS_SELECTOR, 'a.nav-link.active[href="/problems"]', 1), "not on Problems page"
    
    def get_random_exam(self):
        choice = random.choice(self.driver.find_elements(By.CSS_SELECTOR, "table.problems-table > tbody > tr"))
        scroll_to_element(self.driver, choice)
        elements = choice.find_elements(By.TAG_NAME, 'td')
        texts = [element.text for element in elements[:4]]
        return {'exam': texts[0], 'topic': texts[1], 'task': texts[2], 'description': texts[3], 'button': elements[4]}

class ExamBasePage:
    def __init__(self, driver: WebDriver):
        self.driver = driver

    def verify(self, topic, task, description):
        assert wait_elements(self.driver, By.CSS_SELECTOR, '.writing-card .card-header h3')
        assert self.driver.find_element(By.CSS_SELECTOR, '.writing-card .card-header h3').text == topic
        assert self.driver.find_element(By.CSS_SELECTOR, '.writing-card h4.task-title').text in task
        assert self.driver.find_element(By.CSS_SELECTOR, '.writing-card p.task-description').text == description

class WritingPage(ExamBasePage):
    def get_textarea(self):
        return self.driver.find_element(By.CSS_SELECTOR, 'textarea.text-editor')
    
    def get_submit_button(self):
        return self.driver.find_element(By.CSS_SELECTOR, 'button.writing-btn')

    def has_error_message(self):
        return wait_elements(self.driver, By.CSS_SELECTOR, '.error-message')
    
    def get_modal_message(self):
        return self.driver.find_element(By.CSS_SELECTOR, 'div[aria-modal="true"] h2').text

    def verify_submit_success(self):
        self.get_submit_button().click()
        self.driver.find_element(By.XPATH, '//button[contains(text(),"Yes")]').click()
        assert wait_any(self.driver, [
            (By.XPATH, '//h2[contains(text(),"Success")]'),
            (By.XPATH, '//h2[contains(text(),"Error")]')
        ]) == 0
        press_enter(self.driver)
        return ResultPage(self.driver)
    
    def verify(self, topic, task, description):
        # Kiểm tra đề bài có khớp không
        super().verify(topic, task, description)

        # Kiểm tra có ô làm bài và nút nộp bài không
        self.get_textarea()
        self.get_submit_button()

class ResultPage(ExamBasePage):
    def get_points(self):
        items = self.driver.find_elements(By.CSS_SELECTOR, '.detail-band .band-item')
        map = {}
        for item in items:
            map[item.find_element(By.CLASS_NAME, 'band-label').text] = float(item.find_element(By.CLASS_NAME, 'band-score').text)
        return map

    def verify(self, topic, task, description):
        # Kiểm tra đề bài có khớp không
        super().verify(topic, task, description)

        # Kiểm tra có đủ các thang điểm không
        points = self.get_points()
        assert 'Task Achievement' in points
        assert 'Coherence & Cohesion' in points
        assert 'Lexical Resource' in points
        assert 'Grammatical Range & Accuracy' in points
        assert 'Overall Band' in points

@pytest.fixture(scope='function')
def problems_page(logged_in, request):
    logged_in.get(os.path.join(request.session.address, 'problems'))
    return ProblemsPage(logged_in)