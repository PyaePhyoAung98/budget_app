export default {
    state: {
        categorires: []
    },
    mutations: {
        addCategory(state, payload) {
            state.categorires.push(payload);
        },
        setCategory(state, {index,category}) {
            state.categorires[index] = category;
        },
        delCategory(state,payload) {
            state.categorires.splice(payload, 1)
        }
    },
    getters: {
        getCategories: state => state.categorires
    }
}