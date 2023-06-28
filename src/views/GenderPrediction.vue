<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>Gender predictor</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-icon name="male-female"></ion-icon>
                    <ion-title size="large">Gender predictor</ion-title>
                </ion-toolbar>
            </ion-header>
            <div id="container" class="ion-padding">
                <p>Type a name a this will predict the gender</p>
                <ion-item>
                    <ion-label position="floating">Name</ion-label>
                    <ion-input v-model="name" type="text"></ion-input>
                </ion-item>
                <ion-button expand="full" @click="predictGender" color="primary">
                    Predict gender
                </ion-button>
                <div v-if="gender" class="gender-title" :style="gender === 'male' ? 'color: blue' : 'color: pink'">
                    {{ gender === 'male' ? 'Male' : 'Female' }} ({{ probality.toFixed(2) }}%)
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { IonIcon, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';

import { maleFemale } from 'ionicons/icons';

import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            name: '',
            gender: '',
            probality: 0,
        };
    },
    setup() {
        return {
            maleFemale,
        };
    },
    methods: {
        predictGender(): void {
            fetch(`https://api.genderize.io/?name=${this.name}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.gender) {
                        this.gender = data.gender.toLowerCase();
                        this.probality = data.probability * 100;
                    } else {
                        this.gender = '';
                        this.probality = 0;
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    this.gender = '';
                    this.probality = 0;
                });
        },
    },
    components: {
        IonIcon,
        IonButton,
        IonButtons,
        IonContent,
        IonHeader,
        IonInput,
        IonItem,
        IonLabel,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar,
    },
});
</script>
  
<style scoped>
#container {
  position: absolute;
  left: 0;
  right: 0;
}
.gender-title {
  text-align: center;
  font-size: 24px;
  margin-top: 20px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 5px;
}
</style>
  