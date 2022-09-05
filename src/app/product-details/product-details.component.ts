import { CartService } from '../service/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productID: any;
  productData: any;
  constructor(
    private api : ApiService,
      private router: Router,
      private actRoute: ActivatedRoute) { }

  ngOnInit() {
    
    this. productID = this.actRoute.snapshot.params['id'];
    this.loadProductDetails(this.productID);
    console.log(this.productID)
  }

  loadProductDetails(productID: any){
    this.api.singleProduct(productID).subscribe(product => {
      this.productData = product;
    });
  }

  navigation(link: any){
    this.router.navigate([link]);
  }
}


