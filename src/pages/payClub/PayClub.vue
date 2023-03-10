<script setup>
  import { getAuthStore } from '@/stores/authStore' 
  import SideBar from '@/components/SideBar/SideBar.vue'

  import { reactive, defineAsyncComponent } from 'vue';

  import './style.css'
  import './media-style.css'

  const ModalAddMaterial = defineAsyncComponent(
    () => import('@/components/ModalAddMaterial/ModalAddMaterial.vue')
  )

  const ModalAddWork = defineAsyncComponent(
    () => import('@/components/modalAddWork/ModalAddWork.vue')
  )
  
  window.scrollTo(0,0);

  const authStore = getAuthStore()

  const objPrice = reactive({
    toggleActive: false,
    totalPrice: 1300
  })
  
  const objModal = reactive({
    activeMaterialModal: false,
    activeWorkModal: false
  })

  const handlerSelect = (e) => {
    switch(e.target.value) {
      case '3':
        objPrice.totalPrice = 3510
        break

      case '6':
        objPrice.totalPrice = 6500
        break
      
      case '12':
        objPrice.totalPrice = 11700
        break

      default:
        objPrice.totalPrice = 1300
        break
    }

    if (objPrice.toggleActive) {
      objPrice.totalPrice = objPrice.totalPrice - Math.floor(Number(authStore.data.user.account.star)) * 20
    }
  }

  const handlerToggle = () => {
    objPrice.toggleActive = !objPrice.toggleActive

    if (objPrice.toggleActive) {
      objPrice.totalPrice = objPrice.totalPrice - Math.floor(Number(authStore.data.user.account.star)) * 20
    } else objPrice.totalPrice = objPrice.totalPrice + Math.floor(Number(authStore.data.user.account.star)) * 20
  }

</script>

<template>
  <div class="DF">
    <SideBar
      @showMaterialModal="(active) => objModal.activeMaterialModal = active"
      @showWorkModal="(active) => objModal.activeWorkModal = active"/>
    <div class="pay-wrapper">
      <div v-if="authStore.data.auth" class="pay-body">
        <p class="pay-body_title">Клуб. Оплата подписки</p>
        <div class="pay-body_desc">
          Вы можете продлить участие в клубе в любой момент. Если у вас есть действующая подписка, то к действующему периоду прибавится оплаченный период.
          <br><br>
          После перехода к оплате вы увидете вашу актуальную персональную цену, по которой сможете продлить участие. Ваши персональные цены привязаны к почте, поэтому обратите внимание на корректность ее ввода.
          <br><br>
          Для оплаты подписки клуба введите данные ниже.
          <br><br>
        </div>
        <input 
          type="text" 
          :disabled="authStore.data.user.account.email ? 'true' : 'false'" 
          class="pay-body_input" 
          :class="authStore.data.user.account.email ? 'input_disabled' : ''"
          v-model="authStore.data.user.account.email" 
          placeholder="Введите email">
        <select class="pay-body_select" @change="handlerSelect">
          <option value="1">1 месяц (30 дней) = 1300₽</option>
          <option value="3">3 месяца (90 дней) (-10%) = 3510₽</option>
          <option value="6">6 месяцев (180 дней) (1 месяц бесплатно) = 6500₽</option>
          <option value="12">12 месяцев (365 дней) (3 месяца бесплатно) = 11700₽</option>
        </select>
        <div class="pay-body_bonus">
          <p class="pay-body_bonus_title">Доступные вам бонусы</p>
          <div class="pay-body_bonus_desc">
            Ваш баланс звезд = {{ authStore.data.user.star }} (1⭐️ = 20₽)
            <br>
            При этом списать можно не более:
            <ul>
              <li>20⭐️за подписку на 1 месяц</li>
              <li>35⭐️за подписку на 3 месяца</li>
              <li>50⭐️за подписку на 6 месяцев</li>
              <li>80⭐️за подписку на 12 месяцев</li>
            </ul>
            <div class="DF AIC">
              <div class="pay-body_bonus_toggle" @click="handlerToggle">
                <div class="pay-body_bonus_toggle_dot" :class="objPrice.toggleActive ? 'bonus_toggle-active' : ''"></div>
              </div>
              <p class="pay-body_bonus_toggle_text">Списать доступные звезды ({{Math.floor(Number(authStore.data.user.account.star))}}⭐️ = {{Math.floor(Number(authStore.data.user.account.star)) * 20}}₽)</p>
            </div>
            <p class="pay-body_bonus_desc">Звезды списываются при переходе к оплате. Если вы после перехода к оплате в течение 10 минут не произведете оплату, то напишие нам и мы вернем вам звезды</p>
          </div>
        </div>
        <div class="pay-body_bonus">
          <p class="pay-body_total-price">Итоговая цена: {{objPrice.totalPrice}}₽</p>
        </div>
        <button class="pay-body_button-pay">Перейти к оплате</button>
        <div class="pay-body_oferta">Нажимая на кнопку «Оплатить» вы соглашаетесь с <a href="https://drive.google.com/file/d/1XpdivgLw8zeZymkKffI33vxb15GziuKu/view" target="_blank">договором оферты</a> и даете согласие на <a href="https://drive.google.com/file/d/1JNeVQZmckk6fI3QL990PNWDKe2dlKw-T/view">обработку персональных данных</a></div>
      </div>
    </div>
  </div>
  <ModalAddMaterial 
    v-if="objModal.activeMaterialModal"
    @closeModal="(close) => objModal.activeMaterialModal = close"
    :activeModal="objModal.activeMaterialModal"/>

  <ModalAddWork 
    v-if="objModal.activeWorkModal"
    @closeModal="(close) => objModal.activeWorkModal = close"
    :activeModal="objModal.activeWorkModal"/>
</template>