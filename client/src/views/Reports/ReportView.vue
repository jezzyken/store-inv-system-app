<!-- eslint-disable-next-line  -->
<!-- eslint-disable  -->

<template>
  <v-container fluid>
    <!-- Report Type and Filters -->
    <v-card class="mb-4">
      <v-card-text>
        <v-row align="center">
          <v-col cols="12" md="4">
            <v-select
              v-model="selectedReportType"
              :items="reportTypes"
              label="Report Type"
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="12" md="8" v-if="selectedReportType === 'sales'">
            <v-row>
              <v-col cols="5">
                <v-menu
                  v-model="startDateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateRange.startDate"
                      label="Start Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      dense
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dateRange.startDate"
                    @input="startDateMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="5">
                <v-menu
                  v-model="endDateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateRange.endDate"
                      label="End Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      dense
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dateRange.endDate"
                    @input="endDateMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="2">
                <v-btn
                  color="primary"
                  @click="generateReport"
                  :loading="loading"
                  class="mt-2"
                >
                  Generate
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Sales Report -->
    <template v-if="selectedReportType === 'sales'">
      <v-row class="mb-4" v-if="salesSummary">
        <v-col cols="12" sm="6" md="3">
          <v-card outlined>
            <v-card-text>
              <div class="text-subtitle-2 grey--text">Total Sales</div>
              <div class="text-h4 mt-2">{{ salesSummary.totalSales }}</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card outlined>
            <v-card-text>
              <div class="text-subtitle-2 grey--text">Total Revenue</div>
              <div class="text-h4 mt-2">
                ₱{{ formatNumber(salesSummary.totalRevenue) }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card outlined>
            <v-card-text>
              <div class="text-subtitle-2 grey--text">Total Profit</div>
              <div class="text-h4 mt-2">
                ₱{{ formatNumber(salesSummary.totalProfit) }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card outlined>
            <v-card-text>
              <div class="text-subtitle-2 grey--text">Average Profit</div>
              <div class="text-h4 mt-2">
                ₱{{ formatNumber(salesSummary.averageProfit) }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-card>
        <v-card-title>
          <v-row align="center">
            <v-col cols="12" sm="6"> Sales List </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-title>

        <v-data-table
          :headers="salesHeaders"
          :items="salesReport"
          :search="search"
          :loading="loading"
          :items-per-page="10"
          :footer-props="{
            'items-per-page-options': [10, 20, 50],
          }"
        >
          <template v-slot:item.date="{ item }">
            {{ formatDate(item.date) }}
          </template>
          <template v-slot:item.totalRevenue="{ item }">
            ₱{{ formatNumber(item.totalRevenue) }}
          </template>
          <template v-slot:item.profit="{ item }">
            ₱{{ formatNumber(item.profit) }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="viewSaleDetails(item)">
              mdi-eye
            </v-icon>
            <v-icon small @click="printSale(item)"> mdi-printer </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </template>

    <!-- Inventory Report -->
    <template v-if="selectedReportType === 'inventory'">
      <v-row class="mb-4" v-if="inventorySummary">
        <v-col cols="12" sm="6" md="3">
          <v-card outlined>
            <v-card-text>
              <div class="text-subtitle-2 grey--text">Total Products</div>
              <div class="text-h4 mt-2">
                {{ inventorySummary.totalProducts }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card outlined>
            <v-card-text>
              <div class="text-subtitle-2 grey--text">Total Stock</div>
              <div class="text-h4 mt-2">{{ inventorySummary.totalStock }}</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card outlined>
            <v-card-text>
              <div class="text-subtitle-2 grey--text">Low Stock Items</div>
              <div class="text-h4 mt-2">
                {{ inventorySummary.lowStockItems }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card outlined>
            <v-card-text>
              <div class="text-subtitle-2 grey--text">Inventory Value</div>
              <div class="text-h4 mt-2">
                ₱{{ formatNumber(inventorySummary.inventoryValue) }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-card>
        <v-card-title>
          <v-row align="center">
            <v-col cols="12" sm="6"> Inventory List </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-title>

        <v-data-table
          :headers="inventoryHeaders"
          :items="inventoryReport"
          :search="search"
          :loading="loading"
          :items-per-page="10"
          :footer-props="{
            'items-per-page-options': [10, 20, 50],
          }"
        >
          <template v-slot:item.totalStock="{ item }">
            <v-chip
              :color="getStockColor(item.totalStock, item.stockAlert)"
              small
            >
              {{ item.totalStock }}
            </v-chip>
          </template>
          <template v-slot:item.cost="{ item }">
            ₱{{ formatNumber(item.cost) }}
          </template>
          <template v-slot:item.price="{ item }">
            ₱{{ formatNumber(item.price) }}
          </template>
        </v-data-table>
      </v-card>
    </template>

    <!-- Sale Details Dialog -->
    <v-dialog v-model="detailsDialog" max-width="800">
      <v-card v-if="selectedSale">
        <v-card-title class="headline">
          Sale Details
          <v-spacer></v-spacer>
          <v-btn icon @click="detailsDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="6">
              <div class="caption grey--text">Reference Code</div>
              <div>{{ selectedSale.referenceCode }}</div>
            </v-col>
            <v-col cols="6">
              <div class="caption grey--text">Date</div>
              <div>{{ formatDate(selectedSale.date) }}</div>
            </v-col>
            <v-col cols="6">
              <div class="caption grey--text">Customer</div>
              <div>{{ selectedSale.customer }}</div>
            </v-col>
            <v-col cols="6">
              <div class="caption grey--text">Payment Type</div>
              <div>{{ selectedSale.paymentType }}</div>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <div class="subtitle-1 mb-2">Items</div>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Variant</th>
                  <th>Quantity</th>
                  <th class="text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in selectedSale.items" :key="item.product">
                  <td>{{ item.product }}</td>
                  <td>{{ item.variant }}</td>
                  <td>{{ item.quantity }}</td>
                  <td class="text-right">₱{{ formatNumber(item.subTotal) }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>

          <v-divider class="my-4"></v-divider>

          <v-row>
            <v-col cols="12" sm="6" offset-sm="6">
              <div class="d-flex justify-space-between mb-1">
                <span class="grey--text">Subtotal:</span>
                <span>₱{{ formatNumber(selectedSale.totalRevenue) }}</span>
              </div>
              <div class="d-flex justify-space-between mb-1">
                <span class="grey--text">Discount:</span>
                <span>₱{{ formatNumber(selectedSale.discount) }}</span>
              </div>
              <v-divider class="my-2"></v-divider>
              <div class="d-flex justify-space-between subtitle-1">
                <strong>Total:</strong>
                <strong>₱{{ formatNumber(selectedSale.grandTotal) }}</strong>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="printSale(selectedSale)">
            Print
          </v-btn>
          <v-btn color="grey" text @click="detailsDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ReportView",

  data() {
    return {
      selectedReportType: "sales",
      reportTypes: [
        { text: "Sales Report", value: "sales" },
        { text: "Inventory Report", value: "inventory" },
      ],
      dateRange: {
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date().toISOString().slice(0, 10),
      },
      startDateMenu: false,
      endDateMenu: false,
      loading: false,
      search: "",
      detailsDialog: false,
      selectedSale: null,
      salesHeaders: [
        { text: "Date", value: "date", width: "120px" },
        { text: "Reference", value: "referenceCode" },
        { text: "Customer", value: "customer" },
        { text: "Payment", value: "paymentType" },
        { text: "Revenue", value: "totalRevenue", align: "right" },
        { text: "Profit", value: "profit", align: "right" },
        { text: "Options", value: "actions", sortable: false, width: "100px" },
      ],
      inventoryHeaders: [
        { text: "Product", value: "name" },
        { text: "Category", value: "category" },
        { text: "Brand", value: "brand" },
        { text: "Stock", value: "totalStock", align: "center" },
        { text: "Cost", value: "cost", align: "right" },
        { text: "Price", value: "price", align: "right" },
      ],
    };
  },

  computed: {
    ...mapState("reports", [
      "salesReport",
      "salesSummary",
      "inventoryReport",
      "inventorySummary",
    ]),
  },

  methods: {
    async generateReport() {
      this.loading = true;
      try {
        switch (this.selectedReportType) {
          case "sales":
            await this.$store.dispatch(
              "reports/getSalesReport",
              this.dateRange
            );
            break;
          case "inventory":
            await this.$store.dispatch("reports/getInventoryReport");
            break;
        }
      } catch (error) {
        this.$toast.error("Error generating report");
      } finally {
        this.loading = false;
      }
    },

    viewSaleDetails(sale) {
      this.selectedSale = sale;
      this.detailsDialog = true;
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },

    formatNumber(number) {
      return (
        number?.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) || "0.00"
      );
    },

    getStockColor(stock, alert) {
      if (stock <= 0) return "error";
      if (stock <= alert) return "warning";
      return "success";
    },

    async printSale() {
      try {
        // Implement print functionality
        // You might want to create a separate print-friendly view
        window.print();
      } catch (error) {
        this.$toast.error("Error printing sale details");
      }
    },

    exportReport() {
      try {
        switch (this.selectedReportType) {
          case "sales":
            this.$store.dispatch("reports/exportSalesReport", this.dateRange);
            break;
          case "inventory":
            this.$store.dispatch("reports/exportInventoryReport");
            break;
        }
      } catch (error) {
        this.$toast.error("Error exporting report");
      }
    },
  },

  watch: {
    selectedReportType: {
      immediate: true,
      handler() {
        this.generateReport();
      },
    },
  },
};
</script>

<style scoped>
.v-card__text {
  padding-top: 16px;
  padding-bottom: 16px;
}

.v-card__title {
  padding: 16px;
}

@media print {
  .v-app-bar,
  .v-navigation-drawer,
  .no-print {
    display: none !important;
  }

  .v-main {
    padding: 0 !important;
  }
}

.text-h4 {
  font-weight: 500;
}

.v-data-table ::v-deep .v-data-table__wrapper {
  overflow-x: auto;
}

.v-chip {
  font-weight: 500;
}
</style>
