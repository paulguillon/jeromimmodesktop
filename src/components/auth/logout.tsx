
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router';

type Props = {
    updateToken: Function
}

const Logout: FunctionComponent<Props> = ({ updateToken }) => {
    const history = useHistory();

    updateToken("")
    window.localStorage.removeItem("token");

    history.push('/login');
    return null;
}
export default Logout;