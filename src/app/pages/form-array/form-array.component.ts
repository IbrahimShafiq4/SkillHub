import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-form-array',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,],
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss'],
})
export class FormArrayComponent implements OnInit {
  developerForm!: FormGroup;
  showCard: boolean = false;
  chooseOption: {
    major: string;
    majorSkills: { skill: string; experience: number }[];
  }[] = [];
  skillList = ['Angular', 'HTML', 'CSS', 'JS', 'NodeJs', 'MySQL'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadFromLocalStorage();
    this.initForm();
  }

  initForm(): void {
    this.developerForm = this.fb.group({
      developer: new FormControl('', Validators.required),
      skills: this.fb.array([], Validators.required),
    });
  }

  loadFromLocalStorage(): void {
    const savedData = localStorage.getItem('chooseOption');
    if (savedData) {
      this.chooseOption = JSON.parse(savedData);
    }
  }

  saveToLocalStorage(): void {
    localStorage.setItem('chooseOption', JSON.stringify(this.chooseOption));
  }

  get skills(): FormArray {
    return this.developerForm.get('skills') as FormArray;
  }

  addSkill(): void {
    const skill = this.fb.group({
      skill: new FormControl('', Validators.required),
      experience: new FormControl('', Validators.required),
    });

    this.skills.push(skill);
  }

  onRemoveSkill(optionIndex: number, major: string): void {
    const itemIndex = this.chooseOption.findIndex(
      (item) => item.major === major
    );
    if (itemIndex !== -1) {
      this.chooseOption[itemIndex].majorSkills.splice(optionIndex, 1);
      if (this.chooseOption[itemIndex].majorSkills.length === 0) {
        this.chooseOption.splice(itemIndex, 1);
      }
      this.saveToLocalStorage();
    }
  }

  onSubmit(): void {
    if (this.developerForm.valid) {
      const major = this.developerForm.get('developer')?.value;
      const majorSkills: { skill: string; experience: number }[] = [];

      this.skills.controls.forEach((skillGroup) => {
        const skill = skillGroup.get('skill')?.value;
        const experience = skillGroup.get('experience')?.value;

        majorSkills.push({ skill, experience });
      });

      const existingOptionIndex = this.chooseOption.findIndex(
        (option) => option.major === major
      );

      if (existingOptionIndex !== -1) {
        this.chooseOption[existingOptionIndex].majorSkills.push(
          ...majorSkills
        );
      } else {
        this.chooseOption.push({ major, majorSkills });
      }

      this.showCard = true;
      this.saveToLocalStorage();
    }
  }

  addNew(): void {
    this.initForm();
    this.showCard = false;
  }
}
