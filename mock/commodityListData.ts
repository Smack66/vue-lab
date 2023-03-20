class Commodity{
  name = ''
  color = [] 
  link = '/';
  price = 0
  constructor(name:string, price: number, link: number, color: string[]){
    this.name += name
    this.price += price; 
    this.link += link;
    color.forEach((item)=>{
      this.color.push(item);
    })
  }
}
// Initialize the data
const commodityList: Commodity[][]  = []
for(let i=0; i<10 ;i++){
  const list: Commodity[] = [];
  for(let j=0; j<10; j++){
    list.push(new Commodity(i, i*10+j, i*10+j,['red','yellow']));
  }
  commodityList.push(list);
}

const totalLen = 1000
export {commodityList, totalLen } 
