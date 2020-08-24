<template>
  <v-bottom-navigation dark shift fixed :background-color="color">
    <v-btn height="100%" :to="{ name: 'dashboard' }" exact>
      <span>Dashboard</span>
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

    <v-btn height="100%" :to="{ name: 'expense' }">
      <span>Expense</span>
      <v-icon>mdi-ticket-percent-outline</v-icon>
    </v-btn>

    <v-btn height="100%" :to="{ name: 'income' }">
      <span>Income</span>
      <v-icon>mdi-download-box-outline</v-icon>
    </v-btn>

    <v-btn height="100%" :to="{ name: 'category' }">
      <span>Category</span>
      <v-icon>mdi-card-text</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
export default {
  name: "BottomNav",
  data: () => ({}),
  computed: {
    color() {
      switch (this.$route.name) {
        case "dashboard":
          return "blue-grey";
        case "expense":
          return "teal";
        case "category":
          return "brown";
        case "income":
          return "indigo";
        default:
          return "blue";
      }
    }
  }
};
</script>
