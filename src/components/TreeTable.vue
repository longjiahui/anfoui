<template>
    <div class="params-tree-table">
        <div class="table-header column-container">
            <slot
                name="header"
                v-for="field in fields"
                v-bind="field"></slot>
        </div>
        <div class="table-content row-container">
            <tree :data="data">
                <div
                    slot-scope="item"
                    class="column-container param-row">
                    <slot v-for="(field, index) in fields" v-bind="{item, field, index}"></slot>
                </div>
            </tree>
        </div>
    </div>
</template>

<script>
/**
 * field:{
 *  name:
 *  desc:
 *  width: 
 * }
 */
import Tree from './tree/Tree';

export default {
    components:{
        Tree
    },
    props:{
        fields:{
            type: Array,
            default: ()=>[]
        },
        data: {
            type: Array,
            default: ()=>[]
        }
    },
}
</script>