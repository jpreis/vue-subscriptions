<template>
  <p class="subscription-stats">
    <template v-if="subscriptionCount > 0">
      I currently have
      <strong>{{ activeSubscriptionCount }} active {{ subscriptionString }}</strong>. <br> That's
      <strong>{{ totalMonthlyCosts | dollars }} a month </strong> and
      <strong>{{ totalYearlyCosts | dollars }} a year</strong>. </template>
    <template v-else>
      No subscriptions yet...
    </template>
  </p>

</template>

<script>
import { dollars } from "@/filter/CurrencyFilter";

export default {
  props: {
    subscriptions: {
      required: true
    }
  },
  computed: {
    subscriptionCount() {
      return this.subscriptions.length;
    },
    activeSubscriptionCount() {
      return this.subscriptions.filter(subscription => subscription.active)
        .length;
    },
    totalMonthlyCosts() {
      return this.subscriptions
        .filter(subscription => subscription.active)
        .reduce((sum, subscription) => {
          return sum + subscription.costs;
        }, 0);
    },
    totalYearlyCosts() {
      return this.totalMonthlyCosts * 12;
    },
    subscriptionString() {
      return `subscription${this.activeSubscriptionCount !== 1 ? "s" : ""}`;
    }
  },
  filters: {
    dollars
  }
};
</script>

<style scoped>
.subscription-stats {
  margin-top: 2rem;
}
</style>