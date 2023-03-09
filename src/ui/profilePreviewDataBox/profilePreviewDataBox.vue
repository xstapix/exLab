<script setup>
  import { reactive } from 'vue';
  
  const props = defineProps({
    text: String,
    value: String,
    icon: String,
    tip: String
  })

  const objDataTip = reactive({
    level: false,
    month: false,
    balanceStar: false,
    daysEndSubscription: false,
    discount: false,
    clubPrice: false
  })
</script>
<template>
  <div class="profile_preview-data_box"
    @mouseover="objDataTip.level = true" 
    @mouseleave="objDataTip.level = false">
    <div class="profile_preview-data_item">
      <div class="DF">
        <div v-html="props.icon"></div>
        <div class="data_item-number">
          {{ props.value }}
        </div>
      </div>
      <p class="profile_preview-data_item-text">{{ props.text }}</p>
    </div>
    <div v-if="objDataTip.level" class="profile_preview-data_box-tip" v-html="props.tip"></div>
  </div>
</template>