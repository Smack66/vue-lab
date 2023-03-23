export class Commodity {
   name: string
   price: number
   color: string[]
   number: number
   src: string 
   constructor(name: string, price: number, color: string[],  number: number, src: string){
    this.name = name 
    this.price= price 
    this.color = color
    this.number = number
    this.src = src
  }
}