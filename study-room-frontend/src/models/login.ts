import {
  fetchCaptcha,
  login,
  authenticatedPrincipal,
  fetchTokenFromAccount,
  fetchUserAccounts,
  sendEmail,
  fetchUser,
  signUp,
} from "services/login";
import { setToken, clearToken } from "utils/token";
declare global {
  interface GlobalState {
    login: login;
  }
}
export interface login {
  hashKey: string;
  imageUrl: string;
  codeSecond: string;
}
export default <Model>{
  namespace: "login",

  state: {
    hashKey: null,
    imageUrl: null,
    codeSecond: undefined,
    student_name:undefined,
    student_id:undefined,
    email:undefined
  },

  effects: {
    *fetchUser(_,{call,put}){
      const {data}=yield call(fetchUser)
      
      yield put({
        type:'save',
        payload:data.info
      })
      
    },
    *signUp({ payload }, { call }) {
      const { data } = yield call(signUp, payload);
      return data;
    },
    *sendEmail({ payload }, { call, put }) {
      const { data } = yield call(sendEmail, payload);
      return data;
    },
    *login({ payload }, { call, put }) {
      const { data } = yield call(login, payload);
	  const {state,token}=data
	  if(state){
		  setToken(token)
	  }
	  return data
	  
    },

    *fetchTokenFromAccount({ payload }, { call }) {
      const { data } = yield call(fetchTokenFromAccount, payload);
      const { accessToken, refreshToken, token } = data;
      const shouldToken = accessToken || data;
      if (shouldToken) {
        setToken(shouldToken);
      } else {
        clearToken();
      }
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      } else {
        localStorage.removeItem("refreshToken");
      }
      return data;
    },

    *authenticatedPrincipal(_, { call, put }) {
      const { data } = yield call(authenticatedPrincipal);
      return data;
    },

    *fetchUserAccounts(_, { call }) {
      const { data } = yield call(fetchUserAccounts);
      return data;
    },

    *logout({ payload }) {
      yield localStorage.setItem("rollback-route", payload || "/");
      window.location = "/#/user/login";
    },

    *fetchCaptcha(_, { call, put }) {
      const {
        data: { hashKey },
      } = yield call(fetchCaptcha);
      yield put({
        type: "save",
        payload: {
          hashKey,
          // eslint-disable-next-line no-undef
          imageUrl: `${NOVA_ROOT}/bootes2/passport/captcha/${hashKey}`,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      
      return {
        ...state,
        ...payload,
      };
    },

    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
