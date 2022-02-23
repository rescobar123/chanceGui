import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropuestaService } from '../../../services/propuesta.service';
import { EmpleoI } from '../../../models/Empleo.Interface';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
})
export class PublicComponent implements OnInit {
  public propuestas:EmpleoI[] = [];
  constructor(private rutaActiva:ActivatedRoute, private propuestaService:PropuestaService) { }

  ngOnInit() {
    let idUsuario =  this.rutaActiva.snapshot.paramMap.get("idUsuario");
    this.propuestaService.listarPropuestasByUser(1).subscribe(data=>{
      this.propuestas = data;
      console.log(this.propuestas);
    });
  
  }

}
