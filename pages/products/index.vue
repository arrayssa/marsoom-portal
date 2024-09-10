<template>
    <div class="product-management">
      <!-- Header Section -->
      <div class="header">
        <h2>Product Management</h2>
      </div>
  
      <!-- Stats Section -->
      <div class="stats">
        <div class="stat">
          <p>Total Products</p>
          <h3>{{ totalProducts }}</h3>
          <span class="percentage increase">+1.32%</span>
        </div>
        <div class="stat">
          <p>In the Store</p>
          <h3>{{ inStore }}</h3>
          <span class="percentage increase">+1.32%</span>
        </div>
        <div class="stat">
          <p>In the Booth</p>
          <h3>{{ inBooth }}</h3>
          <span class="percentage decrease">-5.23%</span>
        </div>
      </div>
  
      <!-- Product Table -->
      <div class="product-table">
        <h3>Product</h3>
        <div class="table-header">
          <span>Product Name</span>
          <span>Store</span>
          <span>Booth</span>
        </div>
        <div v-for="product in filteredProducts" :key="product.id" class="table-row">
          <div class="product-info">
            <img :src="product.image" alt="Product Image" />
            <div class="product-details">
              <h4>{{ product.name }}</h4>
              <p>{{ product.description }}</p>
            </div>
          </div>
          <span>{{ product.store }} in store</span>
          <span>{{ product.booth }} in booth</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '',
        totalProducts: 1000,
        inStore: 500,
        inBooth: 500,
        products: [
          {
            id: 1,
            name: 'Tesla to J1772 Adapter',
            description: 'Level 2 & Level 1 EV Charger, 16Amp 240-110V 25ft Cable ...',
            store: 500,
            booth: 500,
            image: 'path-to-image/tesla-adapter.jpg'
          },
          {
            id: 2,
            name: 'J1772 Extension Cable',
            description: 'J1772 Electric Car Charger',
            store: 32,
            booth: 500,
            image: 'path-to-image/j1772-cable.jpg'
          },
          {
            id: 3,
            name: 'MAX GREEN Wall',
            description: 'Level 2 & Level 1 EV Charger, 16Amp 240-110V 25ft Cable ...',
            store: 32,
            booth: 500,
            image: 'path-to-image/max-green-wall.jpg'
          },
          {
            id: 4,
            name: 'Cable J1772 Electric Car Charger',
            description: '5, Plug-in EV Charging Station with Adjustable Amp',
            store: 32,
            booth: 500,
            image: 'path-to-image/j1772-charger.jpg'
          }
        ]
      };
    },
    computed: {
      filteredProducts() {
        return this.products.filter(product =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    }
  };
  </script>
  
  <style scoped>
  .product-management {
    padding: 30px;
    max-width: 1200px;
    margin: 0 auto;
    background-color: #f7f8fa;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  
  .header h2 {
    font-size: 24px;
    font-weight: 600;
    color: #333;
  }
  
  .search-bar {
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    width: 250px;
    font-size: 14px;
  }
  
  .stats {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  
  .stat {
    background-color: #fff;
    padding: 20px;
    border-radius: 12px;
    text-align: center;
    flex: 1;
    margin: 0 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }
  
  .stat p {
    margin: 0;
    font-size: 14px;
    color: #666;
  }
  
  .stat h3 {
    margin: 10px 0;
    font-size: 22px;
    color: #333;
  }
  
  .percentage {
    font-size: 14px;
  }
  
  .increase {
    color: #27ae60;
  }
  
  .decrease {
    color: #e74c3c;
  }
  
  .product-table {
    background-color: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }
  
  .product-table h3 {
    font-size: 20px;
    margin-bottom: 20px;
    color: #333;
  }
  
  .table-header {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 2px solid #eee;
    margin-bottom: 10px;
  }
  
  .table-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .table-row:last-child {
    border-bottom: none;
  }
  
  .product-info {
    display: flex;
    align-items: center;
  }
  
  .product-info img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 15px;
  }
  
  .product-details {
    display: flex;
    flex-direction: column;
  }
  
  .product-details h4 {
    margin: 0;
    font-size: 16px;
    color: #333;
  }
  
  .product-details p {
    margin: 0;
    font-size: 14px;
    color: #888;
  }
  
  @media (max-width: 768px) {
    .stats {
      flex-direction: column;
    }
  
    .stat {
      margin: 10px 0;
    }
  
    .table-header,
    .table-row {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  </style>
  