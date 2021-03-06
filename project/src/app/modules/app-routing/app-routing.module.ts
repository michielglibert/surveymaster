import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "../material.module";

const appRoutes: Routes = [
    {
        path: 'survey',
        loadChildren: 'app/modules/survey/survey.module#SurveyModule'
    },
    {
        path: 'user',
        loadChildren: 'app/modules/user/user.module#UserModule'
    },
    {
        path: 'home',
        loadChildren: 'app/modules/home/home.module#HomeModule'
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        RouterModule.forRoot(appRoutes,
            { preloadingStrategy: PreloadAllModules })
    ],
    declarations: [
        PageNotFoundComponent
    ],
    exports: [
        RouterModule
    ]
})

export class AppRouteModule { }