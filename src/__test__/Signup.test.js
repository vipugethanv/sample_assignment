import React from "react";
import {
  getByTestId,
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Signup from "../Signup.js";
import "@testing-library/jest-dom";
import * as router from 'react-router'

const navigate = jest.fn()
beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

// describe('Signup', () => {
//   it('should call handleSubmit with the correct values', () => {
//     const mockHandleSubmit = jest.fn();
//     const { getByLabelText, getByTestId } = render(
//       <Signup handleSubmit={mockHandleSubmit} />
//     );

//     const usernameField = getByLabelText('Username');
//     const passwordField = getByLabelText('Password');
//     const submitButton = getByTestId('submit_btn');

//     fireEvent.change(usernameField, { target: { value: 'admin@hello.world' } });
//     fireEvent.change(passwordField, { target: { value: 'circles111' } });
//     fireEvent.click(submitButton);

//     expect(mockHandleSubmit).toHaveBeenCalledWith({
//       username: 'admin@hello.world',
//       password: 'circles111',
//     });
//   });

  it('should render the Signup component correctly', () => {
    const { getByText, getByLabelText, getByTestId } = render(<Signup />);

    expect(getByText('Login to pick a Challenge')).toBeInTheDocument();
    expect(getByLabelText('Username')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByTestId('submit_btn')).toBeInTheDocument();
  });

  it("should render a disabled button", () => {
    const { getByTestId } = render(<Signup />, { wrapper: MemoryRouter });

    const btn = getByTestId("submit_btn");
    expect(btn).toHaveAttribute("disabled");
    expect(btn).toBeDisabled();
  });
});
