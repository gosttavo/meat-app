import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'app/shared/messages/notification.service';
import { LoginService } from './login.service';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  navigateTo: string;

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.doCreateLoginForm();
    this.doNavigateTo();
  }

  doCreateLoginForm(){
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    })
  }

  doNavigateTo(){
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/');
  }

  login() {
    this.loginService.login(this.loginForm.value.email,
                            this.loginForm.value.password)
      .subscribe(
        User => this.notificationService
          .notify(`Bem vindo(a), ${User.name}`), //mensagem sucesso
        response => this.notificationService
          .notify(response.error.message), //HttpErrorResponse
        () => { //navegar pra rota correta
          this.router.navigate([atob(this.navigateTo)]);
        })
  }
}
