using AppUsuarios.Data;
using AppUsuarios.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace AppUsuarios
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class AddUserPage : ContentPage
    {
        DataService dataService;

        public AddUserPage()
        {
            InitializeComponent();
            dataService = new DataService();

            //Troca a cor da barra de navegação.
            ((NavigationPage)Application.Current.MainPage).BarBackgroundColor = Color.FromHex("#535556");

        }

        /// <summary>
        /// Adiciona um novo usuário.
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        public async void buttonAdicionarUsuario (object sender, EventArgs e)
        {
            if (Validar())
            {
                try
                {
                    char valorSexo = char.Parse("?");

                    //Verifica qual o valor do Picker.
                    switch (_Sexo.SelectedIndex)
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
                        Nome = _Nome.Text,
                        DataNascimento = Convert.ToDateTime(_DataNascimento.Date),
                        Sexo = valorSexo
                    };
                    bool resposta = await DisplayAlert("Adicionar Usuário", "Deseja mesmo adicionar este usuário ?", "Sim", "Não");
                    if (resposta)
                    {
                        await dataService.AddUserAsync(novoUsuario);
                        LimparDados();
                        await Navigation.PopAsync();
                    }
                }
                catch (Exception ex)
                {

                    throw ex;
                }

            }
            else
            {
                if(_Sexo.SelectedIndex == null)
                {
                    await DisplayAlert("Alerta", "Sexo deve ter um valor definido.", "OK");
                }
                else
                {
                    await DisplayAlert("Alerta", "Nome deve ter 3 ou mais caracteres.", "OK");
                }

            }



        }

        /// <summary>
        /// Limpa os campos com valores nulos.
        /// </summary>
        private void LimparDados()
        {
            _Nome.Text = "";
            _DataNascimento.Date = DateTime.Now;
            _Sexo.SelectedItem = "";


        }

        /// <summary>
        /// Valida se os valores dos campos correspondem com os requisitos.
        /// </summary>
        /// <returns>Retorna se é válido ou não.</returns>
        private bool Validar()
        {
            if (_Nome.Text.Length < 3 || _Sexo.SelectedIndex == null)
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