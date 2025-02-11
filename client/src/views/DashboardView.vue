<!-- eslint-disable-next-line  -->
<!-- eslint-disable  -->
<template>
  <div class="dashboard-container pa-6">
    <!-- Header Section -->
    <v-row class="mb-6">
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center">
          <div>
            <h1 class="text-h4 font-weight-bold mb-1">Analytics Dashboard</h1>
            <span class="text-subtitle-2 grey--text">
              Last updated {{ formatTime(Date.now()) }}
            </span>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Statistics Overview Section -->
    <section class="statistics-overview mb-6">
      <v-card class="stats-container" elevation="2">
        <div class="stats-header px-6 py-4">
          <div class="d-flex align-center justify-space-between">
            <div>
              <h2 class="text-h6 font-weight-bold">Performance Overview</h2>
            </div>
            <!-- <v-btn color="primary" small text @click="refreshStats">
              <v-icon small left>mdi-refresh</v-icon>
              Refresh
            </v-btn> -->
          </div>
        </div>

        <v-divider></v-divider>

        <div class="stats-grid pa-6">
          <!-- Revenue Section -->
          <div class="stat-group">
            <div class="stat-header">
              <span class="stat-label">Revenue Performance</span>
            </div>

            <div class="stat-content">
              <div class="main-stat">
                <span class="value"
                  >₱{{ formatNumber(summary.todaySales) }}</span
                >
                <!-- <span class="trend success--text">
                  <v-icon small color="success">mdi-arrow-up</v-icon>
                  12.5%
                </span> -->
              </div>
              <div class="sub-stats">
                <div class="sub-stat">
                  <span class="label">Average Sales</span>
                  <span class="value"
                    >₱{{ formatNumber(getAverageOrderValue) }}</span
                  >
                </div>
                <div class="sub-stat">
                  <span class="label">Sales from last 30 days</span>
                  <span class="value">{{ getTotalOrders }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Inventory Section -->
          <div class="stat-group">
            <div class="stat-header">
              <span class="stat-label">Inventory Status</span>
              <v-chip
                x-small
                :color="getLowStockSeverity"
                v-if="summary.lowStockProducts"
                dark
              >
                {{ summary.lowStockProducts }} alerts
              </v-chip>
            </div>

            <div class="stat-content">
              <div class="main-stat">
                <span class="value">{{
                  formatNumber(inventoryStatus?.inventoryStats?.totalItems || 0)
                }}</span>
                <span class="trend">Total Items</span>
              </div>
              <div class="sub-stats">
                <div class="sub-stat">
                  <span class="label">Total Value</span>
                  <span class="value"
                    >₱{{
                      formatNumber(
                        inventoryStatus?.inventoryStats?.totalValue || 0
                      )
                    }}</span
                  >
                </div>
                <div class="sub-stat">
                  <span class="label">Avg. Item Value</span>
                  <span class="value"
                    >₱{{
                      formatNumber(
                        inventoryStatus?.inventoryStats?.averagePrice || 0
                      )
                    }}</span
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Credit Status Section -->
          <div class="stat-group">
            <div class="stat-header">
              <span class="stat-label">Credit & Debtors</span>
              <v-progress-linear
                :value="creditUtilization"
                height="4"
                :color="getCreditColor(creditUtilization)"
                class="mt-1"
              ></v-progress-linear>
            </div>

            <div class="stat-content">
              <div class="main-stat">
                <span class="value"
                  >₱{{ formatNumber(summary.creditSales) }}</span
                >
                <span class="trend">Overall Used Credit</span>
              </div>
              <div class="sub-stats">
                <div class="sub-stat">
                  <span class="label">Active Debtors</span>
                  <span class="value">{{
                    formatNumber(summary.totalDebtors)
                  }}</span>
                </div>
                <div class="sub-stat">
                  <span class="label">Credit Usage</span>
                  <span class="value">{{ creditUtilization }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </section>

    <!-- Charts & Tables Section -->
    <v-row>
      <!-- Sales Chart -->
      <v-col cols="12" lg="6">
        <!-- <v-card class="mb-6" elevation="2">
          <v-card-title class="py-4 px-6">
            <div>
              <div class="text-h6 font-weight-bold">Sales Trends</div>
              <div class="text-caption grey--text">
                Revenue analysis over time
              </div>
            </div>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-6">
            <div style="height: 400px">
              <line-chart
                v-if="chartData"
                :chart-data="chartData"
                :options="chartOptions"
              />
            </div>
          </v-card-text>
        </v-card> -->

        <!-- Low Stock Table -->
        <v-card elevation="2">
          <v-card-title class="py-4 px-6">
            <div>
              <div class="text-h6 font-weight-bold">Inventory Alerts</div>
              <div class="text-caption grey--text">
                Items requiring attention
              </div>
            </div>
            <v-spacer></v-spacer>
            <!-- <v-btn color="primary" small text @click="viewAllInventory">
              View All
              <v-icon small class="ml-1">mdi-arrow-right</v-icon>
            </v-btn> -->
          </v-card-title>
          <v-divider></v-divider>
          <v-data-table
            :headers="lowStockHeaders"
            :items="inventoryStatus.lowStockItems"
            :items-per-page="5"
            dense
          >
            <template v-slot:item.name="{ item }">
              <div>
                {{ item.name }}
                <div v-if="item.type === 'Variants' && item.variants">
                  <div
                    v-for="variant in item.variants"
                    :key="variant.name"
                    class="pl-4 grey--text text-caption"
                  >
                    {{ variant.name }}: {{ variant.stocks }}
                  </div>
                </div>
              </div>
            </template>
            <template v-slot:item.stocks="{ item }">
              <v-chip
                small
                :color="getStockLevelColor(item.stocks, item.stockAlert)"
                dark
              >
                {{ item.stocks }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <!-- Right Sidebar -->
      <v-col cols="12" lg="3">
        <!-- Top Products -->
        <v-card class="mb-6" elevation="2">
          <v-card-title class="py-4">
            <div>
              <div class="text-h6 font-weight-bold">Top Products</div>
              <div class="text-caption grey--text">Best performing items</div>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-list>
            <v-list-item v-for="(product, index) in topProducts" :key="index">
              <v-list-item-avatar>
                <v-avatar :color="`primary darken-${index}`" size="40">
                  <span class="white--text">{{ index + 1 }}</span>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium">
                  {{ product.product.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="mt-1">
                  <v-chip x-small class="mr-2" color="success" dark>
                    {{ product.totalQuantity }} sold
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" lg="3">
        <!-- Credit Overview -->
        <v-card elevation="2">
          <v-card-title class="py-4 px-6">
            <div>
              <div class="text-h6 font-weight-bold">Credit Overview</div>
              <div class="text-caption grey--text">Credit usage analysis</div>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-6">
            <div class="d-flex justify-center align-center mb-4">
              <v-progress-circular
                :rotate="-90"
                :size="120"
                :width="15"
                :value="creditUtilization"
                :color="getCreditColor(creditUtilization)"
              >
                {{ creditUtilization }}%
              </v-progress-circular>
            </div>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-2">
                    Credit Limit
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-body-2">
                    ₱{{
                      formatNumber(
                        creditSummary.debtorsSummary.totalCreditLimit
                      )
                    }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-subtitle-2">
                    Available Credit
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-body-2">
                    ₱{{
                      formatNumber(
                        creditSummary.debtorsSummary.totalAvailableCredit
                      )
                    }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
/*eslint-disable */
import { Line, mixins } from "vue-chartjs";
import { mapState } from "vuex";

const LineChart = {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    options: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};

export default {
  name: "DashboardView",
  components: {
    LineChart,
  },

  data() {
    return {
      selectedPeriod: "month",
      lowStockHeaders: [
        { text: "Product", value: "name", width: "50%" },
        { text: "Current Stock", value: "stocks", align: "center" },
        { text: "Alert Level", value: "stockAlert", align: "center" },
      ],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                callback: function (value) {
                  return "₱" + new Intl.NumberFormat().format(value);
                },
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem) {
              return "₱" + new Intl.NumberFormat().format(tooltipItem.yLabel);
            },
          },
        },
        elements: {
          line: {
            tension: 0.4,
          },
          point: {
            radius: 4,
            hitRadius: 10,
            hoverRadius: 6,
          },
        },
      },
    };
  },

  methods: {
    formatNumber(number) {
      return new Intl.NumberFormat().format(number || 0);
    },

    formatTime(timestamp) {
      return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(timestamp);
    },

    getStockLevelColor(current, alert) {
      if (current <= alert * 0.5) return "error";
      if (current <= alert) return "warning";
      return "success";
    },

    getTotalStockValue(item) {
      if (item.type === "Variants" && item.variants) {
        return item.variants.reduce(
          (total, variant) => total + variant.stocks * variant.cost,
          0
        );
      }
      return item.stocks * item.cost;
    },

    getFormattedStock(item) {
      if (item.type === "Variants" && item.variants) {
        return item.variants.reduce(
          (total, variant) => total + variant.stocks,
          0
        );
      }
      return item.stocks;
    },

    getCreditColor(percentage) {
      if (percentage >= 80) return "error";
      if (percentage >= 60) return "warning";
      return "success";
    },

    downloadChartData() {
      // Implement chart data export
    },

    refreshChartData() {
      this.fetchDashboardData();
    },

    async fetchDashboardData() {
      try {
        await this.$store.dispatch("dashboard/fetchAllDashboardData");
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    },

    viewAllInventory() {
      this.$router.push("/inventory");
    },
  },

  computed: {
    ...mapState("dashboard", [
      "summary",
      "salesStats",
      "topProducts",
      "creditSummary",
      "inventoryStatus",
    ]),

    totalInventoryValue() {
      return this.inventoryStatus?.inventoryStats?.totalValue || 0;
    },

    averageItemValue() {
      return this.inventoryStatus?.inventoryStats?.averagePrice || 0;
    },

    totalInventoryItems() {
      return this.inventoryStatus?.inventoryStats?.totalItems || 0;
    },

    chartData() {
      if (!this.salesStats.length) return null;

      return {
        labels: this.salesStats.map((stat) =>
          new Date(stat._id).toLocaleDateString()
        ),
        datasets: [
          {
            label: "Sales",
            backgroundColor: "rgba(54, 162, 235, 0.1)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "rgba(54, 162, 235, 1)",
            data: this.salesStats.map((stat) => stat.totalSales),
            fill: true,
          },
        ],
      };
    },

    creditUtilization() {
      const { totalCreditLimit = 0, totalAvailableCredit = 0 } =
        this.creditSummary.debtorsSummary;
      return (
        Math.round(
          ((totalCreditLimit - totalAvailableCredit) / totalCreditLimit) * 100
        ) || 0
      );
    },

    getAverageOrderValue() {
      return this.summary.todaySales / this.getTotalOrders || 0;
    },

    getTotalOrders() {
      return this.salesStats.reduce((total, stat) => total + stat.count, 0);
    },

    getLowStockSeverity() {
      const ratio = this.summary.lowStockProducts / this.summary.totalProducts;
      if (ratio >= 0.2) return "error";
      if (ratio >= 0.1) return "warning";
      return "info";
    },
  },

  watch: {
    selectedPeriod: {
      handler(newPeriod) {
        this.$store.dispatch("dashboard/getSalesStats", newPeriod);
      },
      immediate: true,
    },
  },

  created() {
    this.fetchDashboardData();
  },
};
</script>

<style scoped>
.dashboard-container {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.period-toggle {
  background-color: white;
  border-radius: 4px;
}

.status-indicator {
  width: 40px;
  height: 4px;
  border-radius: 2px;
}

.status-indicator.success {
  background-color: var(--v-success-base);
}
.status-indicator.warning {
  background-color: var(--v-warning-base);
}
.status-indicator.info {
  background-color: var(--v-info-base);
}
.status-indicator.primary {
  background-color: var(--v-primary-base);
}

.performance-card,
.inventory-card,
.credit-card,
.inventory-value-card {
  height: 100%;
  transition: all 0.2s ease;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.card-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.metric-value {
  line-height: 1.2;
  color: var(--v-primary-darken1);
}

.metric-label {
  color: var(--v-grey-darken1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.metric-context {
  margin-top: auto;
}

.chart-card {
  border-radius: 8px;
}

.inventory-table {
  .v-data-table__wrapper {
    margin: 0 16px;
  }
}

.performance-card:hover,
.inventory-card:hover,
.credit-card:hover,
.inventory-value-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1) !important;
}

.statistics-overview {
  margin-bottom: 2rem;
}

.stats-container {
  border-radius: 12px;
  background: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.stat-group {
  position: relative;
}

.stat-group:not(:last-child)::after {
  content: "";
  position: absolute;
  right: -1rem;
  top: 0;
  height: 100%;
  width: 1px;
  background: #e0e0e0;
}

.stat-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #666;
}

.main-stat {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.main-stat .value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
}

.main-stat .trend {
  font-size: 0.875rem;
  color: #666;
}

.sub-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.sub-stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sub-stat .label {
  font-size: 0.75rem;
  color: #666;
}

.sub-stat .value {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1a1a1a;
}

@media (max-width: 960px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-group:nth-child(2)::after {
    display: none;
  }
}

@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .stat-group::after {
    display: none;
  }

  .dashboard-container {
    padding: 16px !important;
  }
}

@media (max-width: 960px) {
  .metric-value {
    font-size: 1.5rem !important;
  }

  .metric-label {
    font-size: 0.875rem !important;
  }
}

@media (max-width: 600px) {
  .dashboard-container {
    padding: 16px !important;
  }

  .summary-section {
    margin-bottom: 16px;
  }
}
</style>
