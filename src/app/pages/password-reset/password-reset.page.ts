import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../service/service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {
  email = "";
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


  goToLogin() {
    this.router.navigate(["/login"]);
  }
  goToRegister() {
    this.router.navigate(["/register"])
  }

  ressetPassword() {
    this.auth.sendPasswordResetEmail(this.email).then(() => {
      console.log("mail send by Sanskar");
      this.presentAlert("धन्यवाद ", "पासवर्ड रीसेट लिंक आपल्या ई-मेल वर पाठवली  आहे . कृपया आपला ई-मेल चेक करा . ").then(() => {
        this.router.navigate(["/login"]);
      })
    }).catch((err) => {
      console.log(err.code);
      var msg = " "
      if (err.code == 'auth/user-not-found') {
        msg = "कृपया आपला  ई-मेल चुकीचा  आहे . योग्य  ई-मेल लिहा ";
      }
      this.presentAlert("Error", msg)
    })
  }

}
