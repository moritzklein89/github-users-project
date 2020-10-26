import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-users-spotlight',
  templateUrl: './users-spotlight.component.html',
  styleUrls: ['./users-spotlight.component.css']
})
export class UsersSpotlightComponent implements OnInit {
  faGithubIcon = faGithub;

  constructor() { }

  ngOnInit() {
  }

}
