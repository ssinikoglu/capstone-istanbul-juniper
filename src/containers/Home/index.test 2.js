import React from "react";
import renderer from "react-test-renderer";
import Home from ".";

it("Home renders correctly", () => {
  const tree = renderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});