<script setup>
  import {useStore} from '@/stores/postStore'

  import { reactive } from 'vue';

  import './style.css'

  const postsStore = useStore()
  
  const props = defineProps({
    activeModal: Boolean
  })
  const emit = defineEmits(['closeModal'])

  const objNewPost = reactive({
    post: {
      name: '',
      desc: '',
      tags: []
    }
  })

  const handlerTag = (e) => {
    if(objNewPost.post.tags.includes(e.target.id)){
      let newList = objNewPost.post.tags.filter((id) => id !== e.target.id)
      objNewPost.post.tags = newList
    } else {
      objNewPost.post.tags.push(e.target.id)
    }

    e.target.classList.toggle('tags-item_selected')
  }


</script>

<template>
  <div :class="props.activeModal ? 'add_work-modal_active' : 'DN' ">
    <div class="post_modal-body">
      <div class="post_modal-body_container">
        <p class="post_modal-body_text">Запустить спутник</p>
        <p class="post_modal-body_desc">Материал будет отображаться в открытом доступе и будет доступен и не авторизованным пользователям</p>
        <div class="post_modal-body_form">
          <div class="post_modal-body_form-field">
            <div class="DF JCSB">
              <p class="post_modal-body_form-text">*Название материала <span>(должно отражать суть)</span></p>
              <div class="post_modal-body_form-counter DF">
                {{ objNewPost.post.name.length }}/100
                <div v-if="(objNewPost.post.name.length < 10) || (objNewPost.post.name.length > 100)" class="form-counter_err">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="8" fill="#FF0000"></circle>
                    <path d="M6.00087 5.9475L10.0534 10M6.00087 10L10.0534 5.9475" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </div>
                <div v-else class="form-counter_err">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#82C417"></circle><path d="M5 8.5L7 10.5L11 6.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>
              </div>
            </div>
            <input class="form-field_input" type="text" v-model="objNewPost.post.name" placeholder="Как я нашла работу на фрилансе с нуля?">
          </div>
          <div class="post_modal-body_form-field">
            <div class="DF JCSB">
              <p class="post_modal-body_form-text">*Описание материала <span>(краткое пояснение)</span></p>
              <div class="post_modal-body_form-counter DF">
                {{ objNewPost.post.desc.length }}/150
                <div class="form-counter_err" v-if="(objNewPost.post.desc.length < 10) || (objNewPost.post.desc.length > 150)">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#FF0000"></circle><path d="M6.00087 5.9475L10.0534 10M6.00087 10L10.0534 5.9475" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>
                <div v-else class="form-counter_err">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#82C417"></circle><path d="M5 8.5L7 10.5L11 6.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>
              </div>
            </div>
            <input class="form-field_input" type="text" v-model="objNewPost.post.desc" placeholder="Как я нашла работу на фрилансе с нуля?">
          </div>
          <div class="post_modal-body_form-field">
            <div class="DF JCSB">
              <p class="post_modal-body_form-text">*Теги материала <span>(помогают фильтровать материалы)</span></p>
              <div class="post_modal-body_form-counter DF">
                <div v-if="objNewPost.post.tags.length >= 1" class="form-counter_err"> 
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#82C417"></circle><path d="M5 8.5L7 10.5L11 6.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>
                <div v-else class="form-counter_err">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#FF0000"></circle><path d="M6.00087 5.9475L10.0534 10M6.00087 10L10.0534 5.9475" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>
              </div>
            </div>
            <div class="form-field_tags DF" v-if="postsStore.data.tags" @click="handlerTag"> 
              <div v-for="tag in postsStore.data.tags.slice(1, postsStore.data.tags.length)" 
                :id="tag.id" 
                class="form-field_tags-item DF"
              >
                {{ tag.tag }}
                <div v-if="objNewPost.post.tags.includes(String(tag.id))" class="form-field_tags-item_close" :id="`${tag.id}A`">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.5" d="M5.5792 5.52626L10.5267 10.4737M5.5792 10.4737L10.5267 5.52626" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>
              </div>
            </div>
          </div>
          <div class="post_modal-body_form-field">
            <p class="post_modal-body_form-text">*Содержание материала <span>(контент)</span></p>
            
          </div>
        </div>
        <div class="DF post_modal-body_btn">
          <button @click="emit('closeModal', false)" class="post_modal-body_btn_cancel">Отмена</button>
          <button @click="emit('closeModal', false)" class="post_modal-body_btn_draft">Сохранить как черновик</button>
          <button @click="emit('closeModal', false)" class="post_modal-body_btn_send">Запустить</button>
        </div>
      </div>
    </div>
  </div>
</template>