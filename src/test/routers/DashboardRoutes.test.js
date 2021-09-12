import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { AuthContext } from "../../auth/AuthContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";
import { MemoryRouter } from "react-router-dom";

describe("Pruebas de <DashboardRoutes />)", () => {
  const defaultName = 'Pororo'

  const contextValue = {
    dispatch: jest.fn(),
    user: { logged: true, name: defaultName },
  };

  test("debe de mostrar correctamente", () => {
    const wrapper = mount(
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <DashboardRoutes />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('span').text().trim()).toBe(defaultName);
  });
});
