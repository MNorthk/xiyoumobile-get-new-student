using InfoLibrar;
using LoginLibrar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication1.Controllers
{
    public class UserController : ApiController
    {
        // GET api/values
        public string Get()
        {
            return "You can write a student id,like 'api.xiyoumobile.com/User?id=*********&psw=**********'";
        }

        // GET api/values/5
        public Info Get(string id,string psw)
        {
            Info student = Validate.GetInfo(id, psw);
            return student;
        }

        // POST api/values
        public Info Post(string id, string psw)
        {
            return Validate.GetInfo(id, psw);
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
