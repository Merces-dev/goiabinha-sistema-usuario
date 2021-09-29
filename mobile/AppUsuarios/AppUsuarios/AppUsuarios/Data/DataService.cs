using AppUsuarios.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace AppUsuarios.Data
{
    public class DataService
    {
        HttpClient client = new HttpClient();

        public async Task<List<User>> GetUsersAsync()
        {
            try
            {
                string url = "http://192.168.0.14:5000/v1/usuarios/";
                var response = await client.GetStringAsync(url);
                Debug.WriteLine("response:>>" + response);
                var usuarios = JsonConvert.DeserializeObject<List<User>>(response);
                return usuarios;
            }
            catch (Exception ex)
            {
                Debug.WriteLine("\tERROR {0}", ex.Message);
                throw ex;            
            }
        } 
    }
}
