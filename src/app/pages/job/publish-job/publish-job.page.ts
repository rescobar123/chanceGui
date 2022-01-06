import { Component, OnInit, ViewChild,  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-publish-job',
  templateUrl: './publish-job.page.html',
  styleUrls: ['./publish-job.page.scss'],
})
export class PublishJobPage implements OnInit {
  @ViewChild('mySlider',null)  slides: IonSlides;
  public empleo:string;
   slideOpts = {
    initialSlide: 1,
  };

  datosGeneralesForm = new FormGroup({
    disponibilidad:  new FormControl(''),
    horario:  new FormControl(''),
    diasLaborables: new FormControl(''),
});
  constructor(private activeRouter:ActivatedRoute) {
    
   }

  ngOnInit() {
    this.empleo = this.activeRouter.snapshot.paramMap.get("empleo");
  }

  swipeNext(){
    this.slides.slideNext();
  }
  swipePrev(){
    this.slides.slidePrev();
  }
  guardarDatosGenerales(form){

  }

}
