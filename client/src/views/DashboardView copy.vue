<template>
  <div class="main-container pa-6">
    <!-- Summary Cards Row -->
    <v-row>
      <v-col cols="12" sm="6" md="3" v-for="(card, i) in summaryCards" :key="i">
        <v-card height="150" class="pa-5" :class="card.class" elevation="2">
          <div class="text-subtitle-1 font-weight-bold text-uppercase mb-2">
            {{ card.title }}
          </div>
          <div
            class="d-flex justify-space-between align-center"
            style="height: 70%"
          >
            <div>
              <div class="text-h4 font-weight-bold">{{ card.value }}</div>
              <div class="text-caption mt-1">{{ card.subtitle }}</div>
            </div>
            <v-icon :color="card.iconColor" size="48">{{ card.icon }}</v-icon>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts Row -->
    <v-row class="mt-6">
      <!-- Sales Overview Chart -->
      <v-col cols="12" md="8">
        <v-card elevation="2">
          <v-card-title class="d-flex align-center">
            Sales Overview
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="selectedPeriod" mandatory dense>
              <v-btn value="week" small>Week</v-btn>
              <v-btn value="month" small>Month</v-btn>
              <v-btn value="year" small>Year</v-btn>
            </v-btn-toggle>
          </v-card-title>
          <v-card-text>
            <div style="height: 350px">
              <line-chart
                v-if="chartData"
                :chart-data="chartData"
                :options="chartOptions"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Top Products -->
      <v-col cols="12" md="4">
        <v-card height="100%" elevation="2">
          <v-card-title>Top Products</v-card-title>
          <v-list>
            <v-list-item v-for="(product, index) in topProducts" :key="index">
              <v-list-item-avatar>
                <v-avatar color="primary" size="40">
                  <span class="white--text">{{ index + 1 }}</span>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium">
                  {{ product.product.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="mt-1">
                  Qty: {{ product.totalQuantity }} 
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
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
        { text: "Product", value: "name" },
        { text: "Current Stock", value: "stocks" },
        { text: "Alert Level", value: "stockAlert" },
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
                  return (
                    "₱" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  );
                },
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem) {
              return (
                "₱" +
                tooltipItem.yLabel
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              );
            },
          },
        },
      },
    };
  },

  computed: {
    ...mapState("dashboard", [
      "summary",
      "salesStats",
      "topProducts",
      "creditSummary",
      "inventoryStatus",
    ]),

    summaryCards() {
      return [
        {
          title: "Today's Sales",
          value: `₱${this.formatNumber(this.summary.todaySales)}`,
          subtitle: `${this.summary.totalProducts} total products`,
          icon: "mdi-currency-usd",
          class: "dashboard-card-sales",
          iconColor: "green",
        },
        {
          title: "Products",
          value: this.summary.totalProducts,
          subtitle: `${this.summary.lowStockProducts} low stock items`,
          icon: "mdi-package-variant-closed",
          class: "dashboard-card-products",
          iconColor: "purple",
        },
        {
          title: "Credit Sales",
          value: `₱${this.formatNumber(this.summary.creditSales)}`,
          subtitle: `${this.summary.totalDebtors} debtors`,
          icon: "mdi-credit-card-outline",
          class: "dashboard-card-credit",
          iconColor: "orange",
        },
        {
          title: "Inventory Value",
          value: `₱${this.formatNumber(
            this.inventoryStatus?.inventoryStats?.totalValue || 0
          )}`,
          subtitle: `${
            this.inventoryStatus?.inventoryStats?.totalItems || 0
          } items`,
          icon: "mdi-warehouse",
          class: "dashboard-card-inventory",
          iconColor: "blue",
        },
      ];
    },

    chartData() {
      if (!this.salesStats.length) return null;

      return {
        labels: this.salesStats.map((stat) => stat._id),
        datasets: [
          {
            label: "Sales",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
            pointBackgroundColor: "rgba(54, 162, 235, 1)",
            data: this.salesStats.map((stat) => stat.totalSales),
          },
        ],
      };
    },

    creditUtilization() {
      const { totalCreditLimit, totalAvailableCredit } =
        this.creditSummary.debtorsSummary;
      return Math.round(
        ((totalCreditLimit - totalAvailableCredit) / totalCreditLimit) * 100
      );
    },
  },

  methods: {
    formatNumber(number) {
      return new Intl.NumberFormat().format(number || 0);
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

  watch: {
    selectedPeriod: {
      handler(newPeriod) {
        this.$store.dispatch("dashboard/getSalesStats", { period: newPeriod });
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
.main-container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.dashboard-card-sales {
  border-left: 4px solid rgb(0, 165, 74);
  transition: transform 0.2s;
}

.dashboard-card-products {
  border-left: 4px solid rgb(132, 73, 243);
  transition: transform 0.2s;
}

.dashboard-card-credit {
  border-left: 4px solid rgb(243, 172, 73);
  transition: transform 0.2s;
}

.dashboard-card-inventory {
  border-left: 4px solid rgb(41, 98, 255);
  transition: transform 0.2s;
}

.v-card:hover {
  transform: translateY(-4px);
}
</style>
