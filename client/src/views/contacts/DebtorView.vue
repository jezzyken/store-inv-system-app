<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1 mt-n2"
      :loading="isLoading"
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
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="#000033"
                dark
                class="mb-2"
                small
                v-bind="attrs"
                v-on="on"
              >
                New Debtor
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
                        outlined
                        :rules="[v => !!v || 'Name is required']"
                        required
                        @input="validateForm"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.creditLimit"
                        label="Credit Limit"
                        type="number"
                        outlined
                        :rules="[v => !!v || 'Credit limit is required']"
                        required
                        @input="validateForm"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.address"
                        label="Address"
                        outlined
                        :rules="[v => !!v || 'Address is required']"
                        required
                        @input="validateForm"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.contact"
                        label="Contact"
                        outlined
                        :rules="contactRules"
                        required
                        placeholder="09123456789"
                        @input="validateContact"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn 
                  color="blue darken-1" 
                  text 
                  @click="save"
                  :disabled="!isFormValid"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">
                Are you sure you want to delete this item?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
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
              v-for="(action, i) in getAvailableActions(item)"
              :key="i"
              @click="handleAction(action.title, item)"
            >
              <v-list-item-title>{{ action.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DebtorPage",

  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    isLoading: false,
    isFormValid: false,
    contactRules: [
      v => !!v || 'Contact number is required',
      v => /^09\d{9}$/.test(v) || 'Contact number must start with 09 and have 11 digits'
    ],
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      {
        text: "Credit Limit",
        align: "start",
        sortable: false,
        value: "creditLimit",
      },
      {
        text: "Available Credit",
        align: "start",
        sortable: false,
        value: "availableCredit",
      },
      {
        text: "Balance",
        align: "start",
        sortable: false,
        value: "balance",
      },
      {
        text: "Address",
        align: "start",
        sortable: false,
        value: "address",
      },
      {
        text: "Contact",
        align: "start",
        sortable: false,
        value: "contact",
      },
      { text: "Options", value: "actions", sortable: false },
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      creditLimit: 0,
      availableCredit: 0,
      address: "",
      contact: "",
    },
    defaultItem: {
      name: "",
      creditLimit: 0,
      availableCredit: 0,
      address: "",
      contact: "",
    },
    itemId: null,
    actions: [
      { title: "View Profile" },
      { title: "Edit" },
      { title: "Delete" },
    ],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Debtor" : "Edit Debtor";
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
  },

  methods: {
    ...mapActions({
      getItems: "debtor/getDebtors",
      addItem: "debtor/addDebtor",
      removeItem: "debtor/deleteDebtor",
      updateItem: "debtor/updateDebtor",
    }),

    validateContact(value) {
      if (value) {
        this.editedItem.contact = value.replace(/[^0-9]/g, '');
      }
      this.validateForm();
    },

    validateForm() {
      this.isFormValid = 
        this.editedItem.name &&
        this.editedItem.creditLimit &&
        this.editedItem.address &&
        this.editedItem.contact &&
        /^09\d{9}$/.test(this.editedItem.contact);
    },

    async initialize() {
      this.isLoading = true;
      try {
        const response = await this.getItems();
        this.items = response.map((item) => ({
          ...item,
          balance: item.creditLimit - item.availableCredit,
        }));
      } catch (error) {
        console.error("Error fetching debtors:", error);
      } finally {
        this.isLoading = false;
      }
    },

    getAvailableActions(item) {
      const balance = item.creditLimit - item.availableCredit;
      return this.actions.filter((action) => {
        if (action.title === "Delete" && balance > 0) {
          return false;
        }
        return true;
      });
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.validateForm();
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.itemId = item._id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        await this.removeItem(this.itemId);
        this.items.splice(this.editedIndex, 1);
        this.closeDelete();
      } catch (error) {
        console.error("Error deleting debtor:", error);
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.isFormValid = false;
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
      if (!this.isFormValid) return;
      
      try {
        if (this.editedIndex > -1) {
          await this.updateItem(this.editedItem);
          Object.assign(this.items[this.editedIndex], this.editedItem);
        } else {
          const response = await this.addItem(this.editedItem);
          this.items.push(response);
        }
        this.close();
      } catch (error) {
        console.error("Error saving debtor:", error);
      }
    },

    handleAction(action, item) {
      switch (action) {
        case "View Profile":
          this.$router.push(`/debtors/${item._id}`);
          break;
        case "Edit":
          this.editItem(item);
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