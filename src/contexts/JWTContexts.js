import { createContext, useEffect, useReducer } from 'react';
import axios, { axiosInstances } from '../utils/axios';
// import { isValidToken, setSession } from '../utils/jwt';
// import { getUserInfo, setUserInfo } from '../utils/utils';
import { useNavigate } from 'react-router';
import { API_ROOT } from 'utils/constants';
import { jwtDecode } from 'jwt-decode';

const Types = {
  Login: 'LOGIN',
  Logout: 'LOGOUT',
  Register: 'REGISTER',
  ChangeUser: 'CHANGE_USER'
};

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const JWTReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user
      };
    case 'LOGIN':
      setUserInfo(action.payload.user);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      };
    case 'CHANGE_USER':
      setUserInfo(action.payload.user);
      return {
        ...state,
        user: action.payload.user
      };
    default:
      return state;
  }
};

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        // const userRaw = getUserInfo();
        if (accessToken && isValidToken(accessToken) && userRaw) {
          setSession(accessToken);
          const user = JSON.parse(userRaw);
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              user
            }
          });
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const changeUser = async (user) => {
    setUserInfo(user);
    dispatch({
      type: Types.Login,
      payload: {
        user
      }
    });
  };

  const login = async (userName, userPassword) => {
    const response = await axiosInstances.login.post(`${API_ROOT}/Auth/SignInUser`, {
      userName,
      userPassword
    });
    console.log(response.data.token);
    const decodedToken = jwtDecode(response.data.data.token);
    navigate('/');
    //   const login = async (username, password) => {
    //     const response = await axios.post('/auth/login', {
    //       username,
    //       password
    //     });
    //     const { accessToken, id, name, role, status, brandId, storeId, brandPicUrl } = response.data;
    //     if (role === 'StoreStaff') {
    //       setSession(null);
    //       setUserInfo({});
    //       navigate('/auth/login', { replace: true });
    //       throw new Error('Bạn không có quyền đăng nhập vào hệ thống');
    //     }
    //     const user = {
    //       id: id,
    //       name: name,
    //       displayName: name,
    //       role: role,
    //       brandId: brandId,
    //       storeId: storeId,
    //       brandPicUrl: brandPicUrl
    //     };
    //     setSession(accessToken);
    //     setUserInfo(user);
    //     navigate('/', { replace: true });
    //     dispatch({
    //       type: Types.Login,
    //       payload: {
    //         user
    //       }
    //     });
  };

  const register = async (email, password, firstName, lastName) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: Types.Register,
      payload: {
        user
      }
    });
  };

  const logout = async () => {
    setSession(null);
    setUserInfo({});
    dispatch({ type: Types.Logout });
    navigate('/auth/login', { replace: true });
  };

  const resetPassword = (email) => console.log(email);

  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        resetPassword,
        updateProfile,
        changeUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
