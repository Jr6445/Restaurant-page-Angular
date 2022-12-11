# ConFusion

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


1 step
npm install -g @angular/cli@6.2.1

ng help

ng new conFusion --style=scss

ng serve --open

To configure your project to use Angular material, type the following at the prompt to install Angular Material, Angular Animations and HammerJS:

pm install @angular/material@6.4.7 --save
npm install @angular/cdk@6.4.7 --save
npm install --save @angular/animations@6.1.7
npm install --save hammerjs@2.0.8

Next, include the following into the head of index.html to make use of Material Design icons:
<--link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"-->

Next, install Angular Flex Layout as follows:
npm install --save @angular/flex-layout@6.0.0-beta.18

Then, you need to import the Angular Animations Module, Angular Material Toolbar Module, Flex Layout Module and hammerjs into your root module (src/app/app.module.ts) as follows:




