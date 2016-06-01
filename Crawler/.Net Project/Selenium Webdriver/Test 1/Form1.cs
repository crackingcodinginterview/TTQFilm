using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Firefox;

namespace Test_1
{
    public partial class Form1 : Form
    {
        IWebDriver driver = new FirefoxDriver();
        public Form1()
        {
            InitializeComponent();
            Navigate("http://www.phimmoi.net/phim/phu-thuy-3206/xem-phim.html");

            string FindJWVideoScript = "document.getElementsByClassName('jw-video').length";

            //Thread.Sleep(5000);

            string Result = ExecuteJS(FindJWVideoScript).ToString();

            Console.WriteLine(Result);

            while (Result != "1")
            {
                Thread.Sleep(100);
                Result = ExecuteJS(FindJWVideoScript).ToString();
                Log(Result);
            }

            Console.WriteLine("Done");

        }

        private void Navigate(String Url)
        {
            driver.Navigate().GoToUrl(Url);
        }

        private object ExecuteJS(String Script)
        {
            try
            {
                var Obj = ((IJavaScriptExecutor)driver).ExecuteScript("return " + Script);
                if (Obj == null)
                    return "null";
                return Obj;
            }
            catch (Exception e)
            {
                Log(e.Message);
                return null;
            }
        }

        private void btnExe_Click(object sender, EventArgs e)
        {
            rtbRes.Text = ExecuteJS(txtScript.Text).ToString();
        }

        private void Log(String Mess)
        {
            rtbRes.AppendText(Mess + "\r\n");
        }
    }
}
