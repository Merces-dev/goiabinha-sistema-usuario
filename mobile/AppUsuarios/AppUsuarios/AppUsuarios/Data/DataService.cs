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

        public async Task AddUserAsync(User user)
        {
            try
            {
                string url = "http://192.168.0.14:5000/v1/usuarios/";
                var usuario = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");

                var response = await client.PostAsync(url, usuario);

                if (!response.IsSuccessStatusCode)
                {
                    throw new Exception("Erro ao adicionar usuário");

                }

            }
            catch (Exception ex)
            {
                Debug.WriteLine("\tERROR {0}", ex.Message);
                throw ex;
            }


        }
        public async Task UpdateUserAsync(User user)
        {
            try
            {
                string url = "http://192.168.0.14:5000/v1/usuarios/" + user.Id;
                var usuario = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");

                var response = await client.PutAsync(url, usuario);

                if (!response.IsSuccessStatusCode)
                {
                    throw new Exception("Erro ao atualizar usuário");

                }

            }
            catch (Exception ex)
            {
                Debug.WriteLine("\tERROR {0}", ex.Message);
                throw ex;
            }
        }
        public async Task DeleteUserAsync(Guid id)
        {
            try
            {
                string url = "http://192.168.0.14:5000/v1/usuarios/" + id;

                var response = await client.DeleteAsync(url);

                if (!response.IsSuccessStatusCode)
                {
                    throw new Exception("Erro ao excluir usuário");

                }

            }
            catch (Exception ex)
            {
                Debug.WriteLine("\tERROR {0}", ex.Message);
                throw ex;
            }
        }
    }
}
