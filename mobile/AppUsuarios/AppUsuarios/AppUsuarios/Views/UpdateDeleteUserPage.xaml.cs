using AppUsuarios.Data;
using AppUsuarios.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace AppUsuarios.Pages
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class UpdateDeleteUserPage : ContentPage
    {
        DataService dataService;

        public UpdateDeleteUserPage(User user)
        {
            InitializeComponent();
            dataService = new DataService();

            InitializeSettings(user);
            BindingContext = user;

        }
        private void InitializeSettings(User user)
        {
            //Define os valores das entradas.
            _Nome.Text = user.Nome;
            _DataNascimento.Date = user.DataNascimento ;

            //Define o valor a ser selecionado no Picker.
            switch (user.Sexo.ToString())
            {
                case "M":
                    _Sexo.SelectedItem = _Sexo.Items[0];
                    break;
                case "F":
                    _Sexo.SelectedItem = _Sexo.Items[1];
                    break;
                case "O":
                    _Sexo.SelectedItem = _Sexo.Items[2];
                    break;
            }

        }
        /// <summary>
        /// Atualiza dados do usuário.
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        public async void BotaoAtualizar(object sender, EventArgs e)
        {
            if (Validar())
            {
                try
                {
                    char valorSexo = char.Parse("M");

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
                        Id = Guid.Parse(_Id.Text),
                        Nome = _Nome.Text,
                        DataNascimento = Convert.ToDateTime(_DataNascimento.Date),
                        Sexo = valorSexo
                    };
                    bool resposta = await DisplayAlert("Atualizar Usuário", "Deseja mesmo atualizar este usuário ?", "Sim", "Não");
                    if (resposta)
                    {
                        await dataService.UpdateUserAsync(novoUsuario);
                        await Navigation.PushAsync(new MainPage());


                    }
                }
                catch (Exception)
                {

                    throw;
                }

            }
            else
            {
                if (_Sexo.SelectedIndex == null)
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
        /// Excluí um usuário .
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        public async void BotaoExcluir(object sender, EventArgs e)
        {
            bool resposta = await DisplayAlert("Excluir Usuário", "Deseja mesmo excluir este usuário ?", "Sim", "Não");
            if (resposta)
            {
                await dataService.DeleteUserAsync(Guid.Parse(_Id.Text));
                await Navigation.PushAsync(new MainPage());


            }
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