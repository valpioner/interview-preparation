}

{ // @angular/cli terminal commands

  /*
    npm i -g @angular/cli

    ng new --skip-install project-name --style=(scss || sass || less)
    ng set defaults.styleExt scss // convert current spp to scss

    ng g (c || s || m) [path]/[file-name] --skipTests --flat
  */
}

{ // general questions
  /*
    1. Which lifecycle hooks do you know and what is their order of execution.
    2. Methods of communication between components.
    3. What is Change Detection.
        When angular triggers CD process? Zone.js?
        How we can affect that process: trigger manually for example?
        What is the difference between cdRef.markForCheck() and cdRef.detectChanges() and appRef.tick()?
        What ChangeDetectionStrategy.OnPush does?
    4. Difference between component / directive / structural directive
    5. What is content projection / ng-content. To which component projected content belongs ? What is the role of “select” attribute ?
    6. Template-reference variable #someVar.
    7. Style encapsulation in angular/ ViewEncapsulation.
    8. ng-container ng-template ngTemplateOutlet
    9. Presentation/container components
    10. Single-store architecture (redux, ngrx)

    LocalService (separate service instance) - describe
    The Master Detail Design Pattern With Cached Master Table - describe
    How whould you implement Error Handling f-ty
  */


}

{ // How Components communicate
  /*
    - Input [] / Output ()
    - Statefull Services (Injection) (with EventEmmiters .emit .subscribe) - old approach
    - Statefull Services (Injection) (with Subjects .next .subscribe) - recommended approach
    - #, @ViewChild, @ContentChild
    - Projection (<ng-content>...</ng-content>)
  */
}

{ // Component Lifecycle hooks:

    ngOnChanges 						// Called as first hook and after a bound input propery changes

    // constructor

    ngOnInit 								// Called once the component is initialized
                            // Cant access ViewChild # elements

    ngDoCheck 							// Called during every change detection run

    ngAfterContentInit 			// Called after projected content (ng-content) initialized

    ngAfterContentChecked 	// Called every time projected content has been checked

    ngAfterViewInit					// Called after component's view (& child views) has been initialized
                            // Can access ViewChild # elements

    ngAfterViewChecked			// Called every time the view (and child views) has been checked

    ngOnDestroy							// Called once component is about to destroy
}

{ // DI, hierarchical service Injector
  /*
    Services can be provided in:
    - AppModule (available everywhere)
      providers: [MyService] // in @NgModule decorator
    - AppComponent (available in all components, but not for other services)
      providers: [MyService] // in @Component decorator
    - specific Component (available inside component and its child components)
      providers: [MyService] // in @Component decorator
  */
}


{ // describe ChangeDetectionStrategy

  // ChangeDetectionStrategy.OnPush - component only been rerendered if Inputs inside were changed

}

{ // why to separate into containers (smart) and view (dumb) components
  /*
    - containers supply a data flow for presentation
    - containers reacts to events and call Actions (redux/ngrx)

    Better testability
  */
}

{ // How to fix event/props drill in a component tree?

  // use deeply nested smart components. Use '| async' pipe so that component will rerender if OnPush strategy.

}

{ // What are directives? @Directive

  /*
    Directives are instructions in the DOM.
    - structural directives (change DOM) *ngIf, *ngFor, *ngIf
    - attribute (change element)
  */

}