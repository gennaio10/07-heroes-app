import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { MemoryRouter, Router } from "react-router-dom";
import { Navbar } from "../../../components/ui/Navbar";
import { AuthContext } from "../../../auth/AuthContext";
import { types } from "../../../types/types";

describe("Pruebas de <Navbar />)", () => {
  const defaultName = "Pororo";
  const contextValue = {
    dispatch: jest.fn(),
    user: { logged: true, name: defaultName },
  };

  const historyMock = {
    push: jest.fn(),
    location: {},
    listen: jest.fn(),
    createHref: jest.fn(),
    replace: jest.fn(),
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter>
        <Router history={historyMock}>
          <Navbar />
        </Router>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("span").text().trim()).toBe(defaultName);
  });

  test("debe de llamar logout y usar history", () => {
    wrapper.find("button").prop("onClick")();

    expect(contextValue.dispatch).toHaveBeenCalledTimes(1);
    expect(contextValue.dispatch).toHaveBeenCalledWith({ type: types.logout });

    expect(historyMock.replace).toHaveBeenCalledTimes(1);
    expect(historyMock.replace).toHaveBeenCalledWith("/login");
  });
});
