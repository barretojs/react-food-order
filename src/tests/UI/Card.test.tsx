import React from "react";
import { render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import Card from "../../components/UI/Card";

describe("<Card />", () => {
  it("should render the card to the screen", () => {
    const { findByText } = render(<Card>some card content</Card>);

    expect(findByText("some card content")).toBeTruthy();
  });
});
