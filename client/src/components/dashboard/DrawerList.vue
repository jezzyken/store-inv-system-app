<template>
  <div class="navigation-wrapper">
    <div class="profile-card pa-4">
      <div class="d-flex align-center">
        <v-avatar size="64" class="elevation-2">
          <v-img
            :src="currentUser?.image || defaultAvatar"
            @error="handleImageError"
            class="grey darken-2"
          >
            <template v-slot:placeholder>
              <v-icon large color="grey lighten-2">mdi-account</v-icon>
            </template>
          </v-img>
        </v-avatar>


        <div class="profile-info ml-4">
          <h3 class="text-caption font-weight-bold mb-1 white--text">
            {{ fullName.toUpperCase() }}
          </h3>
          <div class="text-subtitle-2 grey--text">{{ currentUser?.email }}</div>
          <v-chip
            x-small
            :color="currentUser?.role === 'admin' ? 'primary' : 'secondary'"
            class="mt-2"
            label
            dark
          >
            {{ currentUser?.role }}
          </v-chip>
        </div>
      </div>
    </div>

    <v-divider dark></v-divider>

    <!-- Navigation Menu -->
    <div class="navigation-menu mt-4">
      <template v-for="item in filteredItems">
        <v-list dense nav dark class="py-0" :key="item.title">
          <v-list-group
            v-for="list in item.list"
            :key="list.title"
            v-model="list.active"
            :prepend-icon="list.action"
            @click="openRoute(list)"
            :append-icon="list.items?.length ? 'mdi-chevron-down' : ''"
            no-action
            class="submenu-group"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title
                  class="submenu-title grey--text text--lighten-1"
                >
                  {{ list.title }}
                </v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="child in list.items"
              :key="child.title"
              :to="child.route"
              link
              class="submenu-item"
            >
              <v-list-item-title class="grey--text text--lighten-1">
                {{ child.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    defaultAvatar: require("@/assets/default-avatar.png"),
    admins: [
      ["Management", "mdi-account-multiple-outline"],
      ["Settings", "mdi-cog-outline"],
    ],
    items: [
      {
        list: [
          {
            action: "mdi-home",
            title: "Dashboard",
            route: "/dashboard",
          },
          {
            action: "mdi-cash-register",
            title: "POS",
            appendIcon: "",
            route: "/pos",
          },
          {
            action: "mdi-clipboard-list-outline",
            items: [
              { title: "Products", route: "/product" },
              { title: "Brands", route: "/brand" },
              { title: "Units", route: "/unit" },
              { title: "Categories", route: "/category" },
              // { title: "Variants", route: "/variant" },
            ],
            title: "Products",
            appendIcon: "mdi-chevron-down",
          },
          {
            action: "mdi-package-up",
            items: [
              { title: "Stocks", route: "/stock" },
              { title: "Adjustments", route: "/adjustment" },
            ],
            title: "Inventory",
            appendIcon: "mdi-chevron-down",
          },
          {
            action: "mdi-invoice-list",
            title: "Sales",
            appendIcon: "",
            route: "/sale",
          },
          {
            action: "mdi-note-multiple",
            title: "Debtors",
            appendIcon: "",
            route: "/debtors",
          },
          // {
          //   action: "mdi-contacts",
          //   items: [
          //     { title: "Customer", route: "/customer" },
          //     { title: "Supplier", route: "/supplier" },
          //   ],
          //   title: "Contacts",
          //   appendIcon: "mdi-chevron-down",
          // },
          // {
          //   action: "mdi-account-group",
          //   items: [{ title: "Users" }, { title: "Logs" }, { title: "Role" }],
          //   title: "Users",
          //   appendIcon: "mdi-chevron-down",
          // },
          {
            action: "mdi-account-group",
            title: "Accounts",
            appendIcon: "",
            route: "/user",
          },
          {
            action: "mdi-chart-box",
            items: [],
            title: "Reports",
            appendIcon: "mdi-chevron-down",
          },
        ],
      },
    ],
    loading: true,
  }),
  computed: {
    ...mapGetters("users", ["getCurrentUser", "isAdmin"]),
    currentUser() {
      return this.getCurrentUser;
    },
    fullName() {
      return this.currentUser
        ? `${this.currentUser.fname} ${this.currentUser.lname}`
        : "";
    },
    filteredItems() {
      if (!this.isAdmin) {
        return this.items.map((item) => ({
          ...item,
          list: item.list.filter(
            (subItem) => !["Accounts", "Reports", "Products", "Inventory", "Sales", "Debtors", "Dashboard"].includes(subItem.title)
          ),
        }));
      }
      return this.items;
    },
  },

  methods: {
    ...mapActions("users", ["getUserById", "restoreSession"]),

    handleImageError(event) {
      event.target.src = this.defaultAvatar;
    },

    async loadUserData() {
      const userId = this.currentUser?.id;
      console.log(userId);
      if (userId) {
        try {
          await this.getUserById(userId);
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      }
    },

    openRoute(items) {
      if (!items.route) return;
      if (items.route === this.$route.path) return;
      this.$router.push(items.route);
    },
  },

  async created() {
    if (!this.currentUser && this.getToken) {
      await this.restoreSession();
    }
    if (this.currentUser) {
      this.loadUserData();
    }
  },
};
</script>

<style scoped>
.navigation-wrapper {
  background: #0f172a; /* Darker blue-gray base */
  height: 100%;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.profile-card {
  background: linear-gradient(to right, #1e293b, #0f172a); /* Subtle gradient */
}

.profile-info {
  overflow: hidden;
}

.menu-item {
  border-radius: 8px;
  margin: 4px 8px;
  transition: all 0.2s ease;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.07);
}

.menu-item--active {
  background-color: rgba(59, 130, 246, 0.15) !important; /* Blue accent */
}

.submenu-group {
  background-color: rgba(15, 23, 42, 0.3); /* Darker with transparency */
}

.submenu-title {
  font-size: 0.9rem;
  font-weight: 500;
}

.submenu-item {
  min-height: 40px !important;
}

.submenu-item:hover {
  background-color: rgba(255, 255, 255, 0.07);
}

.v-list-item--active {
  background-color: rgba(59, 130, 246, 0.15) !important; /* Blue accent */
}

.v-list-item--active .v-list-item__title {
  color: #60a5fa !important; /* Lighter blue for active text */
}

.v-list-item--active .v-icon {
  color: #60a5fa !important; /* Lighter blue for active icons */
}

.v-list-group__header.v-list-item--active {
  background-color: transparent !important;
}

/* Custom Scrollbar */
.navigation-menu {
  scrollbar-width: thin;
  scrollbar-color: #334155 #0f172a; /* Improved contrast */
}

.navigation-menu::-webkit-scrollbar {
  width: 6px;
}

.navigation-menu::-webkit-scrollbar-track {
  background: #0f172a;
}

.navigation-menu::-webkit-scrollbar-thumb {
  background-color: #334155;
  border-radius: 3px;
}

/* Add subtle border for better separation */
.v-list-group {
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);
}
</style>
