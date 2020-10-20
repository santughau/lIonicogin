import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../service/service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  classList = [1, 2, 3, 4, 5];
  div = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  dist = [];
  taluka = [];
  registerData = {
    fullName: "",
    mobile: "",
    email: "",
    school: "",
    classId: "",
    division: "",
    district: "",
    tal: "",
    password: "",
    uid: ""
  }
  constructor(private servie: ServiceService, private router: Router, public auth: AngularFireAuth, public alertController: AlertController) { }

  ngOnInit() {
    this.servie.getDist().subscribe((res) => {
      this.dist = res;

    })
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


  OnDistChange(ev) {
    this.servie.getTaluka(ev.target.value).subscribe(taluka => {
      this.taluka = taluka;
    })
  }

  goToLogin() {
    this.router.navigate(["/login"]);
  }

  saveTeacher(registration): void {
    const data = { email: this.registerData.email, password: this.registerData.password };
    this.auth.createUserWithEmailAndPassword(data.email, data.password).then((user) => {
      this.registerData.uid = user.user.uid;
      this.servie.saveLogin(this.registerData).subscribe(res => {
        this.router.navigate(['/home']);
        registration.reset();
      })
    }).catch((err) => {
      console.log(err);
      var msg = "";
      if (err.code == "auth/email-already-in-use") {
        msg = "कृपया हा ई-मेल अगोदर वापरलेला  आहे , नवीन ई-मेल वापरा  किंवा पासवर्ड रीसेट करा . "
      }
      else if (err.code == "auth/email-already-in-use") {
        msg = "आपला पासवर्ड चांगला लिहा . कॅपिटल , स्मॉल  लेटर्स व अंक  यांचा  वापर करा . "
      }
      this.presentAlert("Alert", msg);
    })
  }

}
