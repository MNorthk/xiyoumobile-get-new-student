using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InfoLibrar
{
    public class Info
    {
        private string id;
        private string name;

        public string Name
        {
            get { return name; }
            set { name = value; }
        }
        private string sex;

        public string Sex
        {
            get { return sex; }
            set { sex = value; }
        }
        
       
        private string classid;

        public string Classid
        {
            get { return classid; }
            set { classid = value; }
        }

        public string Id
        {
            get { return id; }
            set { id = value; }
        }
    }
    public class selectInfo:Info
    {
        private string point;

        public string Point
        {
            get { return point; }
            set { point = value; }
        }
        private string message;

        public string Message
        {
            get { return message; }
            set { message = value; }
        }
        private string prossce;

        public string Prossce
        {
            get { return prossce; }
            set { prossce = value; }
        }
        private string phone;

        public string Phone
        {
            get { return phone; }
            set { phone = value; }
        }
       
    }
    public class selectT
    {
        private string name;

        public string Name
        {
            get { return name; }
            set { name = value; }
        }
        private string prossce;

        public string Prossce
        {
            get { return prossce; }
            set { prossce = value; }
        }
       
    }
}
