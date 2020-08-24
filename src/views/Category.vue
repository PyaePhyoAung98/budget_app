<template>
  <v-container>
    <v-row class="justify-center mt-3">
      <h3>Create New Category</h3>
      <v-col cols="10">
        <v-text-field label="Category Name" v-model="category" />

        <v-btn class="d-block mx-auto" @click="addCategory">
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
            v-for="(category, index) in $store.getters.getCategories"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title>{{ category }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon>
              <v-btn text @click="editCategory(index)"
                ><v-icon>mdi-pencil</v-icon></v-btn
              >
              <v-btn text @click="delCategory(index)"
                ><v-icon>mdi-delete</v-icon></v-btn
              >
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Edit Category</v-card-title>
        <v-card-text>
          <v-text-field v-model="edit_cat" label="Category Name" />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false"
            >Cancel</v-btn
          >
          <v-btn color="green darken-1" text @click="updateCategory"
            >Edit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  name: "Category",
  data: () => ({
    category: "",
    dialog: false,
    edit_cat: "",
    edit_index: "",
  }),
  methods: {
    addCategory() {
      this.$store.commit("addCategory", this.category);
      this.category = "";
    },
    editCategory(index) {
      // alert(index);
      this.dialog = true;
      this.edit_cat = this.$store.getters.getCategories[index];
      //console.log(this.edit_cat);
      this.edit_index = index;
    },
    delCategory(index) {
      if (confirm("Are you sure? ")) {
        this.$store.commit("delCategory", index);
      }
    },
    updateCategory() {
      this.$store.commit("setCategory", {
        index: this.edit_index,
        category: this.edit_cat,
      });
      this.dialog = false;
    },
  },
};
</script>
