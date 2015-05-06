using InfoLibrar;
using LoginLibrar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace WebApplication1.Controllers
{
    public class AdminController : ApiController
    {
        // GET api/values
        public string Get()
        {
            return "You can write a student id,like 'api.xiyoumobile.com/User?id=*********&psw=**********'";
        }

        // GET api/values/5
        public List<selectInfo> Get(string id, string psw)
        {
            return Validate.getStudent(id, psw);
        }
        public string Get(string id,string psw,string studentId,int prossceId)
        {
            return Validate.fixStudent(id, psw, studentId, prossceId);
        }

        // POST api/values
     

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