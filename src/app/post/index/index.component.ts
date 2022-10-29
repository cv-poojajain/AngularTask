import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post';
import { PostService } from '../service/post.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  posts = new Post;
  userName: any;

  closeResult: string = '';

  constructor(public postService: PostService, private modalService: NgbModal) { }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 

  ngOnInit(): void {
    this.userName = localStorage.getItem('user')
    this.postService.getAll().subscribe((dataa: Post)=>{
      this.posts = dataa;
      console.log("POSTSS",this.posts);
    })  
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  deletePost(id:number){
    this.postService.delete(id).subscribe(res => {
        this.posts.data = this.posts.data.filter(item => item.id !== id);
         console.log('Post deleted successfully!');
    })
  }

}
