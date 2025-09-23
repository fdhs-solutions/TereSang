import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { ImageCard } from './components/image-card/image-card';
import { Sidebar } from './components/sidebar/sidebar';
import { ProfileDetails } from './components/profile-details/profile-details';

@Component({
  selector: 'app-profile',
  standalone:true,
  imports:[Navbar,ImageCard,ProfileDetails,Sidebar],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  
}
