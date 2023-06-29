<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-menu-button></ion-menu-button>
            </ion-buttons>
          <ion-title>Perfil</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content :fullscreen="true">
        <div v-if="loading" class="ion-padding">
          <ion-spinner />
        </div>
        <div v-else>
          <div v-if="error" class="ion-padding">
            <ion-text color="danger">Error al cargar el perfil de GitHub</ion-text>
          </div>
          <div v-else class="ion-padding">
            <h1 class="ion-text-center">{{ profile?.name }}</h1>
            <div class="ion-text-center">
              <img :src="profile?.avatar_url" :alt="profile?.name" class="profile-image" />
            </div>
            <p class="ion-text-center">{{ profile?.bio }}</p>
  
            <div class="personal-info">
              <ion-item>
                <ion-label>Nombre completo:</ion-label>
                <ion-note slot="end">{{ fullName }}</ion-note>
              </ion-item>
              <ion-item>
                <ion-icon slot="start" name="mail"></ion-icon>
                <ion-note slot="end">{{ email }}</ion-note>
              </ion-item>
              <ion-item>
                <ion-label>Github:</ion-label>
                <ion-note slot="end">
                  <a :href="githubUrl" target="_blank">
                    <ion-icon :icon="logoGithub" />
                  </a>
                </ion-note>
              </ion-item>
              <ion-item>
                <ion-label>LinkedIn:</ion-label>
                <ion-note slot="end">
                  <a :href="linkedinUrl" target="_blank">
                    <ion-icon :icon="logoLinkedin" />
                  </a>
                </ion-note>
              </ion-item>
            </div>
  
            <h2>Mis repositorios</h2>
            <ul>
              <li v-for="repo in repos" :key="repo.id">
                <a :href="repo.html_url" target="_blank">{{ repo.name }}</a>
              </li>
            </ul>
          </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSpinner, IonText, IonItem, IonLabel, IonNote, IonIcon, IonButtons, IonMenuButton } from '@ionic/vue';
  import axios, { AxiosResponse, AxiosError } from 'axios';
  import { logoGithub, logoLinkedin, mail } from 'ionicons/icons';
  
  interface Profile {
    name: string;
    avatar_url: string;
    bio: string;
    email: string;
  }
  
  interface Repository {
    id: number;
    name: string;
    html_url: string;
  }
  
  export default defineComponent({
    data() {
      return {
        loading: true,
        error: false,
        profile: null as Profile | null,
        repos: [] as Repository[],
      };
    },
    mounted() {
      this.fetchProfile();
      this.fetchRepositories();
    },
    computed: {
      fullName(): string {
        if (this.profile) {
          return `Diego Peralta`;
        }
        return '';
      },
      email(): string {
        if (this.profile) {
          if(this.profile?.email != null){
            return `${this.profile.email}`;
          }
          return `Diegoperalta0929@gmail.com`;
        }
        return '';
      },
      githubUrl(): string {
        // Reemplaza 'tu-perfil-github' con tu enlace real de GitHub
        return 'https://github.com/10GO-dev';
      },
      linkedinUrl(): string {
        // Reemplaza 'tu-perfil-linkedin' con tu enlace real de LinkedIn
        return 'https://www.linkedin.com/in/diego-peralta-7218201b3';
      },
      logoGithub() {
        return logoGithub;
      },
      logoLinkedin() {
        return logoLinkedin;
      },
    },
    methods: {
      fetchProfile() {
        axios
          .get<Profile>('https://api.github.com/users/10GO-dev') // Reemplaza 'your-username' con tu nombre de usuario de GitHub
          .then((response: AxiosResponse<Profile>) => {
            this.loading = false;
            this.profile = response.data;
          })
          .catch((error: AxiosError) => {
            this.loading = false;
            this.error = true;
            console.error(error);
          });
      },
      fetchRepositories() {
        axios
          .get<Repository[]>('https://api.github.com/users/10GO-dev/repos') // Reemplaza 'your-username' con tu nombre de usuario de GitHub
          .then((response: AxiosResponse<Repository[]>) => {
            this.repos = response.data;
          })
          .catch((error: AxiosError) => {
            console.error(error);
          });
      },
    },
    components: {
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonToolbar,
      IonSpinner,
      IonText,
      IonItem,
      IonLabel,
      IonNote,
      IonIcon,
      IonButtons, IonMenuButton
    },
  
    logoMail() {
      return mail;
    },
  });
  </script>
  
  <style scoped>
  .profile-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 16px;
  }
  
  .personal-info ion-item {
    --ion-item-padding-end: 0;
    --ion-item-padding-start: 0;
    --ion-item-padding-bottom: 8px;
    --ion-item-padding-top: 8px;
  }
  </style>
  