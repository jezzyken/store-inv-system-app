<template>
  <v-container v-if="!isLoading">
    <v-sheet elevation="1" class="pa-5">
      <p class="text-button">Product Information</p>
      <v-divider class="mb-5" />
      <v-row>
        <v-col cols="12" md="6">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="items.date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="items.date"
                label="Date"
                prepend-inner-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                outlined
              ></v-text-field>
            </template>
            <v-date-picker v-model="items.date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="#000033" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="#000033" @click="$refs.menu.save(items.date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="6">
          <div class="d-flex">
            <v-autocomplete
              v-model="items.product"
              label="Products"
              :items="products"
              item-text="name"
              item-value="productCode"
              outlined
              @change="onSelectItem"
              return-object
            ></v-autocomplete>
          </div>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet elevation="1" class="pa-5 mt-5">
      <p class="text-button">Stocks</p>
      <v-divider class="mb-5" />
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Product</th>
              <th class="text-left">Stocks</th>
              <th class="text-center">Quantity</th>
              <th class="text-left" v-if="mode === 'add'">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stock, i) in items.stocks" :key="i">
              <td class="pa-5">
                <span>{{ stock.name }}</span>
              </td>
              <td class="pa-5">
                <span>{{ stock.availableStocks }}</span>
              </td>
              <td>
                <div class="d-flex justify-center">
                  <v-btn dark color="#000033" small fab v-if="mode === 'add'">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <div style="width: 75px">
                    <v-text-field
                      v-model.number="stock.quantity"
                      class="text-center mx-2"
                      outlined
                      hide-details
                      dense
                      type="number"
                      min="0"
                      @input="validateQuantity($event, stock)"
                      @keypress="numberOnly($event)"
                    ></v-text-field>
                  </div>
                  <v-btn dark color="#000033" small fab v-if="mode === 'add'">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </div>
              </td>
              <td v-if="mode === 'add'">
                <v-btn dark color="error" small @click="onDeleteItem(stock, i)">
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-sheet>

    <v-sheet elevation="1" class="pa-5 mt-5" v-if="items.stocks != 0">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="items.notes"
            label="Notes"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-select
            v-model="items.status"
            label="Status"
            :items="status"
            outlined
          ></v-select>
        </v-col>
      </v-row>
    </v-sheet>

    <v-row justify="end" class="ma-0 mt-6">
      <v-btn
        v-if="mode === 'add'"
        dark
        :color="buttonState.color"
        @click="buttonState.action"
        >{{ buttonState.label }}</v-btn
      >
      <div class="ma-1"></div>
      <v-btn v-if="mode === 'add'" @click="clearForm">Clear</v-btn>
      <v-btn v-else @click="$router.go(-1)">Back</v-btn>
    </v-row>
  </v-container>
</template>

<script>
/*eslint-disable */
import { mapActions } from "vuex";
import moment from "moment";

export default {
  props: {
    mode: String,
  },
  data() {
    return {
      items: {
        stocks: [],
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
      },
      isLoading: false,
      category: [],
      unit: [],
      prices: [],
      brand: [],
      products: [],
      suppliers: [],
      stocks: [],
      variants: [],
      colors: [],
      variantColorItems: [],
      variantId: null,
      productId: null,
      status: ["Pending", "Completed"],
      deleteItemId: [],
      menu: false,
    };
  },
  computed: {
    buttonState() {
      let state = {
        color: "warning",
        action: this.onUpdateItem,
        label: "update",
      };
      if (this.mode === "add") {
        state = {
          color: "#000033",
          action: this.onAddItem,
          label: "add",
        };
      }
      return state;
    },
  },

  async created() {
    this.fetch();
    if (this.$route?.params?.id) {
      this.initialize();
    }
  },

  methods: {
    ...mapActions({
      getProductItems: "product/getItems",
      addItem: "stock/addItem",
      getSupplierItems: "supplier/getItem",
      getStockById: "stock/getItemById",
      updateItem: "stock/updateItem",
      deleteItem: "stockItem/deleteItem",
    }),

    async initialize() {
      this.isLoading = true;
      const response = await this.getStockById(this.$route.params.id);

      const { status, notes, date, stockItems } = response.result[0];

      this.items.status = status;
      this.items.notes = notes;
      this.items.date = moment(date).format("YYYY-MM-DD");

      for (let item of stockItems) {
        const data = {
          name: item.product.name,
          quantity: item.quantity,
          availableStocks: item.product.stocks,
          product: item.product._id,
          _id: item.product._id,
          items_id: item.item_id,
        };

        if (item.product.type === "Variants") {
          const variantInfo = item.product.variants.find(
            (variant) => variant._id == item.variant
          );
          data.variant = variantInfo._id;
          data.name = variantInfo.name;
          data.availableStocks = variantInfo.stocks;
        }

        this.items.stocks.push(data);
      }
      this.isLoading = false;
    },

    async onSelectItem(item) {
      const existingItem = this.items.stocks.find(
        (stock) => stock.product === item._id || stock.variant === item._id
      );

      if (!existingItem) {
        const data = {
          name: item.name,
          availableStocks: item.stocks,
          product: item.productId,
        };

        if (item.type === "Variants") {
          data.variant = item._id;
          data.name = item.name;
          data.availableStocks = item.stocks;
        }

        this.items.stocks.push({ ...data, product: item.productId });
      }
    },

    async onAddItem() {
      const data = {
        date: this.items.date,
        notes: this.items.notes,
        status: this.items.status,
        stocks: this.items.stocks,
      };

      await this.addItem(data);
      this.$router.push("/stock");
    },

    async onUpdateItem() {
      const data = {
        id: this.$route?.params?.id,
        data: {
          date: this.items.date,
          notes: this.items.notes,
          status: this.items.status,
          stocks: this.items.stocks,
          deletedItems: this.deleteItemId,
        },
      };

      await this.updateItem(data);
      this.$router.push("/stock");
    },

    async onDeleteItem(stock = null, i) {
      this.items.stocks.splice(i, 1);
      if (stock.items_id) {
        if (!this.deleteItemId.includes(stock.items_id)) {
          this.deleteItemId.push(stock.items_id);
        }
      }
    },

    validateQuantity(value, stock) {
      let num = Number(value);
      if (num < 0 || isNaN(num)) {
        stock.quantity = 0;
      } else {
        stock.quantity = Math.floor(num);
      }
    },

    numberOnly(evt) {
      const keysAllowed = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "Backspace",
        "Delete",
        "Tab",
        "Enter",
      ];
      const keyPressed = evt.key;

      if (!keysAllowed.includes(keyPressed)) {
        evt.preventDefault();
      }
    },

    clearForm() {
      this.items = {
        stocks: [],
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
      };
      this.deleteItemId = [];
    },

    async fetch() {
      const products = await this.getProductItems();

      this.products = products.result
        .map((product) => {
          if (
            product.type === "Variants" &&
            product.variants &&
            product.variants.length > 0
          ) {
            return product.variants.map((variant) => {
              return {
                ...product,
                productId: product._id,
                name: variant.name,
                upc: variant.upc,
                stocks: variant.stocks,
                _id: variant._id,
              };
            });
          }

          return {
            ...product,
            productId: product._id,
            stocks: product.stocks,
          };
        })
        .flat();
    },
  },
};
</script>

<style scoped>
.v-text-field .v-input__control .v-input__slot {
  min-width: 30px !important;
  display: flex !important;
  align-items: center !important;
}
</style>
