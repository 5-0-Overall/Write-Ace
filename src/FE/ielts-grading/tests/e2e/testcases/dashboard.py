from fixtures.dashboard_page import DashboardPage
from fixtures.common import *
import random
import pytest

def test_dashboard(dashboard_page: DashboardPage, logger, request):
    # Kiểm tra có đủ các loại số liệu không
    stats = dashboard_page.get_stats()
    assert "Your writing" in stats
    assert int(stats["Your writing"]) >= 0
    assert "Submissions" in stats
    assert int(stats["Submissions"]) >= 0
    assert "Total words" in stats
    assert int(stats["Total words"]) >= 0
    assert "Average band" in stats
    assert float(stats["Average band"]) >= 0
    assert "Highest band" in stats
    assert float(stats["Highest band"]) >= 0