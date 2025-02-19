<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h2 class="headline">Product Management</h2>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-row>
            <v-col cols="12" md="3">
              <v-select
                v-model="product.type"
                :items="types"
                :rules="[rules.required]"
                label="Type"
                outlined
                required
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="product.name"
                :rules="[rules.required]"
                label="Product Name"
                outlined
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
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
            <v-col cols="12" md="3">
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
            <v-col cols="6">
              <v-row>
                <v-col cols="12" md="12" v-if="product.type !== 'Variants'">
                  <v-text-field
                    v-model="product.upc"
                    :rules="[rules.required]"
                    label="UPC"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12">
                  <v-textarea
                    v-model="product.details"
                    label="Product Details"
                    placeholder="Enter product details"
                    outlined
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="6" v-if="product.type !== 'Variants'">
              <v-card class="pa-4">
                <div class="text-subtitle-1 mb-2">Product Image</div>
                <v-img
                  :src="product.image"
                  height="200"
                  contain
                  class="grey lighten-2 mb-2"
                >
                </v-img>
                <v-btn
                  small
                  block
                  outlined
                  @click="$refs.mainProductImage.click()"
                  class="mt-2"
                >
                  <v-icon left>mdi-upload</v-icon>
                  Upload Image
                </v-btn>
                <input
                  ref="mainProductImage"
                  type="file"
                  hidden
                  accept="image/*"
                  @change="uploadMainImage"
                />
              </v-card>
            </v-col>

            <v-col cols="12" md="3" v-if="product.type !== 'Variants'">
              <v-text-field
                v-model="product.cost"
                :rules="[rules.required]"
                label="Cost"
                type="number"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3" v-if="product.type !== 'Variants'">
              <v-text-field
                v-model="product.price"
                :rules="[rules.required]"
                label="Price"
                type="number"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
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
            <v-col cols="12" md="3" v-if="product.type !== 'Variants'">
              <v-text-field
                v-model="product.stocks"
                :rules="[rules.required]"
                label="Initial Stocks"
                type="number"
                outlined
                required
                :disabled="mode !== 'add'"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="product.stockAlert"
                label="Stock Alert"
                type="number"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" v-if="product.type === 'Variants'">
              <div class="d-flex mb-4">
                <v-text-field
                  v-model="newVariantName"
                  label="New Variant Name"
                  outlined
                ></v-text-field>
                <v-btn @click="createVariant" color="primary" dark
                  >Create Variant</v-btn
                >
              </div>

              <v-card
                v-for="(variant, index) in product.variants"
                :key="index"
                class="mb-4"
              >
                <v-row no-gutters>
                  <v-col cols="3">
                    <v-card class="pa-2">
                      <div class="text-subtitle-2 mb-1">Variant Image</div>
                      <v-img
                        :src="variant.image || defaultImageUrl"
                        height="150"
                        contain
                        class="grey lighten-2 variant-image"
                      >
                      </v-img>
                      <v-btn
                        block
                        small
                        outlined
                        @click="$refs.fileInput[index].click()"
                        class="mt-2"
                      >
                        <v-icon left small>mdi-upload</v-icon>
                        Upload
                      </v-btn>
                      <input
                        type="file"
                        :ref="'fileInput'"
                        hidden
                        accept="image/*"
                        @change="uploadImage($event, index)"
                      />
                    </v-card>
                  </v-col>

                  <v-col cols="9">
                    <v-card-text>
                      <v-row dense>
                        <v-col cols="6">
                          <v-text-field
                            v-model="variant.upc"
                            label="Variant Code"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="variant.name"
                            label="Variant Name"
                            outlined
                            dense
                            disabled
                          ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                          <v-text-field
                            v-model="variant.cost"
                            label="Cost"
                            type="number"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                          <v-text-field
                            v-model="variant.price"
                            label="Price"
                            type="number"
                            outlined
                            dense
                          ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                          <v-text-field
                            v-model="variant.stocks"
                            label="Initial Stocks"
                            type="number"
                            outlined
                            dense
                            :disabled="mode !== 'add'"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="error" text @click="removeVariant(index)">
                        <v-icon left>mdi-delete</v-icon> Remove
                      </v-btn>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-row justify="end" class="ma-0 mt-6 mx-5 my-5">
              <v-btn dark :color="pageMode.color" @click="pageMode.action">{{
                pageMode.label
              }}</v-btn>
              <div class="ma-1"></div>
              <v-btn @click="$router.go(-1)">Cancel</v-btn>
            </v-row>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
/*eslint-disable */
import { mapActions } from "vuex";
const {baseURL} = require("@/config");
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
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOtjqFKVwZWNCqI33H1OWcsUaZYww6FLLFAw&s",
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
      defaultImageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOtjqFKVwZWNCqI33H1OWcsUaZYww6FLLFAw&s",
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
      uploadFile: "uploads/uploadFile",
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
          image: this.defaultImageUrl,
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

    async uploadImage(event, index) {
      const file = event.target.files[0];
      if (!file) return;

      try {
        const response = await this.uploadFile(file);

        if (index !== undefined) {
          this.product.variants[index].image = `${baseURL}${response.url}`;
        } else {
            this.product.image = `${baseURL}${response.url}`;
        }
      } catch (error) {
        console.error("Upload failed:", error);
      }
    },

    uploadMainImage(event) {
      this.uploadImage(event);
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

.variant-image {
  position: relative;
}
.upload-btn {
  position: absolute;
  right: 8px;
  bottom: 8px;
  background: rgba(0, 0, 0, 0.6);
}
</style>
