import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { SearchScreen } from "../../../components/search/SearchScreen";
import { MemoryRouter, Route } from "react-router-dom";

describe("Pruebas de <SearchScreen />)", () => {
  test("debe de mostrarse correctamente con valores por defecto", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search"]}>
        <Route exact path="/search" component={SearchScreen} />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("button").text().trim()).toBe("Search...");
  });

  test("debe de mostrar batman y le input con el valor sel querystring", () => {
    const searchText = "batman";

    const wrapper = mount(
      <MemoryRouter initialEntries={[`/search?q=${searchText}`]}>
        <Route exact path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("input").prop("value")).toBe(searchText);
  });

  test("debe de mostrar la alerta de error si no se encuentra el hero", () => {
    const searchText = "batman-no-existe";

    const wrapper = mount(
      <MemoryRouter initialEntries={[`/search?q=${searchText}`]}>
        <Route exact path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("#divNoExiste").exists()).toBe(true);
    expect(wrapper.find(".alert-danger").text().trim()).toBe(
      `There is no a hero with ${searchText}`
    );
  });

  test("debe de llamar el push del histori", () => {
    const searchText = "batman";

    const historyMock = {
      push: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={[`/search?q=${searchText}`]}>
        <Route
          exact
          path="/search"
          component={() => <SearchScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    wrapper.find("input").simulate("change", {
      target: {
        value: searchText,
        name: "searchText",
      },
    });

    const formSubmit = wrapper.find("form").prop("onSubmit");
    formSubmit({ preventDefault() {} });

    expect(historyMock.push).toHaveBeenCalledTimes(1);
    expect(historyMock.push).toHaveBeenCalledWith(`?q=${searchText}`);
  });
});
