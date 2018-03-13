import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FavoritesModalPage } from '../favorites/favorites-modal/favorites-modal';
import { FavoritesService } from './favorites.service';
import { Favorite } from './models/favorites';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams, public modalCtrl: ModalController, _favoritesService: FavoritesService) {
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
    let newRestaurant: Favorite = {nombre: '', direccion: ''}
    let modal = this.modalCtrl.create(FavoritesModalPage, {restaurant: newRestaurant});
    console.log(modal);
    modal.present();
  }

  OnDelete(restaurant: Favorite){
    console.log(restaurant.key);
    //Colocar mensaje de confirmacion
    //presentConfirm();
    this.favoritesService.DeleteFavoriteAF(restaurant.key);
  }

  OnUpdate(restaurant: Favorite){
    let modal = this.modalCtrl.create(FavoritesModalPage, {restaurant: restaurant});
    modal.present();
  }

  presentConfirm(restaurant: Favorite) {
    let alert = this.alertCtrl.create({
      title: 'Eliminar Restaurant',
      message: '¿Seguro que deseas elimiarlo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Eliminado');
            this.favoritesService.DeleteFavoriteAF(restaurant.key);
          }
        }
      ]
    });
    alert.present();
  }

}
