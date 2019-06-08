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
    products: [],
    isAll:false,
    

  },
  methods: {
    async queryData() {
      /*
      axios.get('data/carts.json').then(res => {
        this.products = res.data;
        console.log(this.products);
      });
      */

      /*
      let resolve = await axios.get('data/carts.json');
      this.products = resolve.data;
      console.log(this.products);
      */
      this.products = (await axios.get('data/carts.json')).data;
      //console.log(this.products);
    },

    //全选
    getAll(){
      this.products.forEach(item => {
        
        item.isSelected = this.isAll;
      });
    },

    //单选
    check(){
      this.isAll = this.products.every(item=>{
        return item.isSelected;
      });
    },

    //删除
    remove(index){
      this.products.splice(index,1);
    },

    //计算总价格（就是选中的总价格）
    sumPrice(){
      let total=null;
      this.products.forEach(item=>{
        total+= item.isSelected?item.productPrice*item.productCount:0;
      });
      return total;
    }

  },
  filters: {
    toFixed(target) {
        return Number(target).toFixed(2);
    },
  }
});