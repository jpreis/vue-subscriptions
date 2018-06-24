import { shallowMount } from "@vue/test-utils";
import SubscriptionCard from "@/components/SubScriptionCard.vue";
import Subscription from "@/model/Subscription";

describe("SubscriptionCard.vue", () => {
  const subscription = new Subscription("Netflix", 9.99);
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallowMount(SubscriptionCard, {
      propsData: { subscription }
    });
  });

  it("has the expected HTML structure", () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it("triggers a 'toggle-active' event when clicked", () => {
    wrapper.trigger("click");
    expect(wrapper.emitted("toggle-active")).toBeTruthy();
  });
});
