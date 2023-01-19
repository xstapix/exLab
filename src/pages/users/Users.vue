<script setup>
  import SideBar from '@/components/sideBar/SideBar.vue'
  import './style.css'
</script>
<template>
  <div class="DF">
    <SideBar/>
    <section class="users_body">
      <div class="stark_rating DF AIC">
        <p class="stark_rating-text">Pейтинг старков</p>
        <div class="stark_rating-select DF AIC">
          <p class="stark_rating-select_text">За месяц</p>
          <div class="stark_rating-select_arrow_down"></div>
        </div>
      </div>
      <table class="users_body-table">
        <thead>
          <tr>
            <th></th>
            <th>Название аккаунта</th>
            <th>Звезды</th>
            <th>Уровень</th>
            <th>В клубе</th>
            <th>База старка</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="DF AIC">
                <div class="table_account_avatar">
                  <img class="table_account_avatar-img" src="/yyhqfinwoon1yvcb6hm7jam67nnus0ec.png" alt="" srcset="">
                </div>
                <div class="table_account_text">
                  <p class="table_account_text-name">ksenglow</p>
                  <p class="table_account_text-which_stark">ультрамариновый старк</p>
                </div>
              </div>
            </td>
            <td>
              <div class="DF AIC">
                <div class="table_star">
                </div>
                <p class="table_star-text">6.4</p>
              </div>
            </td>
            <td>
              <div class="DF AIC">
                <div class="table_star">
                </div>
                <p class="table_star-text">1.4</p>
              </div>
            </td>
            <td>
              <div class="DF AIC">
                <div class="table_star">
                </div>
                <p class="table_star-text">64</p>
              </div>
            </td>
            <td>
              <div class="table_location DF AIC">
                <div class="table_star">
                </div>
                <p class="table_location-text">Россия</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>