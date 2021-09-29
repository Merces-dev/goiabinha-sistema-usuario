using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace AppUsuarios
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
        }

        /// <summary>
        /// Redireciona até a página de Adicionar Usuário
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private async void Botao_Pagina_Adicionar(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new AddUserPage());
        }

        /// <summary>
        /// Redireciona até a página de Visualizar Usuários
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private async void Botao_Pagina_Visualizar(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new VisualizeUsers());
        }
    }
}
