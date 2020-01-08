import Tree from './components/tree/Tree';
import TreeTable from './components/TreeTable';

export default {
    Tree,
    TreeTable,
    install(Vue){
        Vue.component('anfo-tree', Tree);
        Vue.component('anfo-tree-table', TreeTable);
    },
}