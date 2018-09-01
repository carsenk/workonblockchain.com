import { Component, OnInit,ElementRef, AfterViewInit, Input, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {UserService} from '../user.service';
import {User} from '../Model/user';
import {ProfileDetail} from '../Model/ProfileDetail';
import { HttpClient } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.css']
})
export class ReferralComponent implements OnInit {
	currentUser: User;
	@ViewChild('element') element: ElementRef;
	credentials: any = {};
	email_ref_link = 'https://staging.workonblockchain.com/refer?code=';
	log = '';
	title = 'My Ref Page';
	ref_link = '';
	email_subject = ' thinks that you should Work on Blockchain!';
	mail_body = '';
	show_refreal;
	display_name;
	share_url;
	text;
	first_name;
	last_name;
	
	constructor(
		private authenticationService: UserService,private titleService: Title,private newMeta: Meta
	) {
		this.titleService.setTitle('Work on Blockchain | £500 reward for referrals');
		const url2 = 'https://platform.twitter.com/widgets.js';
        if (!document.querySelector(`script[src='${url2}']`)) {
            let script = document.createElement('script');
            script.src = url2;
            document.body.appendChild(script);
        }
	}
	
	ngAfterViewInit(): void {
		window['twttr'] && window['twttr'].widgets.load();
    }

	ngOnInit(){
		this.newMeta.updateTag({ name: 'description', content: 'Refer a friend to workonblockchain.com, the blockchain recruitment platform for developers, and get £500 when they are successfully employed by a company through the platform.' });
	    this.newMeta.updateTag({ name: 'keywords', content: 'refer developer referral reward workonblockchain.com' });
		
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.show_refreal = 1;
		if(this.currentUser){
			this.show_refreal = 10;
			this.authenticationService.getById(this.currentUser._creator)
            .subscribe(
                data => {
                    this.first_name = data[0].first_name;
					this.last_name = data[0].last_name;
					this.display_name = data[0].first_name+' '+data[0].last_name;
					this.mail_body = 'Hi, \n\nYou have been invited by '+this.display_name+' to join Work on Blockchain. \n\nIt takes seconds to sign up. Work on Blockchain is the easiest way to secure a job in the blockchain space. \n\nGive us a try! \n\nCreate a profile and have blockchain companies apply to you by following this link '+this.ref_link+' \n \nThanks, \nWork on Blockchain team!';
					this.email_subject = data[0].first_name+this.email_subject;
				},
                error => {
                    //console.log('error');
                }
            );
			this.ref_link = this.email_ref_link+this.currentUser.ref_link;
			this.share_url = this.ref_link;
			this.text = 'I am inviting you to workonblockchain.com! Sign up now and let companies apply to you. Receive 5  job offers in one week. Salaries from €35k - €100k';
		}
		//console.log(this.show_refreal);
	}
	
	send_email() {
		this.log = 'Sending your Email';
		//console.log(this.share_url);
		if(this.credentials.email && this.email_subject && this.mail_body){
			this.authenticationService.send_refreal(this.credentials.email, this.email_subject, this.mail_body,this.share_url,this.first_name,this.last_name)
				.subscribe(
					data => {
						//console.log('data');
						//console.log(data);
						this.log = data;
					},
					error => {
						//console.log('error');
						//console.log(error);
						this.log = error;
					}
				);
		}
		else{
			//console.log('not good');
			this.log = 'Please fill all fields';
		}
	}
	copyInputMessage(inputElement){
		inputElement.select();
		document.execCommand('copy');
		inputElement.setSelectionRange(0, 0);
	}
}
