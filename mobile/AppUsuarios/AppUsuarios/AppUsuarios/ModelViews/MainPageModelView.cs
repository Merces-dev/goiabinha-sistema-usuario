using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;

namespace AppUsuarios.ModelViews 
{
    class MainPageModelView
    {


        /// <summary>
        /// Redireciona até a página de Adicionar Usuário
        /// </summary>
        public ICommand RedirecionarAdicionarUsuario
        {
            get => new Command(async () =>
            {
                await Application.Current.MainPage.Navigation.PushAsync(new AddUserPage());

            });
        }
        /// <summary>
        /// Redireciona até a página de Adicionar Usuário
        /// </summary>
        public ICommand RedirecionarVisualizarUsuario
        {
            get => new Command(async () =>
            {
                await Application.Current.MainPage.Navigation.PushAsync(new VisualizeUsers());

            });
        }

    }
}
