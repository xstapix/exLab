<script setup>

  import './style.css'

  const props = defineProps({
    activeModal: Boolean
  })
  const emit = defineEmits(['closeChangesModal'])
</script>

<template>
  <div :class="props.activeModal ? 'add_work-modal_active up' : 'DN' ">
    <div class="modal-unsavedChanges">
      <p class="modal-unsavedChanges_text">Вы действительно хотите закрыть это окно?</p>
      <p class="modal-unsavedChanges_desc">У вас есть несохраненные изменения</p>
      <div class="DF modal-unsavedChanges_btn">
        <div @click="emit('closeChangesModal', {closeChanges: false, totalClose: false})" class="modal-unsavedChanges_btn_close">Ок</div>
        <div @click="emit('closeChangesModal', {closeChanges: false, totalClose: true})" class="modal-unsavedChanges_btn_cancel">Отмена</div>
      </div>
    </div>
  </div>
</template>