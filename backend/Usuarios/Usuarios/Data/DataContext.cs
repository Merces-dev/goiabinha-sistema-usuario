using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Usuarios.Models;

namespace Usuarios.Data
{
    public class DataContext:DbContext
    {
        public DbSet<User> Users { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuider)
        {
            optionsBuider.UseSqlServer(@"Data Source = .\SQLEXPRESS;" + "Initial Catalog=GerenciamentoUsuarios; Integrated Security = True");
        }
    }
}
