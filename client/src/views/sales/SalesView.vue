<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :loading="isLoading"
      class="elevation-1 mt-4"
      :search="search"
      item-key="referenceCode"
      :items-per-page-options="[5, 10, 20]"
    >
      <template v-slot:[`item.isCredit`]="{ item }">
        <v-chip :color="!item.isCredit ? 'green' : 'red'" dark small label>
          {{ !item.isCredit ? "Yes" : "No" }}
        </v-chip>
      </template>
      <template v-slot:top>
        <v-row align="center" justify="space-between" class="pa-4">
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="search"
              filled
              rounded
              dense
              clearable
              hide-details
              placeholder="Search"
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </v-col>
          <!-- <v-col cols="auto">
            <v-btn
              color="#000033"
              dark
              class="mb-2"
              :to="{ name: 'AddSales' }"
              elevation="2"
              rounded
            >
              <v-icon left>mdi-plus</v-icon>
              New
            </v-btn>
          </v-col> -->
        </v-row>
      </template>

      <template v-slot:[`item.hasDelivery`]="{ item }">
        <v-chip
          :color="item.hasDelivery ? 'success' : 'error'"
          small
          label
          text-color="white"
        >
          {{ item.hasDelivery ? "Yes" : "No" }}
        </v-chip>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
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
        <v-btn color="#000033" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>

    <!-- Edit Dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card elevation="2" class="rounded-lg">
        <v-card-title class="headline">{{ formTitle }}</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="editedItem.name"
              label="Name"
              outlined
              :rules="[(v) => !!v || 'Name is required']"
            ></v-text-field>
            <v-text-field
              v-model="editedItem.company"
              label="Company"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="editedItem.email"
              label="Email"
              outlined
              :rules="[(v) => /.+@.+\..+/.test(v) || 'E-mail must be valid']"
            ></v-text-field>
            <v-text-field
              v-model="editedItem.contactNo"
              label="Contact No"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="editedItem.address"
              label="Address"
              outlined
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="#000033" @click="save" :disabled="!valid">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Dialog -->
    <!-- <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline">Delete Item</v-card-title>
        <v-card-text> Are you sure you want to delete this item? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="error" @click="deleteItemConfirm">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </v-container>
</template>

<script>
/*eslint-disable*/
import { mapActions } from "vuex";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Reference Code",
        align: "start",
        sortable: false,
        value: "referenceCode",
      },
      {
        text: "Payment Type",
        align: "start",
        sortable: false,
        value: "paymentType",
      },
      {
        text: "Sales Amount",
        align: "start",
        sortable: false,
        value: "salesTotal",
      },
      {
        text: "Total Orders",
        align: "start",
        sortable: false,
        value: "noOfItems",
      },
      {
        text: "Paid in Full",
        align: "start",
        sortable: false,
        value: "isCredit",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
    },
    defaultItem: {
      name: "",
    },
    itemId: null,
    actions: [{ title: "Edit" }, { title: "Delete" }],
    isLoading: false,
    search: "",
    valid: true,
    actions: [
      { title: "View", icon: "mdi-pencil" },
      // { title: "Delete", icon: "mdi-delete" },
    ],
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
  },

  methods: {
    ...mapActions({
      getItems: "sale/getItem",
      addItem: "sale/addItem",
      removeItem: "sale/deleteItem",
      updateItem: "sale/updateItem",
    }),

    async initialize() {
      const results = await this.getItems();
      this.desserts = results.result;
    },

    onViewItem(id) {
      this.$router.push({ name: "EditSales", params: { id: id } });
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
          this.$router.push({ name: "EditSales", params: { id: item._id } });
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

<style scoped>
/* Add any custom styles here */
</style>
