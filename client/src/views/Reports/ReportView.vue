<!-- eslint-disable -->
<template>
  <v-container fluid>
    <!-- Report Type and Filters -->
    <v-card class="mb-4">
      <v-card-text>
        <v-row justify="end">
          <v-btn
            color="primary"
            @click="downloadPDF"
            :loading="downloading"
            class="mt-2"
          >
            <v-icon left>mdi-file</v-icon>
            export to pdf
          </v-btn>
        </v-row>
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
              <v-col cols="4">
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
              <v-col cols="4">
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
                >
                  search
                </v-btn>
              </v-col>
              <!-- <v-col cols="2">
                <v-btn
                  color="secondary"
                  @click="downloadPDF"
                  :loading="downloading"
                  class="mt-2"
                >
                  <v-icon left>mdi-file-pdf</v-icon>
                  PDF
                </v-btn>
              </v-col> -->
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
            <v-col cols="12" sm="6">Sales List</v-col>
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
            <v-icon small @click="printSale(item)">mdi-printer</v-icon>
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
            <v-col cols="12" sm="6">Inventory List</v-col>
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

    <!-- Debtor Report -->
    <template v-if="selectedReportType === 'debtor'">
      <v-card>
        <v-data-table
          :headers="debtorHeaders"
          :items="debtors"
          :search="search"
          :loading="loading"
        >
          <template v-slot:item.creditLimit="{ item }">
            ₱{{ formatNumber(item.creditLimit) }}
          </template>
          <template v-slot:item.availableCredit="{ item }">
            ₱{{ formatNumber(item.availableCredit) }}
          </template>
          <template v-slot:item.outstandingBalance="{ item }">
            ₱{{ formatNumber(item.creditLimit - item.availableCredit) }}
          </template>
          <template v-slot:item.status="{ item }">
            <v-chip
              :color="getStatusColor(item.creditLimit - item.availableCredit)"
            >
              {{ getPaymentStatus(item.creditLimit - item.availableCredit) }}
            </v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small @click="viewDebtorDetails(item)">mdi-eye</v-icon>
          </template>
        </v-data-table>
      </v-card>

      <v-dialog v-model="debtorDialog" max-width="900">
        <v-card v-if="selectedDebtor">
          <v-card-title>
            {{ selectedDebtor.name }} - Transaction History
            <v-spacer></v-spacer>
            <v-btn icon @click="debtorDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-data-table
              :headers="transactionHeaders"
              :items="flattenedTransactions"
              :loading="loading"
            >
              <template v-slot:item.date="{ item }">
                {{ formatDate(item.date) }}
              </template>
              <template v-slot:item.amount="{ item }">
                ₱{{ formatNumber(item.amount) }}
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-dialog>
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
import { mapState, mapActions } from "vuex";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  name: "ReportView",

  data() {
    return {
      selectedReportType: "sales",
      reportTypes: [
        { text: "Sales Report", value: "sales" },
        { text: "Inventory Report", value: "inventory" },
        { text: "Debtor Report", value: "debtor" },
      ],
      dateRange: {
        startDate: new Date().toISOString().slice(0, 10),
        endDate: new Date().toISOString().slice(0, 10),
      },
      startDateMenu: false,
      endDateMenu: false,
      loading: false,
      downloading: false,
      search: "",
      detailsDialog: false,
      selectedSale: null,
      selectedDebtor: null,
      debtorDialog: false,
      debtorHeaders: [
        { text: "Name", value: "name" },
        { text: "Credit Limit", value: "creditLimit", align: "right" },
        { text: "Available Credit", value: "availableCredit", align: "right" },
        {
          text: "Outstanding Balance",
          value: "outstandingBalance",
          align: "right",
        },
        { text: "Status", value: "status", align: "center" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      transactionHeaders: [
        { text: "Date", value: "date" },
        { text: "Reference", value: "reference" },
        { text: "Type", value: "type" },
        { text: "Amount", value: "amount", align: "right" },
      ],
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
      "debtorReport",
      "debtorSummary",
      "debtors",
      "debtorTransactions",
    ]),

    flattenedTransactions() {
      if (!this.debtorTransactions) return [];

      let transactions = [
        ...(this.debtorTransactions.creditSales || []).map((sale) => ({
          date: sale.date,
          reference: sale.referenceCode,
          type: "Credit Sale",
          amount: sale.salesTotal,
        })),
        ...(this.debtorTransactions.payments || []).map((payment) => ({
          date: payment.paymentDate,
          reference: payment.referenceNumber,
          type: "Payment",
          amount: payment.amount,
        })),
      ].sort((a, b) => new Date(a.date) - new Date(b.date));

      let balance = 0;
      return transactions.map((t) => {
        balance += t.type === "Credit Sale" ? t.amount : -t.amount;
        return { ...t, balance };
      });
    },
  },

  methods: {
    ...mapActions({
      getItems: "debtor/getDebtors",
    }),

    async downloadPDF() {
      this.downloading = true;
      try {
        const doc = new jsPDF();
        const title = `${this.selectedReportType.toUpperCase()} REPORT`;

        doc.setFontSize(16);
        doc.text(title, 15, 15);

        switch (this.selectedReportType) {
          case "sales":
            await this.generateSalesPDF(doc);
            break;
          case "inventory":
            await this.generateInventoryPDF(doc);
            break;
          case "debtor":
            await this.generateDebtorPDF(doc);
            break;
        }

        doc.save(
          `${this.selectedReportType}_report_${new Date()
            .toISOString()
            .slice(0, 10)}.pdf`
        );
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        this.downloading = false;
      }
    },

    generateSalesPDF(doc) {
      // Add date range
      doc.setFontSize(12);
      doc.text(
        `Period: ${this.formatDate(
          this.dateRange.startDate
        )} - ${this.formatDate(this.dateRange.endDate)}`,
        15,
        25
      );

      // Add summary
      if (this.salesSummary) {
        doc.autoTable({
          startY: 35,
          head: [
            ["Total Sales", "Total Revenue", "Total Profit", "Average Profit"],
          ],
          body: [
            [
              this.salesSummary.totalSales,
              `₱${this.formatNumber(this.salesSummary.totalRevenue)}`,
              `₱${this.formatNumber(this.salesSummary.totalProfit)}`,
              `₱${this.formatNumber(this.salesSummary.averageProfit)}`,
            ],
          ],
          theme: "grid",
          headStyles: { fillColor: [71, 71, 71] },
        });
      }

      // Add sales list
      if (this.salesReport && this.salesReport.length > 0) {
        const tableBody = this.salesReport.map((item) => [
          this.formatDate(item.date),
          item.referenceCode,
          item.customer,
          item.paymentType,
          `₱${this.formatNumber(item.totalRevenue)}`,
          `₱${this.formatNumber(item.profit)}`,
        ]);

        doc.autoTable({
          startY: doc.previousAutoTable.finalY + 15,
          head: [
            ["Date", "Reference", "Customer", "Payment", "Revenue", "Profit"],
          ],
          body: tableBody,
          theme: "grid",
          headStyles: { fillColor: [71, 71, 71] },
        });
      }
    },

    generateInventoryPDF(doc) {
      if (this.inventorySummary) {
        doc.autoTable({
          startY: 25,
          head: [
            [
              "Total Products",
              "Total Stock",
              "Low Stock Items",
              "Inventory Value",
            ],
          ],
          body: [
            [
              this.inventorySummary.totalProducts,
              this.inventorySummary.totalStock,
              this.inventorySummary.lowStockItems,
              `₱${this.formatNumber(this.inventorySummary.inventoryValue)}`,
            ],
          ],
          theme: "grid",
          headStyles: { fillColor: [71, 71, 71] },
        });
      }

      if (this.inventoryReport && this.inventoryReport.length > 0) {
        const tableBody = this.inventoryReport.map((item) => [
          item.name,
          item.category,
          item.brand,
          item.totalStock,
          `₱${this.formatNumber(item.cost)}`,
          `₱${this.formatNumber(item.price)}`,
        ]);

        doc.autoTable({
          startY: doc.previousAutoTable.finalY + 15,
          head: [["Product", "Category", "Brand", "Stock", "Cost", "Price"]],
          body: tableBody,
          theme: "grid",
          headStyles: { fillColor: [71, 71, 71] },
        });
      }
    },

    generateDebtorPDF(doc) {
      if (this.debtors && this.debtors.length > 0) {
        const tableBody = this.debtors.map((debtor) => {
          const outstandingBalance =
            debtor.creditLimit - debtor.availableCredit;
          return [
            debtor.name,
            `₱${this.formatNumber(debtor.creditLimit)}`,
            `₱${this.formatNumber(debtor.availableCredit)}`,
            `₱${this.formatNumber(outstandingBalance)}`,
            this.getPaymentStatus(outstandingBalance),
          ];
        });

        doc.autoTable({
          startY: 25,
          head: [
            [
              "Name",
              "Credit Limit",
              "Available Credit",
              "Outstanding Balance",
              "Status",
            ],
          ],
          body: tableBody,
          theme: "grid",
          headStyles: { fillColor: [71, 71, 71] },
        });
      }
    },

    getStatusColor(availableCredit) {
      return availableCredit > 0 ? "error" : "success";
    },

    getPaymentStatus(availableCredit) {
      return availableCredit > 0 ? "Unpaid" : "Paid";
    },

    async viewDebtorDetails(debtor) {
      this.selectedDebtor = debtor;
      this.loading = true;
      try {
        await this.$store.dispatch("reports/getDebtorTransactions", debtor._id);
        this.debtorDialog = true;
      } catch (error) {
        console.error("Error loading transactions:", error);
      } finally {
        this.loading = false;
      }
    },

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
          case "debtor":
            await this.$store.dispatch("reports/getDebtorReport");
            break;
        }
      } catch (error) {
        console.error("Error generating report:", error);
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
        window.print();
      } catch (error) {
        console.error("Error printing sale details:", error);
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
