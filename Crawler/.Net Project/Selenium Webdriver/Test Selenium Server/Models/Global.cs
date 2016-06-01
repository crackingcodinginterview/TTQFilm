using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;

namespace Test_Selenium_Server.Models
{
    public class Global
    {
        private static IWebDriver driver;

        public static IWebDriver Driver()
        {
            if (driver == null)
                driver = new FirefoxDriver();
            return driver;
        }

        public static Object ExecuteJS(String JS)
        {
            try
            {
                var Obj = ((IJavaScriptExecutor)driver).ExecuteScript("return " + JS);
                if (Obj == null)
                    return "null";
                return Obj;
            }
            catch (Exception e)
            {
                return e;
            }
        }

        public static void Navigate(String Url)
        {
            driver.Navigate().GoToUrl(Url);
        }
    }
}