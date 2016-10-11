import {
  Component,
  OnInit,
  HostListener
} from '@angular/core';

@Component({
  selector: 'pwc-facecaptcha',
  templateUrl: './facecaptcha.component.html',
  styleUrls: ['./facecaptcha.component.css']
})
export class FacecaptchaComponent implements OnInit {

  private videoStream;

  constructor() { }

  ngOnInit() {
  }

  @HostListener('click', ['$event'])
  onClic(event) {
    console.log(event);
    this.launch();
  }

  launch() {
    (<any>window).navigator.getUserMedia({
      video: true
    }, (args) => {
      console.log('param 2', args);
    }, (videoStream) => {
      this.videoStream = videoStream;
    });
  }

}
