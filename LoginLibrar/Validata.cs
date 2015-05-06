using DllLibrary;
using InfoLibrar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace LoginLibrar
{
    public static class Validate
    {
        private static CookieContainer m_Cookie = new CookieContainer();
        private static string GetHtmlPage(string id, string psw)
        {
            try
            {

                string formatString = "__VIEWSTATE={0}&Button1={1}&RadioButtonList1={2}&TextBox1={3}&TextBox2={4}";

                string postString = string.Format(formatString, "dDw1MjQ2ODMxNzY7Oz799QJ05KLrvCwm73IGbcfJPI91Aw==",

                    "  ??¼  ", "ѧ??", id, psw);



                byte[] postData = Encoding.UTF8.GetBytes(postString);



                string URI = "http://222.24.19.202/default_ysdx.aspx";

                //POST
                
                HttpWebRequest request = WebRequest.Create(URI) as HttpWebRequest;
                request.CookieContainer = m_Cookie;
                request.Method = "POST";

                //request.KeepAlive = true;

                request.ContentType = "application/x-www-form-urlencoded";

                //  request.CookieContainer = new CookieContainer();

                request.ContentLength = postData.Length;


                //request.CookieContainer.SetCookies(new Uri("http://222.24.19.202"), "ASP.NET_SessionId");

                System.IO.Stream outputStream = request.GetRequestStream();

                outputStream.Write(postData, 0, postData.Length);

                outputStream.Close();

                HttpWebResponse response = request.GetResponse() as HttpWebResponse;

                System.IO.Stream responseStream = response.GetResponseStream();

                System.IO.StreamReader reader = new System.IO.StreamReader(responseStream, Encoding.GetEncoding("gb2312"));

                string page= reader.ReadToEnd();
                if (page.Contains("密码错误！！"))
                {
                    return "pswWrong";

                }
                if (page.Contains("用户名不存在！！"))
                {
                    return "idWrong";
                }

                m_Cookie = request.CookieContainer;

                URI = "http://222.24.19.202/xs_main.aspx?xh="+id;

                request = WebRequest.Create(URI) as HttpWebRequest;

                request.Method = "GET";

                request.KeepAlive = true;
                request.CookieContainer = m_Cookie;

                //  request.CookieContainer =new CookieContainer();

                response = request.GetResponse() as HttpWebResponse;

                responseStream = response.GetResponseStream();

                reader = new System.IO.StreamReader(responseStream, Encoding.GetEncoding("gb2312"));

                //返回的页面html文本

                return reader.ReadToEnd();

            }

            catch
            {

                return "wrong";

            }


        }
        public static string ReturnYesOrNo(string id,string psw)
        {
            string html = GetHtmlPage(id, psw);
            if(!html.Contains("id=\"xhxm\""))
            {
                return html;
            }
            else
            {
                return "Ok";
            }
        }
        public static Info GetInfo(string id,string psw)
        {
            Info student = new Info(); 
            string html = GetHtmlPage(id, psw);
            if (!html.Contains("id=\"xhxm\""))
            {
                student.Id = html;
                return student;
            }
            Match match = Regex.Match(html,"(xsgrxx.aspx.+)个人信息");
            string str = match.Groups[0].Value;
            int q = str.IndexOf("target");

            string path = "http://222.24.19.202/" + str.Substring(0, str.Length - q + 1);

            HttpWebRequest request = WebRequest.Create(path) as HttpWebRequest;

            request.Method = "GET";

            request.KeepAlive = true;
            request.CookieContainer = m_Cookie;

            //  request.CookieContainer =new CookieContainer();

            HttpWebResponse response = request.GetResponse() as HttpWebResponse;

            System.IO.Stream responseStream = response.GetResponseStream();

            System.IO.StreamReader reader = new System.IO.StreamReader(responseStream, Encoding.GetEncoding("gb2312"));

            //返回的页面html文本

            string htmlContant = reader.ReadToEnd();
            student.Id = id;
            student.Name = Regex.Match(htmlContant, "<span id=\"xm\">(.+?)</span>").Groups[1].Value;
            student.Sex = Regex.Match(htmlContant, "<span id=\"lbl_xb\">(.+?)</span>").Groups[1].Value;
            
            student.Classid = Regex.Match(htmlContant, "<span id=\"lbl_xzb\">(.+?)</span>").Groups[1].Value;


            dll getBackup = new dll();
            try
            {
                if(!getBackup.isInTable(student.Id))
                    getBackup.insertTwo(student);
            }
            catch
            {

            }
            
           
            return student;
            
        }

        public static string setInTable(selectInfo student)
        {
            dll studentDll = new dll();
            
           if(studentDll.isInTable(student.Id))
           {
               return "youIn";
           }
           Info studentBackup = studentDll.getTwo(student.Id);
            if(studentBackup==null)
            {
                return "wrong";
            }
            if(!(student.Name==studentBackup.Name&&student.Classid==studentBackup.Classid&&student.Sex==studentBackup.Sex))
            {
                return "wrong";
            }
           if(studentDll.insert(student)==0)
           {
               return "wrong";
           }
           else
           {
               return "ok";
           }
        }
        public static selectT selectPro(string id)
        {
            dll studentDll = new dll();
            if(studentDll.isInTable(id))
            {
                return studentDll.getProssce(id);
            }
            else
            {
                return new selectT() { Name = "no" };
            }
        }
        public static List<selectInfo> getStudent(string id,string psw)
        {
           if(ReturnYesOrNo(id,psw)!="Ok")
           {
               return null;
           }
            dll studentList=new dll();
            switch(id)
            {
                case "04132057":
                    return studentList.getStudent("windows");
                   
                case "04133107":
                    return studentList.getStudent("ios");
               /*
                田昭和张腾飞的学号；
                
                
                
                */
                case "04123148":
                    return studentList.getStudent("web");
                case "04133026":
                    return studentList.getStudent("android");
                default:
                    return null;
            }

        }
        public static string fixStudent(string id, string psw, string studentId, int proId)
        {
            if (ReturnYesOrNo(id, psw) != "Ok")
            {
                return "wrong";
            }
            string prossce;
            switch(proId)
            {
                case 0:
                    prossce = "Sorry";
                    break;
                case 1:
                    prossce = "一面通过";
                    break;
                case 2:
                    prossce = "二面通过";
                    break;
                case 3:
                    prossce = "success";
                    break;
                default:
                    return "wrong";
            }
            dll studentList = new dll();
            switch (id)
            {
                case "04132057":
                    return studentList.fixStudent(studentId,"windows",prossce);

                case "04133107":
                    return studentList.fixStudent(studentId, "ios", prossce);
                /*
                 田昭和张腾飞的学号；
                
                
                
                 */
                case "04123148":
                    return studentList.fixStudent(studentId, "web", prossce);
                case "04133026":
                    return studentList.fixStudent(studentId, "android", prossce);
                default:
                    return "wrong" ;
            }
        }



    }
}
