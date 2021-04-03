<template>
  <div class="vending-machine container">
    <div class="vending-machine-products row"
      v-if="products.length > 0 && errorMsg === ''"
    >
      <div class="vending-machine-product col-sm-4"
        v-for="(product, index) in products"
        :key="index"
      >
        <div class="vending-machine-product-box border border-dark mb-1">
          <div class="product-name">{{ product.name }}</div>
          <div>Quantity: {{ product.quantity }}</div>
          <div>Price: {{ product.price }}</div>
          <button type="button" class="btn btn-primary">Buy</button>
        </div>
      </div>
    </div>
    <div v-if="errorMsg">
      {{ errorMsg }}
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'vending-machine',
  data () {
    return {
      products: [],
      errorMsg: ''
    }
  },
  created () {
    this.getAllProducts()
  },
  methods: {
    async getAllProducts () {
      try {
        const response = await axios.get('http://localhost:3000/api/products')
        this.products = response.data.products
      } catch (error) {
        this.errorMsg = error
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
