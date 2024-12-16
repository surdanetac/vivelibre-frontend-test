<template>
  <div>
    <div class="product-list">
      <button type="button" class="btn btn-outline-danger float-end" @click="signOut()">Sign out</button>
      <h1>Product List</h1>
      <div v-if="loading" class="loading">Loading...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="!loading && !error" class="products">
        <div v-for="product in products" :key="product.id">
          <!-- Se implementa sintaxis moderna de props y eventos de VueJS, se cambian v-bind: y v-on: -->
          <!-- Se cambia el nombre de la evento, con la idea de mantener la misma convencion camelCase al nombrar funciones -->
          <product-card 
            :product="product"
            @productFavoriteClicked="toggleProductFavorite(products, product.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import { fetchProducts } from './../helpers/fecthService'
import ProductCard from '../components/ProductCard.vue'
import { deleteToken } from './../helpers/utils'
export default {
  name: 'ProductsList',
  components: {
    ProductCard
  },
  created () {
    this.getProducts()
  },
  mounted () {
    this.getProducts()
  },
  data () {
    return {
      products: [], 
      loading: true,
      error: null
    }
  },
  methods: {
    // Se renombra la funcion por getProducts, para hacer implementacion del fetchservice.
    async getProducts () {
      try {
        const response = await fetchProducts()
        this.products = response.data.slice(0, 5).map(product => { return { ...product, favorite: false }})
      } catch (err) {
        this.error = 'Failed to load products'
      } finally {
        this.loading = false
      }
    },
    toggleProductFavorite (products, productSelectedId) {
      /*
      - Declaracion de multiples variables no completamente necesarias
        var output = []
        
        for (var i = 0; i < products.length; i++) {
          var productData = products[i]
          
      - Aca se declara una funcion que no se ejecuta 
          output.push(function () {     
            if (productData.id == String(productSelectedId)) { 
              productData.favorite = true
            }
            
            return productData
          })
        }

        this.products = output
      - Return de datos innecesarios, ya que la funcion no se almacena en alguna variable y estamos modificando la variable en el estado del componente justo antes.
        return output
      */
    // - Se utiliza Array.prototype.map para retornar un nuevo arreglo con los productos actualizados.
      const updatedProduts = products.map(product => {
        if (product.id === productSelectedId) {
          return { ...product, favorite: !product.favorite }
        } 
        return product
      })
      this.products = updatedProduts
    }, 
    // Se implementa un boton y funcion para borrar el token de localStorage y forzar el Auth con el router.go()
    signOut () {
      deleteToken()
      this.$router.go()
    }
  }
}
</script>

<style scoped>
.product-list {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  font-size: 18px;
  color: gray;
}

.error {
  color: red;
  font-size: 18px;
}

.products {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

</style>
