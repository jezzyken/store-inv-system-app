<template>
  <v-app-bar app color="white">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>{{ capitalizedRouteName }}</v-toolbar-title>
    <v-spacer></v-spacer>

    <!-- Add user info in app bar -->
    <!-- <v-btn text class="text-capitalize">
      {{ currentUser?.fname }} {{ currentUser?.lname }}
      <v-avatar size="32" class="ml-2">
        <v-img :src="currentUser?.image || defaultAvatar"></v-img>
      </v-avatar>
    </v-btn> -->

    <v-btn @click="handleLogout" text>
      <v-icon>mdi-logout-variant</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "AppBar",

  data: () => ({
    defaultAvatar: require("@/assets/default-avatar.png"),
  }),

  computed: {
    ...mapState(["drawer"]),
    ...mapGetters("users", ["getCurrentUser", "isAuthenticated"]),

    currentUser() {
      return this.getCurrentUser;
    },

    capitalizedRouteName() {
      if (this.$route.name) {
        return this.$route.name
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }
      return "";
    },

    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      },
    },
  },

  methods: {
    ...mapActions("users", ["logout"]),
    ...mapMutations({
      setDrawer: "SET_DRAWER",
    }),

    async handleLogout() {
      await this.logout();
      this.$router.push("/login");
    },
  },

  created() {
    // Check authentication
    if (!this.isAuthenticated) {
      this.$router.push("/login");
    }
  },
};
</script>
