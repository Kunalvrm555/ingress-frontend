import { createContext } from 'react';

const UserContext = createContext({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
});

export default UserContext;