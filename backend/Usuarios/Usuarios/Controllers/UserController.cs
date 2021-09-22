using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Usuarios.Data;
using Usuarios.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Usuarios.Controllers
{
    [ApiController]
    [Route("v1")]
    public class UserController : Controller
    {
        /// <summary>
        /// Listar todos os usuários cadastrados.
        /// </summary>
        /// <param name="context"></param>
        /// <returns>Retorna os usuários cadastrados.</returns>
        [HttpGet]
        [Route("usuarios")]
        public async Task<ActionResult<List<User>>> Get([FromServices] DataContext context)
            {
                var usuarios = await context.Users.ToListAsync();
                return usuarios;
            }

        /// <summary>
        /// Cadastrar um usuário.
        /// </summary>
        /// <param name="context"></param>
        /// <param name="model">Corpo do usuário.</param>
        /// <returns>Retorna o corpo do usuário.</returns>
        [HttpPost]
        [Route("usuarios")]
        public async Task<ActionResult<User>> Post(
            [FromServices] DataContext context, 
            [FromBody] User model)
        {
            if (ModelState.IsValid)
            {
                context.Users.Add(model);
                await context.SaveChangesAsync();
                return model;
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

    }
}
