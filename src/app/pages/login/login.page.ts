import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../service/service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login = {
    email: "",
    password: "",
  }
  constructor(private router: Router, public auth: AngularFireAuth, private servie: ServiceService, public alertController: AlertController) { }

  ngOnInit() {
  }
  async presentAlert(title, message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      message: message,
      buttons: ['OK'],
      mode: "ios"
    });

    await alert.present();
  }

  goToRegister() {
    this.router.navigate(["/register"]);
  }

  goToReset() {
    this.router.navigate(["/password-reset"]);
  }

  goToHome() {
    console.log(this.login.email);
    console.log(this.login.password);
    this.auth.signInWithEmailAndPassword(this.login.email, this.login.password).then(() => {
      this.router.navigate(['/home']);
    }).catch((err) => {

      var msg = "";
      if (err.code == "auth/wrong-password") {
        msg = "कृपया आपला  पासवर्ड तपासून  पहा . "
      } else if (err.code == "auth/user-not-found") {
        msg = "कृपया आपला  ई-मेल तपासून पहा . "
      }
      this.presentAlert("Alert", msg)
    })
  }

}
