<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-menu-button></ion-menu-button>
            </ion-buttons>
          <ion-title>Clima en tiempo real</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <div class="weather-container" v-if="weather">
          <h2>{{ weather.name }}</h2>
          <div class="weather-details">
            <div class="weather-icon">
              <img :src="getWeatherIconUrl(weather.weather[0].icon)" :alt="weather.weather[0].description" />
            </div>
            <div class="weather-info">
              <p class="temperature">{{ weather.main.temp }} °C</p>
              <p class="description">{{ weather.weather[0].description }}</p>
            </div>
          </div>
        </div>
        <div v-else>
          <p>No se pudo obtener el clima en este momento.</p>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonButtons, IonMenuButton } from '@ionic/vue';
  export default defineComponent({
    data() {
      return {
        weather: null,
        apiKey: '7ec8bc5911c970269d7b19df6551712a',
         // Reemplaza con tu clave de API de OpenWeatherMap
        lat: 18.5001,
        lon: -69.9886,
        date: new Date(),
      };
    },
    methods: {
      fetchWeather(): void {
        fetch(`https://api.openweathermap.org/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${date}&appid=${this.apiKey}`)
          .then((response) => response.json())
          .then((data) => {
            this.weather = data;
          })
          .catch((error) => {
            console.error('Error:', error);
            this.weather = null;
          });
      },
      getWeatherIconUrl(icon: string): string {
        return `http://openweathermap.org/img/w/${icon}.png`;
      },
    },
    mounted() {
      onMounted(this.fetchWeather);
    },components: {
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
  .weather-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .weather-details {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
  
  .weather-icon img {
    width: 100px;
  }
  
  .weather-info {
    margin-left: 20px;
  }
  
  .temperature {
    font-size: 24px;
    font-weight: bold;
  }
  
  .description {
    font-size: 18px;
  }
  
  </style>
  