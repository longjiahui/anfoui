<template>
    <div
        class="anfo-tree"
        :style="{'--layer': layer}">
        <tree-item
            @expand="$emit('expand', arguments[0])"
            ref="treeItem"
            v-for="(item, index) in data"
            :key="index"
            :default-expand="defaultExpandAll"
            :layer="layer"
            @item-click="$emit('item-click', arguments[0], arguments[1])"
            :item="item"
            :current="current"
            :key-prop-name="keyPropName"
            :children-prop-name="childrenPropName">
            <slot v-bind="da" slot-scope="da"></slot>
        </tree-item>
    </div>
</template>
<script>
import TreeItem from './TreeItem';

export default {
    components:{
        TreeItem,
    },
    props:{
        data:{
            type: Array,
            default: ()=>[]
        },
        childrenPropName: {
            type: String,
            default: 'children',
        },
        keyPropName:{
            type: String,
            default: 'id',
        },
        current:{
            type: String,
            default: ''
        },
        defaultExpandAll: {
            type: Boolean,
            default: false,
        },
        // 组件内使用的layer，表示当前是第几层的tree结构
        layer: {
            type: Number,
            default: 0,
        },
    },
    methods:{
        setExpand(i, expand){
            if(this.$refs.treeItem && this.$refs.treeItem.length > i){
                this.$refs.treeItem[i].setExpand(expand);
            }
        },
        setExpandByKey(key, expand, recursively){
            /**
             * 当expand为true，表示展开该项时，recursively为true时，recursively生效，会将该项的父节点全部展开
             */
            let keyPropName = this.keyPropName;
            let treeItem = (function searchTreeItem(treeItems, key){
                for(let i = 0; i < treeItems.length; ++i){
                    let treeItem = treeItems[i];
                    if(treeItem.item[keyPropName] === key){
                        return treeItem;
                    }
                    if(treeItem.$children
                        && treeItem.$children.length > 0
                        && treeItem.$children[0].$children
                        && treeItem.$children[0].$children.length > 0){
                        let ret = searchTreeItem(treeItem.$children[0].$children, key);
                        if(ret){
                            return ret;
                        }
                    }
                }
            })(this.$children, key);
            if(treeItem){
                treeItem.setExpand(expand);
            }
            if(expand && recursively){
                treeItem.$emit('expand');
            }
        },
        setExpandAll(expand){
            if(this.$refs.treeItem && this.$refs.treeItem.length > 0){
                this.$refs.treeItem.forEach(item => {
                    item.setExpand(expand);
                });
            }
        }
    }
}
</script>