import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams, ModalController, IonSlides } from '@ionic/angular';
import { EmpleoI } from '../../../models/Empleo.Interface';
import { AuthService } from '../../../services/auth.service';
import { UsuarioI } from '../../../models/Usuario.Interface';
import { PropuestaService } from '../../../services/propuesta.service';

@Component({
  selector: 'app-propuesta-modal',
  templateUrl: './propuesta-modal.component.html',
  styleUrls: ['./propuesta-modal.component.scss'],
})
export class PropuestaModalComponent implements OnInit {
  public empleo:EmpleoI;
  public usuario:UsuarioI;
  public propuesta:EmpleoI[]=[];

  @ViewChild('mySlider',null)  slides: IonSlides;
  public user:any;
  public departamentosMunicipios:any;

  public img1: any;
  file: File;
  slideOpts = {
    pager: true,
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
      pager: true
    },
  };

  constructor(
    private navParams: NavParams,
    private auth: AuthService,
    private prop: PropuestaService,
    private modal: ModalController,
    ) {
    this.empleo = navParams.get('empleado');
   }

  ngOnInit() {
    this.auth.findUser(this.empleo.usuarioCreo.idUsuario).subscribe(data=>{
      this.usuario = data;
      console.log(this.usuario);
    });

    this.prop.getPropuestaById(this.empleo.idPropuesta).subscribe(data=>{
      this.propuesta = data;
      console.log(this.propuesta);
    });
  }

  closeModal(){
    this.modal.dismiss();
  }

  nextSlide(){
    this.slides.slideNext();
  }

  previusSlide(){
    this.slides.slidePrev();
  }

  descargarFoto(){
    const linkSource = this.empleo.usuarioCreo.foto;
    const downloadLink = document.createElement("a");
    const fileName = "fotografia.png";
  
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
   
  }

  descargarCertificado(propuestaCertificado:any){
    const linkSource = propuestaCertificado;
    const docoto = document.createElement("a");
    const fileName = "certificado.png";
  
    docoto.href = linkSource;
    docoto.download = fileName;
    docoto.click();
  }

  descargarCv(){
    const linkSource = this.empleo.usuarioCreo.cv;
    const downloadLink = document.createElement("a");
    const fileName = "penales.png";
  
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }


}
