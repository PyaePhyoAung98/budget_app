<template>
  <v-container>
    <v-row class="justify-center mt-3">
      <h3>Create New Income</h3>
      <v-col cols="10">
        <v-text-field label="Amount" v-model="income.amount" />
        <v-autocomplete
          :items="$store.getters.getCategories"
          v-model="income.category"
          clearable
          label="Choose Category"
        ></v-autocomplete>

        <v-btn class="d-block mx-auto" @click="addIncome">
          <v-icon dark>mdi-plus</v-icon>
          Add
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="justify-center ">
      <v-col cols="11">
        <v-list subheader>
          <v-subheader>Recent chat</v-subheader>

          <v-list-item
            v-for="(income, index) in $store.getters.getIncomes"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title>{{
                Number(income.amount).toLocaleString()
              }}</v-list-item-title>
              <v-list-item-subtitle>{{ income.category }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-icon>
              <v-btn text @click="editIncome(index)"
                ><v-icon>mdi-pencil</v-icon></v-btn
              >
              <v-btn text @click="delIncome(index)"
                ><v-icon>mdi-delete</v-icon></v-btn
              >
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Edit Income</v-card-title>
        <v-card-text>
          <v-text-field v-model="edit_income.amount" label="Amount" />
          <v-autocomplete
            :items="$store.getters.getCategories"
            v-model="edit_income.category"
            clearable
            label="Choose Category"
          ></v-autocomplete>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false"
            >Cancel</v-btn
          >
          <v-btn color="green darken-1" text @click="updateIncome">Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  name: "Income",
  data: () => ({
    income: {
      amount: "",
      category: "",
    },
    dialog: false,
    edit_income: "",
    edit_index: "",
  }),
  methods: {
    addIncome() {
      this.$store.commit("addIncome", this.income);
      this.income = {
        amount: "",
        category: "",
      };
    },
    editIncome(index) {
      this.dialog = true;
      this.edit_income = this.$store.getters.getIncomes[index];
      this.edit_index = index;
    },
    delIncome(index) {
      if (confirm("Are you suer?")) {
        this.$store.commit("delIncome", index);
      }
    },
    updateIncome() {
      this.$store.commit("setIncome", {
        index: this.edit_index,
        income: this.edit_income,
      });
      this.dialog = false;
    },
  },
};
</script>
