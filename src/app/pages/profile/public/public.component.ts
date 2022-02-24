import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropuestaService } from '../../../services/propuesta.service';
import { EmpleoI } from '../../../models/Empleo.Interface';
import { NavParams, ModalController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';
import { UsuarioI } from '../../../models/Usuario.Interface';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
})
export class PublicComponent implements OnInit {
  public propuestas:EmpleoI[] = [];
  public usuario : UsuarioI;
  public idUsuario:number;

  slideOpts = {
    speed: 400,
  };

  constructor(
    private rutaActiva:ActivatedRoute, 
    private propuestaService:PropuestaService,
    private navParams:NavParams,
    private modal: ModalController,
    private auth: AuthService
    ) { this.idUsuario = this.navParams.get('idUsuario'); }

  ngOnInit() {
    this.propuestaService.listarPropuestasByUser(this.idUsuario).subscribe(data=>{
      this.propuestas = data;
      console.log(this.propuestas);
    });

    this.auth.findUser(this.idUsuario).subscribe(data=>{
      this.usuario = data;
      console.log(this.usuario);
    });
  }

  closeModal(){
    this.modal.dismiss();
  }

  descargarFoto(){
    const linkSource = this.usuario.foto;
    const downloadLink = document.createElement("a");
    const fileName = "fotografia.png";
  
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
   
  }

}
