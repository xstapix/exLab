<script setup>
  import {useStore} from '@/stores/postStore'

  import './style.css'

  const postsStore = useStore()
  
  const props = defineProps({
    activeModal: Boolean
  })
  const emit = defineEmits(['closeModal'])
</script>

<template>
  <div :class="props.activeModal ? 'add_work-modal_active' : 'DN' ">
    <div class="post_modal-body">
      <p class="post_modal-body_text">Запустить спутник</p>
      <p class="post_modal-body_desc">Материал будет отображаться в открытом доступе и будет доступен и не авторизованным пользователям</p>
      <div class="post_modal-body_form">
        <div class="post_modal-body_form-field">
          <div class="DF JCSB">
            <p class="post_modal-body_form-text">*Название материала <span>(должно отражать суть)</span></p>
            <div class="post_modal-body_form-counter DF">
              0/150
              <div class="form-counter_err">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#FF0000"></circle><path d="M6.00087 5.9475L10.0534 10M6.00087 10L10.0534 5.9475" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </div>
            </div>
          </div>
          <input class="form-field_input" type="text" placeholder="Как я нашла работу на фрилансе с нуля?">
        </div>
        <div class="post_modal-body_form-field">
          <div class="DF JCSB">
            <p class="post_modal-body_form-text">*Описание материала <span>(краткое пояснение)</span></p>
            <div class="post_modal-body_form-counter DF">
              0/150
              <div class="form-counter_err">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#FF0000"></circle><path d="M6.00087 5.9475L10.0534 10M6.00087 10L10.0534 5.9475" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </div>
            </div>
          </div>
          <input class="form-field_input" type="text" placeholder="Как я нашла работу на фрилансе с нуля?">
        </div>
        <div class="post_modal-body_form-field">
          <div class="DF JCSB">
            <p class="post_modal-body_form-text">*Теги материала <span>(помогают фильтровать материалы)</span></p>
            <div class="post_modal-body_form-counter DF">
              <div class="form-counter_err">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#FF0000"></circle><path d="M6.00087 5.9475L10.0534 10M6.00087 10L10.0534 5.9475" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </div>
            </div>
          </div>
          <div class="form-field_tags">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>