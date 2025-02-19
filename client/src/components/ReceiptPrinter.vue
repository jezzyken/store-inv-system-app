<!-- components/ReceiptPrinter.vue -->
<template>
  <div>
    <v-dialog v-model="showPreview" max-width="400">
      <v-card>
        <v-card-title class="primary white--text">
          Receipt Preview
          <v-spacer></v-spacer>
          <v-btn icon dark @click="closePreview">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-4">
          <!-- Receipt Preview Content -->
          <div class="receipt-preview" ref="receiptContent">
            <div class="text-center mb-4">
              <h2 class="text-h6 mb-1">DADAY STORE</h2>
              <!-- <div class="caption">Malandag, Malungon, Sar. Prov</div> -->
              <div class="caption">Contact: 123-456-789</div>
            </div>

            <div class="mb-3">
              <div class="d-flex justify-space-between caption">
                <span>Date: {{ formatDate(receipt.date) }}</span>
                <span>Receipt #: {{ receipt.receiptNumber }}</span>
              </div>
              <!-- <div class="caption">Cashier: {{ receipt.cashier }}</div> -->
              <div class="caption">Customer: {{ receipt.customer }}</div>
            </div>

            <v-divider class="my-2"></v-divider>

            <!-- Items -->
            <div class="items-section mb-3">
              <div
                v-for="(item, index) in receipt.items"
                :key="index"
                class="mb-1"
              >
                <div class="item-name">{{ item.name }}</div>
                <div class="d-flex justify-space-between caption">
                  <span
                    >{{ item.quantity }} x ₱{{ item.price.toFixed(2) }}</span
                  >
                  <span>₱{{ (item.quantity * item.price).toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <v-divider class="my-2"></v-divider>

            <!-- Totals -->
            <div class="totals-section mb-3">
              <div class="d-flex justify-space-between">
                <span>Subtotal:</span>
                <span>₱{{ receipt.subtotal.toFixed(2) }}</span>
              </div>
              <div class="d-flex justify-space-between font-weight-bold">
                <span>Total:</span>
                <span>₱{{ receipt.total.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Payment Details -->
            <div class="payment-section mb-3">
              <div class="d-flex justify-space-between">
                <span>Payment Type:</span>
                <span>{{ receipt.paymentType }}</span>
              </div>
              <div class="d-flex justify-space-between">
                <span>Amount Paid:</span>
                <span>₱{{ receipt.amountPaid.toFixed(2) }}</span>
              </div>
              <template v-if="receipt.paymentType !== 'Credit'">
                <div class="d-flex justify-space-between">
                  <span>Change:</span>
                  <span>₱{{ receipt.change.toFixed(2) }}</span>
                </div>
              </template>
              <template v-if="receipt.paymentType === 'Gcash'">
                <div class="d-flex justify-space-between">
                  <span>Reference No:</span>
                  <span>{{ receipt.referenceNo }}</span>
                </div>
              </template>
            </div>

            <v-divider class="my-2"></v-divider>

            <div class="text-center caption mt-4">
              <div>Thank you for your purchase!</div>
              <div>Please come again</div>
            </div>
          </div>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="closePreview"> Close </v-btn>
          <v-btn color="primary" @click="printReceipt">
            <v-icon left>mdi-printer</v-icon>
            Print
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ReceiptPrinter",
  props: {
    receipt: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      showPreview: false,
      lastUsedDevice: null,
    };
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    showReceiptPreview() {
      this.showPreview = true;
    },
    closePreview() {
      this.showPreview = false;
    },
    // printReceipt() {
    //   const printContent = this.$refs.receiptContent.innerHTML;
    //   const printWindow = window.open('', '_blank');

    //   printWindow.document.write(`
    //     <html>
    //       <head>
    //         <title>Print Receipt</title>
    //         <style>
    //           body {
    //             font-family: 'Courier New', monospace;
    //             font-size: 12px;
    //             padding: 20px;
    //             max-width: 300px;
    //             margin: 0 auto;
    //           }
    //           .receipt-preview {
    //             width: 100%;
    //           }
    //           .text-center {
    //             text-align: center;
    //           }
    //           .mb-1 { margin-bottom: 4px; }
    //           .mb-2 { margin-bottom: 8px; }
    //           .mb-3 { margin-bottom: 12px; }
    //           .mb-4 { margin-bottom: 16px; }
    //           .d-flex {
    //             display: flex;
    //             justify-content: space-between;
    //           }
    //           .caption {
    //             font-size: 11px;
    //           }
    //           .divider {
    //             border-top: 1px dashed #000;
    //             margin: 8px 0;
    //           }
    //           .font-weight-bold {
    //             font-weight: bold;
    //           }
    //           @media print {
    //             @page {
    //               size: 57mm 40mm;
    //               margin: 0;
    //             }
    //             body {
    //               width: 57mm;
    //             }
    //           }
    //         </style>
    //       </head>
    //       <body>
    //         ${printContent}
    //       </body>
    //     </html>
    //   `);

    //   printWindow.document.close();
    //   printWindow.focus();

    //   // Print the document
    //   setTimeout(() => {
    //     printWindow.print();
    //     printWindow.close();
    //   }, 250);
    // }

    async sendToPrinter(characteristic, content) {
      const chunkSize = 512;
      for (let i = 0; i < content.length; i += chunkSize) {
        const chunk = content.slice(i, i + chunkSize);
        await characteristic.writeValue(new TextEncoder().encode(chunk));
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    },

    async printReceipt() {
      try {
        if (!this.lastUsedDevice || !this.lastUsedDevice.gatt.connected) {
          this.lastUsedDevice = await navigator.bluetooth.requestDevice({
            filters: [{ services: ["000018f0-0000-1000-8000-00805f9b34fb"] }],
          });
        }

        const server = await this.lastUsedDevice.gatt.connect();
        const service = await server.getPrimaryService(
          "000018f0-0000-1000-8000-00805f9b34fb"
        );
        const characteristic = await service.getCharacteristic(
          "00002af1-0000-1000-8000-00805f9b34fb"
        );

        const formatRightAlign = (label, value) => {
          const spaces = 32 - label.length - value.length;
          return `${label}${" ".repeat(spaces)}${value}\n`;
        };

        const content = [
          "\x1B\x40",
          "\x1B\x61\x01",
          "DADAY STORE\n",
          //  "Malandag, Malungon, Sarangani Province\n",
          "Contact: 123-456-789\n\n",

          "\x1B\x61\x00",
          `Date: ${this.formatDate(this.receipt.date)}\n`,
          `Receipt #: ${this.receipt.receiptNumber}\n`,
          `Customer: ${this.receipt.customer}\n\n`,

          "-".repeat(32) + "\n",

          ...this.receipt.items.map((item) => {
            const name = item.name.substring(0, 32);
            const qty = `${item.quantity}x   ${item.price.toFixed(2)}`;
            const total = (item.quantity * item.price).toFixed(2);
            const spaces = 32 - qty.length - total.length;
            return `${name}\n${qty}${" ".repeat(spaces)}${total}\n`;
          }),

          "-".repeat(32) + "\n",

          formatRightAlign("Subtotal:", this.receipt.subtotal.toFixed(2)),
          formatRightAlign("Total:", this.receipt.total.toFixed(2)),
          "\n",
          formatRightAlign("Payment:", this.receipt.paymentType),
          formatRightAlign("Paid:", this.receipt.amountPaid.toFixed(2)),
          this.receipt.paymentType !== "Credit"
            ? formatRightAlign("Change:", this.receipt.change.toFixed(2))
            : "",
          this.receipt.paymentType === "Gcash"
            ? formatRightAlign("Ref No:", this.receipt.referenceNo)
            : "",

          "\x1B\x61\x01",
          "\nThank you for your purchase!\n",
          "Please come again\n",
          "\n\n\n\n\x1D\x56\x41",
        ].join("");

        await this.sendToPrinter(characteristic, content);
        this.closePreview();
      } catch (error) {
        console.error("Printing failed:", error);
        alert("Printing failed. Please check printer connection.");
      }
    },
  },
};
</script>

<style scoped>
.receipt-preview {
  font-family: "Courier New", monospace;
  font-size: 12px;
}

.item-name {
  font-size: 12px;
  font-weight: 500;
}

.totals-section,
.payment-section {
  font-size: 12px;
}
</style>
