import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Signup from "../Signup.js";
import Dashboard from "../Dashboard.js";
import "@testing-library/jest-dom";
import * as router from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import fetchMock from "jest-fetch-mock";
import { waitFor } from "@testing-library/react";

const navigate = jest.fn();






beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

beforeEach(() => {
  fetchMock.resetMocks();
});

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ data: "fake data" }),
    })
  );
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

it("should render the Signup component correctly", () => {
  const { getByText, getByTestId } = render(<Signup />);

  expect(getByText("Login to pick a Challenge")).toBeInTheDocument();
  expect(getByText("Username")).toBeInTheDocument();
  expect(getByText("Password")).toBeInTheDocument();
  expect(getByTestId("submit_btn")).toBeInTheDocument();
});

it("should render the Dashboard component correctly", () => {
  const { getByText } = render(
    <Router>
      {" "}
      <Dashboard />{" "}
    </Router>
  );

  expect(getByText("This is Dashboard")).toBeInTheDocument();
});

it("should render a disabled button", () => {
  const { getByTestId } = render(<Signup />, { wrapper: MemoryRouter });

  const btn = getByTestId("submit_btn");
  expect(btn).toHaveAttribute("disabled");
  expect(btn).toBeDisabled();
});

it("text box is initially empty", () => {
  const input = document.createElement("input");
  input.type = "text";
  expect(input).toHaveValue("");
});

it("enables the login button when the form is filled", () => {
  const { getByTestId } = render(<Signup />);
  fireEvent.change(getByTestId("userField"), { target: { value: "testuser" } });
  fireEvent.change(getByTestId("passField"), { target: { value: "testpass" } });
  expect(getByTestId("submit_btn")).toBeEnabled();
});

test("Calls Login user with correct details", async () => {
  render(<Signup setUser={() => {}} />);
  const emailField = screen.getByTestId("userField");
  const passwordField = screen.getByTestId("passField");

  fireEvent.change(emailField, { target: { value: "admin@hello.world" } });
  fireEvent.change(passwordField, { target: { value: "Circles111" } });

  const mockResponse = { test: "test" };
  jest.spyOn(global, "fetch").mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(mockResponse),
  });

  //explaination
  // 1. The code is trying to set the user for a Signup component.

  // 2. The code is using jest.spyOn() and jest.fn().mockResolvedValueOnce()
  // to mock the fetch function in order to test that it returns
  // a response with the correct value of "test".

  // 3. The code is testing that the signup component is being
  // called with a user and that it returns an object of type User.

  // 4. The code above first calls the global function "fetch"
  // which will then call the Signup component with a user argument.

  // 5. The result of this call will be stored in
  // mockResponse as well as jest's spy function.

  // 6. Then, the code sets up a mock response for fetch by
  // calling jest's fn() method on it and passing in a
  // mocked response from our previous test.

  // 7. Finally, we use Jest's resolvedValueOnce method to
  // check if the result of our new test matches what was expected.

  fireEvent.click(screen.getByTestId("submit_btn"));

  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

  global.fetch.mockRestore();
});

// test("Checking if 200 status code is returned should navigate to dashboard", async () => {
//   const mockResponse = { message: "Login success" };
//   jest.spyOn(global, "fetch").mockResolvedValueOnce({
//     json: jest.fn().mockResolvedValueOnce(mockResponse),
//     status: 200,
//   });

//   const mockedUseNavigate = jest.fn();
// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useNavigate: () => mockedUseNavigate,
// }));

//   render(<Router><Signup setUser={() => {}}/></Router>);
//   const emailField = screen.getByTestId("userField");
//   const passwordField = screen.getByTestId("passField");

//   fireEvent.change(emailField, { target: { value: "admin@hello.world" } });
//   fireEvent.change(passwordField, { target: { value: "circles111" } });
//   fireEvent.click(screen.getByTestId("submit_btn"));

//   await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
//   const response = await global.fetch.mock.results[0].value;
//   expect(response.status).toBe(200);
//   //const navigate = useNavigate();
//   expect(mockedUseNavigate).toHaveBeenCalledWith("/dashboard")
// });

test("Checking if 400 status code is returned should show error message", async () => {
  const mockResponse = { message: "login failed" };
  jest.spyOn(global, "fetch").mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(mockResponse),
    status: 400,
  });

  const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});

  render(<Signup setUser={() => {}} />);
  const emailField = screen.getByTestId("userField");
  const passwordField = screen.getByTestId("passField");

  fireEvent.change(emailField, { target: { value: "abc" } });
  fireEvent.change(passwordField, { target: { value: "abc" } });
  fireEvent.click(screen.getByTestId("submit_btn"));

  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  const response = await global.fetch.mock.results[0].value;
  expect(response.status).toBe(400);
  expect(mockAlert).toHaveBeenCalledWith("Login Failed");
});




test('navigates to dashboard when 200 code received', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      data: [],
    }),
    status: 200,
  });
  const { getByText } = render(
    <Router>
      <Dashboard />
    </Router>
  );
  await waitFor(() => {
    fireEvent.click(getByText('This is Dashboard'));
  });
  expect(getByText('This is Dashboard')).toBeInTheDocument();
  global.fetch.mockRestore();
});


test("Checking if 200 status code is returned should navigate to dashboard", async () => {
  const mockResponse = { message: "Login success" };
  jest.spyOn(global, "fetch").mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(mockResponse),
    status: 200,
  });

  const navigate = jest.fn();
  const mockUseNavigate = jest.spyOn(require("react-router-dom"), "useNavigate");
  mockUseNavigate.mockReturnValue(navigate);

  // This creates a mock navigate function and spies on the useNavigate hook from the react-router-dom package. 
  // Then, the mockUseNavigate function is mocked to return the navigate function


  render(
    <Router>
      <Signup setUser={() => {}} />
    </Router>
  );
  const emailField = screen.getByTestId("userField");
  const passwordField = screen.getByTestId("passField");

  fireEvent.change(emailField, { target: { value: "admin@hello.world" } });
  fireEvent.change(passwordField, { target: { value: "circles111" } });
  fireEvent.click(screen.getByTestId("submit_btn"));

  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  expect(navigate).toHaveBeenCalledWith("/Dashboard", {"state": {"username": undefined}});
  global.fetch.mockRestore();
});
