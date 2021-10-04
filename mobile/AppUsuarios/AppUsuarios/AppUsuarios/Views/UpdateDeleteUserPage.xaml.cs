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

namespace AppUsuarios.Pages
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class UpdateDeleteUserPage : ContentPage
    {

        public UpdateDeleteUserPage(User user)
        {
            InitializeComponent();
            BindingContext = new UpdateDeleteUserPageModelView(user);

        }

    }
}