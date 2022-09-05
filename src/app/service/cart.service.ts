import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  

  constructor() { }
  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  
  addtoCart(product : any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }

  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }

  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }


  setQuantity(action:string,item:any)
  {
    if(action==='increase'){
    this.cartItemList.map((a:any,index:any)=>{
      if(item.id===a.id)
      {
        item.quantity=item.quantity+1;
        if(item.quantity==2){
          item.total=item.total*item.quantity;
        }
        else{
          item.total=(item.total/(item.quantity-1))*item.quantity;
        }
        this.cartItemList[index]=item;
      }
    });
  }
  else if(action==='decrease')
  {
    this.cartItemList.map((a:any,index:any)=>{
      if(item.id==a.id&&(1<=item.quantity)){
        if(item.quantity!=1)
        {
          item.quantity=item.quantity-1;
          item.total=(item.total/(item.quantity+1))*item.quantity;

        }
        this.cartItemList[index]=item;
      }
    });
  }
}

  cartProduct(product:any)
  {
    let num:number=0;
    this.cartItemList.map((a:any,index:any)=>{
      if(a.id===product.id){
        num=index+1;
      }
    });
    return num
  }
}
