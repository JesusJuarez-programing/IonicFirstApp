import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FavoritesModalPage } from '../favorites/favorites-modal/favorites-modal';
import { FavoritesService } from './favorites.service';
import { Favorite } from './models/favorites';
/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  private favoritesService: FavoritesService;
  private favorites: Favorite[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, _favoritesService: FavoritesService) {
    this.favoritesService = _favoritesService;
    this.favorites = this.favoritesService.GetAllFavorites();
    console.log(this.favorites);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
    this.favorites = this.favoritesService.GetAllFavorites();
  }

  OnNew(){
    let modal = this.modalCtrl.create(FavoritesModalPage);
    console.log(modal);
    modal.present();
  }
}
