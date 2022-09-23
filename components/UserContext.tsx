import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
interface MyComponentProps {
  children: ReactNode;
}
interface IUserAuth {
  email: string;
  password: string;
}
const AppContext = createContext<any | null>(null);
export function AppWrapper({ children }: MyComponentProps) {
  const [user, setUser] = useState<any>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const Data = {
    email: "mahbubulhasan179@gmail.com",
    password: "mhs181029",
  };
  useEffect(() => {
    /* const getData = async () => {
      const result = await axios.get("https://randomuser.me/api/");
      const resData = result.data;*/

    setUser(Data);
    //};
    // getData();
  }, []);

  return (
    <AppContext.Provider value={{ userInfo: { user, isValid, setIsValid } }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
