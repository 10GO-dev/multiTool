<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>Age Predictor</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Age predictor</ion-title>
                </ion-toolbar>
            </ion-header>
            <div id="container" class="ion-padding">
                <p>Type a name a this will predict the age.</p>
                <ion-item>
                    <ion-label position="floating">Name</ion-label>
                    <ion-input v-model="name" type="text"></ion-input>
                </ion-item>
                <ion-button expand="full" @click="predictAge" color="primary">
                    Predict age
                </ion-button>
                <div v-if="age" class="age-details">
                    <div v-if="ageCategory === 'joven'" class="age-category young">
                        <img src="../assets/Images/joven.jpeg" alt="Joven">
                        <div class="age-label">{{ age }} años</div>
                    </div>
                    <div v-if="ageCategory === 'adulto'" class="age-category adult">
                        <img src="../assets/Images/adulto.jpg" alt="Adulto">
                        <div class="age-label">{{ age }} años</div>
                    </div>
                    <div v-if="ageCategory === 'anciano'" class="age-category elderly">
                        <img src="../assets/Images/anciano.jpeg" alt="Anciano">
                        <div class="age-label">{{ age }} años</div>
                    </div>
                </div>

            </div>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';

import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            name: '',
            age: 0,
            ageCategory: '',
        };
    },
    methods: {
        predictAge(): void {
            fetch(`https://api.agify.io/?name=${this.name}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.age) {
                        this.age = data.age;
                        if (this.age < 30) {
                            this.ageCategory = 'joven';
                        } else if (this.age >= 30 && this.age < 60) {
                            this.ageCategory = 'adulto';
                        } else {
                            this.ageCategory = 'anciano';
                        }
                    } else {
                        this.age = 0;
                        this.ageCategory = '';
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    this.age = 0;
                    this.ageCategory = '';
                });
        },
    },
    components: {
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

.age-details {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
}

.age-category {
  text-align: center;
  margin-bottom: 10px;
}

.age-label {
  font-size: 20px;
}

.young {
  color: blue;
}

.adult {
  color: green;
}

.elderly {
  color: red;
}

#container p {
    font-size: 16px;
    line-height: 22px;
    color: #8c8c8c;
    margin: 5px;
}
</style>
  