using AppUsuarios.Data;
using AppUsuarios.Models;
using AppUsuarios.ModelViews;
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

        public VisualizeUsers()
        {
            InitializeComponent();
            BindingContext = new VisualizeUserModelView();
            //Troca a cor da barra de navegação
            ((NavigationPage)Application.Current.MainPage).BarBackgroundColor = Color.FromHex("#535556");

        }
        protected override void OnAppearing()
        {
            var vm = (VisualizeUserModelView)BindingContext;

            vm.AtualizarLista.Execute(null);
        }
        /// <summary>
        /// Coleta o id do usuario e o envia para a ViewModel.
        /// </summary>

        public  void AbrirPaginaAtualizarExcluirViewModel(object sender, SelectedItemChangedEventArgs e)
        {

            var user = (User)e.SelectedItem;
            var vm = (VisualizeUserModelView)BindingContext;
            vm.AbrirPaginaAtualizarExcluir.Execute(user);

        }
    }
}