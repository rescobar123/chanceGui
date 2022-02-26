import { Component, OnInit } from '@angular/core';
import { EmpleoI } from '../../models/Empleo.Interface';
import { PropuestaService } from '../../services/propuesta.service';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PropuestaModalComponent } from './propuesta-modal/propuesta-modal.component';
import { ContratarModalComponent } from './contratar-modal/contratar-modal.component';
import { AdmobService } from '../../services/publicidad/admob.service';
import { RecursosService } from 'src/app/services/recursos.service';
import { TipoEmpleoI } from 'src/app/models/complements/TipoEmpleoI';
import { FormControl, FormGroup } from '@angular/forms';
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

  public oficios:string;
  public disponibilidad: string;
  public lugares: string;

  datosEmpleosForm = new FormGroup({
    empleos: new FormControl(''),
    disponibilidad: new FormControl(''),
    lugares: new FormControl('')
  });
  public tiposEmpleos: TipoEmpleoI[] = [];
  constructor(
    private propuestaService: PropuestaService,
    private alertService:AlertService,
    private auth: AuthService,
    private alertController: AlertController,
    private modalController: ModalController,
    private admobService:AdmobService,
    private wsRecursos:RecursosService 
    ) { }

  ngOnInit() {
    this.admobService.MostrarBanner();
    this.admobService.MostrarInterstitial();
    this.user = this.auth.getUser();
    let idUser:string = this.user.usuario.idUsuario;
    let idPropuesta = 0;
    this.propuestaService.getAllPropuestasWithUserTipoEmpleo(idPropuesta, 0, this.oficios, this.disponibilidad, this.lugares).subscribe(data=>{
      this.empleos = data;
      console.log(this.empleos);
    });
    this.wsRecursos.getAllTiposEmpleos().subscribe(data => {
      this.tiposEmpleos = data;
      console.log(this.tiposEmpleos);
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
  filtrarEmpleos(form){
    this.empleos = form.empleos;
    this.disponibilidad = form.disponibilidad;
    this.lugares = form.lugares;
    console.log(form);
    this.ngOnInit();
  }
}
