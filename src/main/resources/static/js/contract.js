
function getIndex(list, id) {
    for (var i = 0; i < list.length; i++ ) {
        if (list[i].id === id) {
            return i;
        }
    }

    return -1;
}


var contractApi = Vue.resource('/contract{/id}');

Vue.component('contract-form', {
    props: ['contracts', 'contractAttr'],
    data: function() {
        return {
            text: '',
            id: ''
        }
    },
    watch: {
        contractAttr: function(newVal, oldVal) {
            this.text = newVal.text;
            this.id = newVal.id;
        }
    },
    template:
        '<div>' +
        '<input type="text" placeholder="Write something" v-model="text" />' +
        '<input type="button" value="Save" @click="save" />' +
        '</div>',
    methods: {
        save: function() {
            var contract = { text: this.text };

            if (this.id) {
                contractApi.update({id: this.id}, contract).then(result =>
                    result.json().then(data => {
                        var index = getIndex(this.contracts, data.id);
                        this.contracts.splice(index, 1, data);
                        this.text = ''
                        this.id = ''
                    })
                )
            } else {
                contractApi.save({}, contract).then(result =>
                    result.json().then(data => {
                        this.contracts.push(data);
                        this.text = ''
                    })
                )
            }
        }
    }
});

Vue.component('contract-row', {
    props: ['contract', 'editMethod', 'contracts'],
    template: '<div>' +
        '<i>({{ contract.id }})</i> {{ contract.text }}' +
        '<span style="position: absolute; right: 0">' +
        '<input type="button" value="Edit" @click="edit" />' +
        '<input type="button" value="X" @click="del" />' +
        '</span>' +
        '</div>',
    methods: {
        edit: function() {
            this.editMethod(this.contract);
        },
        del: function() {
            contractApi.remove({id: this.contract.id}).then(result => {
                if (result.ok) {
                    this.contracts.splice(this.contracts.indexOf(this.contract), 1)
                }
            })
        }
    }
});

Vue.component('contracts-list', {
    props: ['contracts'],
    data: function() {
        return {
            contract: null
        }
    },
    template:
        '<div style="position: relative; width: 300px;">' +
        '<contract-form :contracts="contracts" :contractAttr="contract" />' +
        '<contract-row v-for="contract in contracts" :key="contract.id" :contract="contract" ' +
        ':editMethod="editMethod" :contracts="contracts" />' +
        '</div>',
    created: function() {
        contractApi.get().then(result =>
            result.json().then(data =>
                data.forEach(contract => this.contracts.push(contract))
            )
        )
    },
    methods: {
        editMethod: function(contract) {
            this.contract = contract;
        }
    }
});

var app = new Vue({
    el: '#app',
    template: '<contracts-list :contracts="contracts" />',
    data: {
        contracts: []
    }
});