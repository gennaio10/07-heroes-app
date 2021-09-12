import "@testing-library/jest-dom";
import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe("Pruebas de authReducer.js)", () => {
  test(" debe de retornar el estado por defecto", () => {
    const initialState = { logged: false };
    const state = authReducer(initialState, {});
    const { logged } = state;
    expect(logged).toBe(initialState.logged);
  });

  test(" debe de autenticar y colocar el name del usuario", () => {
    const defaultName = "Pororo";
    const action = {
      type: types.login,
      payload: { name: defaultName },
    };
    const initialState = { logged: false };
    const state = authReducer(initialState, action);
    const { name, logged } = state;
    expect(name).toBe(defaultName);
    expect(logged).toBe(true);
  });

  test(" debe de borrar el name del usuario y logged en false", () => {
    const action = {
      type: types.logout,
    };
    const initialState = { logged: true, name: "Pororo" };

    const state = authReducer(initialState, action);
    const { name, logged } = state;
    expect(name).toBe(undefined);
    expect(logged).toBe(false);
  });
});
