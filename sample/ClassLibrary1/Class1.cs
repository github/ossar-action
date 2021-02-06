using System;
using System.Security.Cryptography;
using System.Text;

namespace ClassLibrary1
{
    public class Class1
    {
        public void M()
        {
            Console.WriteLine("Hello World!");

            Console.WriteLine("Console App");
            MD5 md5 = MD5.Create();

            string contents = "Super secure data.";
            byte[] contentBytes = UTF8Encoding.UTF8.GetBytes(contents);

            byte[] hash = md5.ComputeHash(contentBytes);
        }
    }
}