<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { LuzmoDashboard } from '@luzmo/vue-embed';

const DASHBOARD_IDS = {
  wallace: '9743e36d-7d9c-4703-bf4c-f347cb85169f',
  michael: '3c47cf45-fcb6-4920-a5a8-b79852519552',
  sales: 'e43545ae-353b-46d8-b96d-bc882e0aaf33',
};

const SALES_REPS = new Set(['dwight', 'jim', 'phyllis', 'stanley', 'andy']);

const NAMES = {
  wallace: 'David',
  michael: 'Michael',
  dwight: 'Dwight',
  jim: 'Jim',
  phyllis: 'Phyllis',
  stanley: 'Stanley',
  andy: 'Andy',
};

const route = useRoute();
const role = computed(() => route.query.role || 'wallace');
const name = computed(() => NAMES[role.value] || 'User');
const dashboardId = computed(() =>
  SALES_REPS.has(role.value)
    ? DASHBOARD_IDS.sales
    : DASHBOARD_IDS[role.value] || DASHBOARD_IDS.wallace
);

const embedConfig = ref(null);
const error = ref(null);

watch(
  role,
  (currentRole) => {
    embedConfig.value = null;
    error.value = null;

    fetch('/api/embed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: currentRole }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        embedConfig.value = data;
      })
      .catch((err) => {
        error.value = err.message;
      });
  },
  { immediate: true }
);
</script>

<template>
  <nav class="navbar">
    <h2>Here's your Dashboard, {{ name }}</h2>
    <router-link class="switch-profile" to="/">Switch Profile</router-link>
  </nav>

  <div class="embed-container">
    <div v-if="error" class="embed-loading">
      <p>Failed to load dashboard: {{ error }}</p>
    </div>

    <div v-else-if="!embedConfig" class="embed-loading">
      <p>Loading dashboard...</p>
    </div>

    <LuzmoDashboard
      v-else
      :appServer="embedConfig.appServer"
      :apiHost="embedConfig.apiHost"
      :authKey="embedConfig.authKey"
      :authToken="embedConfig.authToken"
      :dashboardId="dashboardId"
    />
  </div>
</template>
