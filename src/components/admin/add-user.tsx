import '../../assets/css/login.css';

import { FunctionComponent, useEffect, useState } from 'react';
import UserService from '../../services/user-service';
import jwt_decode from "jwt-decode";
import Btn from '../btn';
import { useHistory } from 'react-router';

const AddUser: FunctionComponent = () => {
  const [user, setUser] = useState({
    firstnameUser: '',
    lastnameUser: '',
    emailUser: '',
    passwordUser: '',
    passwordUser_confirmation: '',
    idRoleUser: 4,
    created_by: 1,
    updated_by: 1,
  });
  const [alert, setAlert] = useState<String>();
  const history = useHistory();

  const token: string = localStorage.token;
  const UserInfo: any = jwt_decode(token);

  useEffect(() => {
  }, []);

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    //mdp égaux
    if (user.passwordUser !== user.passwordUser_confirmation) {
      setAlert('Les mots de passe doivent être identiques');
      return;
    }
    UserService.addUser(token, user).then((resp) => console.log(resp))
    history.push('/admin');
  }

  return (
    <div className="m-auto w-75 container-form">
      <div className="w-100 d-flex flex-column justify-content-start ">
        <Btn texte="Retour" go={-1} />
        <h1>Nouvel utilisateur</h1>
        {alert &&
          <div role="alert" className="alert alert-danger" onClick={() => setAlert('')}>{alert}</div>
        }
        <form action="" onChange={handleChange} onSubmit={handleSubmit}>
          <input type="text" name="lastnameUser" placeholder="Nom" />
          <input type="text" name="firstnameUser" placeholder="Prénom" />
          <input type="email" name="emailUser" placeholder="E-mail" />

          <select className="browser-default custom-select" name="idRoleUser">
            <option hidden>Choisissez un rôle</option>
            <option value="1">Admin</option>
            <option value="2">Développeur</option>
            <option value="3">Secretariat</option>
            <option value="4">Agent</option>
            <option value="5">Client</option>
          </select>
          
          <input type="password" name="passwordUser" placeholder="Mot de passe" />
          <input type="password" name="passwordUser_confirmation" placeholder="Confirmation du mot de passe" />

          <input type="hidden" name="created_by" defaultValue={UserInfo.idUser} />
          <input type="hidden" name="updated_by" defaultValue={UserInfo.idUser} />

          <button type="submit" className="center buttonForm">Ajouter</button>
        </form>
      </div>
    </div>
  )
}

export default AddUser;


