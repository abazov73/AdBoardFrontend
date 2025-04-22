<template>
  <NavBar/>
  <div id="app">
    <router-view></router-view> <!-- Здесь будут отображаться ваши компоненты -->
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
</script>

<style>
form {
   max-width :400 px ;
   margin :20 px auto ;
   padding :20 px ;
   border :1 px solid #ccc ;
   border-radius :5 px ;
   background-color :#f9f9f9 ;
}

form label {
   display :block ;
   margin-bottom :5 px ;
   font-weight :bold ;
}

form input[type='text'],
form input[type='email'],
form input[type='password'],
form textarea {
   width: 50%;
   padding :10 px ;
   margin-bottom :15 px ;
   border :1 px solid #ccc ;
   border-radius :4 px ;
   font-size :16 px ;
}

form input[type='text']:focus,
form input[type='email']:focus,
form input[type='password']:focus,
form textarea:focus {
   border-color :#007bff ;
   outline :none ;
}

form button {
   background-color :#007bff ;
   color :white ;
   border :none ;
   padding :10 px ;
   border-radius :4 px ;
   cursor:pointer;
   font-size :16 px ;
}

form button:hover {
   background-color :#0056b3 ;
}

.error-message {
     color:#e74c3c;
     font-size :14 px;
     margin-top :-10 px;
     margin-bottom :15 px;
}
</style>