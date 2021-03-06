import { useState } from 'react';
import '../../assets/css/login.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FunctionComponent } from 'react';
import jwt_decode from "jwt-decode";
import UserService from '../../services/user-service';

type Props = {
    updateToken: Function
}

const Login: FunctionComponent<Props> = ({ updateToken }) => {

    const [user, setUser] = useState({});
    const history = useHistory();
    const [authorized, setAuthorized] = useState<number>(0);

    if (UserService.authorized() !== 0)
        history.push('/profile');

    const handleChange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        axios.post("https://jeromimmo.fr/api/v1/login", user)
            .then(data => {
                if (data.data.status === "success" && data.data.token_type === "bearer") {
                    const token: string = data.data.token;
                    const role: any = jwt_decode(token);

                    if (![1, 2, 3, 4].includes(role.idRoleUser)) {
                        setAuthorized(-1);
                        return;
                    }
                    setAuthorized(1);

                    localStorage.token = data.data.token;
                    updateToken(data.data.token);
                    history.push("/profile");
                }
                if (data.data.message === "Unauthorized") {
                    history.push("/login?status=Unauthorized");
                }
            })
            .catch(err => console.log(err))
    };

    return (
        <div className="m-auto w-25 container-form">
            <div className="w-100 d-flex flex-column justify-content-between ">
                <form action="" onChange={handleChange} onSubmit={handleSubmit}>
                    <h1>Se connecter</h1>
                    {authorized === -1 && (
                        <div role="alert" className="alert alert-danger">Mail ou mot de passe incorrecte</div>
                    )
                    }
                    <div className="inputForm">
                        <input type="email" name="emailUser" placeholder="E-mail" ></input>
                    </div>
                    <div>
                        <input type="password" name="passwordUser" placeholder="Mot de passe" />
                    </div>
                    <button type="submit" className="center buttonForm">Connexion</button>
                </form>
                <a href="/" className="mt-4 text-decoration-underline">Mot de passe oubli?? ?  </a>
            </div >
        </div >
    )
}

export default Login;


