<template>
  <v-container>
    <ViewProductDialogVue ref="product" :items="selectedItems" />
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="isLoading"
      class="elevation-1 mt-4"
      :search="search"
      :items-per-page="10"
      multi-sort
      :footer-props="{
        'items-per-page-options': [10, 25, 50],
        showFirstLastPage: true,
      }"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-row align="center" no-gutters>
            <v-col cols="4">
              <v-text-field
                v-model="search"
                filled
                rounded
                dense
                hide-details
                placeholder="Search products..."
                prepend-inner-icon="mdi-magnify"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="8" class="d-flex justify-end">
              <v-btn
                color="primary"
                dark
                class="mr-2"
                :to="{ name: 'AddProduct' }"
              >
                <v-icon left>mdi-plus</v-icon>
                Add Product
              </v-btn>
              <!-- <v-btn color="success" @click="exportTable">
                <v-icon left>mdi-file-export</v-icon>
                Export
              </v-btn> -->
            </v-col>
          </v-row>
        </v-toolbar>
      </template>

      <template v-slot:[`item.image`]="{ item }">
        <v-hover v-slot="{ hover }">
          <v-img
            :src="
              item.type === 'Variants' ? item.variants[0].image : item.image
            "
            max-height="60"
            max-width="60"
            :class="{ 'on-hover': hover }"
            class="mx-auto"
          >
            <v-fade-transition>
              <v-overlay v-if="hover" absolute>
                <v-btn small @click="showFullImage(item)"> View </v-btn>
              </v-overlay>
            </v-fade-transition>
          </v-img>
        </v-hover>
      </template>

      <template v-slot:[`item.availableStocks`]="{ item }">
        <v-chip :color="getStockColor(item.availableStocks)" small label>
          {{ item.availableStocks }}
        </v-chip>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          x-small
          fab
          elevation="0"
          color="warning"
          class="mr-2"
          @click="
            $router.push({ name: 'EditProduct', params: { id: item._id } })
          "
        >
          <v-icon x-small>mdi-pencil</v-icon>
        </v-btn>

        <v-btn
          x-small
          fab
          elevation="0"
          color="error"
          @click="deleteItem(item)"
        >
          <v-icon x-small>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
/*eslint-disable*/
import { mapActions } from "vuex";
import ViewProductDialogVue from "@/components/products/ViewProductDialog.vue";

export default {
  components: {
    ViewProductDialogVue,
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Image",
        align: "start",
        sortable: false,
        value: "image",
      },
      {
        text: "Name",
        align: "start",
        value: "name",
      },
      {
        text: "Brand",
        align: "start",
        value: "brand.name",
      },
      {
        text: "Category",
        align: "start",
        value: "category.name",
      },
      {
        text: "In Stock",
        align: "start",
        value: "availableStocks",
      },
      {
        text: "Type",
        align: "start",
        value: "type",
      },
      { text: "Options", value: "actions", sortable: false },
    ],
    items: [],
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
    showFuck: false,
    selectedItems: {},
    actions: [
      // { title: "Product History" },
      { title: "Edit" },
      { title: "Delete" },
    ],
    search: "",
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
      getItems: "product/getItem",
      addItem: "product/addItem",
      removeItem: "product/deleteItem",
      updateItem: "product/updateItem",
    }),

    getStockColor(stock) {
      if (stock <= 0) return "error";
      if (stock < 10) return "warning";
      return "success";
    },
    exportTable() {
      // Export logic
    },
    showFullImage(item) {
      // Image preview logic
    },

    async initialize() {
      this.isLoading = true;
      const results = await this.getItems();
      console.log(results);
      this.items = results.result;
      this.isLoading = false;
    },

    onViewDialog(item) {
      this.$refs.product.showDialog(true, item);
      this.selectedItems = item;
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      console.log(item);
      this.editedIndex = this.items.indexOf(item);
      this.itemId = item._id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      await this.removeItem(this.itemId);
      this.items.splice(this.editedIndex, 1);
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
        Object.assign(this.items[this.editedIndex], this.editedItem);
        await this.updateItem(this.editedItem);
      } else {
        this.items.push(this.editedItem);
        await this.addItem(this.editedItem);
      }
      this.close();
    },

    handleAction(action, item) {
      switch (action) {
        case "View":
          this.onViewDialog(item);
          break;
        case "Edit":
          this.$router.push({ name: "EditProduct", params: { id: item._id } });
          break;
        case "Delete":
          this.deleteItem(item);
          break;
        default:
          break;
      }
    },

    testToggle() {
      console.log("testing toggle");
    },
  },
  watch: {
    items(val) {
      return val;
    },
  },
};
</script>

<style scoped>
.v-data-table ::v-deep .v-data-table__wrapper {
  overflow-x: auto;
}

.on-hover {
  opacity: 0.8;
}
</style>
