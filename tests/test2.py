import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

class TestRegisterPage(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
        self.driver.get("http://localhost:3000/register") 

    def tearDown(self):
        self.driver.quit()

    def test_register_page_loads(self):
        """Vérifier que la page de registre se charge correctement."""
        self.assertIn("Upstudy", self.driver.title, "La page de registre ne s'est pas chargée correctement.")

            
    def test_register_form_inputs(self):
            driver = self.driver

            self.assertEqual(driver.current_url, "http://localhost:3000/register") =

            email_field = WebDriverWait(driver, 60).until(
                EC.presence_of_element_located((By.ID, "email"))
            )

            username_field = driver.find_element(By.ID, "username")
            password_field = driver.find_element(By.ID, "password")
            user_type_user = driver.find_element(By.CSS_SELECTOR, "input[value='user']")
            user_type_admin = driver.find_element(By.CSS_SELECTOR, "input[value='Admin']")
            submit_button = driver.find_element(By.CSS_SELECTOR, ".btn")
            
            self.assertTrue(username_field.is_displayed())
            self.assertTrue(email_field.is_displayed()) 
            self.assertTrue(password_field.is_displayed())
            self.assertTrue(user_type_user.is_displayed())
            self.assertTrue(user_type_admin.is_displayed())
            self.assertTrue(submit_button.is_displayed())

        
if __name__ == "__main__":
    unittest.main()
