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
        },
        activeProject: {
            name: '',
            id: 1,
            pomos: { 
                planned: 0,
                done: 0
            }
        }
    },
    mutations: {
        SET_POMO_SETTINGS(state, newSettings) {
            state.pomoSettings = {...newSettings};
        },
        SET_POMOS_PER_CYCLE(state, pomosPerCycle) {
            state.pomoSettings.pomosPerCycle = pomosPerCycle;
        },
        SET_FOCUS_DURATION_IN_MINUTES(state, focusDurationInMinutes) {
            state.pomoSettings.focusDurationInMinutes = focusDurationInMinutes;
        },
        SET_SHORT_BREAK_IN_MINUTES(state, shortBreakInMinutes) {
            state.pomoSettings.shortBreakInMinutes = shortBreakInMinutes;
        },
        SET_LONG_BREAK_IN_MINUTES(state, longBreakInMinutes) {
            state.pomoSettings.longBreakInMinutes = longBreakInMinutes;
        },
        SET_ACTIVE_PROJECT(state, activeProject) {
            state.activeProject = activeProject;
        },
        CLEAR_ACTIVE_PROJECT(state) {
            state.activeProject = {};
        },
        SET_ACTIVE_PROJECT_NAME(state, name) {
            state.activeProject.name = name;
        },
        SET_ACTIVE_PROJECT_POMOS(state, pomos) {
            state.activeProject.pomos = pomos;
        },
        SET_ACTIVE_PROJECT_ID(state, id) {
            state.activeProject.id = id
        }
    }
})

new Vue({ vuetify, render: h => h(App), store: store })
    .$mount('#app');