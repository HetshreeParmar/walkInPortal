import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistrationData, UserRegistrationRequest } from '../../interfaces';

@Component({
  selector: 'app-review-proceed',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-proceed.component.html',
  styleUrl: './review-proceed.component.scss'
})
export class ReviewProceedComponent implements OnInit{
  @Input() userInfo!: UserRegistrationRequest;
  @Input() registrationData!: RegistrationData;
  constructor() { }
  ngOnInit(): void {
      console.log("at review",this.registrationData);
      console.log("at review proceed", this.userInfo);
  }
  @Output() reviewPricessSubmited = new EventEmitter();
  onSubmit(direction: string){
    this.reviewPricessSubmited.emit({
      direction,
    });
  }
  getRoleName(roleId: number): string {
    const role = this.registrationData.role.find(role => role.roleId === roleId);
    return role ? role.roleName : 'Unknown Role';
  }
  getCollegeName(collegeId: number): string {
    const college = this.registrationData.college.find(college => college.collegeId == collegeId);
    return college ? college.collegeName : 'Unknown College';
  }

  getTechName(techId: number): string {
    console.log("get tech name", techId);
    const tech = this.registrationData.tech.find(tech => tech.technologyId == techId);
    return tech ? tech.techName : 'Unknown Role';
  }

  getStreamName(streamId: number): string {
    const stream = this.registrationData.stream.find(stream => stream.streamId == streamId);
    return stream ? stream.streamName : 'Unknown Stream';
  }
  getQualificationName(qualificationId: number): string{
    const qualification = this.registrationData.qualification.find(q => q.qualificationId == qualificationId);
    return qualification ? qualification.qualificationName : 'Unknown Qualification';
  }
}
