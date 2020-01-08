<template>
    <div :class="`anfo-tree-item ${isCurrent?'is-current':''}`" @click.stop="$emit('item-click', item, toggleExpand)">
        <slot v-bind="{item: {layer, isCurrent, isExpand, isParent, ...item, toggleExpand}, index}"></slot>
        <collapse-transition>
            <Tree @expand="handleExpand" :layer="layer+1" v-show="isExpand" :keyPropName="keyPropName" :current="current" :data="item[childrenPropName]" :children-prop-name="childrenPropName" @item-click="$emit('item-click', arguments[0], arguments[1])">
                <slot v-bind="{da, index}" slot-scope="{da, index}"></slot>
            </Tree>
        </collapse-transition>
    </div>
</template>
<script>
export default {
    beforeCreate(){
        //注册components，边界情况
        //eslint-disable-next-line
        this.$options.components.Tree = require('./Tree.vue').default;
    },
    created(){
        //data methods 已经初始化完成
        this.isExpand = this.defaultExpand;
    },
    computed:{
        isCurrent(){
            let isCurrent = this.current === this.item[this.keyPropName];
            if(isCurrent){
                this.$emit('expand', true);
            }
            return isCurrent;
        },
        isParent(){
            return this.item[this.childrenPropName] && this.item[this.childrenPropName].length > 0;
        }
    },
    components:{
        collapseTransition: {
            functional: true,
            render(h, { children }) {
                const data = {
                    on: {
                        beforeEnter(el) {
                            el.style.transition = 'height .3s';
                            el.style.overflow = 'hidden';
                            el.style.height = '0';
                        },
                        enter(el) {
                            el.style.height = el.scrollHeight + 'px';
                        },
                        afterEnter(el) {
                            el.style.overflow = '';
                            el.transition = '';
                            el.style.height = '';
                        },
                        beforeLeave(el){
                            el.style.transition = 'height .3s';
                            el.style.overflow = 'hidden';
                            el.style.height = el.scrollHeight + 'px';
                        },
                        leave(el) {
                            if (el.scrollHeight !== 0) {
                                el.style.height = '0';
                            }
                        },
                        afterLeave(el) {
                            el.style.height = '';
                            el.style.overflow = '';
                            el.transition = '';
                        }
                    },
                };
                return h('transition', data, children);
            }
        }
    },
    props:{
        index: Number,
        item:{
            type: Object,
            default: ()=>({})
        },
        childrenPropName: {
            type: String,
            default: 'children',
        },
        keyPropName:{
            type: String,
            default: 'children',
        },
        current: String,
        layer:{
            type: Number,
            default: 0,
        },
        defaultExpand: {
            type: Boolean,
            default: false,
        }
    },
    data(){
        return {
            isExpand: false,
        }
    },
    methods:{
        handleExpand(recursively){
            this.setExpand(true);
            if(recursively){
                this.$emit('expand', recursively);
            }
        },
        toggleExpand(){
            this.isExpand = !this.isExpand;
        },
        setExpand(expand){
            this.isExpand = expand;
        }
    }
}
</script>