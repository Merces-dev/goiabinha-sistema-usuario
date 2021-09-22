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
        public async Task<ActionResult<User>> PostUser(
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
        /// <summary>
        /// Listar um usuário pelo respectivo Id.
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id"></param>
        /// <returns>Retorna o usuário de acordo com o Id</returns>
        [HttpGet]
        [Route("usuarios/{id}")]
        public async Task<ActionResult<User>> GetUserById([FromServices] DataContext context, Guid id)
        {
            var usuario = await context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);
            return usuario;
        }

        /// <summary>
        /// Excluir um usuário.
        /// </summary>
        /// <param name="context"></param>
        /// <param name="id"></param>
        /// <returns>Os dados do usuário excluso.</returns>
        [HttpDelete]
        [Route("usuarios/{id}")]
        public async Task<ActionResult<User>> DeleteUser([FromServices] DataContext context, Guid id)
        {

            var usuario = await context.Users
             .AsNoTracking()
             .FirstOrDefaultAsync(x => x.Id == id);

            if (usuario != null)
            {
                context.Users.Remove(usuario);
                await context.SaveChangesAsync();
                return usuario;
            }
            return null;
        }
        /// <summary>
        /// Atualizar dados de um usuário.
        /// </summary>
        /// <param name="context"></param>
        /// <param name="model"></param>
        /// <param name="id"></param>
        /// <returns>Retorna o usuário com seus dados atualizados.</returns>
        [HttpPut]
        [Route("usuarios/{id}")]
        public async Task<ActionResult<User>> UpdateUser(
            [FromServices] DataContext context,
            [FromBody] User model, Guid id)
        {

            var usuario = await context.Users
             .AsNoTracking()
             .FirstOrDefaultAsync(x => x.Id == id);

            if (usuario != null)
            {
                if (id == model.Id)
                {
                    usuario.Nome = model.Nome;
                    usuario.Sexo = model.Sexo;
                    usuario.DataNascimento = model.DataNascimento;
                    context.Users.Update(usuario);
                    await context.SaveChangesAsync();
                    return usuario;
                }
                  return null;
   
            }
            return null;
        }
    }
  }   



    

