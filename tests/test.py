import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager


class TestHomePage(unittest.TestCase):
    def setUp(self):
        
        self.driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
        self.driver.get("http://localhost:3000") 

    def tearDown(self):
        self.driver.quit()

    def test_home_page_title(self):
        """Vérifier que le titre de la page d'accueil est correct."""
        self.assertIn("Upstudy - Education & LMS HTML5 Template", self.driver.title)  

    def test_posts_display(self):
        """Vérifier que les posts sont affichés sur la page."""
        WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, ".single-course"))
        )
        posts = self.driver.find_elements(By.CSS_SELECTOR, ".single-course")
        self.assertGreater(len(posts), 0, "Aucun post n'est affiché sur la page.")

    def test_post_links_exist(self):
        """Vérifier que les liens vers les détails des posts existent."""
        WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, ".single-course"))
        )
        posts = self.driver.find_elements(By.CSS_SELECTOR, ".single-course")
        for post in posts:
            link = post.find_element(By.CSS_SELECTOR, "a") 
            self.assertTrue(link.is_displayed(), "Le lien vers le post n'est pas affiché.")
            self.assertTrue(link.is_enabled(), "Le lien vers le post n'est pas cliquable.")


if __name__ == "__main__":
    unittest.main()