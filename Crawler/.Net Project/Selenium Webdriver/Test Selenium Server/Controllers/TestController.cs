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
            Global.Navigate("http://www.phimmoi.net/phim/ky-an-zootopia-3259/xem-phim.html");
            //string Res =  Global.ExecuteJS("document.getElementsByClassName('ip')[0].innerText").ToString();
            //string Res = Global.ExecuteJS("document.getElementsByTagName('body')[0].innerHTML").ToString();
            string ConfirmLink =
                Global.ExecuteJS("document.getElementsByClassName('redirect')[0].getElementsByTagName('a')[0].getAttribute('href')").ToString();

            ConfirmLink = "http://www.phimmoi.net/" + ConfirmLink;

            Global.Navigate(ConfirmLink);

            //string Res = Global.ExecuteJS("document.getElementsByClassName('jw-video')[0].getAttribute('src')").ToString();
            string Res = Global.ExecuteJS("document.getElementsByTagName('body')[0].innerHTML").ToString();

            Global.Close();
            return Res;
        }

        [HttpPost]
        public Link getLink([FromBody] string Address)
        {
            Global.Driver();
            Global.Navigate(Address);
            string Res = Global.ExecuteJS("document.getElementsByClassName('jw-video')[0].getAttribute('src')").ToString();
            Global.Close();
            return new Link(Res);
        }
    }
}