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
                  <v-list-item-subtitle class="text-caption mb-1">
                    {{ key }}
                  </v-list-item-subtitle>
                  <v-list-item-title class="font-weight-medium">
                    <span v-if="key === 'Credit Limit' || key === 'Available Credit'">₱</span>
                    {{ debtor[value] }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Sales History Section -->
      <v-col cols="12" md="8">
        <v-card elevation="2" class="rounded-lg">
          <v-card-title class="px-4 py-3">
            <v-icon left>mdi-history</v-icon>
            Sales History
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search transactions"
              dense
              outlined
              hide-details
              class="shrink mt-1"
              style="max-width: 300px"
            ></v-text-field>
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="salesHistory"
            :search="search"
            :loading="loading"
            :items-per-page="10"
            class="elevation-0"
          >
            <template v-slot:loading>
              <v-skeleton-loader
                type="table-row"
                class="pa-4"
              ></v-skeleton-loader>
            </template>

            <template v-slot:[`item.date`]="{ item }">
              <span class="font-weight-medium">{{ formatDate(item.date) }}</span>
            </template>

            <template v-slot:[`item.salesTotal`]="{ item }">
              <span class="success--text font-weight-medium">
                ₱{{ formatNumber(item.salesTotal) }}
              </span>
            </template>

            <template v-slot:[`item.amountReceived`]="{ item }">
              <span :class="getPaymentStatusColor(item)">
                ₱{{ formatNumber(item.amountReceived) }}
              </span>
            </template>

            <template v-slot:[`item.paymentType`]="{ item }">
              <v-chip
                small
                :color="getPaymentTypeColor(item.paymentType)"
                text-color="white"
              >
                {{ item.paymentType }}
              </v-chip>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                small
                outlined
                color="primary"
                @click="viewSaleDetails(item)"
              >
                <v-icon left small>mdi-eye</v-icon>
                Details
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Sale Details Dialog -->
    <v-dialog v-model="dialogVisible" max-width="800px">
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
          <v-data-table
            :headers="detailHeaders"
            :items="selectedSaleItems"
            hide-default-footer
            class="elevation-1 mb-4"
          >
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
                <span class="text-h6 primary--text">
                  ₱{{ formatNumber(calculateTotal) }}
                </span>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn
            color="grey darken-1"
            text
            @click="dialogVisible = false"
          >
            Close
          </v-btn>
          <v-btn
            color="primary"
            @click="printReceipt"
          >
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
    debtor: {},
    salesHistory: [],
    selectedSale: null,
    selectedSaleItems: [],
    search: "",
    loading: false,
    dialogVisible: false,
    
    // Debtor information field mapping
    debtorFields: {
      'Name': 'name',
      'Credit Limit': 'creditLimit',
      'Available Credit': 'availableCredit',
      'Address': 'address',
      'Contact': 'contact'
    },

    // Table headers
    headers: [
      { text: "Date", value: "date", width: "15%" },
      { text: "Reference", value: "referenceCode", width: "15%" },
      { text: "Total", value: "salesTotal", width: "15%" },
      { text: "Received", value: "amountReceived", width: "15%" },
      { text: "Payment Type", value: "paymentType", width: "20%" },
      { text: "Actions", value: "actions", sortable: false, width: "20%" },
    ],
    
    detailHeaders: [
      { text: "Product", value: "product.name", width: "40%" },
      { text: "Quantity", value: "quantity", width: "20%" },
      { text: "Price", value: "product.price", width: "20%" },
      { text: "Subtotal", value: "subtotal", width: "20%" },
    ],
  }),

  computed: {
    calculateTotal() {
      if (!this.selectedSaleItems?.length) return 0;
      return this.selectedSaleItems.reduce((total, item) => {
        return total + (item.product.price * item.quantity);
      }, 0);
    },
  },

  async created() {
    await this.loadData();
  },

  methods: {
    ...mapActions({
      getDebtor: "debtor/getDebtor",
      getDebtorSales: "sale/getDebtorSales",
    }),

    async loadData() {
      this.loading = true;
      try {
        const debtorId = this.$route.params.id;
        const [debtorResponse, salesResponse] = await Promise.all([
          this.getDebtor(debtorId),
          this.getDebtorSales(debtorId),
        ]);

        this.debtor = debtorResponse;
        this.salesHistory = salesResponse;
      } catch (error) {
        console.error("Error loading debtor data:", error);
        this.$toast.error("Failed to load debtor data");
      } finally {
        this.loading = false;
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },

    formatNumber(number) {
      return number.toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },

    getPaymentStatusColor(item) {
      const ratio = item.amountReceived / item.salesTotal;
      if (ratio >= 1) return 'success--text font-weight-medium';
      if (ratio >= 0.5) return 'warning--text font-weight-medium';
      return 'error--text font-weight-medium';
    },

    getPaymentTypeColor(type) {
      const colors = {
        'CASH': 'success',
        'CREDIT': 'warning',
        'PARTIAL': 'orange',
        'INSTALLMENT': 'blue'
      };
      return colors[type.toUpperCase()] || 'grey';
    },

    viewSaleDetails(sale) {
      this.selectedSale = sale;
      this.selectedSaleItems = sale.items;
      this.dialogVisible = true;
    },

    async printReceipt() {
      try {
        // Implementation for printing functionality
        await this.$print({
          ref: this.selectedSale.referenceCode,
          items: this.selectedSaleItems,
          total: this.calculateTotal
        });
        this.$toast.success('Receipt printed successfully');
      } catch (error) {
        console.error('Print error:', error);
        this.$toast.error('Failed to print receipt');
      }
    },

    // Helper method to determine if payment is complete
    isPaymentComplete(sale) {
      return sale.amountReceived >= sale.salesTotal;
    }
  },

  watch: {
    // Watch for route changes to reload data
    '$route.params.id': {
      handler: 'loadData',
      immediate: true
    }
  }
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