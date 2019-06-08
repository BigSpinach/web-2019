// let toFixed = function toFixed(target,n){
//   return target.toFixed(n);
// }
// Vue.filter("toFixed",toFixed(2));

let vm = new Vue({
  el: "#app",
  created() {
    this.queryData();
  },
  data: {
    products:[]},
  methods: {
    async queryData() {
      this.products = (await axios.get('data/carts.json')).data;
    },

    


    //删除
    remove(index) {
      this.products.splice(index, 1);
    },

    //计算总价格（就是选中的总价格）
    // sumPrice() {
    //   let total = null;
    //   this.products.forEach(item => {
    //     total += item.isSelected ? item.productPrice * item.productCount : 0;
    //   });
    //   return total;
    // }

  },
  filters: {
    toFixed(target) {
      return Number(target).toFixed(2);
    }
  },
  computed: {
    isAll: {
      get() {
        return this.products.forEach(i => i.isSelected);
      },
      set(val) {
        //设置 products中的每一个是否为选中
        this.products.forEach(item => {
          item.isSelected = val;
        });
      }
    },
    sumPrice:{
      get(){
        let total=0;
        this.products.forEach(item=>{
          total+=item.isSelected?item.productPrice * item.productCount : 0;
        });
        return total;
      },
      set(val){

      }
    }
  }
});