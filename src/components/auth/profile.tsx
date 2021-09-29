import '../../assets/css/login.css';

import { FunctionComponent, useEffect, useState } from 'react';
import User from '../../models/user/user';
import UserService from '../../services/user-service';
import jwt_decode from "jwt-decode";

const Profile: FunctionComponent = () => {

  const [updated, setUpdated] = useState<boolean>(false);

  const [state, setState] = useState<User>({
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

  const token: string = localStorage.token;
  const UserInfo: any = jwt_decode(token);

  useEffect(() => {
    if (!updated)
      UserService.getUser(token, UserInfo.idUser).then(data => setState(data))
    setUpdated(false);
  }, [UserInfo.idUser, token, updated]);

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value })
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    e.target.forEach((input: HTMLInputElement) => {
      setState({ ...state, [input.name]: input.value })
    });
    setUpdated(true);
    UserService.updateUser(token, UserInfo.idUser, state).then(resp => setState(resp.user));
  };

  return (
    <div className="m-auto w-75 container-form">
      <div className="w-100 d-flex flex-column justify-content-start ">
        <h1>Profil</h1>
        <form action="" onChange={handleChange} onSubmit={handleSubmit}>
          <h2>Mes informations</h2>
          <div className="w-25">
            <label>Nom
              <input type="text" name="lastnameUser" defaultValue={state.lastnameUser} />
            </label>
            <label>Prénom
              <input type="text" name="firstnameUser" defaultValue={state.firstnameUser} />
            </label>
            <label>Mail
              <input type="email" name="emailUser" defaultValue={state.emailUser} />
            </label>
            <button type="submit" className="center buttonForm">Modifier</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile;


