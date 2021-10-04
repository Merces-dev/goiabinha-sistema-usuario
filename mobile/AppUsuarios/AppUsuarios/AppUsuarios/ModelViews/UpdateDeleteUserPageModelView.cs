using AppUsuarios.Data;
using AppUsuarios.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;

namespace AppUsuarios.ModelViews
{
    class UpdateDeleteUserPageModelView 
    {
        DataService dataService = new DataService();

        public UpdateDeleteUserPageModelView(User user)
        {
            Id = user.Id;
            Nome = user.Nome;
            Id = user.Id;
            DataNascimento = user.DataNascimento;

            if (user.Sexo == char.Parse("M"))
            {
                Sexo = 0;
            }
            else if (user.Sexo == char.Parse("F"))
            {
                Sexo = 1;
            }
            else if (user.Sexo == char.Parse("O"))
            {
                Sexo = 2;
            }
        }

        public Guid Id { get; set; }
        public string Nome { get; set; }
        public int Sexo { get; set; } = -1;
        public DateTime DataNascimento { get; set; }
        public DateTime DataMinimo { get; set; } = DateTime.Now;



        /// <summary>
        /// Atualiza os dados de um usuário.
        /// </summary>
        public ICommand AtualizarUsuario
        {
            get => new Command(async () =>
            {
                if (Validar())
                {
                    try
                    {
                        char valorSexo = char.Parse("M");

                        switch (Sexo)
                        {
                            case 0:
                                valorSexo = char.Parse("M");
                                break;
                            case 1:
                                valorSexo = char.Parse("F");
                                break;
                            case 2:
                                valorSexo = char.Parse("O");
                                break;
                        };
                        User novoUsuario = new User
                        {
                            Id = Id,
                            Nome = Nome,
                            DataNascimento = Convert.ToDateTime(DataNascimento),
                            Sexo = valorSexo
                        };
                        bool resposta = await Application.Current.MainPage.DisplayAlert("Atualizar Usuário", "Deseja mesmo atualizar este usuário ?", "Sim", "Não");
                        if (resposta)
                        {
                            await dataService.UpdateUserAsync(novoUsuario);
                            await Application.Current.MainPage.Navigation.PushAsync(new MainPage());


                        }
                    }
                    catch (Exception)
                    {

                        throw;
                    }

                }
                else
                {
                    if (Sexo == -1)
                    {
                        await Application.Current.MainPage.DisplayAlert("Alerta", "Sexo deve ter um valor definido.", "OK");
                    }
                    else
                    {
                        await Application.Current.MainPage.DisplayAlert("Alerta", "Nome deve ter 3 ou mais caracteres.", "OK");
                    }
                }
            });
        }

        /// <summary>
        /// Excluí um usuário .
        /// </summary>
        public ICommand ExcluirUsuario
        {
            get => new Command(async () =>
            {
                bool resposta = await Application.Current.MainPage.DisplayAlert("Excluir Usuário", "Deseja mesmo excluir este usuário ?", "Sim", "Não");
                if (resposta)
                {
                    await dataService.DeleteUserAsync(Id);
                    await Application.Current.MainPage.Navigation.PushAsync(new MainPage());
                }

            });
        }


        /// <summary>
        /// Valida se os valores dos campos correspondem com os requisitos.
        /// </summary>
        /// <returns>Retorna se é válido ou não.</returns>
        private bool Validar()
        {
            if (Nome.Length < 3 || Sexo == -1)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}

