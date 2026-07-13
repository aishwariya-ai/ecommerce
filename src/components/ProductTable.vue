<script setup>
import{ inject,ref } from 'vue';
const currency=inject("currency");
const dialog=ref(false);
const selectedproduct=ref(null);
defineProps({
    products:Array
});

const emit=defineEmits(['edit','delete']);
const headers = [
  { title: "Name", key: "name" },
  { title: "Category", key: "category" },
  { title: "Price", key: "price" },
  { title: "Brand", key: "brand"},
  { title: "Description", key: "description"},
  { title: "Action", key: "action", sortable: false }

];

function opendialog(id)
{
  selectedproduct.value=id;
  dialog.value=true
}
function confirmdelete()
{
  emit("delete",selectedproduct.value)
  dialog.value=false;
  selectedproduct.value=null;
}
function canceldelete()
{
    dialog.value=false;
    selectedproduct.value=null;

}

</script>
<template>
    <div style="overflow-x: auto;">
    <v-data-table
            :headers="headers"
            :items="products"
            class="elevation-2"
            hide-default-footer>

            <template v-slot:item.price="{ item }">
              {{ currency }} {{ item.price.toLocaleString() }}
            </template>

            <template v-slot:item.action="{ item }">

            <v-btn
                color="warning"
                size="small"
                class="mr-2"
                @click="emit('edit',item)"> Edit </v-btn>

            <v-btn
                color="error"
                size="small"
                @click="opendialog(item.id)"> Delete </v-btn>
                
            <v-dialog
            v-model="dialog"
            max-width="400"
            persistent>
        <v-card>
    <v-card-title class="text-h5"> Delete Product </v-card-title>

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
</div>

</template>