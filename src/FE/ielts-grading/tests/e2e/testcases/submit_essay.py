from fixtures.problems_page import ProblemsPage, WritingPage
from fixtures.common import *
import random
import pytest
import itertools

WORD = 'test'
TOO_SHORT = 10
WORD_COUNT = 350

def test_submit_essay(problems_page: ProblemsPage, logger, request):
    # Mở một bài tập bất kì
    problems_page.verify()
    exam = problems_page.get_random_exam()
    exam['button'].click()

    # Kiểm tra đề bài có trùng khớp không
    writing_page = WritingPage(problems_page.driver)
    writing_page.verify(exam['topic'], exam['task'], exam['description'])
    logger.screenshot('writing.png')

    # Nộp một bài làm quá ngắn: phải báo lỗi
    essay = ' '.join(itertools.repeat(WORD, random.randrange(TOO_SHORT)))
    writing_page.get_textarea().send_keys(essay)
    writing_page.get_submit_button().click()
    assert writing_page.has_error_message()
    logger.screenshot('too_short.png')

    # Nộp bài làm đúng độ dài: thành công
    essay = ' '.join(itertools.repeat(WORD, WORD_COUNT))
    clear_send_key(writing_page.get_textarea(), essay)
    result_page = writing_page.verify_submit_success()

    # Kiểm tra trang kết quả
    result_page.verify(exam['topic'], exam['task'], exam['description'])
    logger.screenshot('submitted.png')
