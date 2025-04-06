<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <store-list></store-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue'
import StoreList from '@/components/StoreList.vue'

export default defineComponent({
  name: 'StoreListView',
  components: {
    StoreList
  }
})
</script> 