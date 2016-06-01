using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Remote;
using Test_Selenium_Server.Models;

namespace Test_Selenium_Server.Controllers
{
    public class TestController: ApiController
    {
        public string getResult(string id)
        {
            Global.Driver();
            Global.Navigate("http://www.phimmoi.net/phim/phu-thuy-3206/xem-phim.html");
            string Res =  Global.ExecuteJS("document.getElementsByClassName('jw-video')[0].getAttribute('src')").ToString();
            Global.Close();
            return Res;
        }

        [HttpPost]
        public string getLink([FromBody] string Address)
        {
            Global.Driver();
            Global.Navigate(Address);
            string Res = Global.ExecuteJS("document.getElementsByClassName('jw-video')[0].getAttribute('src')").ToString();
            Global.Close();
            return Res;
        }
    }
}