import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'app/shared/messages/notification.service';
import { SignUpService } from './sign-up.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mt-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {

  signForm: FormGroup;
  navigateTo: string;

  genders = [
    {label: 'Masc', value: 'Male'},
    {label: 'Fem', value: 'Female'}
  ]

  constructor(
    private signUpService: SignUpService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.doCreateSignForm();
    this.doNavigateTo();
  }

  doCreateSignForm() {
    this.signForm = new FormGroup({
      name: new FormControl('', {
        validators: [
          Validators.required,           
          Validators.maxLength(80),
          Validators.minLength(3)
        ]
      }),
      lastName: new FormControl('', {
        validators: [
          Validators.required,           
          Validators.maxLength(120),
          Validators.minLength(5)
        ]
      }),
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.email
        ]
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(6),
        ]
      }),
      cpf: new FormControl('', {
        validators: [Validators.required]
      }),
      gender: new FormControl('', {
        validators: [Validators.required]
      }),
      profiles: new FormControl('user')
    })
  }

  doNavigateTo(){
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/login');
  }

  signUp(){
    this.signUpService.signUp(this.signForm.value.name, 
                              this.signForm.value.lastName,
                              this.signForm.value.password, 
                              this.signForm.value.email,
                              this.signForm.value.cpf,
                              this.signForm.value.gender,
                              this.signForm.value.profiles)
      .subscribe(User => this.notificationService
          .notify(`Usuário(a), ${User.name}, cadastrado com sucesso!`),
            response => this.notificationService
              .notify(response.error.message), //HttpErrorResponse
            () => { //navegar pra rota correta
              this.router.navigate([atob(this.navigateTo)]);
          })
  }

}
