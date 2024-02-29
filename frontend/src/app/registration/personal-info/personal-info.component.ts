import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistrationData, Role, UserRegistrationRequest } from '../../interfaces';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss'
})
export class PersonalInfoComponent implements OnInit{
  @Input() userInfo!: UserRegistrationRequest;
  @Input() roles: Role[] = [];
  @Output() userDataUpdated = new EventEmitter<any>();
  updateUserData(): void {
    this.userDataUpdated.emit(this.userInfo);
  }

  toggleJobRole(role: Role): void {
    const i = this.userInfo.rolesId.indexOf(role.roleId);
    if(i>-1){
      this.userInfo.rolesId.splice(i, 1);
    }
    else{
      this.userInfo.rolesId.push(role.roleId);
    }
  }

  file!:string;
  inputFile:any;
  fileName!:string;
  uploadResume(event:any):void{
    this.inputFile = event.target.files[0];
    if(this.inputFile){
      const blob = new Blob([this.inputFile], {type: this.inputFile.type});
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = async(e:any) => {
        this.userInfo.resume = await e.target.result;
      };
      this.userInfo.resumeFileName = this.inputFile ? this.inputFile.name : '';
    }
    // this.fileName=this.inputFile?this.inputFile.name:'';
    // this.userInfo.resumeFileName = this.inputFile?this.inputFile.name:'';
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.userInfo.resume = reader.result as string;
    // }
    // reader.readAsDataURL(this.inputFile);
  }

  inputPhoto:any;
  profilePhotoSrc: string = '../../../assets/images/default-profile-photo.png';

  uploadProfilePhoto(event:any):void{
    this.inputPhoto = event.target.files[0];
    if(this.inputPhoto){
      const blob = new Blob([this.inputPhoto],{type: this.inputPhoto.type});
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = async(e: any) => {
        this.userInfo.profilePhoto = await e.target.result;
        this.profilePhotoSrc = this.userInfo.profilePhoto ? this.userInfo.profilePhoto : this.profilePhotoSrc;
      };
    }
    // this.inputPhoto = event.target.files[0];
    // this.userInfo.profilePhotoName = this.inputPhoto?.name;
    // if (this.inputPhoto) {
    //   const reader = new FileReader();
      
    //   reader.onload = (e: any) => {
    //     this.profilePhotoSrc = e.target.result;
    //     this.userInfo.profilePhoto = reader.result as string;
    //   };
      
    //   reader.readAsDataURL(this.inputPhoto);
    // }
  }
  @Input() set registrationDataSet(val: any)
  {
    this.userInfo = val.registrationData;
  }
  @Output() personalInformationSubmited = new EventEmitter();
  onSubmit(){
    const finalCheck:boolean = this.checkField();
    if(finalCheck){
      this.personalInformationSubmited.emit({
        userInfo: this.userInfo
      })
    }
  }
  nameRegex = new RegExp(/^[A-Z][a-zA-Z]{1,40}$/);
  emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  countryCodeRegex = /^[0-9]{1,4}$/;
  phonenoRegex = /^[1-9][0-9]{9}$/;
  Validations: any ={
    firstNameVal: false,
    lastNameVal: false,
    emailVal : false,
    countryCodeval : false,
    phoneNoVal: false,
    resumeVal : false,
    rolesVal : false
  }

  @ViewChild('firstName') firstName! : ElementRef;
  @ViewChild('lastName') lastName!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('countryCode') countryCode!: ElementRef;
  @ViewChild('phoneNumber') phoneNumber!: ElementRef;
  @ViewChild('preferredJobRolescheckbox') preferredJobRolescheckbox!: ElementRef;

  // checkFirstNameField(ele: ElementRef):boolean{
  //   console.log(ele.nativeElement.value);
    // if(ele.nativeElement.value){
      // if(this.nameRegex.test(ele.nativeElement.value)){
      //   console.log("in regex test");
      //   this.Validations.firstNameVal = true;
      //   ele.nativeElement.focus();
      //   return false;
      // }
    // }
  //   return true;
  // }

  // checkField():boolean{
  //   console.log("Final check at checkField");
  //   if(this.checkFirstNameField(this.firstName)){
  //     return true;
  //   }
  //   return false;
  // }

  checkFirstNameField(ele : ElementRef):boolean {
    if(!ele.nativeElement.value){
      if(this.nameRegex.test(ele.nativeElement.value))
        this.Validations.firstNameVal = false;
      else
        this.Validations.firstNameVal = true;
      alert("First Name required!!");
      ele.nativeElement.focus();
      return false;
    }
    return true;
  }

  checkLastNameField(ele : ElementRef):boolean {
    if(!ele.nativeElement.value){
      if(this.nameRegex.test(ele.nativeElement.value))
        this.Validations.lastNameVal = false;
      else
        this.Validations.lastNameVal = true;
      alert("Last Name required");
      ele.nativeElement.focus();
      return false;
    }
    return true;
  }

  checkEmailField(ele: ElementRef):boolean{
    const emailRegex = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
    if (!ele.nativeElement.value) {
      alert("email is required");
      ele.nativeElement.focus();
      return false;
    } else if (!emailRegex.test(ele.nativeElement.value)) {
      alert('Plese enter valid Email!');
      ele.nativeElement.focus();
      return false;
    }
    return true;
  }

  checkCountryCodeField(ele: ElementRef):boolean{
    if(!ele.nativeElement.value){
      alert("country code is required");
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
    if(this.userInfo.rolesId.length > 0)
      return true;
    alert('Select atlease one prefreed Job roles');
    ele.nativeElement.focus();
    return false;
  }

  checkField():boolean{
    if(this.checkFirstNameField(this.firstName)){
      if(this.checkLastNameField(this.lastName)){
        if(this.checkEmailField(this.email)){
          if(this.checkCountryCodeField(this.countryCode)){
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
  ngOnInit(): void {
      
  }
}
