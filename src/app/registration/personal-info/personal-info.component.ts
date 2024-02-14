import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IJobRoles } from '../../interfaces';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss'
})
export class PersonalInfoComponent implements OnInit {
  userInfo: any = {};
  preferredJobRoles!: IJobRoles;
  constructor() {}
  ngOnInit(): void {
    
  }

  @ViewChild('firstName') firstName! : ElementRef;
  @ViewChild('lastName') lastName!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('countryCode') countryCode!: ElementRef;
  @ViewChild('phoneNumber') phoneNumber!: ElementRef;
  @ViewChild('preferredJobRolescheckbox') preferredJobRolescheckbox!: ElementRef;

  checkSingleField(ele : ElementRef):boolean {
    if(!ele.nativeElement.value){
      alert("This field cannot be empty!!");
      ele.nativeElement.focus();
      return false;
    }
    return true;
  }

  checkPhoneNumberField(ele:ElementRef):boolean{
    if(!ele.nativeElement.value){
      alert("PhoneNumber can't be empty!!");
      ele.nativeElement.focus();
      return false;
    }
    if(ele.nativeElement.value.length !== 10){
      alert("Phone Number length must be 10 character long");
      ele.nativeElement.focus();
      return false;
    }
    return true;
  }

  checkJobsContainer(ele: ElementRef):boolean{
    if(this.preferredJobRoles.values.includes(true))
      return true;
    alert('Select atlease one prefreed Job roles');
    ele.nativeElement.focus();
    return false;
  }

  checkField():boolean{
    if(this.checkSingleField(this.firstName)){
      if(this.checkSingleField(this.lastName)){
        if(this.checkSingleField(this.email)){
          if(this.checkSingleField(this.countryCode)){
            if(this.checkPhoneNumberField(this.phoneNumber)){
              if(this.checkJobsContainer(this.preferredJobRolescheckbox)){
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }

  
  @Input() set prevUserInfo(val: any) {
    this.preferredJobRoles = val.preferredJobRoles;
    this.userInfo = val.userInfo;    
  }

  file!:string;
  inputFile:any;
  fileName!:string;
  uploadResume(event:any):void{
    this.inputFile = event.target.files[0];
    this.fileName=this.inputFile?this.inputFile.name:'';
    this.userInfo.resumeName = this.inputFile?this.inputFile.name:'';
    const reader = new FileReader();
    reader.onload = () => {
      this.userInfo.resumeInfo = reader.result as string;
    }
    reader.readAsDataURL(this.inputFile);
  }

  inputPhoto:any;
  profilePhotoSrc: string = '../../../assets/images/default-profile-photo.png';

  uploadProfilePhoto(event:any):void{
    this.inputPhoto = event.target.files[0];
    this.userInfo.profilePhotoName = this.inputPhoto?.name;
    if (this.inputPhoto) {
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        this.profilePhotoSrc = e.target.result;
        this.userInfo.profilePhotoBaseInfo = reader.result as string;
      };
      
      reader.readAsDataURL(this.inputPhoto);
    }
  }
  @Output() personalInformationSubmited = new EventEmitter();

  onSubmit() {
    const finalCheck : boolean = this.checkField();
    if(finalCheck){
      this.personalInformationSubmited.emit({
        userInfo: this.userInfo,
        preferredJobRoles: this.preferredJobRoles
      });
    }
  }
}
