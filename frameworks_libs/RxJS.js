}/*
	rxjs:
    1. What is the difference between an observable and a promise?
    2. Hot/cold observables
        answer:
            a cold observable emits its values when it has an observer to consume them, i.e.
            the sequence of values received by observers is independent of time of subscription.
            All observers will consume the same sequence of values.

            a hot observable emits value independently of its subscriptions,
            i.e. the values received by observers are a function of the time of subscription.
    3. What is the difference between switchMap, concatMap, mergeMap, exhaustMap?
    4. Subject/ReplaySubject/BehaviorSubject
    5. share operator, multicasting, publishReplay/refcount.
		6. Subscription disposal in components.
		7. Long lived Observable vs Short lived Observables (.first || .take(1))
*/

{ // What is RxJs
	/*
		It is a library that allows to build async apps using Observables
	*/
}

{ // Describe Observable pattern vs Global Event Buz (Observer pattern)
	/*
		Global Event Buz - https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Observer_w_update.svg/500px-Observer_w_update.svg.png
		Cons: Timing issues, sequence of operation matters, can't scale in complexity. Problem with data encapsulation -
		data is shared for modification, no  central data owner, which leads to sync issues, hard to understand where
		changes came from (because Subject's notifyObservers() api interface is public for every observer)

		Observable pattern:
		Pros: sequence of operations/subscriptions DOESN'T matters, central data owner +encapsulation
	*/
}

{ // RxJs components

	// Subject
	/*
		Subject
		BehaviorSubject
	*/

	// Observable
	private lessonsList$: Observable<Lesson[]> = this.lessonsSubject.asObservable();

	// Obsserver
}

{ // common patterns

	// Stateless Observable Service (pattern)
	/*
		Service has access (in constructor) to http... service and return observables of data async way, but not sync data, so consumers can subscribe. Services don't have local variables.
	*/


	{ // Observable Data Service (Statefull) (pattern)
		@Injectable()
		export class UserService {
			UNKNOWN_USER = {name: 'unknown'};
			private subject = new BehaviorSubject(UNKNOWN_USER);

			user$: Observable<User> = this.subject.asObservable(); // public api

			constructor(private http: Http) {}

			login(email: String, password: string): Observable<User> {
				return this.http.post('/api/login', {email, password}, headers)
					.map(res => res.json())
					.do(user => console.log())
					.do(user => this.subject.next(user))
					.publishLast().refCount(); // wait for Observable to complete and then send a result
			}
		}

		// service api usage in a component:
		//...
		isLoggedIn$: Observable<boolean>;
		constructor(private userService: UserService) {};
		ngOnInit() {this.isLoggedIn$ = this.userService.user$.map(user => user !== UNKNOWN_USER)};
		//...
	}