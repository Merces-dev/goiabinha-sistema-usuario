using AppUsuarios.Data;
using AppUsuarios.Models;
using AppUsuarios.Pages;
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
    public partial class VisualizeUsers : ContentPage
    {
        DataService dataService;
        List<User> usuarios;
        public VisualizeUsers()
        {
            InitializeComponent();
            //Troca a cor da barra de navegação

            dataService = new DataService();
            ListarDados();
            ((NavigationPage)Application.Current.MainPage).BarBackgroundColor = Color.FromHex("#535556");

        }

        async void ListarDados()
        {
            usuarios = await dataService.GetUsersAsync();
            listaUsuarios.ItemsSource = usuarios.ToList();
        }

        public async void AbrirPaginaAtualizarExcluir (object sender, SelectedItemChangedEventArgs e)
        {
            if (e.SelectedItem != null)
            {
                var user = e.SelectedItem as User;
                listaUsuarios.SelectedItem = null;
                await Navigation.PushAsync(new UpdateDeleteUserPage(user));
            }

        }
    }
}