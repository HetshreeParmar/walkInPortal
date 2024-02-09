import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IJobRoles, ITechnologies } from '../../interfaces';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss'
})
export class PersonalInfoComponent implements OnInit {
  constructor(private elementRef: ElementRef<HTMLElement>) {}
  ngOnInit(): void {
    
  }
  userInfo: any = {};
  preferredJobRoles: IJobRoles[] = [];
  familierTechnologies:ITechnologies[]=[];
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
    this.personalInformationSubmited.emit({
      userInfo: this.userInfo,
      preferredJobRoles: this.preferredJobRoles
    });
  }
}
