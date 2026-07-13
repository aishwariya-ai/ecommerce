<script setup>
</script>

<template>
  <v-card class="pa-3 hover-elevation-5" >

    <v-row>
      
      <v-col cols="4">
        <slot name="image"></slot>
      </v-col>


      <v-col>

        <v-card-title  >
          <slot name="title"></slot>
        </v-card-title>

        <v-card-text >
          <slot></slot>
        </v-card-text>

        <v-card-actions >
          <slot name="actions"></slot>
        </v-card-actions>

      </v-col>

    </v-row>

  </v-card>
</template>