<template>
  <div class="main-container">
    <v-row no-gutters class="fill-height">
      <!-- Products Section -->
      <v-col cols="7">
        <v-card class="ma-2 fill-height d-flex flex-column">
          <!-- Search Header -->
          <v-card-title class="py-2">
            <v-text-field
              v-model="searchQuery"
              label="Search products..."
              prepend-inner-icon="mdi-magnify"
              clearable
              dense
              outlined
              hide-details
              @click:clear="clearSearch"
            ></v-text-field>
          </v-card-title>

          <!-- Categories -->
          <v-chip-group
            v-model="selectedCategory"
            active-class="primary--text"
            class="px-4"
            mandatory
          >
            <v-chip
              v-for="category in categories"
              :key="category"
              filter
              outlined
            >
              {{ category }}
            </v-chip>
          </v-chip-group>

          <!-- Products Grid -->
          <v-card-text
            class="flex-grow-1 overflow-y-auto"
            style="max-height: calc(75vh - 10px)"
          >
            <v-row>
              <v-col
                v-for="product in filteredProducts"
                :key="product.id"
                cols="12"
                sm="6"
                md="4"
                lg="3"
              >
                <v-hover v-slot="{ hover }">
                  <v-card
                    class="product-card"
                    @click="addToCart(product)"
                    :disabled="!product.inStock"
                    :elevation="hover ? 8 : 2"
                    :class="{ 'on-hover': hover }"
                  >
                    <v-img
                      :src="product.image"
                      class="mx-auto"
                      contain
                      height="200px"
                      :class="{ greyscale: !product.inStock }"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-2"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>

                    <v-card-text class="pb-0">
                      <div
                        class="text-subtitle-1 font-weight-medium text-truncate"
                      >
                        {{ product.name }}
                      </div>
                      <div class="d-flex justify-space-between align-center">
                        <span class="text-h6 primary--text"
                          >₱{{ product.price.toFixed(2) }}</span
                        >
                        <span class="caption grey--text"
                          >Stock: {{ product.inStock }}</span
                        >
                      </div>
                    </v-card-text>

                    <v-chip
                      v-if="!product.inStock"
                      color="red"
                      text-color="white"
                      small
                      class="ma-2"
                    >
                      Out of Stock
                    </v-chip>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Cart Section -->
      <v-col cols="5">
        <v-card class="ma-2 fill-height d-flex flex-column">
          <!-- Debtor Search Section -->
          <v-card-title class="py-2">
            <v-autocomplete
              v-model="selectedDebtor"
              :items="debtors"
              item-text="name"
              item-value="_id"
              label="Search Debtor"
              dense
              outlined
              hide-details
              clearable
              :loading="debtorSearchLoading"
              :filter="customFilter"
              return-object
            >
              <template v-slot:prepend-inner>
                <v-icon small>mdi-account-search</v-icon>
              </template>

              <template v-slot:item="{ item }">
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                  <v-list-item-subtitle class="d-flex align-center">
                    <span class="caption"
                      >Credit Limit: ₱{{ item.creditLimit }}</span
                    >
                  </v-list-item-subtitle>
                </v-list-item-content>
              </template>

              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>No debtors found</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-autocomplete>
          </v-card-title>

          <!-- Selected Debtor Info -->
          <v-card-text v-if="selectedDebtor" class="py-2 grey lighten-4">
            <div class="d-flex justify-space-between align-center">
              <div>
                <div class="subtitle-1 font-weight-medium">
                  {{ selectedDebtor.name }}
                </div>
                <div class="caption">
                  Credit Limit: ₱{{ selectedDebtor.creditLimit }}
                </div>
              </div>
              <div>
                <v-btn text small color="red" @click="selectedDebtor = null">
                  Clear
                </v-btn>
              </div>
            </div>
          </v-card-text>

          <!-- Cart Title -->
          <v-card-title class="py-2 d-flex justify-space-between">
            <span>Orders</span>
            <v-btn v-if="cart.length" text small color="red" @click="clearCart">
              Clear Cart
            </v-btn>
          </v-card-title>

          <!-- Cart Items -->
          <div v-if="cart.length > 0" class="flex-grow-1 overflow-y-auto px-2">
            <v-data-table
              :headers="cartHeaders"
              :items="cart"
              hide-default-footer
              dense
              class="elevation-1"
            >
              <template v-slot:item="{ item }">
                <tr>
                  <td>
                    <div class="d-flex align-center">
                      <v-avatar size="32" class="mr-2">
                        <v-img :src="item.image"></v-img>
                      </v-avatar>
                      <div class="text-truncate">{{ item.name }}</div>
                    </div>
                  </td>
                  <td>
                    <v-row align="center" justify="center" no-gutters>
                      <v-btn
                        icon
                        small
                        :disabled="item.quantity <= 1"
                        @click="decrementQuantity(item)"
                      >
                        <v-icon small>mdi-minus</v-icon>
                      </v-btn>
                      <span class="mx-2">{{ item.quantity }}</span>
                      <v-btn
                        icon
                        small
                        :disabled="item.quantity >= item.availableStocks"
                        @click="incrementQuantity(item)"
                      >
                        <v-icon small>mdi-plus</v-icon>
                      </v-btn>
                    </v-row>
                  </td>
                  <td class="text-right">₱{{ item.price }}</td>
                  <td class="text-right">
                    ₱{{ (item.price * item.quantity).toFixed(2) }}
                  </td>
                  <td>
                    <v-btn icon small color="red" @click="removeFromCart(item)">
                      <v-icon small>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </div>
          <!-- Empty Cart State -->
          <v-card-text v-else class="cart-empty">
            <v-icon size="64" color="grey lighten-1">mdi-cart-outline</v-icon>
            <p class="mt-2 grey--text text-center">
              Your cart is empty<br />
              Add items to get started
            </p>
          </v-card-text>

          <!-- Cart Summary -->
          <v-card-text v-if="cart.length > 0" class="pt-0">
            <v-divider class="my-2"></v-divider>
            <div class="d-flex justify-space-between mb-1">
              <span class="text-subtitle-1">Subtotal:</span>
              <span class="text-subtitle-1">₱{{ subTotal.toFixed(2) }}</span>
            </div>
            <div class="d-flex justify-space-between">
              <span class="text-h6">Total:</span>
              <span class="text-h6 primary--text">₱{{ total }}</span>
            </div>
          </v-card-text>

          <!-- Payment Button -->
          <v-card-actions class="pa-4 pt-0">
            <v-btn
              dark
              color="primary"
              block
              x-large
              @click="openPaymentDialog"
              :disabled="cart.length === 0"
            >
              <v-icon left>mdi-cash-register</v-icon>
              Proceed to Payment
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- New Customer Dialog -->
    <v-dialog v-model="newCustomerDialog" max-width="400">
      <v-card>
        <v-card-title class="primary white--text">
          Add New Customer
        </v-card-title>
        <v-card-text class="pt-4">
          <v-form ref="customerForm" v-model="isCustomerFormValid">
            <v-text-field
              v-model="newCustomer.name"
              label="Customer Name"
              outlined
              dense
              :rules="[(v) => !!v || 'Name is required']"
            ></v-text-field>
            <v-text-field
              v-model="newCustomer.contact"
              label="Contact Number"
              outlined
              dense
              :rules="[(v) => !!v || 'Contact number is required']"
            ></v-text-field>
            <v-text-field
              v-model="newCustomer.address"
              label="Address"
              outlined
              dense
              :rules="[(v) => !!v || 'Address is required']"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="newCustomerDialog = false">Cancel</v-btn>
          <v-btn
            color="primary"
            @click="addNewCustomer"
            :disabled="!isCustomerFormValid"
          >
            Add Customer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Payment Dialog -->
    <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card>
        <v-card-title class="primary white--text">
          Payment Details
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pt-4">
          <div class="payment-summary mb-4">
            <div class="d-flex justify-space-between align-center">
              <span class="text-subtitle-1">Total Amount:</span>
              <div class="success pa-2 rounded">
                <span class="text-h6 white--text">₱{{ total }}</span>
              </div>
            </div>
          </div>

          <v-tabs v-model="paymentTab" grow>
            <v-tab
              v-for="type in paymentTypes"
              :key="type"
              :disabled="type === 'Credit' && !selectedDebtor"
            >
              <v-icon left>{{ getPaymentIcon(type) }}</v-icon>
              {{ type }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="paymentTab" class="mt-4">
            <!-- Cash Payment -->
            <v-tab-item>
              <v-text-field
                v-model="customer"
                label="Customer Name"
                outlined
                :placeholder="'Walk-in'"
                class="mb-3"
              ></v-text-field>
              <v-text-field
                v-model.number="amountPaid"
                label="Amount Tendered"
                prefix="₱"
                type="number"
                outlined
                @input="validateAmount"
                :error-messages="amountError"
              ></v-text-field>
            </v-tab-item>

            <!-- GCash Payment -->
            <v-tab-item>
              <v-text-field
                v-model="customer"
                label="Customer Name"
                outlined
                :placeholder="'Walk-in'"
                class="mb-3"
              ></v-text-field>
              <v-text-field
                v-model="referenceNo"
                label="GCash Reference Number"
                outlined
                :rules="[(v) => !!v || 'Reference number is required']"
              ></v-text-field>
              <v-text-field
                v-model.number="amountPaid"
                label="Amount Paid"
                prefix="₱"
                type="number"
                outlined
                @input="validateAmount"
              ></v-text-field>
            </v-tab-item>

            <!-- Credit Payment Tab -->
            <v-tab-item>
              <v-alert
                v-if="selectedDebtor"
                :type="debtorCreditAvailable ? 'success' : 'warning'"
                dense
                outlined
                class="mb-3"
              >
                <div class="d-flex justify-space-between">
                  <span>Credit Limit:</span>
                  <span>₱{{ selectedDebtor.creditLimit.toFixed(2) }}</span>
                </div>
              </v-alert>

              <div v-if="!selectedDebtor" class="text-center pa-4">
                <v-icon large color="warning">mdi-alert</v-icon>
                <p class="mt-2">
                  Please select a debtor to proceed with credit payment
                </p>
              </div>

              <v-text-field
                v-if="selectedDebtor"
                :value="selectedDebtor.name"
                label="Debtor Name"
                outlined
                readonly
              ></v-text-field>

              <v-text-field
                v-if="selectedDebtor"
                :value="selectedDebtor.contact"
                label="Contact"
                outlined
                readonly
              ></v-text-field>
            </v-tab-item>
          </v-tabs-items>

          <v-divider class="my-4"></v-divider>
          <div class="payment-summary">
            <div class="d-flex justify-space-between mb-2">
              <span class="text-subtitle-1">Amount Due:</span>
              <span class="text-subtitle-1">₱{{ total }}</span>
            </div>
            <div
              class="d-flex justify-space-between mb-2"
              v-if="paymentTypes[paymentTab] !== 'Credit'"
            >
              <span class="text-subtitle-1">Amount Tendered:</span>
              <span class="text-subtitle-1">₱{{ amountPaid.toFixed(2) }}</span>
            </div>
            <div
              class="d-flex justify-space-between"
              v-if="paymentTypes[paymentTab] !== 'Credit'"
            >
              <span class="text-h6">Change:</span>
              <span class="text-h6" :class="{ 'success--text': change > 0 }">
                ₱{{ change }}
              </span>
            </div>
          </div>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            :dark="isPaymentValid"
            @click="processPayment"
            :disabled="!isPaymentValid"
            :loading="processingPayment"
          >
            Complete Payment
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar for notifications -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "POS",

  data() {
    return {
      // Search and filtering
      searchQuery: "",
      selectedCategory: 0,
      categories: ["All", "Food", "Beverages", "Snacks", "Others"],

      // Products and cart
      products: [],
      filteredProducts: [],
      cart: [],

      // Payment related
      dialog: false,
      paymentTab: 0,
      paymentType: null,
      amountPaid: 0,
      amountError: "",
      paymentTypes: ["Cash", "Gcash", "Credit"],
      referenceNo: "",
      processingPayment: false,

      // Customer related
      selectedCustomer: null,
      customerSearchLoading: false,
      newCustomerDialog: false,
      isCustomerFormValid: false,
      customer: "Walk-in",
      newCustomer: {
        name: "",
        contact: "",
        address: "",
      },

      selectedDebtor: null,
      debtorSearchLoading: false,
      debtors: [],

      customers: [
        {
          id: 1,
          name: "John Doe",
          balance: 420,
          contact: "09123456789",
          address: "123 Main St.",
          creditLimit: 5000,
        },
        {
          id: 2,
          name: "Jane Smith",
          balance: 1500,
          contact: "09187654321",
          address: "456 Oak Ave.",
          creditLimit: 10000,
        },
        {
          id: 3,
          name: "Albert Johnson",
          balance: 0,
          contact: "09199999999",
          address: "789 Pine St.",
          creditLimit: 3000,
        },
      ],

      // UI elements
      cartHeaders: [
        { text: "Product", value: "name", width: "40%" },
        { text: "Qty", value: "quantity", align: "center", width: "20%" },
        { text: "Price", value: "price", align: "right", width: "15%" },
        { text: "Total", value: "total", align: "right", width: "15%" },
        { text: "Actions", value: "actions", align: "center", width: "10%" },
      ],

      snackbar: {
        show: false,
        text: "",
        color: "success",
        timeout: 3000,
      },
    };
  },

  computed: {
    ...mapState(["drawer"]),

    drawer: {
      get() {
        return false;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      },
    },

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

    isPaymentValid() {
      switch (this.paymentTypes[this.paymentTab]) {
        case "Cash":
          return this.amountPaid >= this.subTotal;
        case "Gcash":
          return (
            this.amountPaid >= this.subTotal && this.referenceNo.length > 0
          );
        case "Credit":
          return this.selectedDebtor && this.debtorCreditAvailable;
        default:
          return false;
      }
    },

    debtorCreditAvailable() {
      if (!this.selectedDebtor) return false;
      const availableCredit = this.selectedDebtor.creditLimit;
      return availableCredit >= this.subTotal;
    },
  },

  watch: {
    searchQuery: {
      handler: "filterProducts",
      immediate: true,
    },

    selectedCategory: {
      handler: "filterProducts",
      immediate: true,
    },

    paymentTab(newVal) {
      this.paymentType = this.paymentTypes[newVal];
      this.resetPaymentForm();
    },

    dialog(newVal) {
      if (!newVal) {
        this.resetPaymentForm();
      }
    },
  },

  created() {
    this.drawer = false;
    this.fetchInitialData();
    this.fetchDebtors();
  },

  methods: {
    ...mapMutations({
      setDrawer: "SET_DRAWER",
    }),

    ...mapActions({
      getProductItems: "product/getItems",
      addItem: "sale/addItem",
      getDebtorItems: "debtor/getDebtors",
    }),

    // UI Helpers
    showNotification(text, color = "success") {
      this.snackbar = {
        show: true,
        text,
        color,
        timeout: 3000,
      };
    },

    getPaymentIcon(type) {
      const icons = {
        Cash: "mdi-cash",
        Gcash: "mdi-cellphone",
        Credit: "mdi-credit-card",
      };
      return icons[type] || "mdi-help";
    },
    // Product and Filtering Methods
    async fetchInitialData() {
      try {
        await this.fetch();
        this.showNotification("Products loaded successfully");
      } catch (error) {
        this.showNotification("Error loading products", "error");
      }
    },

    filterProducts() {
      let filtered = [...this.products];

      if (this.selectedCategory > 0) {
        const category = this.categories[this.selectedCategory];
        filtered = filtered.filter((product) => product.category === category);
      }

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (product) =>
            product.name.toLowerCase().includes(query) ||
            product.upc?.toLowerCase().includes(query)
        );
      }

      this.filteredProducts = filtered;
    },

    clearSearch() {
      this.searchQuery = "";
    },

    // Cart Methods
    addToCart(item) {
      if (!item.inStock) {
        this.showNotification("Product is out of stock", "error");
        return;
      }

      const existingItem = this.cart.find(
        (cartItem) =>
          cartItem.product === item._id || cartItem.variant === item._id
      );

      if (existingItem) {
        if (existingItem.quantity < existingItem.availableStocks) {
          existingItem.quantity++;
          this.showNotification(`${item.name} quantity increased`);
        } else {
          this.showNotification("Maximum stock limit reached", "warning");
        }
      } else {
        const data = {
          name: item.name,
          availableStocks: item.stocks,
          product: item.productId,
          price: parseFloat(item.price),
          quantity: 1,
          image: item.image,
          variant: item.type === "Variants" ? item._id : null,
        };

        this.cart.push(data);
        this.showNotification(`${item.name} added to cart`);
      }
    },

    incrementQuantity(item) {
      if (item.quantity < item.availableStocks) {
        item.quantity++;
      } else {
        this.showNotification("Maximum stock limit reached", "warning");
      }
    },

    decrementQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
      }
    },

    removeFromCart(item) {
      const index = this.cart.indexOf(item);
      if (index > -1) {
        this.cart.splice(index, 1);
        this.showNotification(`${item.name} removed from cart`);
      }
    },

    clearCart() {
      this.cart = [];
      this.selectedDebtor = null;
      this.showNotification("Cart cleared");
    },

    // Customer Methods
    customFilter(item, queryText) {
      const searchText = queryText.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchText) ||
        item.contact?.includes(searchText)
      );
    },

    async searchCustomers(query) {
      this.customerSearchLoading = true;
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        // In real implementation, make API call here
      } finally {
        this.customerSearchLoading = false;
      }
    },

    openNewCustomerDialog() {
      this.newCustomerDialog = true;
      this.$nextTick(() => {
        if (this.$refs.customerForm) {
          this.$refs.customerForm.reset();
        }
      });
    },

    async addNewCustomer() {
      if (!this.isCustomerFormValid) return;

      try {
        const newCustomer = {
          id: this.customers.length + 1,
          name: this.newCustomer.name,
          contact: this.newCustomer.contact,
          address: this.newCustomer.address,
          balance: 0,
          creditLimit: 5000, // Default credit limit
        };

        this.customers.push(newCustomer);
        this.selectedCustomer = newCustomer;
        this.newCustomerDialog = false;
        this.newCustomer = { name: "", contact: "", address: "" };
        this.showNotification("Customer added successfully");
      } catch (error) {
        this.showNotification("Error adding customer", "error");
      }
    },

    viewCustomerDetails() {
      if (this.selectedCustomer) {
        this.$router.push(`/customers/${this.selectedCustomer.id}`);
      }
    },

    openPaymentDialog() {
      if (this.cart.length === 0) {
        this.showNotification("Cart is empty", "error");
        return;
      }

      if (
        this.paymentTypes[this.paymentTab] === "Credit" &&
        !this.selectedDebtor
      ) {
        this.showNotification(
          "Please select a debtor for credit payment",
          "warning"
        );
        return;
      }

      this.dialog = true;
      this.paymentTab = 0;
      this.resetPaymentForm();
    },

    validateAmount(amount) {
      if (amount < 0) {
        this.amountError = "Amount cannot be negative";
      } else if (amount < this.subTotal) {
        this.amountError = "Amount is insufficient";
      } else {
        this.amountError = "";
      }
    },

    resetPaymentForm() {
      this.amountPaid = 0;
      this.amountError = "";
      this.referenceNo = "";
      this.customer = "Walk-in";
      this.paymentType = this.paymentTypes[this.paymentTab];
    },

    async processPayment() {
      if (!this.isPaymentValid || this.processingPayment) return;

      this.processingPayment = true;
      try {
        const paymentData = {
          paymentType: this.paymentType,
          change: this.change,
          salesTotal: this.total,
          amountReceived: this.amountPaid,
          customer: this.selectedDebtor?.name,
          debtorId: this.selectedDebtor?._id,
          referenceNo: this.referenceNo,
          items: this.cart.map((item) => ({
            ...item,
            subTotal: item.price * item.quantity,
          })),
        };

        if (this.paymentType === "Credit" && this.selectedDebtor) {
          paymentData.debtor = {
            id: this.selectedDebtor._id,
            name: this.selectedDebtor.name,
            creditLimit: this.selectedDebtor.creditLimit,
          };
        }

        await this.addItem(paymentData);
        this.showNotification("Payment processed successfully");
        this.dialog = false;
        this.clearCart();
      } catch (error) {
        this.showNotification("Error processing payment", "error");
      } finally {
        this.processingPayment = false;
      }
    },

    async fetch() {
      const response = await this.getProductItems();
      this.products = response.result
        .map((product) => {
          if (product.type === "Variants" && product.variants?.length > 0) {
            return product.variants.map((variant) => ({
              ...product,
              productId: product._id,
              name: variant.name,
              upc: variant.upc,
              stocks: variant.stocks,
              _id: variant._id,
              price: variant.price,
              inStock: variant.stocks > 0,
              category: product.category,
            }));
          }

          return {
            ...product,
            productId: product._id,
            stocks: product.stocks,
            inStock: product.stocks > 0,
            category: product.category,
          };
        })
        .flat();

      this.filteredProducts = this.products;
    },
    async fetchDebtors() {
      this.debtorSearchLoading = true;
      try {
        const response = await this.getDebtorItems();
        this.debtors = response;
      } catch (error) {
        this.showNotification("Error loading debtors", "error");
      } finally {
        this.debtorSearchLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.main-container {
  height: 100%;
  background-color: #f5f5f5;
}

.product-card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

.product-card.disabled {
  pointer-events: none;
  opacity: 0.7;
}

.greyscale {
  filter: grayscale(100%);
  opacity: 0.7;
}

.payment-summary {
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 16px;
}

.cart-empty {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Data table customizations */
.v-data-table ::v-deep .v-data-table__wrapper {
  overflow-x: hidden;
}

.v-data-table ::v-deep tbody tr:hover {
  background-color: #f5f5f5 !important;
}

.v-data-table ::v-deep .v-data-table__wrapper table {
  padding: 0 8px;
}

/* Customer search customizations */
.v-autocomplete ::v-deep .v-input__slot {
  min-height: 40px;
}

.v-autocomplete ::v-deep .v-input__append-inner {
  margin-top: 8px !important;
}

/* Card content scrolling */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

/* Animation classes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .v-card-title {
    padding: 12px;
  }

  .v-card-text {
    padding: 12px;
  }

  .product-card {
    margin-bottom: 12px;
  }
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }

  .v-card {
    box-shadow: none !important;
    border: none !important;
  }
}

/* Custom chip styles */
.status-chip {
  min-width: 80px;
  justify-content: center;
}

/* Custom button styles */
.action-button {
  min-width: 36px !important;
  width: 36px;
  height: 36px;
  padding: 0 !important;
}

/* Custom input styles */
.quantity-input ::v-deep .v-input__control {
  width: 60px;
  min-width: 60px;
}

.quantity-input ::v-deep .v-text-field__details {
  display: none;
}

/* Customer info card */
.customer-info {
  background-color: rgba(0, 0, 0, 0.03);
  border-left: 3px solid var(--v-primary-base);
}

/* Payment dialog customizations */
.payment-type-tab {
  min-width: 120px;
}

.payment-summary-box {
  border: 1px solid var(--v-primary-base);
  border-radius: 4px;
  padding: 16px;
}

/* Loading states */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
</style>
