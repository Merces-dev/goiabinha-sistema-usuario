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
    class AddUserPageModelView 
    {
        DataService dataService = new DataService();

        public string Nome { get; set; }
        public int Sexo { get; set; } = -1;
        public DateTime DataNascimento { get; set; }
        public DateTime DataMinimo { get; set; } = DateTime.Now;

        /// <summary>
        /// Adiciona um novo usuário.
        /// </summary>
        public ICommand AdicionarUsuario
        {
            get => new Command(async () =>
            {
                if (Validar())
                {
                    try
                    {
                        char valorSexo = char.Parse("?");

                        //Verifica qual o valor do Picker.
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
                            Nome = Nome,
                            DataNascimento = Convert.ToDateTime(DataNascimento.Date),
                            Sexo = valorSexo
                        };
                        bool resposta = await Application.Current.MainPage.DisplayAlert("Adicionar Usuário", "Deseja mesmo adicionar este usuário ?", "Sim", "Não");
                        if (resposta)
                        {
                            await dataService.AddUserAsync(novoUsuario);
                            LimparDados();
                            await Application.Current.MainPage.Navigation.PopAsync();
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
        /// Limpa os campos com valores nulos.
        /// </summary>
        private void LimparDados()
        {
            Nome = "";
            DataNascimento = DateTime.Now;
            Sexo = -1;


        }

        /// <summary>
        /// Valida se os valores dos campos correspondem com os requisitos.
        /// </summary>
        /// <returns>Retorna se é válido ou não.</returns>
        private bool Validar()
        {
            if (Nome.Length < 3 || Sexo == -1 )
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
