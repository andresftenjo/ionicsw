import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  vehicles: any;

  constructor(public api: RestApiService,
    public loadingController: LoadingController,
    public router: Router) { }

  ngOnInit() {
    this.getStarShips();
  }

  async getStarShips() {
    const loading = await this.loadingController.create({
      content: 'Loading'
    });
    await loading.present();
    await this.api.getVehicles()
      .subscribe(res => {
        console.log("vehicles");
        
        this.vehicles = res.results;
        console.log(this.vehicles);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}