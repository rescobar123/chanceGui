import { Component, OnInit } from '@angular/core';
import { EmpleoI } from '../../models/Empleo.Interface';
import { PropuestaService } from '../../services/propuesta.service';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PropuestaModalComponent } from './propuesta-modal/propuesta-modal.component';
import { ContratarModalComponent } from './contratar-modal/contratar-modal.component';
@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {

  public empleos:EmpleoI[]=[];
  public idTipoEmpleo;
  public estado;
  public user:any;
 
  constructor(
    private propuestaService: PropuestaService,
    private alertService:AlertService,
    private auth: AuthService,
    public alertController: AlertController,
    public modalController: ModalController
    ) { }

  ngOnInit() {
    this.user = this.auth.getUser();
    let idUser:string = this.user.usuario.idUsuario;
    let idPropuesta = 0;
    this.propuestaService.getAllPropuestasWithUserTipoEmpleo(idPropuesta).subscribe(data=>{
      this.empleos = data;
      console.log(this.empleos);
    });
  }
  ver(empleado:EmpleoI){
   // this.presentAlertPrompt(empleado);
   this.presentModal(empleado);
  }

  logout() {
    console.log("Cerrrando sesino...")
    this.auth.logout();
  }

  async presentModal(empleado:EmpleoI) {
    const modal = await this.modalController.create({
    component: PropuestaModalComponent,
    componentProps: {
      'empleado': empleado,
    }
    });
    return await modal.present();
  }

  async presentModalContract(empleado:EmpleoI) {
    const modal = await this.modalController.create({
    component: ContratarModalComponent,
    componentProps: {
      'propuesta': empleado,
    }
    });
    return await modal.present();
  }
}
