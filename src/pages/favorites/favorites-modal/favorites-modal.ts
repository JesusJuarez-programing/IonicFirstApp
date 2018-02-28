import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, _viewCtrl: ViewController) {
    this.viewCtrl = _viewCtrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesModalPage');
  }

  OnClose(){
    //Vuelve a la ventana anterior.
    this.viewCtrl.dismiss();
  }

}
