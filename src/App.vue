<template>
  <div id="app">
    <h1>My subscriptions</h1>

    <form @submit.prevent="addSubscription">
      <input class="subscription-input" type="text" placeholder="subscription (e.g. Netflix)" v-model="newSubscriptionName">
      <input class="subscription-input" type="text" placeholder="monthly costs (e.g. 9.99)" v-model="newSubscriptionCosts">

      <button type="submit">Add {{ newSubscriptionName }}</button>
    </form>

    <SubscriptionStats :subscriptions="subscriptions"></SubscriptionStats>

    <div class="subscription-cards">
      <SubscriptionCard v-for="subscription in subscriptions " :subscription="subscription" :key="subscription.id" @toggle-active="toggleActive(subscription)"></SubscriptionCard>
    </div>

  </div>
</template>

<script>
import Subscription from "@/model/Subscription";
import SubscriptionStats from "@/components/SubscriptionStats.vue";
import SubscriptionCard from "@/components/SubscriptionCard.vue";

export default {
  data: function() {
    return {
      newSubscriptionName: "",
      newSubscriptionCosts: "",
      subscriptions: []
    };
  },
  methods: {
    addSubscription() {
      let name = this.newSubscriptionName;
      let costs = parseFloat(this.newSubscriptionCosts);
      if (name && costs >= 0) {
        this.subscriptions.push(new Subscription(name, costs));
        this.newSubscriptionName = "";
        this.newSubscriptionCosts = "";
      }
    },
    toggleActive(subscription) {
      subscription.active = !subscription.active;
    }
  },
  components: {
    SubscriptionStats,
    SubscriptionCard
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Overpass:400,900");

:root {
  --vue-green: #56b889;
  --vue-gray: #445465;
  --vue-white: #f8f8f8;
  --font-family: "Overpass", sans-serif;
}

html,
body {
  margin: 0;
  padding: 0;
}

html {
  font-size: 1.25em;
}

body {
  background-color: var(--vue-white);
  font-family: var(--font-family);
  color: #333;
}

#app {
  max-width: 900px;
  margin: 0 auto;
  padding: 4em 1em;
}

.subscription-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 2.5rem;
  grid-auto-rows: 1fr;
  margin-top: 2rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.subscription-input {
  --border-color: var(--vue-gray);
  background-color: rgba(0, 0, 0, 0.025);
  border: none;
  font-size: 1rem;
  font-family: var(--font-family);
  border-bottom: 2px solid var(--border-color);
  margin-right: 1em;
  padding: 0.2em 0.4em;
  width: 300px;

  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }

  &:focus {
    outline: none;
    --border-color: var(--vue-green);
  }
}

button {
  --button-background: var(--vue-green);
  --button-border: transparent;
  --button-color: white;

  font-family: var(--font-family);
  font-size: 1rem;
  padding: 0.2em 1em;
  color: var(--button-color);
  background-color: var(--button-background);
  border-radius: 5px;
  border: 2px solid var(--button-border);
  transition: all 0.3s;
  box-shadow: 0 7px 14px rgba(0, 0, 0, 0.075), 0 5px 5px rgba(0, 0, 0, 0.06);

  &:hover,
  &:active {
    --button-background: white;
    --button-border: var(--vue-green);
    --button-color: var(--vue-green);
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
}

p {
  vertical-align: center;
}
</style>
