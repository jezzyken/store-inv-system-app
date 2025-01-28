<template>
  <div class="main-container">
    <!-- Summary Cards -->
    <v-row>
      <v-col cols="12" md="3" v-for="(card, i) in summaryCards" :key="i">
        <v-card height="150" class="pa-5" :class="card.class">
          <span class="text-h6 text-uppercase">{{ card.title }}</span>
          <div
            class="d-flex justify-space-between align-center"
            style="height: calc(100% - 25px)"
          >
            <div>
              <span class="text-h3">{{ card.value }}</span>
              <div class="text-caption">{{ card.subtitle }}</div>
            </div>
            <div>
              <v-icon class="card-icon" :color="card.iconColor">{{
                card.icon
              }}</v-icon>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts and Stats -->
    <v-row class="mt-6">
      <!-- Sales Chart -->
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            Sales Overview
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="selectedPeriod" mandatory>
              <v-btn small value="week">Week</v-btn>
              <v-btn small value="month">Month</v-btn>
              <v-btn small value="year">Year</v-btn>
            </v-btn-toggle>
          </v-card-title>
          <v-card-text>
            <div class="chart-container">
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
        <v-card height="100%">
          <v-card-title>Top Products</v-card-title>
          <v-list>
            <v-list-item v-for="(product, index) in topProducts" :key="index">
              <v-list-item-avatar>
                <v-avatar color="grey lighten-2">{{ index + 1 }}</v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ product.product.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  Qty: {{ product.totalQuantity }} | Revenue: ₱{{ formatNumber(product.totalRevenue) }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- Inventory and Status -->
    <v-row class="mt-6">
      <!-- Low Stock Items -->
      <!-- <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            Low Stock Items
            <v-spacer></v-spacer>
            <v-btn color="primary" small @click="viewAllInventory">
              View All
            </v-btn>
          </v-card-title>
          <v-data-table
            :headers="lowStockHeaders"
            :items="inventoryStatus.lowStockItems"
            :items-per-page="5"
            dense
          ></v-data-table>
        </v-card>
      </v-col> -->

      <!-- Credit Status -->
      <!-- <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Credit Status</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6" class="text-center">
                <v-progress-circular
                  :size="100"
                  :width="15"
                  :value="creditUtilization"
                  color="primary"
                >
                  {{ creditUtilization }}%
                </v-progress-circular>
                <div class="mt-2">Credit Utilization</div>
              </v-col>
              <v-col cols="6">
                <div class="credit-stats">
                  <div class="mb-2">
                    <strong>Total Credit:</strong><br />
                    ₱{{ formatNumber(creditSummary.debtorsSummary.totalCreditLimit) }}
                  </div>
                  <div>
                    <strong>Available:</strong><br />
                    ₱{{ formatNumber(creditSummary.debtorsSummary.totalAvailableCredit) }}
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col> -->
    </v-row>
  </div>
</template>

<script>
import { Line, mixins } from 'vue-chartjs'
import { mapState } from 'vuex'

const LineChart = {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}

export default {
  name: 'DashboardView',
  components: {
    LineChart
  },

  data() {
    return {
      selectedPeriod: 'month',
      lowStockHeaders: [
        { text: 'Product', value: 'name' },
        { text: 'Current Stock', value: 'stocks' },
        { text: 'Alert Level', value: 'stockAlert' }
      ],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function(value) {
                return '₱' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              }
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem) {
              return '₱' + tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
          }
        }
      }
    }
  },

  computed: {
    ...mapState('dashboard', [
      'summary',
      'salesStats',
      'topProducts',
      'creditSummary',
      'inventoryStatus'
    ]),

    summaryCards() {
      return [
        {
          title: "Today's Sales",
          value: `₱${this.formatNumber(this.summary.todaySales)}`,
          subtitle: `${this.summary.totalProducts} total products`,
          icon: "mdi-currency-usd",
          class: "dashboard-card-sales",
          iconColor: "green"
        },
        {
          title: "Products",
          value: this.summary.totalProducts,
          subtitle: `${this.summary.lowStockProducts} low stock items`,
          icon: "mdi-package-variant-closed",
          class: "dashboard-card-products",
          iconColor: "purple"
        },
        {
          title: "Credit Sales",
          value: `₱${this.formatNumber(this.summary.creditSales)}`,
          subtitle: `${this.summary.totalDebtors} debtors`,
          icon: "mdi-credit-card-outline",
          class: "dashboard-card-credit",
          iconColor: "orange"
        },
        {
          title: "Inventory Value",
          value: `₱${this.formatNumber(this.inventoryStatus?.inventoryStats?.totalValue || 0)}`,
          subtitle: `${this.inventoryStatus?.inventoryStats?.totalItems || 0} items`,
          icon: "mdi-warehouse",
          class: "dashboard-card-inventory",
          iconColor: "blue"
        }
      ];
    },

    chartData() {
      if (!this.salesStats.length) return null;
      
      return {
        labels: this.salesStats.map(stat => stat._id),
        datasets: [{
          label: 'Sales',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(54, 162, 235, 1)',
          data: this.salesStats.map(stat => stat.totalSales)
        }]
      };
    },

    creditUtilization() {
      const { totalCreditLimit, totalAvailableCredit } = this.creditSummary.debtorsSummary;
      return Math.round(((totalCreditLimit - totalAvailableCredit) / totalCreditLimit) * 100);
    }
  },

  methods: {
    formatNumber(number) {
      return new Intl.NumberFormat().format(number || 0);
    },
    
    async fetchDashboardData() {
      try {
        await this.$store.dispatch('dashboard/fetchAllDashboardData');
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    },

    viewAllInventory() {
      this.$router.push('/inventory');
    }
  },

  watch: {
    selectedPeriod: {
      handler(newPeriod) {
        this.$store.dispatch('dashboard/getSalesStats', { period: newPeriod });
      },
      immediate: true
    }
  },

  created() {
    this.fetchDashboardData();
  }
}
</script>

<style scoped>
.main-container {
  margin: 20px;
}

.dashboard-card-sales {
  border-bottom: rgb(0, 165, 74) 10px solid;
}

.dashboard-card-products {
  border-bottom: rgb(132, 73, 243) 10px solid;
}

.dashboard-card-credit {
  border-bottom: rgb(243, 172, 73) 10px solid;
}

.dashboard-card-inventory {
  border-bottom: rgb(41, 98, 255) 10px solid;
}

.card-icon {
  font-size: 50px;
}

.chart-container {
  height: 350px;
  position: relative;
}

.credit-stats {
  padding: 20px;
  font-size: 1.1em;
}

.v-card {
  transition: transform 0.2s;
}

.v-card:hover {
  transform: translateY(-5px);
}
</style>