using InfoLibrar;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DllLibrary
{
    public class dll
    {
        public int insert(selectInfo student)
        {
            string sql;
            SqlParameter[] parameter;
            if(String.IsNullOrWhiteSpace(student.Message))
            {
                sql = "insert into tbl_students(studentId,studentName,studentClass,studentSex,studentPoint,studentPhone) values(@id,@name,@class,@sex,@point,@phone)";
                parameter = new SqlParameter[]{
                    new SqlParameter("@id",student.Id),
                    new SqlParameter("@name",student.Name),
                    new SqlParameter("@class",student.Classid),
                    new SqlParameter("@sex",student.Sex),
                    new SqlParameter("@point",student.Point),
                    new SqlParameter("@phone",student.Phone)
             };
            }
            else
            {
                sql = "insert into tbl_students(studentId,studentName,studentClass,studentSex,studentPoint,studentMessage,studentPhone) values(@id,@name,@class,@sex,@point,@message,@phone)";
                parameter = new SqlParameter[]{
                    new SqlParameter("@id",student.Id),
                    new SqlParameter("@name",student.Name),
                    new SqlParameter("@class",student.Classid),
                    new SqlParameter("@sex",student.Sex),
                    new SqlParameter("@point",student.Point),
                    new SqlParameter("@message",student.Message),
                    new SqlParameter("@phone",student.Phone)
                    };
            }

            return SqlHelper.ExecuteNonQuery(sql, CommandType.Text, parameter);
            
         //SqlHelper.ExecuteNonQuery("insert")
        }
        public int insertTwo(Info student)
        {
            string sql="insert into tbl_theTwo(id,name,classid,sex) values(@id,@name,@class,@sex)";
            SqlParameter[] parameter = new SqlParameter[]{
                    new SqlParameter("@id",student.Id),
                    new SqlParameter("@name",student.Name),
                    new SqlParameter("@class",student.Classid),
                    new SqlParameter("@sex",student.Sex),
                  };
                
       

            return SqlHelper.ExecuteNonQuery(sql, CommandType.Text, parameter);
        }
        public Info getTwo(string id)
        {
            Info student=new Info();
            bool isOK = false;
            string sql = "select * from tbl_theTwo where id=@id";
            using (SqlDataReader reader = SqlHelper.ExecuteReader(sql, CommandType.Text, new SqlParameter("@id", id)))
            {
                while (reader.Read())
                {
                    isOK = true;
                    student.Id = reader.GetString(0);
                    student.Name = reader.GetString(1);
                    student.Sex = reader.GetString(2);
                    student.Classid = reader.GetString(3);
                   

                }
            }
            if (isOK)
                return student;
            else
                return null;
        }

        public bool isInTable(string id)
        {
            // select count(*) from tbl_students where studentId='1111111'

            string sql = " select count(*) from tbl_students where studentId=@id";
            int po=Convert.ToInt32(SqlHelper.ExecuteScalar(sql,CommandType.Text,new SqlParameter("@id",id)));
            if(po==0)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        public selectT getProssce(string id)
        {
            selectT t = new selectT();
            string sql = "select studentProssce from tbl_students where studentId=@id";
            t.Prossce= SqlHelper.ExecuteScalar(sql, CommandType.Text, new SqlParameter("@id", id)).ToString();
            sql = "select studentName from tbl_students where studentId=@id";
            t.Name = SqlHelper.ExecuteScalar(sql, CommandType.Text, new SqlParameter("@id", id)).ToString();
            return t;
        }

        public List<selectInfo> getStudent(string point)
        {
            List<selectInfo> list=new List<selectInfo>();
            string sql = "select * from tbl_students where studentPoint=@point";
           using(SqlDataReader reader= SqlHelper.ExecuteReader(sql, CommandType.Text, new SqlParameter("@point", point)))
           {
               while(reader.Read())
               {
                   list.Add(new selectInfo()
                   {
                       Id = reader.GetString(0),
                       Name = reader.GetString(1),
                       Classid = reader.GetString(2),
                       Sex = reader.GetString(3),
                       Point = reader.GetString(4),
                       Message = reader.GetString(5),
                       Prossce = reader.GetString(6),
                       Phone = reader.GetString(7)
                   }
                   );

               }
           }
           return list;
        }
         
        public string fixStudent(string id,string point,string prossce)
        {
            string sql = "update tbl_students set studentProssce=@prossce where studentId=@id and studentPoint=@point";
            SqlParameter[] parameter=new SqlParameter[]{
                new SqlParameter("@id",id),
                new SqlParameter("@point",point),
                new SqlParameter("@prossce",prossce)
            };
            if(SqlHelper.ExecuteNonQuery(sql,CommandType.Text,parameter)==0)
            {
                return "wrong";
            }
            else
            {
                return "ok";
            }
        }


    }

    public static class SqlHelper
    {
        public static int ExecuteNonQuery(string sqlText, CommandType type, params SqlParameter[] sqlPar)
        {

            string sql = System.Configuration.ConfigurationManager.ConnectionStrings["getNewStudent"].ConnectionString;
            SqlConnection con = new SqlConnection(sql);
            SqlCommand com = new SqlCommand(sqlText, con);
            com.CommandType = type;
            if (sqlPar.Count() > 0)
                com.Parameters.AddRange(sqlPar);
            try
            {
                con.Open();
                return com.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                con.Close();
                con.Dispose();
                com.Dispose();
            }
        }

       
        public static object ExecuteScalar(string sqlText, CommandType type, params SqlParameter[] sqlPar)
        {
            string sql = System.Configuration.ConfigurationManager.ConnectionStrings["getNewStudent"].ConnectionString;
            SqlConnection con = new SqlConnection(sql);
            SqlCommand com = new SqlCommand(sqlText, con);
            com.CommandType = type;
            if (sqlPar.Count() > 0)
                com.Parameters.AddRange(sqlPar);
            try
            {
                con.Open();
                return com.ExecuteScalar();
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                con.Close();
                con.Dispose();
                com.Dispose();
            }
        }

        public static SqlDataReader ExecuteReader(string sqlText, CommandType type, params SqlParameter[] sqlPar)
        {

            string sql = System.Configuration.ConfigurationManager.ConnectionStrings["getNewStudent"].ConnectionString;
            SqlConnection con = new SqlConnection(sql);
            SqlCommand com = new SqlCommand(sqlText, con);
            com.CommandType = type;
            if (sqlPar.Count() > 0)
                com.Parameters.AddRange(sqlPar);
            
            try
            {
                con.Open();
                return  com.ExecuteReader(CommandBehavior.CloseConnection);
                
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                com.Dispose();
            }
            
        }
    }
}
