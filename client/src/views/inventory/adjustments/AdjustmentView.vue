<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :loading="isLoading"
      class="elevation-1 mt-n2"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <div style="width: 400px">
            <v-text-field
              v-model="search"
              filled
              rounded
              dense
              hide-details
              placeholder="Search"
              append-icon="mdi-filter-variant"
            ></v-text-field>
          </div>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{}">
              <v-btn
                color="#000033"
                dark
                class="mb-2"
                :to="{ name: 'AddAjustment' }"
                small
              >
                new
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.company"
                        label="Company"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.contactNo"
                        label="Contact No"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.address"
                        label="Address"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-menu bottom left>
          <template v-slot:activator="{ attrs, on }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(action, i) in actions"
              :key="i"
              @click="handleAction(action.title, item)"
            >
              <v-list-item-title>{{ action.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-slot:no-data>
        <v-btn color="#000033" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
/*eslint-disable*/
import { mapActions } from "vuex";
import moment from "moment";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Date",
        align: "start",
        sortable: false,
        value: "date",
      },
      {
        text: "Reference No",
        align: "start",
        sortable: false,
        value: "referenceNo",
      },
      {
        text: "Reason",
        align: "start",
        sortable: false,
        value: "reason",
      },
      {
        text: "No of Items",
        align: "start",
        value: "noOfItems",
      },
      { text: "Options", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      company: "",
      email: "",
      contactNo: "",
      address: "",
    },
    defaultItem: {
      name: "",
      company: "",
      email: "",
      contactNo: "",
      address: "",
    },
    itemId: null,
    isLoading: false,
    search: "",
    actions: [{ title: "View" }, { title: "Delete" }],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
    console.log("initialized back");
  },

  methods: {
    ...mapActions({
      getItems: "adjustment/getItem",
      addItem: "adjustment/addItem",
      removeItem: "adjustment/deleteItem",
      updateItem: "adjustment/updateItem",
    }),

    async initialize() {
      this.isLoading = true;
      const results = await this.getItems();
      this.desserts = results.result.map((item) => ({
        ...item,
        date: moment(item.date).format("YYYY-MM-DD"),
      }));
      this.isLoading = false;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.itemId = item._id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      await this.removeItem(this.itemId);
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        await this.updateItem(this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
        await this.addItem(this.editedItem);
      }
      this.close();
    },

    handleAction(action, item) {
      switch (action) {
        case "View":
          this.$router.push({
            name: "EditAdjustment",
            params: { id: item._id },
          });
          break;
        case "Delete":
          this.deleteItem(item);
          break;
        default:
          break;
      }
    },
  },
};
</script>
