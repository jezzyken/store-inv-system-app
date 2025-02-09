<template>
  <v-dialog v-model="dialog" max-width="400" persistent>
    <v-card>
      <v-card-title class="primary white--text">
        Pay Debt
        <v-spacer></v-spacer>
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pt-4">
        <div class="debtor-info mb-4">
          <div class="text-subtitle-1 font-weight-medium">
            {{ debtor.name }}
          </div>
          <div class="caption">Outstanding Balance: ₱{{ balance }}</div>
          <div class="caption">Credit Limit: ₱{{ debtor.creditLimit }}</div>
        </div>

        <v-tabs v-model="paymentTab" grow>
          <v-tab v-for="type in paymentTypes" :key="type">
            <v-icon left>{{ getPaymentIcon(type) }}</v-icon>
            {{ type }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="paymentTab" class="mt-4">
          <v-tab-item>
            <v-text-field
              v-model.number="amountPaid"
              label="Amount to Pay"
              prefix="₱"
              type="number"
              outlined
              @input="validateAmount"
              :error-messages="amountError"
            ></v-text-field>
          </v-tab-item>

          <v-tab-item>
            <v-text-field
              v-model="referenceNo"
              label="GCash Reference Number"
              outlined
              :rules="[(v) => !!v || 'Reference number is required']"
              class="mb-3"
            ></v-text-field>
            <v-text-field
              v-model.number="amountPaid"
              label="Amount to Pay"
              prefix="₱"
              type="number"
              outlined
              @input="validateAmount"
              :error-messages="amountError"
            ></v-text-field>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-btn text @click="closeDialog">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          :disabled="!isPaymentValid"
          :loading="processing"
          @click="processPayment"
        >
          Confirm Payment
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "PayDebtDialog",

  props: {
    value: Boolean,
    debtor: {
      type: Object,
    },
  },

  data() {
    return {
      dialog: false,
      paymentTab: 0,
      paymentTypes: ["Cash", "Gcash"],
      amountPaid: 0,
      amountError: "",
      referenceNo: "",
      processing: false,
    };
  },

  computed: {
    isPaymentValid() {
      if (!this.amountPaid || this.amountPaid <= 0 || this.amountError)
        return false;

      if (this.paymentTypes[this.paymentTab] === "Gcash") {
        return Boolean(this.referenceNo && this.referenceNo.length > 0);
      }

      return true;
    },

    balance() {
      const creditLimit = Number(this.debtor?.creditLimit) || 0;
      const availableCredit = Number(this.debtor?.availableCredit) || 0;
      return Math.max(0, creditLimit - availableCredit);
    },
  },

  watch: {
    value(val) {
      this.dialog = Boolean(val);
    },
    dialog(val) {
      this.$emit("input", Boolean(val));
      if (!val) this.resetForm();
    },
  },

  methods: {
    getPaymentIcon(type) {
      return (
        {
          Cash: "mdi-cash",
          Gcash: "mdi-cellphone",
        }[type] || "mdi-help"
      );
    },

    validateAmount(amount) {
      if (amount < 0) {
        this.amountError = "Amount cannot be negative";
      } else if (amount > this.balance) {
        this.amountError = "Amount exceeds outstanding balance";
      } else {
        this.amountError = "";
      }
    },

    resetForm() {
      this.amountPaid = 0;
      this.amountError = "";
      this.referenceNo = "";
      this.paymentTab = 0;
    },

    closeDialog() {
      this.dialog = false;
    },

    async processPayment() {
      if (!this.isPaymentValid || this.processing) return;

      this.processing = true;
      try {
        const paymentData = {
          debtor: this.debtor._id,
          amount: this.amountPaid,
          paymentMethod: this.paymentTypes[this.paymentTab],
          referenceNumber: this.referenceNo,
          notes: "Debt Payment",
        };

        await this.$store.dispatch("debtorPayment/addPayment", paymentData);
        this.$emit("payment-success");
        this.closeDialog();
      } catch (error) {
        this.$emit("payment-error", error);
      } finally {
        this.processing = false;
      }
    },
  },
};
</script>
