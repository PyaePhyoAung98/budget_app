<template>
  <v-container>
    <v-row class="justify-center mt-3">
      <h3>Create New Expense</h3>
      <v-col cols="10">
        <v-text-field label="Amount" v-model="expense.amount" />
        <v-autocomplete
          :items="$store.getters.getCategories"
          v-model="expense.category"
          clearable
          label="Choose Category"
        ></v-autocomplete>

        <v-btn class="d-block mx-auto" @click="addExpense">
          <v-icon dark>mdi-plus</v-icon>
          Add
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="justify-center ">
      <v-col cols="11">
        <v-list subheader>
          <v-subheader>Recent Expense</v-subheader>

          <v-list-item
            v-for="(expense, index) in $store.getters.getExpenses"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title>{{
                Number(expense.amount).toLocaleString()
              }}</v-list-item-title>
              <v-list-item-subtitle>{{
                expense.category
              }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-icon>
              <v-btn text @click="editExpense(index)"
                ><v-icon>mdi-pencil</v-icon></v-btn
              >
              <v-btn text @click="delExpense(index)"
                ><v-icon>mdi-delete</v-icon></v-btn
              >
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Edit Expense</v-card-title>
        <v-card-text>
          <v-text-field v-model="edit_expense.amount" label="Amount" />
          <v-autocomplete
            :items="$store.getters.getCategories"
            v-model="edit_expense.category"
            clearable
            label="Choose Category"
          ></v-autocomplete>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false"
            >Cancel</v-btn
          >
          <v-btn color="green darken-1" text @click="updateExpense">Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  name: "Expense",
  data: () => ({
    expense: {
      amount: "",
      category: "",
    },
    dialog: false,
    edit_expense: "",
    edit_index: "",
  }),
  methods: {
    addExpense() {
      this.$store.commit("addExpense", this.expense);
      this.expense = {
        amount: "",
        category: "",
      };
    },
    editExpense(index) {
      this.dialog = true;
      this.edit_expense = this.$store.getters.getExpenses[index];
      this.edit_index = index;
    },
    delExpense(index) {
      if (confirm("Are you suer?")) {
        this.$store.commit("delExpense", index);
      }
    },
    updateExpense() {
      this.$store.commit("setExpense", {
        index: this.edit_index,
        expense: this.edit_expense,
      });
      this.dialog = false;
    },
  },
};
</script>
