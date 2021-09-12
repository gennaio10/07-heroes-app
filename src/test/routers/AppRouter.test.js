import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { AuthContext } from "../../auth/AuthContext";
import { AppRouter } from "../../routers/AppRouter";

describe("Pruebas de <AppRouter />)", () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: { logged: false },
  };

  test("debe de mostrar el login si no esta autenticado", () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("button").text().trim()).toBe("Login");
  });

  test("debe de mostrar el componente de marvel si esta autenticado", () => {
    const contextValueScoped = {
      dispatch: jest.fn(),
      user: { logged: true, name: "Pororo" },
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValueScoped}>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper.find("nav").exists()).toBe(true);
  });
});
