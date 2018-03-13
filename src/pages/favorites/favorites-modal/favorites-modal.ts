import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Favorite } from '../models/favorites';
import { FavoritesService } from '../favorites.service';
/**
 * Generated class for the FavoritesModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites-modal',
  templateUrl: 'favorites-modal.html',
})
export class FavoritesModalPage {
  direccion: string;
  private viewCtrl: ViewController;
  private favoritesService: FavoritesService;
  private restaurant: Favorite;

  constructor(public navCtrl: NavController, public navParams: NavParams, _viewCtrl: ViewController,
              private _favoritesService: FavoritesService) {
    this.viewCtrl = _viewCtrl;
    this.favoritesService = _favoritesService;
    this.restaurant = navParams.get('restaurant');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesModalPage');
  }

  OnSave(restaurant: Favorite){
    console.log(restaurant);
    if(typeof(restaurant.key) === 'undefined'){
    this.favoritesService.AddFavoriteAF(restaurant).then(ref =>{
      console.log(ref.key);
      this.viewCtrl.dismiss();
    });
  }
  else{
    this.favoritesService.UpdateFavoriteAF(restaurant.key, restaurant).then(ref => {
    this.viewCtrl.dismiss();
  });
  }
  
}

  OnClose(){
    //Vuelve a la ventana anterior.
    this.viewCtrl.dismiss();
  }

}
