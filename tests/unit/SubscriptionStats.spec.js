import { shallowMount } from "@vue/test-utils";
import SubscriptionStats from "@/components/SubscriptionStats.vue";
import Subscription from "@/model/Subscription";
import Vue from "vue";

describe("SubscriptionStats.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SubscriptionStats, {
      propsData: {
        subscriptions: []
      }
    });
  });

  it("has the expected HTML structure", () => {
    expect(wrapper.element).toMatchSnapshot();

    wrapper.setProps({
      subscriptions: [
        new Subscription("Sub 1", 10),
        new Subscription("Sub 2", 20)
      ]
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
