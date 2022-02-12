import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public img1: any;
  file: File;

  constructor(
    private auth:AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
    console.log("Cerrrando sesino...")
    this.auth.logout();
  }

  fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event:any) => {
        this.img1 = event.target.result;
        console.log(this.img1);
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }
    let fileList: FileList = event.target.files;  
    let file: File = fileList[0];
    console.log(file);
  }

}
