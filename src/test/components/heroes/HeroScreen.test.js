import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { HeroScreen } from "../../../components/heroes/HeroScreen";

describe("Pruebas de <HeroScreen />)", () => {
  const historyMock = {
    length: 10,
    push: jest.fn(),
    goBack: jest.fn(),
  };

  test("debe de mostrar el componente redict si no hay argumentos en el URL", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero"]}>
        <HeroScreen history={historyMock} />
      </MemoryRouter>
    );
    expect(wrapper.find("Redirect").exists()).toBe(true);
  });

  test("debe de mostrar un hero si el parametro exite y se encuentra", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/dc-black"]}>
        <Route path="/hero/:heroeId" component={HeroScreen} />
      </MemoryRouter>
    );
    expect(wrapper.find("button").text().trim()).toBe("Return");
  });

  test("debe de regresar a la pantalla anterior con push", () => {
    const historyMock = {
      length: 1,
      push: jest.fn(),
      goBack: jest.fn(),
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/dc-black"]}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    wrapper.find("button").prop("onClick")();

    expect(historyMock.goBack).not.toHaveBeenCalled();
    expect(historyMock.push).toHaveBeenCalledTimes(1);
    expect(historyMock.push).toHaveBeenCalledWith("/");
  });

  test("debe de regresar a la pantalla anterior con GOBACK", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/dc-black"]}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    wrapper.find("button").prop("onClick")();

    expect(historyMock.push).not.toHaveBeenCalled();
    expect(historyMock.goBack).toHaveBeenCalledTimes(1);
  });

  test("debe de llamar al redirect si el heroe no existe", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/dc-black-404"]}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    expect(wrapper.text()).toBe("");
  });

  test("debe de llamar al redirect si el heroe no existe", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/dc-black-404"]}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    expect(wrapper.text()).toBe("");
  });
});
