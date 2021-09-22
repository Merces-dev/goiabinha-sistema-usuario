using System;
using System.ComponentModel.DataAnnotations;

namespace Usuarios.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }

        [Required(ErrorMessage ="O campo nome é obrigatório")]
        [MinLength(3,ErrorMessage = "O campo nome deve conter mais de 3 letras")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O campo Sexo é obrigatório")]
        public char Sexo { get; set; }

        [Required(ErrorMessage = "O campo Data de Nascimento é obrigatório")]
        public DateTime DataNascimento { get; set; }
    }
}
