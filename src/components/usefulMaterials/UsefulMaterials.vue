<script setup>
  import { reactive } from 'vue';

  import './style.css'
  import '@/pages/detailWork/style.css'

  const props = defineProps({
    postViewed: Object
  }) 

  const objNewComm = reactive({
    text: '',
    activeAddComm: false
  })

  const handlerAddComm = () => {
    console.log(objNewComm);
    objNewComm.activeAddComm = false
  }
  
</script>

<template>
  <div class="additional-post_content">
    <div class="add_post-tip DF">
      +1
      <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.15129 1.0843C6.54247 0.454335 7.45918 0.454335 7.85036 1.0843L9.25806 3.35128C9.39565 3.57286 9.61437 3.73191 9.86756 3.79452L12.4578 4.43498C13.1768 4.61276 13.4597 5.48318 12.9828 6.04977L11.2619 8.09385C11.0942 8.29311 11.0108 8.54997 11.0295 8.80977L11.2217 11.475C11.275 12.2143 10.5336 12.7526 9.84717 12.4731L7.37793 11.4677C7.13616 11.3692 6.86549 11.3692 6.62372 11.4677L4.15448 12.4731C3.46801 12.7526 2.72667 12.2143 2.77997 11.475L2.97211 8.80977C2.99084 8.54997 2.90745 8.29311 2.7397 8.09385L1.01889 6.04977C0.541904 5.48318 0.824883 4.61276 1.54386 4.43498L4.13408 3.79452C4.38728 3.73191 4.606 3.57286 4.74359 3.35128L6.15129 1.0843Z" fill="#7000FF"></path></svg>
      за комментарии к уроку
    </div>
    <p class="single_post-content_title">Полезные материалы</p>
    <div class="useful-post_content-comments">
      <div class="comments-item_body">
        <a href="/" class="DF AIC detail-work_author-info">
          <div class="detail-work_author">
            <img src="https://kronadev.ru/upload/resize_cache/main/8ac/128_128_2/75zqimqppc76ug0dtzo4tsabpr7r5o8r.png" class="detail-work_author-img"/>
          </div>
          <div>
            <div class="detail-work_author-nl DF AIC">
              kisenkonastya
              <span class="detail-work_author-level">lvl. 55</span>
            </div>
            <div class="detail-work_author-stark">канареечный старк</div>
          </div>
        </a>
        <div class="comments-item_body-desc">
          desc авпа 563 
        </div>
        <div class="comments-item_body-date">
          29.10.2022, 21:51:53
        </div>
      </div>
    </div>
    <button v-if="!objNewComm.activeAddComm" @click="objNewComm.activeAddComm = true" class="useful-post_content-button">Добавить комментарий</button>
    <div v-else class="single_post-new_notes_box">
      <div 
        class="single_post-new_notes_input" 
        @input="(e) => {objNewComm.text = e.target.textContent}"
        contenteditable>
      </div>
      <div class="single_post-new_notes_img" @click="handlerAddComm">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.77817 3.30196L12.5001 8M12.5001 8L7.77817 12.698M12.5001 8L1.32881 8" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </div>
    </div>
  </div>
</template>