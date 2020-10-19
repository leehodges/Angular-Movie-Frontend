import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/models/user';
import {Movie} from '../../shared/models/movie';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {MovieService} from '../../shared/services/movie.service';
import {ReviewService} from '../../shared/services/review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-reviews',
  templateUrl: './add-edit-reviews.component.html',
  styleUrls: ['./add-edit-reviews.component.scss']
})
export class AddEditReviewsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formValues: any;
  submitting = false;
  hasError = false;
  errorMsg: string;
  currentUser: User;
  movie: Movie;
  movieImg: string;
  reviewRatings = [
    { id: 1, val: 1 },
    { id: 2, val: 2 },
    { id: 3, val: 3 },
    { id: 4, val: 4 },
    { id: 5, val: 5 },

  ];
  isNew = false;
  isEdit = false;
  private subs = new Subscription();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private movieService: MovieService,
    private reviewService: ReviewService
  ) {
    this.currentUser = this.userService.currentUserValue;
  }

  ngOnInit(): void {
    this.handleSubs();
    this.createFormControls();
    this.createForm();

  }
  handleSubs() {
    this.route.params.subscribe(data => {
      if (data && data.id) {
        this.retrieveMovie(data.id)
      }
    });
  }

  get f() { return this.form.controls }

  retrieveMovie(id: number) {
    const params = { id };
    this.subs.add(
      this.movieService.getMovieById(params).subscribe(data => {
        if (data && data.movie) {
          this.movie = data.movie;
          if (this.movie.image) {
            this.movieImg = this.movie.image;
          } else {
            this.movieImg = null;
          }
        }
        }, error => {
          if (error) {
            console.error(error);
        }
      })
    );
  }
  setDefaultPic() {
    this.movieImg = 'assets/images/placeholder.png';
  }
  createFormControls() {
    this.formValues = {
      starRating: [null, Validators.required],
      body:  ['', [Validators.required, Validators.minLength(25)]],
    };

  }

  checkLength() {

  }

  createForm() {
    this.form = this.fb.group(this.formValues);

  }

  // tslint:disable-next-line:typedef
  submitForm() {
    this.hasError = false;
    this.submitting = true;
    if (this.form.invalid)
    {
      this.hasError = true;
      this.submitting = false;
      return;
    }
    const form = this.form.value;
    const params = {
      user_id: this.currentUser.id,
      movie_id: this.movie.id,
      user_nickname: this.currentUser.nickname,
      rating: form.starRating,
      body: form.body
    };
    this.subs.add(
      this.reviewService.createReview(params).subscribe(
        (data) => {
          if (data) {
            this.submitting = false;
          //  @ts-ignore
            Swal.fire({
              icon: 'success',
              title: 'Your review has posted',
              showConfirmButton: false,
              timer: 2000
            }).then(() => {
              this.router.navigate([`./movies/${this.movie.id}/reviews`]);
            });
          }
        }, (error) => {
          if (error) {
            console.log(error);
            this.submitting = false;
            this.hasError = true;
            this.errorMsg =
              'Something went wrong, review not saved';
          }
        }
      )
    );

  }

  cancel() {
    this.router.navigate([`./movies/${this.movie.id}`]);
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
