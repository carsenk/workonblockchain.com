import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
declare var $:any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  is_cookie;
  display_cookie = 0;
  constructor(private cookieService: CookieService) { }

  ngOnInit() {
	  this.is_cookie = this.cookieService.check('wob_cookie');
	  if(this.is_cookie){
		  this.display_cookie = 1;
	  }
    document.write('<script async src="https://www.googletagmanager.com/gtag/js?id=UA-119052122-1"></script>');
    document.write('<script type="text/javascript">\twindow.dataLayer = window.dataLayer || [];\n' +
      '\tfunction gtag(){dataLayer.push(arguments);}\n' +
      '\tgtag(\'js\', new Date());\n' +
      '\tgtag(\'config\', \'UA-119052122-1\');</script>');
  }
  
  accept_cookie(){
	   //console.log('set cookie here');
	   this.cookieService.set('wob_cookie','Setting WOB cookie for 30 days',108000);
	   //console.log('cookie has been set');
   }

}
