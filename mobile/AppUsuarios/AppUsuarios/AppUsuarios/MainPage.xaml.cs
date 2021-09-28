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
        private async void Botao_Pagina_Adicionar(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new AddUserPage());
        }
    }
}
