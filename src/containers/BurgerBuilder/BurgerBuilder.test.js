import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
Enzyme.configure({ adapter: new Adapter() });
describe("<NavigationItems/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onSettingIngredients = {()=>{}} />);
  });
  it("should render <BuildControls/> when receiving ings ", () => {
    wrapper.setProps({ ingredients: {salad: 0} });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });


});
