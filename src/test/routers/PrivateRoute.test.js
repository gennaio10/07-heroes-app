import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { PrivateRoute } from "../../routers/PrivateRoute";
import { MemoryRouter } from "react-router-dom";

describe("Pruebas de <PrivateRoute />)", () => {
  const htmlEsperado = "<span>Ok !</span>";
  const component = () => {
    return htmlEsperado;
  };

  const itemnameEsperado = "lastPath";
  const pathnameEsperado = "/marvel";
  const props = {
    location: {
      pathname: pathnameEsperado,
    },
  };

  Storage.prototype.setItem = jest.fn();

  test(" debe de mosttar el componente si esta autenticado y guardar el el localStorage", () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute isAuthenticated={true} component={component} {...props} />
      </MemoryRouter>
    );

    expect(wrapper.html()).toBe(htmlEsperado);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(itemnameEsperado,pathnameEsperado);
  });

  test("debe de bloquear el componente si no esta autenticado", () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={false}
          component={component}
          {...props}
        />
      </MemoryRouter>
    );

    expect(wrapper.html()).toBe("");
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(itemnameEsperado,pathnameEsperado);
  });
});
