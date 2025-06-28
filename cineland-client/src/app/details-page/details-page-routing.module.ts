import { RouterModule, Routes } from "@angular/router";
import { DetailsPageComponent } from "./details-page/details-page.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {path: ":type/:id", component: DetailsPageComponent},
    ]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: []
})

export class DetailsPageRoutingModule {}