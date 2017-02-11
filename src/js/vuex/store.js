
const state = {   
    showLoading: false,
    isLogin: false,
    userName: "",
};

// vue 裡用 this.$store.commit('showLoading' , true)
const mutations = {    
    showLoading( state, value ) {
        state.showLoading = value;
    }, 
    userName( state, name ) {
        state.userName = name;
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
    login( {commit, state}, value ) {        
        return new Promise( resolve => {             
            commit( 'showLoading', true );
            setTimeout( async () => {                
                var response = await axios.get( 'api.txt' );
                var data = response.data;
                if ( data.status == 'ok' ) {
                    commit( 'userName', data.name );
                    // commit( 'isLogin', true );
                    state.isLogin = true;
                }
                resolve( data );
                commit( 'showLoading', false );
            }, 1000);          
        })        
    }
    
};

/**
    computed:{
        ...Vuex.mapGetters(['showLoading','isLogin','userName'])
    },
 */
const getters = {  
    showLoading: stat => state.showLoading,
    isLogin: stat => state.isLogin,
    userName: stat => state.userName,
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