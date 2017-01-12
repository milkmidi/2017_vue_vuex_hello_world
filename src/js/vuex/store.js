
const state = {   
    showLoading: true,
    count:0
};

// vue 裡用 this.$store.commit('showLoading' , true)
const mutations = {    
    showLoading( state, value ) {
        state.showLoading = value;
    },
    count( state, value ) {
        state.count = value;
    }
};

/*
    vue 裡用 this.$store.dispatch('showLoading' , true)
    methods(){
        ...Vuex.mapActions(['showLoading','count']),
    }
*/
const actions = {   
    showLoading( {commit} , value) {        
        commit( 'showLoading',value );
    },
    count( {commit}, value ) {
        commit( 'count', value );  
    }
    
};

/**
    computed:{
        ...Vuex.mapGetters(['count'])
    },
 */
const getters = {  
    showLoading: stat => state.showLoading,
    count: stat => state.count,
};


// https://vuex.vuejs.org/en/plugins.html
// Plugins
const myPlugin = store => {
    // called when the store is initialized
    store.subscribe(( mutation, state ) => {
        // called after every mutation.
        console.log( mutation );
        // The mutation comes in the format of { type, payload }.
    });
};

export default new Vuex.Store( {
    plugins: [myPlugin],
    state,
    getters,
    actions,
    mutations
});