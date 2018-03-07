import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FavoritesModalPage } from '../favorites/favorites-modal/favorites-modal';
import { FavoritesService } from './favorites.service';
import { Favorite } from './models/favorites';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
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
  favoritesList$: Observable<Favorite[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, _favoritesService: FavoritesService) {
    this.favoritesService = _favoritesService;
    this.favoritesList$ = this.favoritesService
    .GetAllFavoritesAF()
    .snapshotChanges()
    .map(
      changes =>{
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    );
    console.log(this.favorites);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  OnNew(){
    let modal = this.modalCtrl.create(FavoritesModalPage);
    console.log(modal);
    modal.present();
  }
}
