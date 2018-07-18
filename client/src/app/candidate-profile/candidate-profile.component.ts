import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup,Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {UserService} from '../user.service';
import {User} from '../Model/user';
import { HttpClient } from '@angular/common/http';
import { DataService } from "../data.service";
import {environment} from '../../environments/environment';
const imgsrc = environment.img_url;
console.log(imgsrc);

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit {
        currentUser: User;
        first_name;last_name;description;companyname;degreename;
        interest_area;why_work;availability_day;
        countries;commercial;history;education;
        experimented;languages;current_currency;current_salary;image_src;
        imgPath;nationality;contact_number;id;
    share_link;

 constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router,
        private authenticationService: UserService,private dataservice: DataService) { }

  platforms;
  cand_id;htmlContent;
    info;
    
  ngOnInit() 
  {
      
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
     
      if(!this.currentUser)
       {
          this.router.navigate(['/login']);
       }
       if(this.currentUser && this.currentUser.type == 'candidate')
       {
           this.cand_id= this.currentUser._creator;
           
          
          this.authenticationService.getById(this.currentUser._id)
            .subscribe(
            data => {
                
                if(!data.terms || data.terms == false)
                {
                     this.router.navigate(['/terms-and-condition']);
                    
                }
              
               else if(!data.contact_number && !data.nationality && !data.first_name && !data.last_name)
               {
                        this.router.navigate(['/about']);
               }
               else if(data.country.length < 1  && data.roles.length < 1 && data.interest_area.length < 1 || !data.expected_salary)
               {
                 
                    this.router.navigate(['/job']); 
                }
                else if(!data.commercial_platform || !data.experimented_platform  || !data.why_work || !data.platforms)
                {
                    this.router.navigate(['/resume']);
                }
                //console.log(data.experience_roles.length);
                else if(!data.experience_roles &&  !data.current_salary  )
                {
                        this.router.navigate(['/experience']);
                }
                else if(data.history.length < 1 || !data.history.length )
                {
                    this.dataservice.changeMessage("Please enter atleast one work history record");
                    this.router.navigate(['/experience']);              
                }
                    
                else if(data.education.length < 1 || !data.education.length )
                {
                    this.dataservice.changeMessage("Please enter atleast one education record");
                    this.router.navigate(['/experience']);
                    
                }
                    
                else 
                {
                  
                    this.id = data._creator._id; 
                     this.share_link ='http://localhost:4200/admin-candidate-detail?user=' + data._creator._id; 
                     console.log(this.share_link);                 
                    this.first_name=data.first_name;
                    this.last_name =data.last_name;
                    this.nationality = data.nationality;
                    this.contact_number =data.contact_number;
                    this.description =data.description;
                    this.history =data.history;
                    this.education = data.education;
                    
                    for(let data1 of data.history)
                    {
                        this.companyname = data1.companyname;
                       
                    }
                    for(let edu of data.education)
                    {
                        this.degreename = edu.degreename;
                    }
                    this.countries = data.country;
                    this.interest_area =data.interest_area;
                    this.availability_day =data.availability_day;
                    this.why_work = data.why_work;
                    this.commercial = data.commercial_platform;
                    this.experimented = data.experimented_platform;
                    this.languages= data.experience_roles;
                    this.current_currency = data.current_currency;
                    this.current_salary = data.current_salary;
                    this.platforms=data.platforms;
                    if(data.image != null )
                    {
                      //console.log(data.image);
                        this.image_src =  data.image ;
                        this.imgPath = imgsrc + data.image;
                        console.log(this.imgPath);
                    }
                    
                   
                }
                

            });
       }
       else
       {
           this.router.navigate(['/not_found']);
       }

  }
    

  
}