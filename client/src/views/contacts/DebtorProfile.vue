<template>
  <v-container fluid>
    <v-row>
      <!-- Debtor Info Section -->
      <v-col cols="12" md="4">
        <v-card elevation="2" class="mb-4 rounded-lg">
          <v-card-title class="primary white--text px-4 py-3">
            <v-icon left color="white">mdi-account</v-icon>
            Debtor Information
          </v-card-title>
          <v-card-text class="pa-4">
            <v-list>
              <v-list-item v-for="(value, key) in debtorFields" :key="key">
                <v-list-item-content>
                  <v-list-item-subtitle class="text-caption mb-1">{{
                    key
                    }}</v-list-item-subtitle>
                  <v-list-item-title class="font-weight-medium">
                    <span v-if="
                      key === 'Credit Limit' ||
                      key === 'Available Credit' ||
                      key === 'Balance'
                    ">₱</span>
                    <template v-if="key === 'Balance'">
                      {{
                        formatNumber(
                          debtor.creditLimit - debtor.availableCredit
                        )
                      }}
                    </template>
                    <template v-else>
                      {{ debtor[value] }}
                    </template>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-card elevation="2" class="rounded-lg">
          <v-tabs v-model="activeTab" background-color="primary" dark>
            <v-tab>
              <v-icon left>mdi-history</v-icon>
              Purchase History
            </v-tab>
            <v-tab>
              <v-icon left>mdi-cash-multiple</v-icon>
              Payment History
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="activeTab">
            <v-tab-item>
              <v-card flat>
                <v-card-title class="px-4 py-3">
                  <v-spacer></v-spacer>
                  <v-text-field v-model="salesSearch" prepend-inner-icon="mdi-magnify" label="Search sales" dense
                    outlined hide-details class="shrink mt-1" style="max-width: 300px"></v-text-field>
                </v-card-title>

                <v-data-table :headers="salesHeaders" :items="salesHistory" :search="salesSearch"
                  :loading="loadingSales" :items-per-page="10" class="elevation-0">
                  <template v-slot:loading>
                    <v-skeleton-loader type="table-row" class="pa-4"></v-skeleton-loader>
                  </template>

                  <template v-slot:[`item.date`]="{ item }">
                    <span class="font-weight-medium">{{
                      formatDate(item.date)
                      }}</span>
                  </template>

                  <template v-slot:[`item.salesTotal`]="{ item }">
                    <span class="success--text font-weight-medium">₱{{ formatNumber(item.salesTotal) }}</span>
                  </template>

                  <template v-slot:[`item.amountReceived`]="{ item }">
                    <span :class="getPaymentStatusColor(item)">₱{{ formatNumber(item.amountReceived) }}</span>
                  </template>

                  <template v-slot:[`item.paymentType`]="{ item }">
                    <v-chip small :color="getPaymentTypeColor(item.paymentType)" text-color="white">
                      {{ item.paymentType }}
                    </v-chip>
                  </template>

                  <template v-slot:[`item.paymentStatus`]="{ item }">
                    <v-chip small :color="getPaymentStatusChipColor(item.paymentStatus)" text-color="white">
                      {{ item.paymentStatus }}
                    </v-chip>
                  </template>

                  <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small outlined color="primary" @click="viewSaleDetails(item)">
                      <v-icon left small>mdi-eye</v-icon>
                      Details
                    </v-btn>
                  </template>
                </v-data-table>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-card-title class="px-4 py-3">
                  <v-spacer></v-spacer>
                  <v-text-field v-model="paymentSearch" prepend-inner-icon="mdi-magnify" label="Search payments" dense
                    outlined hide-details class="shrink mt-1" style="max-width: 300px"></v-text-field>
                </v-card-title>

                <v-data-table :headers="paymentHeaders" :items="debtorPayments" :search="paymentSearch"
                  :loading="loadingPayments" :items-per-page="10" class="elevation-0">
                  <template v-slot:loading>
                    <v-skeleton-loader type="table-row" class="pa-4"></v-skeleton-loader>
                  </template>

                  <template v-slot:[`item.paymentDate`]="{ item }">
                    <span>{{ formatDate(item.paymentDate) }}</span>
                  </template>

                  <template v-slot:[`item.amount`]="{ item }">
                    <span class="success--text">₱{{ formatNumber(item.amount) }}</span>
                  </template>

                  <template v-slot:[`item.paymentMethod`]="{ item }">
                    <v-chip small :color="getPaymentMethodColor(item.paymentMethod)" text-color="white">
                      {{ item.paymentMethod }}
                    </v-chip>
                  </template>

                  <template v-slot:[`item.actions`]="{ item }">
                    <v-btn small outlined color="primary" @click="viewPaymentDetails(item)">
                      <v-icon left small>mdi-eye</v-icon>
                      Details
                    </v-btn>
                  </template>
                </v-data-table>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="saleDialogVisible" max-width="800px">
      <v-card>
        <v-card-title class="primary white--text">
          <v-icon left color="white">mdi-receipt</v-icon>
          Sale Details
          <v-spacer></v-spacer>
          <div class="text-subtitle-1">
            Ref: {{ selectedSale?.referenceCode }}
          </div>
        </v-card-title>

        <v-card-text class="pa-4">
          <v-data-table :headers="saleDetailHeaders" :items="selectedSaleItems" hide-default-footer
            class="elevation-1 mb-4">
            <template v-slot:[`item.product.name`]="{ item }">
              {{ getProductName(item) }}
            </template>

            <template v-slot:[`item.product.price`]="{ item }">
              ₱{{ formatNumber(item.product.price) }}
            </template>

            <template v-slot:[`item.subtotal`]="{ item }">
              <span class="font-weight-bold">
                ₱{{ formatNumber(item.product.price * item.quantity) }}
              </span>
            </template>
          </v-data-table>

          <v-divider></v-divider>

          <v-row class="mt-4" justify="end">
            <v-col cols="12" sm="4">
              <div class="d-flex justify-space-between">
                <span class="text-subtitle-1">Total:</span>
                <span class="text-h6 primary--text">₱{{ formatNumber(calculateTotal) }}</span>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="saleDialogVisible = false">Close</v-btn>
          <v-btn color="primary" @click="printReceipt">
            <v-icon left>mdi-printer</v-icon>
            Print
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="paymentDialogVisible" max-width="600px">
      <v-card>
        <v-card-title class="primary white--text">
          <v-icon left color="white">mdi-cash</v-icon>
          Payment Details
          <v-spacer></v-spacer>
          <div class="text-subtitle-1">
            Ref: {{ selectedPayment?.referenceNumber }}
          </div>
        </v-card-title>

        <v-card-text class="pa-4">
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle class="text-caption">Date</v-list-item-subtitle>
                <v-list-item-title>{{
                  formatDate(selectedPayment?.paymentDate)
                  }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle class="text-caption">Amount</v-list-item-subtitle>
                <v-list-item-title class="success--text">
                  ₱{{ formatNumber(selectedPayment?.amount) }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle class="text-caption">Payment Method</v-list-item-subtitle>
                <v-list-item-title>
                  <v-chip small :color="getPaymentMethodColor(selectedPayment?.paymentMethod)
                    " text-color="white">
                    {{ selectedPayment?.paymentMethod }}
                  </v-chip>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="selectedPayment?.notes">
              <v-list-item-content>
                <v-list-item-subtitle class="text-caption">Notes</v-list-item-subtitle>
                <v-list-item-title>{{
                  selectedPayment?.notes
                  }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="paymentDialogVisible = false">Close</v-btn>
          <v-btn color="primary" @click="printPaymentReceipt">
            <v-icon left>mdi-printer</v-icon>
            Print
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DebtorProfile",

  data: () => ({
    activeTab: 0,
    debtor: {},
    salesHistory: [],
    debtorPayments: [],
    selectedSale: null,
    selectedSaleItems: [],
    selectedPayment: null,
    salesSearch: "",
    paymentSearch: "",
    loadingSales: false,
    loadingPayments: false,
    saleDialogVisible: false,
    paymentDialogVisible: false,
    debtorFields: {
      Name: "name",
      "Credit Limit": "creditLimit",
      "Available Credit": "availableCredit",
      Balance: (balance) => {
        return balance?.creditLimit - balance?.availableCredit || 0;
      },
      Address: "address",
      Contact: "contact",
    },
    salesHeaders: [
      { text: "Date", value: "date", width: "15%" },
      { text: "Reference", value: "referenceCode", width: "15%" },
      { text: "Total", value: "salesTotal", width: "15%" },
      { text: "Received", value: "amountReceived", width: "15%" },
      { text: "Payment Type", value: "paymentType", width: "15%" },
      { text: "Status", value: "paymentStatus", width: "15%" },
      { text: "Actions", value: "actions", sortable: false, width: "10%" },
    ],

    saleDetailHeaders: [
      { text: "Product", value: "product.name", width: "40%" },
      { text: "Quantity", value: "quantity", width: "20%" },
      { text: "Price", value: "product.price", width: "20%" },
      { text: "Subtotal", value: "subtotal", width: "20%" },
    ],

    paymentHeaders: [
      { text: "Date", value: "paymentDate", width: "20%" },
      { text: "Reference", value: "referenceNumber", width: "20%" },
      { text: "Amount", value: "amount", width: "20%" },
      { text: "Method", value: "paymentMethod", width: "20%" },
      { text: "Notes", value: "notes", width: "10%" },
      { text: "Actions", value: "actions", sortable: false, width: "10%" },
    ],
  }),

  computed: {
    calculateTotal() {
      if (!this.selectedSaleItems?.length) return 0;
      return this.selectedSaleItems.reduce((total, item) => {
        const price = item.product?.price || 0;
        const quantity = item.quantity || 0;
        return total + price * quantity;
      }, 0);
    },

    balanceComputed() {
      if (!this.debtor.creditLimit || !this.debtor.availableCredit) return 0;
      return this.debtor.creditLimit - this.debtor.availableCredit;
    },
  },

  async created() {
    await this.loadData();
  },

  methods: {
    ...mapActions({
      getDebtor: "debtor/getDebtor",
      getDebtorSales: "sale/getDebtorSales",
      getDebtorPayments: "debtorPayment/getDebtorPayments",
    }),

    async loadData() {
      const debtorId = this.$route.params.id;

      this.loadingSales = true;
      this.loadingPayments = true;

      try {
        const [debtorResponse, salesResponse, paymentsResponse] =
          await Promise.all([
            this.getDebtor(debtorId),
            this.getDebtorSales(debtorId),
            this.getDebtorPayments(debtorId),
          ]);

        this.debtor = debtorResponse;
        this.salesHistory = salesResponse;
        this.debtorPayments = paymentsResponse;
      } catch (error) {
        console.error("Error loading data:", error);
        this.$toast.error("Failed to load data");
      } finally {
        this.loadingSales = false;
        this.loadingPayments = false;
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString("en-PH", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },

    formatNumber(number) {
      if (number == null) return "0.00";
      return number.toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },

    getPaymentStatusColor(item) {
      const ratio = item.amountReceived / item.salesTotal;
      if (ratio >= 1) return "success--text font-weight-medium";
      if (ratio >= 0.5) return "warning--text font-weight-medium";
      return "error--text font-weight-medium";
    },

    getPaymentTypeColor(type) {
      const colors = {
        CASH: "success",
        CREDIT: "warning",
        PARTIAL: "orange",
        INSTALLMENT: "blue",
      };
      return colors[type.toUpperCase()] || "grey";
    },

    getPaymentMethodColor(method) {
      const colors = {
        CASH: "success",
        CHECK: "info",
        GCASH: "primary",
        OTHERS: "grey",
      };
      return colors[method?.toUpperCase()] || "grey";
    },

    getPaymentStatusChipColor(status) {
      const colors = {
        paid: "success",
        unpaid: "error",
      };
      return colors[status] || "grey";
    },

    getProductName(item) {
      if (item.product.type === "Variants" && item.variant) {
        const variant = item.product.variants.find(
          (v) => v._id.toString() === item.variant.toString()
        );
        return variant?.name || item.product.name;
      }
      return item.product.name;
    },

    viewSaleDetails(sale) {
      this.selectedSale = sale;
      this.selectedSaleItems = sale.items.map((item) => ({
        ...item,
        product: {
          ...item.product,
          price: this.getVariantPrice(item),
        },
      }));
      this.saleDialogVisible = true;
    },

    viewPaymentDetails(payment) {
      this.selectedPayment = payment;
      this.paymentDialogVisible = true;
    },

    getVariantPrice(item) {
      if (item.product.type === "Variants" && item.variant) {
        const variant = item.product.variants.find(
          (v) => v._id.toString() === item.variant.toString()
        );
        return variant?.price || item.product.price;
      }
      return item.product.price;
    },

    async printReceipt() {
      try {
        await this.$print({
          ref: this.selectedSale.referenceCode,
          items: this.selectedSaleItems,
          total: this.calculateTotal,
        });
        this.$toast.success("Receipt printed successfully");
      } catch (error) {
        console.error("Print error:", error);
        this.$toast.error("Failed to print receipt");
      }
    },

    async printPaymentReceipt() {
      try {
        await this.$print({
          ref: this.selectedPayment.referenceNumber,
          amount: this.selectedPayment.amount,
          method: this.selectedPayment.paymentMethod,
          date: this.formatDate(this.selectedPayment.date),
          notes: this.selectedPayment.notes,
        });
        this.$toast.success("Payment receipt printed successfully");
      } catch (error) {
        console.error("Print error:", error);
        this.$toast.error("Failed to print payment receipt");
      }
    },
  },

  watch: {
    "$route.params.id": {
      handler: "loadData",
      immediate: true,
    },
  },
};
</script>

<style scoped>
.v-data-table ::v-deep tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

.v-data-table ::v-deep .v-data-table__wrapper {
  border-radius: 0 0 8px 8px;
}

.v-card {
  transition: all 0.3s ease;
}
</style>
