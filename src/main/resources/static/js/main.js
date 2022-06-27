var contractApi = Vue.resource('/contract{/id}');

Vue.component('contract-row', {
    props: ['contract'],
    template: '<div><i>({{ contract.id }})  </i>  {{contract.university}} </div>'
})

Vue.component('contract-form', {
    props: ['contracts'],
    data: function () {
        return {
            text: ''
        }
    },
    template:
        '<div>' +
        '<label>University</label><input type="text" placeholder="Write smth" v-model="text" />' +
        '<input type="button" placeholder="Write smth" @click="save" />' +
        '</div>',
    methods: {
        save: function () {
            var contract = {text: this.text};

            contractApi.save({}, contract).then(result =>
                result.json().then(data => {
                    this.contracts.push(data)
                    this.text = ''
                })
            )
        }
    }
})
Vue.component('contracts-list', {
    props: ['contracts'],
    template: '<div>' +
        '<contract-form :contracts="contracts"/>' +
        '<contract-row v-for="contract in contracts" :key="contract.id" :contract="contract"/>' +
        '</div>',
    created: function () {
        contractApi.get().then(result =>
            result.json().then(data =>
                data.forEach(contract => this.contracts.push(contract))
            )
        )
    }
})

var appSecond = new Vue({
    el: '#appSecond',
    template: '<contracts-list :contracts="contracts" />',
    data: {
        contracts: []
    }
})
