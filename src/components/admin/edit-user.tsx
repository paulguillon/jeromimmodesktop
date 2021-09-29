import '../../assets/css/login.css';

import { FunctionComponent, useEffect, useState } from 'react';
import User from '../../models/user/user';
import UserService from '../../services/user-service';
import Btn from '../btn';
import { RouteComponentProps } from 'react-router-dom';

type Params = { idUser: string };


const EditUser: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {

  const [user, setUser] = useState<User>({
    idUser: 0,
    lastnameUser: '',
    firstnameUser: '',
    emailUser: '',
    created_at: '',
    created_by: 0,
    updated_at: '',
    updated_by: 0,
    idRoleUser: 0,
    data: []
  });
  const [alert, setAlert] = useState({
    status: 'danger',
    message: ''
  });
  const [alertPassword, setAlertPassword] = useState({
    status: 'danger',
    message: ''
  });
  const [password, setPassword] = useState({
    passwordUser: '',
    passwordUser_confirmation: '',
  });

  const token: string = localStorage.token;

  useEffect(() => {
    UserService.getUser(token, +match.params.idUser).then((data) => setUser(data));
  }, [match.params.idUser, token]);

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    UserService.updateUser(token, user.idUser, user).then(resp => setAlert({ status: resp.status, message: resp.status ? "L'utilisateur a bien été modifié" : 'Une erreur est survenue, veuillez réessayer' }));
  }

  const changePassword = (e: any) => {
    e.preventDefault();

    setPassword({ ...password, [e.target.name]: e.target.value });
  }

  const submitPassword = (e: any) => {
    e.preventDefault();
    setAlertPassword({ status: 'danger', message: '' });

    //test si les mdp sont identiques
    if (password.passwordUser !== password.passwordUser_confirmation) {
      setAlertPassword({ status: 'danger', message: 'Les mots de passe doivent être les mêmes' });
      return;
    }

    //maj du mot de passe
    UserService.updateUser(token, user.idUser, password).then(resp => setAlertPassword({ status: resp.status, message: resp.status ? 'Le mot de passe a bien été modifié' : 'Une erreur est survenue, veuillez réessayer' }));
  }

  return (
    <div className="m-auto w-75 container-form">
      <div className="w-100 d-flex flex-column justify-content-start ">
        <Btn texte="Retour" go={-1} />
        <h1>Modifier utilisateur</h1>
        {alert.message &&
          <div role="alert" className={"alert alert-" + alert.status} onClick={() => setAlert({ ...alertPassword, message: '' })}>{alert.message}</div>
        }
        <form action="" onChange={handleChange} onSubmit={handleSubmit}>
          <input type="text" name="lastnameUser" placeholder="Nom" defaultValue={user.lastnameUser} />
          <input type="text" name="firstnameUser" placeholder="Prénom" defaultValue={user.firstnameUser} />
          <input type="email" name="emailUser" placeholder="E-mail" defaultValue={user.emailUser} />
          <select className="browser-default custom-select" name="idRoleUser">
            <option hidden>Choisissez un rôle</option>
            {user.idRoleUser === 1 ? (<option selected value="1">Admin</option>) : (<option value="1">Admin</option>)}
            {user.idRoleUser === 2 ? (<option selected value="2">Développeur</option>) : (<option value="2">Développeur</option>)}
            {user.idRoleUser === 3 ? (<option selected value="3">Secretariat</option>) : (<option value="3">Secretariat</option>)}
            {user.idRoleUser === 4 ? (<option selected value="4">Agent</option>) : (<option value="4">Agent</option>)}
            {user.idRoleUser === 5 ? (<option selected value="5">Client</option>) : (<option value="5">Client</option>)}
          </select>

          <button type="submit" className="center buttonForm">Modifier l'utilisateur</button>
        </form>
        <h1>Changer de mot de passe</h1>
        {alertPassword.message &&
          <div role="alert" className={"alert alert-" + alertPassword.status} onClick={() => setAlertPassword({ ...alertPassword, message: '' })}>{alertPassword.message}</div>
        }
        <form action="" onChange={changePassword} onSubmit={submitPassword}>
          <input type="password" name="passwordUser" placeholder="Mot de passe" />
          <input type="password" name="passwordUser_confirmation" placeholder="Confirmation du mot de passe" />

          <button type="submit" className="center buttonForm">Changer le mot de passe</button>
        </form>
      </div>
    </div>
  )
}

export default EditUser;
