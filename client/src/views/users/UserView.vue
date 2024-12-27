<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1 mt-n2"
      :loading="isLoading"
      :search="search"
    >
      <template v-slot:[`item.image`]="{ item }">
        <v-avatar size="40">
          <v-img
            :src="item.image || defaultAvatar"
            :alt="`${item.fname}'s avatar`"
            @error="handleImageError($event, item)"
          ></v-img>
        </v-avatar>
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <div style="width: 400px">
            <v-text-field
              v-model="search"
              filled
              rounded
              dense
              hide-details
              placeholder="Search"
              append-icon="mdi-filter-variant"
            ></v-text-field>
          </div>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="700px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="#000033"
                dark
                class="mb-2"
                small
                v-bind="attrs"
                v-on="on"
              >
                New User
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="editedItem.fname"
                        label="First Name*"
                        outlined
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="editedItem.lname"
                        label="Last Name*"
                        outlined
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email*"
                        outlined
                        type="email"
                        :rules="[rules.required, rules.email]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" v-if="editedIndex === -1">
                      <v-text-field
                        v-model="editedItem.password"
                        label="Password*"
                        outlined
                        type="password"
                        :rules="[rules.required, rules.password]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="editedItem.role"
                        :items="roles"
                        label="Role"
                        outlined
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="editedItem.status"
                        :items="statusOptions"
                        label="Status"
                        outlined
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-file-input
                        v-model="editedItem.image"
                        label="Profile Image"
                        outlined
                        accept="image/*"
                        prepend-icon="mdi-camera"
                        @change="previewImage"
                      >
                        <template v-slot:prepend>
                          <v-avatar size="40">
                            <v-img :src="imagePreview"></v-img>
                          </v-avatar>
                        </template>
                      </v-file-input>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Password Update Dialog -->
          <v-dialog v-model="passwordDialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">Update Password</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="newPassword"
                        label="New Password*"
                        outlined
                        type="password"
                        :rules="[rules.required, rules.password]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closePasswordDialog"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="updatePassword"
                  >Update</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this user?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-menu bottom left>
          <template v-slot:activator="{ attrs, on }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(action, i) in actions"
              :key="i"
              @click="handleAction(action.title, item)"
            >
              <v-list-item-title>{{ action.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>

    <!-- Snackbar for notifications -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "UserView",

  data: () => ({
    dialog: false,
    dialogDelete: false,
    passwordDialog: false,
    headers: [
      {
        text: "Image",
        align: "center",
        sortable: false,
        value: "image",
        width: "100px",
      },
      {
        text: "Full Name",
        align: "start",
        sortable: true,
        value: "fullName",
      },
      {
        text: "Email",
        align: "start",
        sortable: true,
        value: "email",
      },
      {
        text: "Role",
        align: "start",
        sortable: true,
        value: "role",
      },
      {
        text: "Status",
        align: "start",
        sortable: true,
        value: "status",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      status: "active",
      image: null,
      role: "cashier",
    },
    defaultItem: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      status: "active",
      image: null,
      role: "cashier",
    },
    defaultAvatar: require("@/assets/default-avatar.png"),
    newPassword: "",
    selectedUserId: null,
    statusOptions: ["active", "inactive"],
    roles: ["admin", "cashier"],
    search: "",
    isLoading: false,
    actions: [
      { title: "Edit" },
      { title: "Change Password" },
      { title: "Delete" },
    ],
    snackbar: {
      show: false,
      text: "",
      color: "success",
    },
    rules: {
      required: (v) => !!v || "This field is required",
      email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      password: (v) =>
        v.length >= 6 || "Password must be at least 6 characters",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    },
    imagePreview() {
      if (this.editedItem.image instanceof File) {
        return URL.createObjectURL(this.editedItem.image);
      }
      return this.editedItem.image || this.defaultAvatar;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    passwordDialog(val) {
      val || this.closePasswordDialog();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions({
      getUsers: "users/getUsers",
      addUser: "users/register",
      removeUser: "users/deleteUser",
      updateUser: "users/updateUser",
      updateUserPassword: "users/changePassword",
    }),

    showSnackbar(text, color = "success") {
      this.snackbar.text = text;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },

    handleImageError(event) {
      event.target.src = this.defaultAvatar;
    },

    async initialize() {
      this.isLoading = true;
      try {
        const response = await this.getUsers();
        if (response.success) {
          this.users = response.users.map((user) => ({
            ...user,
            fullName: `${user.fname} ${user.lname}`,
          }));
        }
      } catch (error) {
        this.showSnackbar(
          error.response?.data?.message || "Error fetching users",
          "error"
        );
      } finally {
        this.isLoading = false;
      }
    },

    previewImage(file) {
      if (file) {
        this.editedItem.image = file;
      }
    },

    async save() {
      try {
        const formData = new FormData();
        const itemToSave = { ...this.editedItem };

        if (itemToSave.image instanceof File) {
          formData.append("image", itemToSave.image);
        }

        ["fname", "lname", "email", "role", "status"].forEach((key) => {
          if (itemToSave[key]) {
            formData.append(key, itemToSave[key]);
          }
        });

        if (this.editedIndex === -1 && itemToSave.password) {
          formData.append("password", itemToSave.password);
        }

        let response;
        if (this.editedIndex > -1) {
          response = await this.updateUser({
            id: itemToSave.id,
            formData,
          });
        } else {
          response = await this.addUser(formData);
        }

        if (response.success) {
          if (this.editedIndex > -1) {
            Object.assign(this.users[this.editedIndex], {
              ...response.user,
              fullName: `${response.user.fname} ${response.user.lname}`,
            });
          } else {
            this.users.push({
              ...response.user,
              fullName: `${response.user.fname} ${response.user.lname}`,
            });
          }

          this.showSnackbar(
            `User ${
              this.editedIndex === -1 ? "created" : "updated"
            } successfully`
          );
          this.close();
        }
      } catch (error) {
        this.showSnackbar(
          error.response?.data?.message || "Error saving user",
          "error"
        );
      }
    },

    async updatePassword() {
      try {
        const response = await this.updateUserPassword({
          id: this.selectedUserId,
          newPassword: this.newPassword,
        });

        if (response.success) {
          this.showSnackbar("Password updated successfully");
          this.closePasswordDialog();
        }
      } catch (error) {
        this.showSnackbar(
          error.response?.data?.message || "Error updating password",
          "error"
        );
      }
    },

    async deleteItemConfirm() {
      try {
        const response = await this.removeUser(this.selectedUserId);

        if (response.success) {
          this.users.splice(this.editedIndex, 1);
          this.showSnackbar("User deleted successfully");
          this.closeDelete();
        }
      } catch (error) {
        this.showSnackbar(
          error.response?.data?.message || "Error deleting user",
          "error"
        );
      }
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = {
        ...this.defaultItem,
        ...item,
        id: item.id,
      };
      this.dialog = true;
    },

    openPasswordDialog(item) {
      this.selectedUserId = item.id;
      this.newPassword = "";
      this.passwordDialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.selectedUserId = item._id;
      this.dialogDelete = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closePasswordDialog() {
      this.passwordDialog = false;
      this.newPassword = "";
      this.selectedUserId = null;
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.selectedUserId = null;
      });
    },

    handleAction(action, item) {
      switch (action) {
        case "Edit":
          this.editItem(item);
          break;
        case "Change Password":
          this.openPasswordDialog(item);
          break;
        case "Delete":
          this.deleteItem(item);
          break;
      }
    },
  },
};
</script>
