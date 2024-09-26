<template>
  <div>
    <v-container fluid class="fill-height">
      <v-row no-gutters class="fill-height">
        <v-col cols="7">
          <v-card class="ma-2 fill-height d-flex flex-column">
            <v-card-title>
              <v-text-field
                v-model="searchQuery"
                label="Enter product"
                append-icon="mdi-magnify"
                @click:append="filterProducts"
              ></v-text-field>
            </v-card-title>
            <v-card-text class="flex-grow-1 overflow-y-auto">
              <v-row>
                <v-col
                  v-for="product in filteredProducts"
                  :key="product.id"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                >
                  <v-card
                    @click="addToCart(product)"
                    :disabled="!product.inStock"
                  >
                    <v-img :src="product.image" class="mx-auto" contain height="200px" ></v-img>
                    <v-card-text>
                      <div>{{ product.name }}</div>
                      <div>{{ product.price.toFixed(2) }}</div>
                    </v-card-text>
                    <v-chip
                      v-if="!product.inStock"
                      color="red"
                      text-color="white"
                      small
                      class="ma-2"
                    >
                      Stock out
                    </v-chip>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="5">
          <v-card class="ma-2 fill-height d-flex flex-column">
            <v-card-title>Selected Products</v-card-title>
            <v-card-text
              v-if="cart.length > 0"
              class="flex-grow-1 overflow-y-auto"
            >
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th class="text-center">Quantity</th>
                      <th>Price</th>
                      <th>Sub-Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in cart" :key="item.id">
                      <td>{{ item.name }}</td>
                      <!-- <td>{{ item.quantity }}</td> -->
                      <td>
                        <div class="d-flex justify-center">
                          <v-btn dark color="primary" x-small fab>
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                          <div style="width: 75px" class="text-center">
                            <v-text-field
                              v-model="item.quantity"
                              class="text-center mx-2"
                              outlined
                              hide-details
                              dense
                            ></v-text-field>
                          </div>
                          <v-btn dark color="primary" x-small fab>
                            <v-icon>mdi-minus</v-icon>
                          </v-btn>
                        </div>
                      </td>
                      <td>{{ item.price }}</td>
                      <td>{{ (item.price * item.quantity).toFixed(2) }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
            <v-card-text v-else class="text-center">
              <v-icon size="50" color="grey lighten-1">mdi-cart-outline</v-icon>
              <p class="mt-2 grey--text">Cart is empty</p>
            </v-card-text>
            <v-card-text v-if="cart.length > 0">
              <div class="d-flex justify-space-between mt-2">
                <span class="text-h6">Total:</span>
                <span class="text-h6">{{ total }}</span>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                block
                @click="openPaymentDialog"
                :disabled="cart.length === 0"
              >
                $ Pay Now
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Payment Dialog -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Payment Details</v-card-title>
        <v-card-text>
          <div class="d-flex justify-space-between">
            <span>Total:</span>
            <span>{{ total }}</span>
          </div>
          <v-select
            v-model="paymentType"
            :items="paymentTypes"
            label="Payment Type"
            class="mt-3"
          ></v-select>
          <v-text-field
            v-model.number="amountPaid"
            label="Amount Paid"
            type="number"
            class="mt-3"
            @input="validateAmount"
          ></v-text-field>
          <div class="d-flex justify-space-between mt-3">
            <span>Change:</span>
            <span>{{ change }}</span>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn
            color="primary"
            @click="processPayment"
            :disabled="amountPaid < subTotal"
          >
            Confirm Payment
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      searchQuery: "",
      cart: [],
      products: [],
      filteredProducts: [],
      dialog: false,
      paymentType: null,
      amountPaid: 0,
      paymentTypes: ["Cash", "Credit Card", "Debit Card"],
    };
  },

  watch: {
    searchQuery: {
      handler: "filterProducts",
      immediate: true,
    },
  },
  computed: {
    subTotal() {
      return this.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    total() {
      return this.subTotal.toFixed(2);
    },
    change() {
      return Math.max(0, this.amountPaid - this.subTotal).toFixed(2);
    },
  },
  created() {
    this.fetch();
  },
  methods: {
    ...mapActions({
      getProductItems: "product/getItems",
    }),

    filterProducts() {
      if (!this.searchQuery) {
        this.filteredProducts = this.products;
      } else {
        const query = this.searchQuery.toLowerCase();
        this.filteredProducts = this.products.filter(
          (product) =>
            product.name.toLowerCase().includes(query) ||
            product.upc?.toLowerCase().includes(query)
        );
      }
    },
    addToCart(item) {
      const existingItem = this.cart.find(
        (stock) => stock.product === item._id || stock.variant === item._id
      );

      if (existingItem) {
        if (existingItem.quantity < existingItem.availableStocks) {
          existingItem.quantity++;
        } else {
          alert("Sorry, no more stocks available!");
        }
      } else {
        const data = {
          name: item.name,
          availableStocks: item.stocks,
          product: item.productId,
          price: item.price.toFixed(2),
        };

        if (item.type === "Variants") {
          data.variant = item._id;
          data.name = item.name;
          data.availableStocks = item.stocks;
        }

        this.cart.push({ ...data, quantity: 1 });
      }
    },
    openPaymentDialog() {
      this.dialog = true;
      this.amountPaid = 0;
      this.paymentType = null;
    },
    validateAmount() {
      if (this.amountPaid < 0) {
        this.amountPaid = 0;
      }
    },
    processPayment() {
      if (this.amountPaid >= this.subTotal) {
        alert(
          `Payment of ${this.amountPaid} confirmed using ${this.paymentType}`
        );
        this.dialog = false;
        this.cart = [];
      } else {
        alert("Insufficient amount paid!");
      }
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
                price: variant.price,
                inStock: variant.stocks ?? 0,
              };
            });
          }

          return {
            ...product,
            productId: product._id,
            stocks: product.stocks,
            inStock: product.stocks ?? 0,
          };
        })
        .flat();

      this.filteredProducts = this.products;
    },
  },
};
</script>
