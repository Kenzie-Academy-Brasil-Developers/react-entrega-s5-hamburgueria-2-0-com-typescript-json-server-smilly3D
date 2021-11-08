import { createContext, ReactNode, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface AuthProviderProps {
  children: ReactNode;
}
interface AuthProviderData {
  signIn: (userData: userData) => void;
  signUp: (userData: userData) => void;
  Logout: () => void;
  authToken: string;
  userid: string;
}
interface userData {
  email: string;
  password: string;
  name?: string;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const history = useHistory();

  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem("@5a11:token") || ""
  );

  const [userid, setUserid] = useState(
    () => localStorage.getItem("@5a11:userId") || ""
  );

  const signIn = (userData: userData) => {
    axios
      .post("https://fakeapi-hambugeriasmilly.herokuapp.com/login", userData)
      .then((response) => {
        localStorage.setItem("@5a11:token", response.data.accessToken);
        localStorage.setItem("@5a11:userId", response.data.user.id);

        setAuthToken(response.data.accessToken);
        setUserid(response.data.user.id);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const signUp = (userData: userData) => {
    axios
      .post("https://fakeapi-hambugeriasmilly.herokuapp.com/signup", userData)
      .then((response) => {
        toast.success("Conta criada com sucesso");
        history.push("/login");
      })
      .catch((err) => toast.error("Conta cadastrada ou Dados Invalidos"));
  };

  const Logout = () => {
    localStorage.clear();

    setAuthToken("");
    setUserid("");

    history.push("/");
    toast.success("Deslogado com sucesso");
  };

  return (
    <AuthContext.Provider value={{ signUp, userid, authToken, Logout, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
