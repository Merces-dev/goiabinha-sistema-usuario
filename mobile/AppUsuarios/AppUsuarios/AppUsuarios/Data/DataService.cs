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
        private string url = "http://192.168.0.15:5000/v1/usuarios/";


        /// <summary>
        /// Busca todos os usuários
        /// </summary>
        /// <returns>Os usuários cadastrados</returns>
        public async Task<List<User>> GetUsersAsync()
        {
            try
            {;
                var response = await client.GetStringAsync(url);
                Debug.WriteLine("response:>>" + response);
                var usuarios = JsonConvert.DeserializeObject<List<User>>(response);
                Debug.WriteLine("response:>>" + usuarios);

                return usuarios;
            }
            catch (Exception ex)
            {
                Debug.WriteLine("\tERROR {0}", ex.Message);
                throw ex;
            }
        }
        /// <summary>
        /// Busca um usuário
        /// </summary>
        /// <param name="id">Id do usuário</param>
        public async Task<User> GetUserByIdAsync(Guid id)
        {
            try
            {
                string urlId = url + id;

                var response = await client.GetStringAsync(urlId);
                Debug.WriteLine("response:>>" + response);

                var usuario = JsonConvert.DeserializeObject<User>(response);


                return usuario;

            }
            catch (Exception ex)
            {
                Debug.WriteLine("\tERROR {0}", ex.Message);
                throw ex;
            }
        }
        /// <summary>
        /// Adiciona um usuário
        /// </summary>
        /// <param name="user">Corpo do usuário</param>
        public async Task AddUserAsync(User user)
        {
            try
            {
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
        /// <summary>
        /// Atualiza um usuário
        /// </summary>
        /// <param name="id">Id do usuário</param>
        public async Task UpdateUserAsync(User user)
        {
            try
            {
                string urlId = url + user.Id;
                var usuario = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");

                var response = await client.PutAsync(urlId, usuario);

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
        /// <summary>
        /// Excluí um usuário
        /// </summary>
        /// <param name="id">Id do usuário</param>
        public async Task DeleteUserAsync(Guid id)
        {
            try
            {
                string urlId = url + id;

                var response = await client.DeleteAsync(urlId);

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
