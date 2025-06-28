import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DetailsPageComponent } from "./details-page/details-page.component";
import { DetailsPageRoutingModule } from "./details-page-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [DetailsPageComponent],
    imports: [
        CommonModule,
        SharedModule,
        DetailsPageRoutingModule
    ],
    exports: [DetailsPageComponent]
})
export class DetailsPageModule {}