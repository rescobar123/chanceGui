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

  public empleos: EmpleoI[] = [];
  public idTipoEmpleo;
  public estado;
  public user: any;

  public oficios: string = "0";
  public disponibilidad: string = "0";
  public lugares: string = "0";

  datosEmpleosForm = new FormGroup({
    empleos: new FormControl(''),
    disponibilidad: new FormControl(''),
    lugares: new FormControl('')
  });
  public departamentosMunicipios:any;
  public tiposEmpleos: TipoEmpleoI[] = [];
  constructor(
    private propuestaService: PropuestaService,
    private alertService: AlertService,
    private auth: AuthService,
    private alertController: AlertController,
    private modalController: ModalController,
    private admobService: AdmobService,
    private wsRecursos: RecursosService
  ) {

    this.admobService.MostrarBanner();
    this.admobService.MostrarInterstitial();
    this.wsRecursos.getAllTiposEmpleos().subscribe(data => {
      this.tiposEmpleos = data;
      console.log(this.tiposEmpleos);
    });
  }

  ngOnInit() {
    this.departamentosMunicipios =  this.wsRecursos.getAllLugares();
    this.propuestaService.getAllPropuestasWithUserTipoEmpleo(0, 0, this.oficios, this.disponibilidad, this.lugares).subscribe(data => {
      this.empleos = data;
      console.log(this.empleos);
    });

  }
  ver(empleado: EmpleoI) {
    // this.presentAlertPrompt(empleado);
    this.presentModal(empleado);
  }

  logout() {
    console.log("Cerrrando sesino...")
    this.auth.logout();
  }

  async presentModal(empleado: EmpleoI) {
    const modal = await this.modalController.create({
      component: PropuestaModalComponent,
      componentProps: {
        'empleado': empleado,
      }
    });
    return await modal.present();
  }

  async presentModalContract(empleado: EmpleoI) {
    const modal = await this.modalController.create({
      component: ContratarModalComponent,
      componentProps: {
        'propuesta': empleado,
      }
    });
    return await modal.present();
  }
  filtrarEmpleos(form) {
    if(form.empleos != ''){
      this.oficios = form.empleos;
    }
    if(form.disponibilidad != ''){
      this.disponibilidad = form.disponibilidad;
    }
    
    if(form.lugares != ''){
      this.lugares = form.lugares;
    }
    console.log("Ofcios " + this.oficios);
    this.ngOnInit();
  }
}
