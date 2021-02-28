import Vue from 'vue';
import Vuex from 'vuex';

import App from './App.vue';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        pomoSettings: {
            pomosPerCycle: 4,
            focusDurationInMinutes: 25,
            shortBreakInMinutes: 5,
            longBreakInMinutes: 30
        }
    },
    mutations: {
        setPomoSettings(state, newSettings) {
            state.pomoSettings = {...newSettings};
        },
        setPomosPerCycle(state, pomosPerCycle) {
            state.pomoSettings.pomosPerCycle = pomosPerCycle;
        },
        setFocusDurationInMinutes(state, focusDurationInMinutes) {
            state.pomoSettings.focusDurationInMinutes = focusDurationInMinutes;
        },
        setShortBreakInMinutes(state, shortBreakInMinutes) {
            state.pomoSettings.shortBreakInMinutes = shortBreakInMinutes;
        },
        setLongBreakInMinutes(state, longBreakInMinutes) {
            state.pomoSettings.longBreakInMinutes = longBreakInMinutes;
        }
    }
})

new Vue({ vuetify, render: h => h(App), store: store })
    .$mount('#app');