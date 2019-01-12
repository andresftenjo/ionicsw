import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  films: any;

  constructor(public api: RestApiService,
    public loadingController: LoadingController,
    public router: Router) { }

  ngOnInit() {
    console.log("List page");
    this.getClassrooms();

  /*   this.classrooms = this.api.getFilm().pipe(
      mergeMap(character => this.api.getPeopleById(character.characters[0]))
    ); */
  }

  async getPeopleFilm(obj) {
    let characters = [];
    const loading = await this.loadingController.create({
      content: 'Loading'
    });

    for ( let c of this.films.results ) {
      let characters = [];
      for ( let ch of c.characters ) {
        await loading.present();
        await this.api.getPeopleByUrl(ch)
          .subscribe(res => {
/*             console.log("respo");
            console.log(res); */
            res.id =parseInt(res.url.substring("https://swapi.co/api/people".length+1, res.url.length-1));
            characters.push(res);
            //ch = res;
            loading.dismiss();
          }, err => {
            console.log(err);
            loading.dismiss();
          });
      }
      c.characters = characters;
     
    }
    console.log("this.classrooms.results");
    console.log(this.films.results);

  }

  async getClassrooms() {
    const loading = await this.loadingController.create({
      content: 'Loading'
    });
    await loading.present();
    await this.api.getFilm()
      .subscribe(res => {
        console.log("res");
        console.log(res);

        this.films = res;
        //this.classrooms.characters
        console.log(this.films.results);
        this.getPeopleFilm(this.films.characters);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

  showDetail(id) {
    this.router.navigate(['/detail', JSON.stringify(id)]);
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
