import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { EmpleoI } from '../../../models/Empleo.Interface';

@Component({
  selector: 'app-contratar-modal',
  templateUrl: './contratar-modal.component.html',
  styleUrls: ['./contratar-modal.component.scss'],
})
export class ContratarModalComponent implements OnInit {
  private propuesta:EmpleoI;
  constructor(
    private navParams: NavParams,
    private modal: ModalController,) { 
    
    this.propuesta = navParams.get('propuesta');
    console.log(this.propuesta);
  }

  ngOnInit() {}
  closeModal(){
    this.modal.dismiss();
  }
}
