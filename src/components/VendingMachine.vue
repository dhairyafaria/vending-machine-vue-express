<template>
  <div class="vending-machine container modal-open">
    <div class="row">
      <div class="col-sm-6">Add appropriate money to buy any item before clicking on "Buy" button.</div>
      <div class="input-group mb-3 col-sm-6">
        <input type="text"
          class="form-control"
          placeholder="Add appropriate money"
          aria-label="Add appropriate money"
          aria-describedby="button-addon2"
          v-model="customerMoney"
        >
        <button class="btn btn-outline-primary"
          type="button"
          id="button-addon2"
          @click="addMoneyToMachine()"
        >
          Add
        </button>
      </div>
    </div>
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="alertVariant"
      @dismissed="dismissCountDown=0"
    >
      <span>{{ alertMessage }}</span>
    </b-alert>
    <div class="vending-machine-products row"
      v-if="filteredProducts.length > 0 && errorMsg === ''"
    >
      <div class="vending-machine-product col-sm-4"
        v-for="(product, index) in filteredProducts"
        :key="index"
      >
        <div class="vending-machine-product-box border border-dark mb-1">
          <div class="product-name">{{ product.name }}</div>
          <div>Quantity: {{ product.quantity }}</div>
          <div>Price per piece (Rs): {{ product.price }}</div>
          <b-button id="show-btn"
            variant="primary"
            :disabled="!moneyInMachine"
            @click="openConfirmModal(product)"
          >
            Buy
          </b-button>
        </div>
      </div>
    </div>
    <div v-if="errorMsg">
      {{ errorMsg }}
    </div>
    <b-modal id="bv-modal-example" hide-footer>
      <template #modal-title>
        Do you want to continue to buy?
    </template>
      <div class="d-block text-center">
        <span>Click 'Yes' to continue or click 'Cancel' to refund</span>
      </div>
      <b-button class="mt-3"
        block
        @click="cancelPurchase()"
      >
        Cancel
      </b-button>
      <b-button class="mt-3"
        block
        variant="primary"
        @click="purcharse()"
      >
        Yes
      </b-button>
    </b-modal>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'vending-machine',
  data () {
    return {
      products: [],
      errorMsg: '',
      isModalOpen: false,
      customerMoney: 0,
      moneyInMachine: 0,
      dismissSecs: 5,
      dismissCountDown: 0,
      productSelected: {},
      alertMessage: '',
      alertVariant: 'success'
    }
  },
  created () {
    this.getAllProducts()
  },
  computed: {
    filteredProducts () {
      return this.products.filter(i => i.quantity > 0)
    }
  },
  methods: {
    async getAllProducts () {
      try {
        const response = await axios.get('http://localhost:3000/api/products')
        this.products = response.data.products
      } catch (error) {
        this.errorMsg = error
      }
    },
    openConfirmModal (product) {
      this.productSelected = product
      this.$bvModal.show('bv-modal-example')
    },
    addMoneyToMachine () {
      this.moneyInMachine = this.customerMoney
      this.customerMoney = 0
    },
    cancelPurchase () {
      this.alertMessage = 'You have cancelled purchase. Your Money has been refunded.'
      this.cancelTranscation()
    },
    cancelTranscation () {
      this.moneyInMachine = 0
      this.productSelected = {}
      this.$bvModal.hide('bv-modal-example')
      this.alertVariant = 'danger'
      this.showAlert()
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    async purcharse () {
      if (this.moneyInMachine >= this.productSelected.price) {
        try {
          this.productSelected.quantity -= 1
          await axios.patch(`http://localhost:3000/api/products/update/${this.productSelected.id}`, this.productSelected)
          this.alertVariant = 'success'
          this.alertMessage = 'Transaction completed successfully. Please collect your product. Thank you.'
          if (this.moneyInMachine > this.productSelected.price) {
            this.alertMessage += ` Please collect ${this.moneyInMachine - this.productSelected.price} Rs change.`
          }
          this.moneyInMachine = 0
          this.productSelected = {}
          this.$bvModal.hide('bv-modal-example')
          this.showAlert()
        } catch (error) {
          this.alertMessage = 'Transaction has been cancelled because of some error. Your Money has been refunded.'
          this.cancelTranscation()
        }
      } else {
        this.alertMessage = 'Transaction has been cancelled because of insufficient funds. Your Money has been refunded.'
        this.cancelTranscation()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .vending-machine {
    .vending-machine-products {
      .vending-machine-product {
        .vending-machine-product-box {
          height: 200px;
          text-align: center;
          .product-name {
            height: 70px;
          }
        }
      }
    }
  }
</style>
