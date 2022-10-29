import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;

  constructor( public postService: PostService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(''),
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      avatar: new FormControl(''),
    });
  }

  // get f(){
  //   return this.form.controls;
  // }

  submit(){
    console.log(this.form.value);
    this.postService.create(this.form.value).subscribe(res => {
         console.log('User created successfully!');
         this.router.navigateByUrl('/post/index');
    })
  }

}
