<template>
    <div class="examples">
        <div example>
            <h1>Tree Examples</h1>
            <div>
                <h3>Basic</h3>
                <tree :data="treeData" @item-click="arguments[1]()">
                    <span slot-scope="hello"> <span style="display: inline-block; transition: transform .3s" :class="hello.item.isExpand?'is-expand':''" v-if="hello.item.isParent">▶</span> {{hello.item.label}}</span>
                </tree>
            </div>
        </div>
        <div class="example">
            <h1>Tree Table Examples</h1>
            <div>
                <h3>Basic</h3>
                <tree-table default-expand-all @item-click="arguments[1]()" :data="tableData" :fields="[{name: 'key'}, {name: 'value'}]">
                    <span style="width: 100px;display: inline-block" slot="header" slot-scope="item">{{item.name}}</span>
                    <span style="width: 100px;display: inline-block" slot-scope="{item, field}">{{item.item[field.name]}}</span>
                </tree-table>
            </div>
        </div>
    </div>
</template>

<script>
import TreeTable from '../components/TreeTable';
import Tree from '../components/tree/Tree';

export default {
    components: {
        Tree, TreeTable
    },
    data(){
        return {
            treeData:[{
                label: '节点A',
                children:[{
                    label: '节点A-a'
                }, {
                    label: '节点A-b'
                }],
            },{
                label: '节点B',
            },{
                label: '节点C',
                children: [{
                    label: '节点C-a'
                }]
            }],
            tableData: [{
                key: 'name',
                value: 'Anfo',
                children: [{
                    key: 'name',
                    value: 'bobby'
                }],
            }]
        }
    },

}
</script>

<style lang="less" scoped>
.examples{
    padding: 20px;
}
</style>
<style lang="less">
*{
    box-sizing: border-box;
}
.anfo-tree-table{
    .anfo-tree{
        padding-left: 0;
    }
    .param-row>*:first-child{
        padding-left: calc(var(--layer) * 20px);
    }
}
.anfo-tree{
    padding-left: calc(var(--layer) * 20px);
    .is-expand{
        transform: rotate(90deg);
    }
}
</style>