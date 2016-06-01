using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using Test_Selenium_Server.Models;

namespace Test_Selenium_Server.Controllers
{
    public class TestController: ApiController
    {
        public string getResult(string id)
        {
            Global.Driver();

            Global.Navigate("https://google.com.vn");

            return Global.ExecuteJS("document.title").ToString();
        }
    }
}