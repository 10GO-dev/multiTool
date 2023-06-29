<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-menu-button color="primary"></ion-menu-button>
            </ion-buttons>
          <ion-title>Universities by contry</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding" :fullscreen="true">
        <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">University List</ion-title>
                </ion-toolbar>
            </ion-header>
        <div id="container" class="ion-padding">
            <p>Type a country to get the list of universities</p>
                <ion-item>
                    <ion-label position="floating">Country</ion-label>
                    <ion-input v-model="country" type="text"></ion-input>
                </ion-item>
                <ion-button expand="full" @click="fetchUniversities" color="primary">
                    Predict gender
                </ion-button>
        </div>
        <div  v-for="university in universities" :key="university.name" class="university-item">
          <h2>{{ university.name }}</h2>
          <p class="domain">Domain: {{ university.domains[0] }}</p>
          <p class="website">Website: <a :href="(university.web_pages[0])">{{ university.web_pages[0] }}</a></p>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent} from 'vue';
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonLabel, IonInput, IonButton, IonItem } from '@ionic/vue';
  
  export default defineComponent({
    data() {
      return {
        country: '',
        universities: [],
      };
    },
    methods: {
      fetchUniversities(): void {
        fetch(`http://universities.hipolabs.com/search?country=${this.country}`)
          .then((response) => response.json())
          .then((data) => {
            this.universities = data;
          })
          .catch((error) => {
            console.error('Error:', error);
            this.universities = [];
          });
      },
    },
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        IonButtons,
        IonMenuButton,
        IonLabel,
        IonInput,
        IonButton,
        IonItem,
    },
  });
  </script>
  
  <style scoped>
  .university-item {
    background-color: #292828;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  
  h2 {
    font-size: 18px;
    margin-bottom: 5px;
  }
  
  .domain {
    font-size: 14px;
    color: #888;
  }
  
  .website {
    font-size: 14px;
    margin-top: 5px;
  }
  
  a {
    color: #007bff;
    text-decoration: none;
  }
  </style>
  