<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Noticias WordPress</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <div class="wordpress-container" v-if="wordpressData">
          <div class="wordpress-logo">
            <img :src="wordpressData.logo" :alt="wordpressData.title" />
          </div>
          <div v-for="post in wordpressData.posts" :key="post.id" class="wordpress-post">
            <h2>{{ post.title }}</h2>
            <p>{{ post.summary }}</p>
            <a :href="post.link" target="_blank">Visitar</a>
          </div>
        </div>
        <div v-else>
          <p>No se pudo obtener la información de WordPress en este momento.</p>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import axios from 'axios';
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/vue';
  
  export default defineComponent({
    data() {
      return {
        wordpressData: null,
        apiUrl: 'https://ambiente.gob.do/noticias/',
      };
    },
    methods: {
      fetchWordpressData(): void {
        axios
          .get(this.apiUrl)
          .then((response) => {
            this.wordpressData = {
              logo: response.data.logo,
              title: response.data.title,
              posts: response.data.posts.slice(0, 3),
            };
          })
          .catch((error) => {
            console.error('Error:', error);
            this.wordpressData = null;
          });
      },
    },
    mounted() {
      this.fetchWordpressData();
    },
    components: {
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonToolbar,
      IonButtons,
      IonMenuButton,
    },
  });
  </script>
  
  <style scoped>
  .wordpress-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .wordpress-logo img {
    width: 200px;
    margin-bottom: 20px;
  }
  
  .wordpress-post {
    margin-bottom: 20px;
  }
  
  .wordpress-post h2 {
    font-size: 18px;
    font-weight: bold;
  }
  
  .wordpress-post p {
    margin-top: 5px;
    font-size: 14px;
  }
  
  .wordpress-post a {
    display: inline-block;
    margin-top: 10px;
  }
  </style>
  