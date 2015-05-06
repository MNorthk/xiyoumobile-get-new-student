using InfoLibrar;
using LoginLibrar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace WebApplication1.Controllers
{
    public class SetController : ApiController
    {
        // GET api/values
        public string Get()
        {
            return "You can't do this.";
        }

        // GET api/values/5
        public selectT Get(string id)
        {
            return Validate.selectPro(id);
        }


    
        public string Post([FromBody]selectInfo student)
        {
            
            return Validate.setInTable(student);
        
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