<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h2 class="headline">Product Management</h2>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="product.name"
                :rules="[rules.required]"
                label="Product Name"
                outlined
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="product.category"
                :items="categories"
                :rules="[rules.required]"
                label="Category"
                item-text="name"
                item-value="_id"
                outlined
                required
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="product.brand"
                :items="brands"
                :rules="[rules.required]"
                label="Brand"
                item-text="name"
                item-value="_id"
                outlined
                required
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="product.image"
                label="Image URL"
                placeholder="Enter image URL"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="product.details"
                label="Product Details"
                placeholder="Enter product details"
                outlined
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="product.type"
                :items="types"
                :rules="[rules.required]"
                label="Type"
                outlined
                required
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" v-if="product.type !== 'Variants'">
              <v-text-field
                v-model="product.upc"
                :rules="[rules.required]"
                label="UPC"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" v-if="product.type !== 'Variants'">
              <v-text-field
                v-model="product.cost"
                :rules="[rules.required]"
                label="Cost"
                type="number"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" v-if="product.type !== 'Variants'">
              <v-text-field
                v-model="product.price"
                :rules="[rules.required]"
                label="Price"
                type="number"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="product.unit"
                :items="units"
                :rules="[rules.required]"
                label="Unit"
                item-text="name"
                item-value="_id"
                outlined
                required
              ></v-select>
            </v-col>
            <v-col cols="12" md="6" v-if="product.type !== 'Variants'">
              <v-text-field
                v-model="product.stocks"
                :rules="[rules.required]"
                label="Initial Stocks"
                type="number"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="product.minimumSaleQty"
                :rules="[rules.required]"
                label="Minimum Sale Quantity"
                type="number"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="product.stockAlert"
                label="Stock Alert"
                type="number"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6" v-if="product.type === 'Variants'">
              <div class="d-flex">
                <v-text-field
                  v-model="newVariantName"
                  label="New Variant Name"
                  outlined
                ></v-text-field>
                <v-btn @click="createVariant" color="primary"
                  >Create Variant</v-btn
                >
              </div>
            </v-col>
            <v-col cols="12" v-if="product.type === 'Variants'">
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12" v-if="product.type === 'Variants'">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Variant Code</th>
                      <th class="text-left">Variant Name</th>
                      <th class="text-left">Variant Cost</th>
                      <th class="text-left">Variant Price</th>
                      <th class="text-left">Initial Stocks</th>
                      <th class="text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(variant, index) in product.variants"
                      :key="index"
                    >
                      <td class="pa-5">
                        <v-text-field
                          v-model="variant.upc"
                          outlined
                          required
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          v-model="variant.name"
                          outlined
                          required
                          disabled
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          v-model="variant.cost"
                          type="number"
                          outlined
                          required
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          v-model="variant.price"
                          type="number"
                          outlined
                          required
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                          v-model="variant.stocks"
                          type="Initial Stocks"
                          outlined
                          required
                        ></v-text-field>
                      </td>

                      <td>
                        <v-btn
                          class="mt-n8"
                          dark
                          color="error"
                          large
                          @click="removeVariant(stock, i)"
                        >
                          <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
            <v-row justify="end" class="ma-0 mt-6 mx-5 my-5">
              <v-btn dark :color="pageMode.color" @click="pageMode.action">{{
                pageMode.label
              }}</v-btn>
              <div class="ma-1"></div>
              <v-btn>clear</v-btn>
            </v-row>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    mode: String,
  },
  data() {
    return {
      valid: false,
      product: {
        name: "",
        upc: "",
        category: null,
        brand: null,
        image: "",
        details: "",
        type: "",
        cost: null,
        price: null,
        unit: null,
        minimumSaleQty: null,
        stocks: 0,
        stockAlert: 0,
        variants: [],
      },
      categories: [],
      brands: [],
      units: [],
      newVariantName: "",
      types: ["Standard", "Variants"],
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },

  computed: {
    pageMode() {
      let state = {
        color: "warning",
        action: this.onUpdateItem,
        label: "update",
      };
      if (this.mode === "add") {
        state = {
          color: "primary",
          action: this.onAddItem,
          label: "add",
        };
      }
      return state;
    },
  },

  methods: {
    ...mapActions({
      getItemById: "product/getItemById",
      getItemByProductId: "itemPrice/getItemByProductId",
      addItem: "product/addItem",
      updateItem: "product/updateItem",
      getCategoryItems: "category/getItem",
      getVariantItems: "variant/getItem",
      getUnitItems: "unit/getItem",
      getBrandItems: "brand/getItem",
      getSupplierItems: "supplier/getItem",
    }),

    async initialize() {
      const response = await this.getItemById(this.$route.params.id);
      this.product = {
        ...response.result,
        brand: response.result.brand._id,
        category: response.result.category._id,
        unit: response.result.unit._id,
      };
    },

    submit() {
      if (this.$refs.form.validate()) {
        console.log("Product submitted:", this.product);
      }
    },

    async onAddItem() {
      if (this.$refs.form.validate()) {
        await this.addItem({
          ...this.product,
        });
        this.$router.push("/product");
      }
    },

    async onUpdateItem() {
      const data = {
        id: this.$route?.params?.id,
        data: this.product,
      };

      console.log(data)

      await this.updateItem(data);
      this.$router.push("/product");
    },

    removeVariant(index) {
      this.product.variants.splice(index, 1);
    },
    createVariant() {
      if (this.newVariantName) {
        this.product.variants.push({
          code: "",
          name: `${this.product.name}-${this.newVariantName}`,
          cost: null,
          price: null,
        });
        this.newVariantName = "";
      }
    },

    async fetch() {
      const category = await this.getCategoryItems();
      const unit = await this.getUnitItems();
      const brand = await this.getBrandItems();

      this.categories = category.result;
      this.units = unit.result;
      this.brands = brand.result;
    },
  },
  mounted() {
    this.fetch();
    if (this.$route?.params?.id) {
      this.initialize();
    }
  },
};
</script>

<style scoped>
.headline {
  font-weight: bold;
  font-size: 1.5em;
  margin-bottom: 20px;
}

.v-btn:not(.v-btn--round).v-size--default {
  height: 55px;
  min-width: 64px;
  padding: 0 16px;
}
</style>
