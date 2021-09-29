import '../../assets/css/login.css';

import { FunctionComponent, useEffect, useState } from 'react';
import User from '../../models/user/user';
import UserService from '../../services/user-service';
import Btn from '../../components/btn';
import Loader from '../../components/loader';
import { Link } from 'react-router-dom';

const Admin: FunctionComponent = () => {
  const [users, setUsers] = useState<Array<User>>();
  const [hasDeleted, setHasDeleted] = useState<boolean>(false);

  const token: string = localStorage.token;

  useEffect(() => {
    UserService.getAllUsers(token).then(users => setUsers(users));
    if (hasDeleted)
      setHasDeleted(false);
  }, [hasDeleted, token]);

  const userRow = (user: User) => {
    return (
      <tr key={user.idUser}>
        <td>{user.idUser}</td>
        <td>{user.lastnameUser}</td>
        <td>{user.firstnameUser}</td>
        <td>{user.emailUser}</td>
        <td><Link to={'admin/user/' + user.idUser}><i className="fas fa-edit"></i></Link></td>
        <td><i className="fas fa-trash-alt red-text" onClick={() => deleteUser(user.idUser)}></i></td>
      </tr>
    );
  }

  const deleteUser = (idUser: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?'))
      UserService.deleteUser(token, idUser).then(data => setHasDeleted(true));
  }

  return (
    <div className="m-auto w-50 container-form">
      <div className="w-100 d-flex flex-column justify-content-start ">
        <h1>Administration</h1>
        <Btn texte="Ajouter un utilisateur" push="/admin/user" />
        {users ? (
          users.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Mail</th>
                  <th>Modifier</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) =>
                  userRow(user)
                )}
              </tbody>
            </table>
          ) : (
            <span>Aucun utilisateurs</span>
          )
        ) : (
          <Loader />
        )
        }
      </div>
    </div>
  )
}

export default Admin;


