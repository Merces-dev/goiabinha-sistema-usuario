using System;

using System.Collections.Generic;
using System.Text;

namespace AppUsuarios.Models
{

    public class User
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public char Sexo { get; set; }
        public DateTime DataNascimento { get; set; }
    }
}
