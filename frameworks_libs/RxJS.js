/*

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

*/
