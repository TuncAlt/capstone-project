import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FooterNavBar from "./FooterNavBar";

describe("FooterNavBar", () => {
  test("renders the homepage link", () => {
    render(<FooterNavBar />);
    const homeLink = screen.getByLabelText("link to homepage");
    expect(homeLink).toHaveAttribute("href", "/");
  });

  test("renders the add device form link", () => {
    render(<FooterNavBar />);
    const addDeviceLink = screen.getByLabelText("link to add Device Form");
    expect(addDeviceLink).toHaveAttribute("href", "/addDeviceForm");
  });
});
