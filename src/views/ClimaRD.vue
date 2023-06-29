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
import axios from 'axios';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/vue';

export default defineComponent({
  data() {
    return {
      weather: null,
      apiKey: '7ec8bc5911c970269d7b19df6551712a', // Reemplaza con tu clave de API de OpenWeatherMap
      city: 'Santo Domingo',
    };
  },
  methods: {
    fetchWeather(): void {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`;
      axios
        .get(url)
        .then((response) => {
          this.weather = response.data;
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
    this.fetchWeather();
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
