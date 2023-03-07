<script setup>
  import { reactive } from 'vue'

  import './style.css'
  import './media-style.css'

  const objNote = reactive({
    activeAddNote: false,
    newNoteText: '',
    arrAllNotes: []
  })

  const handlerAddNote = () => {
    const date = new Date().toLocaleDateString()
    const time = [new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()].join(':')

    objNote.arrAllNotes.unshift({
      text: objNote.newNoteText,
      date: `${date}, ${time}`
    })
    objNote.activeAddNote = false
    objNote.newNoteText = ''
  }

  const handlerUpdateNote = (index) => {
    objNote.arrAllNotes[index].editing = false
    objNote.arrAllNotes[index].text = objNote.newNoteText
  }

  const handlerRemoveNote = (index) => {
    objNote.arrAllNotes[index].editing = false
    objNote.arrAllNotes = objNote.arrAllNotes.filter((note, indexNote) => indexNote != index)
  }

  const handlerEditingNote = (index) => {
    objNote.arrAllNotes[index].editing = true
    objNote.newNoteText = objNote.arrAllNotes[index].text 
  }
</script>

<template>
  <div class="single_post-notes">
    <p class="single_post-notes_title">Ваши заметки к уроку</p>
    <div v-for="note, index in objNote.arrAllNotes">
      <div v-if="!note.editing" class="single_post-notes_list-item">
        <div class="DF JCSB AIC notes_list-item_info">
          <div class="notes_list-item_info_date">{{ note.date }}</div>
          <div class="DF">
            <div @click="handlerEditingNote(index)" class="item_info_actions-img actions-img_edit">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.1525 1.48855L6.99812 6.64294C6.73179 6.9089 6.55016 7.24774 6.47611 7.61676L6 10L8.38324 9.52299C8.75225 9.44919 9.09065 9.26829 9.35706 9.00188L14.5114 3.84749C14.6663 3.6926 14.7892 3.50872 14.873 3.30635C14.9569 3.10397 15 2.88707 15 2.66802C15 2.44898 14.9569 2.23207 14.873 2.0297C14.7892 1.82732 14.6663 1.64344 14.5114 1.48855C14.3566 1.33366 14.1727 1.2108 13.9703 1.12697C13.7679 1.04314 13.551 1 13.332 1C13.1129 1 12.896 1.04314 12.6937 1.12697C12.4913 1.2108 12.3074 1.33366 12.1525 1.48855Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.6666 9.99998V12C12.6666 12.3536 12.5262 12.6927 12.2761 12.9428C12.0261 13.1928 11.6869 13.3333 11.3333 13.3333H3.99996C3.64634 13.3333 3.3072 13.1928 3.05715 12.9428C2.8071 12.6927 2.66663 12.3536 2.66663 12V4.66665C2.66663 4.31302 2.8071 3.97389 3.05715 3.72384C3.3072 3.47379 3.64634 3.33331 3.99996 3.33331H5.99996" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
            <div @click="handlerRemoveNote(index)" class="item_info_actions-img">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.225 3.025V4.85H5.775V3.025H10.225ZM4.35 2.75V4.85H2.5C2.14059 4.85 1.85 5.14059 1.85 5.5V6C1.85 6.15159 1.97341 6.275 2.125 6.275H2.9266L3.30485 13.3039C3.30486 13.3041 3.30487 13.3043 3.30488 13.3044C3.3339 13.917 3.84035 14.4 4.45312 14.4H11.5469C12.1612 14.4 12.6662 13.9185 12.6951 13.3043C12.6951 13.3042 12.6951 13.304 12.6951 13.3039L13.0734 6.275H13.875C14.0266 6.275 14.15 6.15159 14.15 6V5.5C14.15 5.14059 13.8594 4.85 13.5 4.85H11.65V2.75C11.65 2.11559 11.1344 1.6 10.5 1.6H5.5C4.86559 1.6 4.35 2.11559 4.35 2.75ZM11.6464 6.275L11.2844 12.975H4.71555L4.35363 6.275H11.6464Z" fill="black" stroke="black" stroke-width="0.3"></path></svg>
            </div>
          </div>
        </div>
        {{ note.text }}
      </div>
      <div v-else class="single_post-new_notes_box">
        <div 
          class="single_post-new_notes_input" 
          @input="(e) => {objNote.newNoteText = e.target.textContent}"
          contenteditable>
          {{ objNote.arrAllNotes[index].text }}
        </div>
        <div class="single_post-new_notes_img" @click="handlerUpdateNote(index)">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.77817 3.30196L12.5001 8M12.5001 8L7.77817 12.698M12.5001 8L1.32881 8" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </div>
      </div>
    </div>
    <button v-if="!objNote.activeAddNote"
      class="single_post-notes_button"
      @click="objNote.activeAddNote = !objNote.activeAddNote">
      Добавить заметку
    </button>
    <div v-else class="single_post-new_notes_box">
      <div 
        class="single_post-new_notes_input" 
        @input="(e) => {objNote.newNoteText = e.target.textContent}"
        contenteditable>
      </div>
      <div class="single_post-new_notes_img" @click="handlerAddNote">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.77817 3.30196L12.5001 8M12.5001 8L7.77817 12.698M12.5001 8L1.32881 8" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
    </div>
  </div>
</template>