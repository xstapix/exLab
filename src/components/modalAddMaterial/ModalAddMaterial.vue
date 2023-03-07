<script setup>
  import { useStore } from '@/stores/postStore'

  import { reactive, defineAsyncComponent, watch } from 'vue';

  import { getApi } from '@/API/api.js'

  import EditorJS from '@editorjs/editorjs';
  import Header from '@editorjs/header';
  import ImageTool from '@editorjs/image';
  import List from '@editorjs/list';
  import Marker from '@editorjs/marker';
  import Delimiter from '@editorjs/delimiter';
  import InlineCode from '@editorjs/inline-code';

  import './style.css'
  
  const ModalUnsavedChanges = defineAsyncComponent(
    () => import('@/components/ModalUnsavedChanges/ModalUnsavedChanges.vue')
  )
  
  const useApi = getApi()

  const editor = new EditorJS({
    holder: 'editorjs',
    readOnly: false,
    tools: {
      header: {
        class: Header,
        inlineToolbar: ['marker', 'link'],
        config: {
          placeholder: 'Header'
        }
      },
      image: ImageTool,
      list: {
        class: List,
        inlineToolbar: true,
      },
      marker: {
        class: Marker
      },
      delimiter: Delimiter,
      inlineCode: {
        class: InlineCode
      },
    },
    i18n: {
      messages: {
        ui: {
          "inlineToolbar": {
            "converter": {
              "Convert to": "Конвертировать в"
            },
          },
          "toolbar": {
            "toolbox": {
              "Filter": "Фильтр",
              "Nothing found": "Не найдено"
            }
          },
        },
        tools: {
          "link": {
            "Add a link": "Вставьте ссылку"
          },
          "warning": {
            "Title": "Название",
            "Message": "Сообщение",
          },
        },
        blockTunes: {
          "delete": {
            "Delete": "Удалить"
          },
          "moveUp": {
            "Move up": "Переместить вверх"
          },
          "moveDown": {
            "Move down": "Переместить вниз"
          }
        },
        toolNames: {
          "Text": "Параграф",
          "Heading": "Заголовок",
          "Image": "Изображение",
          "List": "Список",
          "Warning": "Примечание",
          "Checklist": "Чеклист",
          "Quote": "Цитата",
          "Code": "Код",
          "Delimiter": "Разделитель",
          "Raw HTML": "HTML-фрагмент",
          "Table": "Таблица",
          "Link": "Ссылка",
          "Marker": "Маркер",
          "Bold": "Полужирный",
          "Italic": "Курсив",
          "InlineCode": "Моноширинный",
        }
      }
    }
  });

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

  const objTags = reactive({
    tags: null
  })

  setTags()

  async function setTags() {
    objTags.tags = await useApi.getTags()
  }
  
  const objModal = reactive({
    activeModalUnsavedChanges: false
  })
  
  const objCheckPost = reactive({
    successPost: false
  })
  
  watch(objNewPost.post, () => {
    if (((objNewPost.post.name.length >= 10) && (objNewPost.post.name.length < 100))
      && (objNewPost.post.desc.length >= 10) && (objNewPost.post.desc.length < 150)
      && (objNewPost.post.tags.length >= 1)) {
      objCheckPost.successPost = true
    } else {
      objCheckPost.successPost = false
    }
  })

  const handlerTag = (id) => {
    if(objNewPost.post.tags.includes(id)){
      let newList = objNewPost.post.tags.filter((iditem) => iditem !== id)
      objNewPost.post.tags = newList
      objTags.tags[id].active = false
    } else {
      objNewPost.post.tags.push(id)
      objTags.tags[id].active = true
    }
  }

  const handlerCloseModal = (obj) => {
    objModal.activeModalUnsavedChanges = obj.closeChanges

    if (!obj.totalClose) {
      emit('closeModal', obj.totalClose)

      objNewPost.post = {
        name: '',
        desc: '',
        tags: []
      }
    }
  }

  const handlerSavePost = () => {
    editor.save().then((outputData) => {
      objNewPost.post.editorData = outputData
      console.log(objNewPost.post);
    }).catch((error) => {
      console.log('Saving failed: ', error)
    });

    emit('closeModal', false)
  }

  const handlerSaveDraft = () => {
    objNewPost.post = {
      name: '',
      desc: '',
      tags: []
    }

    emit('closeModal', false)
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
            <div 
              class="form-field_input" 
              @input="(e) => {objNewPost.post.desc = e.target.textContent}"
              contenteditable 
              placeholder="Как я нашла работу на фрилансе с нуля?">
            </div>
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
            <div class="form-field_tags DF" v-if="objTags.tags"> 
              <div @click="handlerTag(index)" v-for="(tag, index) in objTags.tags" 
                class="form-field_tags-item DF" :class="{activeTag: tag.active}">
                {{ tag.tag }}
                <div v-if="tag.active" 
                  class="form-field_tags-item_close">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.5" d="M5.5792 5.52626L10.5267 10.4737M5.5792 10.4737L10.5267 5.52626" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="post_modal-body_form-field">
            <p class="post_modal-body_form-text">*Содержание материала <span>(контент)</span></p>
            <div id="editorjs" class="editor-field"></div>
          </div>
        </div>
        <div class="DF post_modal-body_btn">
          <button 
            @click="objModal.activeModalUnsavedChanges = true" 
            class="post_modal-body_btn_cancel">Отмена</button>
          <button 
            @click="handlerSaveDraft" 
            class="post_modal-body_btn_draft">Сохранить как черновик</button>
          <button v-if="objCheckPost.successPost"
            @click="handlerSavePost" 
            class="post_modal-body_btn_send">Запустить</button>
        </div>
      </div>
    </div>
  </div>
  <ModalUnsavedChanges
    v-if="objModal.activeModalUnsavedChanges"
    @closeChangesModal="handlerCloseModal"
    :activeModal="objModal.activeModalUnsavedChanges"/>
</template>