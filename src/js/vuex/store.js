import { SHOW_LOADING, USER_NAME , COUNT, IS_LOGIN } from "./mutations.type";
const state = {   
    showLoading : false,
    isLogin     : false,
    userName    : "",
    count       :0,
};

// vue 裡用 this.$store.commit('showLoading' , true)
// mutation 必須是同步函數, 很重要
const mutations = {    
    [IS_LOGIN]( state, value ) {
        state.isLogin = value;
    }, 
    [SHOW_LOADING]( state, value ) {
        state.showLoading = value;
    }, 
    [USER_NAME]( state, name ) {
        state.userName = name;
    },
    [ COUNT ]( state ) {
        state.count++;
    }
};

/*
    vue 裡用 this.$store.dispatch('showLoading' , true)
    methods(){
        ...Vuex.mapActions(['showLoading','count']),
    }

    Action 類似於 mutation，不同在於：
    Action 提交的是 mutation，而不是直接變更狀態。
    Action 可以包含任意異步操作。
    Action 可以非同步，但一定只能 return Promise
*/
const actions = {   
    showLoading( {commit} , value) {        
        commit( 'showLoading',value );
    },
    login( {commit, state}, { email , password} ) {        
        return new Promise( resolve => {             
            commit( 'showLoading', true );
            console.log('action login', email , password);
            setTimeout( async () => {                
                var response = await axios.get( 'api.txt' );
                var data = response.data;
                if ( data.status == 'ok' ) {
                    commit( 'userName', data.name );
                    // commit( 'isLogin', true );
                    // action 不應該直接修改 state 的值, 
                    // 要使用 commit 的方式呼叫 mutations 去改值
                    // 以下寫法在嚴格模式會發生錯誤
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
    showLoading: state => state.showLoading,
    isLogin: state => state.isLogin,
    userName: state => state.userName,
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
    mutations,
    strict: true,//嚴格模式
});