<script setup>
import { onMounted,ref } from "vue";
import { useCartStore } from "../stores/cartStore";
import { useUserStore } from "../stores/userStore";
import { inject } from "vue";
import { useToast } from "vue-toastification";
const toast=useToast();
const userStore = useUserStore();
const cartStore = useCartStore();
const dialog=ref(false);
const selecteditem=ref(null);
const currency=inject("currency");

onMounted(() => {
  if (userStore.currentUser) {
    cartStore.getCart(userStore.currentUser.id);
  }
});

const headers = [
  { title: "Name", key: "name" },
  { title: "Price", key: "price" },
  {title: "Quantity",key:"quantity"},
  { title: "Action", key: "action" }
];


function opendialog(id)
{
  selecteditem.value=id;
  dialog.value=true;
}
function confirmdelete()
{
cartStore.removeFromCart(selecteditem.value);
dialog.value=false;
selecteditem.value=null;
}
function canceldelete()
{
  dialog.value=false;
  selecteditem.value=null;
}
async function Submit()
{
  await cartStore.clearcart(userStore.currentUser.id);
  toast.success("Ordered Successfully!!!");
  
}

</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10">

        <v-card >
          <v-card-title class="text-h4 text-center">
            My Cart
          </v-card-title>

          <v-card-text>

            <v-alert
              v-if="cartStore.cart.length === 0"
              type="info"
              variant="tonal"
            >
              No Products In Cart
            </v-alert>

            <v-data-table
              v-else
              :headers="headers"
              :items="cartStore.cart"
              class="elevation-2"
              hide-default-footer
            >
              <template v-slot:item.price="{ item }">
                {{ currency }} {{ item.price.toLocaleString() }}
              </template>
              <template v-slot:item.quantity="{ item }">

            <v-btn icon size="small" @click="cartStore.decreaseQuantity(item.id)"> - </v-btn>
              {{ item.quantity }}
              <v-btn icon size="small" @click="cartStore.increaseQuantity(item.id)" > + </v-btn>

              </template>
              
              <template v-slot:item.action="{ item }">
                <v-btn
                  color="error"
                  size="small"
                  @click="opendialog(item.id)"
                >
                  Remove
                </v-btn>


<v-dialog
  v-model="dialog"
  max-width="400"
  persistent
>
  <v-card>
    <v-card-title class="text-h5">
      Delete Product
    </v-card-title>

    <v-card-text>
      Are you sure you want to remove this product from the cart?
    </v-card-text>

    <v-card-actions>

      <v-spacer></v-spacer>

      <v-btn
        color="grey"
        @click="canceldelete"
      >
        Cancel
      </v-btn>

      <v-btn
        color="red"
        @click="confirmdelete"
      >
        Delete
      </v-btn>

    </v-card-actions>

  </v-card>
</v-dialog>
</template>
            </v-data-table>

          </v-card-text>

          <v-card-actions class="d-flex justify-space-between px-6 py-4">
            <div class="text-h6">
              Total Products:
              <strong>{{ cartStore.totalCount }}</strong>
            </div>

            <div class="text-h6">
              Total Amount:
              <strong>₹ {{ cartStore.total.toLocaleString() }}</strong>
            </div>
          </v-card-actions>
          <v-btn color="primary" :disabled="cartStore.totalCount===0 " block @click="Submit"> Proceed </v-btn>

        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>