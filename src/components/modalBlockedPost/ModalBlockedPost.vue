<script setup>
  import './style.css'

  const props = defineProps({
    activeModal: Boolean
  })
  const emit = defineEmits(['closeModal'])

  const handlerJoin = () => {

  }

</script>

<template>
  <section :class="props.activeModal ? 'add_work-modal_active' : 'DN' ">
    <div class="blocked-modal_body">
      <p class="blocked-modal_body-text">Вы хотите присоединитсья к клубу?</p>
      <p class="blocked-modal_body-desc">Данный материал доступен только в рамках клуба дизайнеров «1000 звёзд».</p>
      <div class="DF blocked-modal_body-btn">
        <a @click="emit('closeModal', false)" href="https://school.krona.studio/club-1000-stars" target="_blank" class="blocked-modal_body-join">Присоединиться</a>
        <button @click="emit('closeModal', false)" class="blocked-modal_body-cancel">Отмена</button>
      </div>
    </div>
  </section>
</template>