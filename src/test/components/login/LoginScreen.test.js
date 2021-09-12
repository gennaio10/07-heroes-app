import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { AuthContext } from "../../../auth/AuthContext";
import { types } from "../../../types/types";
import { LoginScreen } from "../../../components/login/LoginScreen";

describe("Pruebas de <LoginScreen />)", () => {
  const defaultName = "Pororo";

  const historyMock = {
    replace: jest.fn(),
  };

  const contextValue = {
    dispatch: jest.fn(),
    user: { name: defaultName },
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <LoginScreen history={historyMock} />
    </AuthContext.Provider>
  );

  test("debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("button").text().trim()).toBe("Login");
  });

  test("debe de realizar el dispatch y la navegacion", () => {
    const handleLogin = wrapper.find("button").prop("onClick");
    handleLogin();

    expect(contextValue.dispatch).toHaveBeenCalledTimes(1);
    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: { name: defaultName },
    });
    expect(historyMock.replace).toHaveBeenCalledTimes(1);
    expect(historyMock.replace).toHaveBeenCalledWith("/");

    const lastPathEsperado = '/dc';
    localStorage.setItem('lastPath', lastPathEsperado);
    handleLogin();

    expect(historyMock.replace).toHaveBeenCalledWith(lastPathEsperado);
  });
});
