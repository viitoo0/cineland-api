import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

export const routes = [
    {
        path: "",
        loadChildren: () => import("./initial-page/initial-page.module").then(m => m.InitialPageModule),
    },
    {
        path: "",
        loadChildren: () => import('./details-page/details-page.module').then(m => m.DetailsPageModule),
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: []
})

export class AppRoutingModule {}