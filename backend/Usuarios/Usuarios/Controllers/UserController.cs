using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Usuarios.Data;
using Usuarios.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.Extensions.Logging;

namespace Usuarios.Controllers
{
    [ApiController]
    [Route("v1")]
    public class UserController : Controller
    {

        private readonly DataContext _context;
        private readonly ILogger<UserController> _logger;

        public UserController(DataContext contexto, ILogger<UserController> logger)
        {
            _context = contexto;
            _logger = logger;
        }


        /// <summary>
        /// Listar todos os usuários cadastrados.
        /// </summary>
        /// <response code="200">Os usuários foram retornados com sucesso.</response>
        /// <response code="204">Não há usuários cadastrados.</response>
        /// <response code="400">Usuários não encontrados.</response>
        /// <response code="500">Erro do servidor.</response>
        /// <returns>Retorna os usuários cadastrados.</returns>
        [HttpGet]
        [Route("usuarios")]
        public async Task<ActionResult<List<User>>> Get()
        {
            try
            {
                var usuarios = await _context.Users.ToListAsync();
                return Ok(usuarios);
            }
            catch (Exception ex)
            {

                _logger.LogError(ex, " - Erro ao buscar usuários.");
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }

        }

        /// <summary>
        /// Listar um usuário pelo respectivo Id.
        /// </summary>
        /// <param name="id">Id do usuário</param>
        /// <response code="200">O usuário foi encontrado com sucesso.</response>
        /// <response code="204">Id não cadastrado.</response>
        /// <response code="400">Usuário não encontrado.</response>
        /// <response code="500">Erro do servidor.</response>
        /// /// <returns>Retorna o usuário de acordo com o Id</returns>
        [HttpGet]
        [Route("usuarios/{id}")]
        public async Task<ActionResult<User>> GetUserById(Guid id)
        {
            try
            {
                var usuario = await _context.Users
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == id);
                if (usuario != null)
                {
                    return Ok(usuario);
                }
                _logger.LogWarning("Id de usuário não cadastrado:" + id);
                return StatusCode((int)HttpStatusCode.NoContent);

            }
            catch (Exception ex)
            {

                _logger.LogError(ex, " - Erro ao buscar usuário.");
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }

        }

        /// <summary>
        /// Cadastrar um usuário.
        /// </summary>
        /// <param name="model">Corpo do usuário.</param>
        /// <response code="200">Usuário cadastrado com sucesso.</response>
        /// <response code="400">Um valor ou mais não foram declarados corretamente.</response>
        /// <response code="500">Erro do servidor.</response>
        /// <returns>Retorna o corpo do usuário.</returns>
        [HttpPost]
        [Route("usuarios")]
        public async Task<ActionResult<User>> PostUser(
            [FromBody] User model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.Users.Add(model);
                    await _context.SaveChangesAsync();
                    return Ok(model);
                }
                else
                {
                    _logger.LogWarning("Modelo de JSON inválido: " + model);
                    return StatusCode((int)HttpStatusCode.BadRequest);
                }
            }
            catch (Exception ex)
            {

                _logger.LogError(ex, " - Erro ao adicionar usuário.");
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        /// <summary>
        /// Excluir um usuário.
        /// </summary>
        /// <param name="id">Id do usuário</param>
        /// <response code="200">O usuário foi excluído com sucesso.</response>
        /// <response code="204">Id não cadastrado.</response>
        /// <response code="400">Usuário não encontrado.</response>
        /// <response code="500">Erro do servidor.</response>
        /// <returns>Os dados do usuário excluso.</returns>
        [HttpDelete]
        [Route("usuarios/{id}")]
        public async Task<ActionResult<User>> DeleteUser(Guid id)
        {
            try
            {

                var usuario = await _context.Users
                 .AsNoTracking()
                 .FirstOrDefaultAsync(x => x.Id == id);

                if (usuario != null)
                {
                    _context.Users.Remove(usuario);
                    await _context.SaveChangesAsync();
                    return Ok(usuario);
                }
                _logger.LogWarning("Id de usuário não cadastrado:" + id);
                return StatusCode((int)HttpStatusCode.NoContent);
            }
            catch (Exception ex)
            {

                _logger.LogError(ex, " - Erro ao excluir usuário.");
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }

        }


        /// <summary>
        /// Atualizar dados de um usuário.
        /// </summary>
        /// <param name="model">Corpo do usuário.</param>
        /// <param name="id">Id do usuário</param>
        /// <response code="200">O dado do usuário foi modificado com sucesso.</response>
        /// <response code="204">Id não cadastrado.</response>
        /// <response code="400">O modelo para a modificação de dados do usuário é inválido.</response>
        /// <response code="500">Erro do servidor.</response>
        /// <returns>Retorna o usuário com seus dados atualizados.</returns>
        [HttpPut]
        [Route("usuarios/{id}")]
        public async Task<ActionResult<User>> UpdateUser(
            [FromBody] User model, Guid id)
        {
            try
            {
                var usuario = await _context.Users
                     .AsNoTracking()
                     .FirstOrDefaultAsync(x => x.Id == id);

                if (usuario != null)
                {
                    usuario.Nome = model.Nome;
                    usuario.Sexo = model.Sexo;
                    usuario.DataNascimento = model.DataNascimento;
                    _context.Users.Update(usuario);
                    await _context.SaveChangesAsync();
                    return Ok(usuario);

                }
                _logger.LogWarning("Id de usuário não cadastrado:" + id);
                return StatusCode((int)HttpStatusCode.NoContent);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, " - Erro interno ao atualizar dados do usuário.");

                return StatusCode((int)HttpStatusCode.InternalServerError);
            }

        }

        /// <summary>
        /// Atualizar dado específico do usuário
        /// </summary>
        /// <param name="patchUser">Modelo para a atualização de um dado do usuário</param>
        /// <param name="id">Id do usuário</param>
        /// <response code="200">O dado do usuário foi modificado com sucesso.</response>
        /// <response code="204">Um ou mais atributos do modelo para a modificação de dados do usuário são inválidos.</response>
        /// <response code="400">O modelo para a modificação de dados do usuário é inválido.</response>
        /// <response code="500">Erro do servidor.</response>
        /// <returns>Retorna o novo modelo do usuário</returns>
        [HttpPatch]
        [Route("usuarios/{id}")]
        public async Task<ActionResult<User>> UpdateUserOneDataAtTime(
                [FromBody] JsonPatchDocument<User> patchUser,
                Guid id)
        {
            try
            {
                var usuario = await _context.Users
                     .AsNoTracking()
                     .FirstOrDefaultAsync(x => x.Id == id);

                if (usuario != null)
                {
                    if (patchUser != null)
                    {
                        patchUser.ApplyTo(usuario, ModelState);
                        var isValid = TryValidateModel(usuario);
                        if (!isValid)
                        {
                            _logger.LogWarning("Modelo para a atualização de novo dado do usuário Inválido.");
                            return BadRequest(ModelState);
                        }
                        await _context.SaveChangesAsync();

                        return Ok(usuario);
                    }
                    _logger.LogWarning("O modelo para a atualização de novo dado do usuário tem valor nulo.");
                    return BadRequest();
                }
                _logger.LogWarning("Id de usuário não cadastrado:" + id);
                return StatusCode((int)HttpStatusCode.NoContent);
            }
            catch (Exception ex)
            {

                _logger.LogError(ex," - Erro interno ao atualizar dados do usuário.");

                return StatusCode((int)HttpStatusCode.InternalServerError);
            }

        }
    }
}





