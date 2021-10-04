using AppUsuarios.Data;
using AppUsuarios.Models;
using AppUsuarios.ModelViews;
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

        public AddUserPage()
        {
            InitializeComponent();
            BindingContext = new AddUserPageModelView();


            //Troca a cor da barra de navegação.
            ((NavigationPage)Application.Current.MainPage).BarBackgroundColor = Color.FromHex("#535556");

        }

       

    }
}