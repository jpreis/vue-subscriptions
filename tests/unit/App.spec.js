import { shallowMount, mount } from "@vue/test-utils";
import App from "@/App.vue";
import Subscription from "@/model/Subscription";
import Vue from "vue";

describe("App.vue", () => {
  let wrapper;
  let data;

  beforeEach(() => {
    wrapper = shallowMount(App, {});
    data = wrapper.vm.$data;
  });

  it("has the expected HTML structure", () => {
    wrapper = mount(App, {
      stubs: {
        SubscriptionCard: "<p class='subscriptionCard'></p>"
      }
    });

    expect(wrapper.element).toMatchSnapshot();

    // add a subscription
    // ! directily adding the subscription in data will not trigger a re-render at the moment
    // * see: https://github.com/vuejs/vue-test-utils/issues/605
    wrapper.setData({
      newSubscriptionName: "Testsubscription",
      newSubscriptionCosts: "10.99"
    });
    wrapper.vm.addSubscription();

    expect(wrapper.element).toMatchSnapshot();
  });

  describe("adding subscriptions", () => {
    it("adds a new subscriptions", () => {
      wrapper.setData({
        newSubscriptionName: "Testsubscription",
        newSubscriptionCosts: "10.99"
      });
      wrapper.vm.addSubscription();
      expect(data.subscriptions.length).toBe(1);
    });

    it("does not add a new subscription if the user input is invalid", () => {
      // no subscription name entered
      wrapper.setData({
        newSubscriptionName: "",
        newSubscriptionCosts: "10.99"
      });

      wrapper.vm.addSubscription();
      expect(data.subscriptions.length).toBe(0);

      // invalid costs (negative)
      wrapper.setData({
        newSubscriptionName: "Testsubscription",
        newSubscriptionCosts: "-1"
      });

      wrapper.vm.addSubscription();
      expect(data.subscriptions.length).toBe(0);

      // invalid costs (not a number)
      wrapper.setData({
        newSubscriptionCosts: "foo"
      });

      wrapper.vm.addSubscription();
      expect(data.subscriptions.length).toBe(0);
    });
  });
});
