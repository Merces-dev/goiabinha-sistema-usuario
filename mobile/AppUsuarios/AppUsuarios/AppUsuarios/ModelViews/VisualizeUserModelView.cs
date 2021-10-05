using AppUsuarios.Data;
using AppUsuarios.Models;
using AppUsuarios.Pages;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;

namespace AppUsuarios.ModelViews
{
    class VisualizeUserModelView
    {

        DataService dataService = new DataService();
        List<User> response;

        /**
         * Coleção que armazena os usuários.
         */
        ObservableCollection<User> listaUsuarios = new ObservableCollection<User>();
        public ObservableCollection<User> ListaUsuarios
        {
            get => listaUsuarios;
            set => listaUsuarios = value;
        }

        public ICommand AtualizarLista
        {
            get => new Command(async () =>
            {
                try
                {
                    response = await dataService.GetUsersAsync();

                    List<User> usuariosListToObservable = response.ToList();

                    ListaUsuarios.Clear();
                    usuariosListToObservable.ForEach(i => ListaUsuarios.Add(i));
                }


                catch (Exception)
                {

                    throw;
                }

            });
        }
        public ICommand AbrirPaginaAtualizarExcluir
        {
            get
            {
                return new Command<User>(async (User user) =>
               {
                   try
                   {
                       await App.Current.MainPage.Navigation.PushAsync(new UpdateDeleteUserPage(user));

                   }


                   catch (Exception)
                   {

                       throw;
                   }

               });
            }


        }
    }
}
