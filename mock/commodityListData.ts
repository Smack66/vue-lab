class Commodity{
  link = '/';
  price = '$'
  constructor(price: number, link: number){
    this.price += price; 
    this.link += link;
  }
}
// Initialize the data
const commodityList: Commodity[][]  = []
for(let i=0; i<10 ;i++){
  const list: Commodity[] = [];
  for(let j=0; j<10; j++){
    list.push(new Commodity(i*10+j, i*10+j));
  }
  commodityList.push(list);
}

const totalLen = 1000
export {commodityList, totalLen } 
