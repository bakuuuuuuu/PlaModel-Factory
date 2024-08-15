import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
  cartItemCount: 0, // 장바구니 상품 수 초기값 추가
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
        cartItemCount: 0, // 로그아웃 시 장바구니 수 초기화
      };
    case "UPDATE_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case "SET_CART_ITEM_COUNT":
      return {
        ...state,
        cartItemCount: action.payload,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        cartItemCount: state.cartItemCount, // cartItemCount 추가
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
