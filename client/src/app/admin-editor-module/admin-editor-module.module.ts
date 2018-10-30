import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import {ScriptService} from '../scripts/script.service';

import { AdminEditorModuleRoutingModule } from './admin-editor-module-routing.module';

import { WelcomePopupEditorComponent } from './welcome-popup-editor/welcome-popup-editor.component';
import { ChatPopupEditorComponent } from './chat-popup-editor/chat-popup-editor.component';
import { PrivacyEditorComponent } from './privacy-editor/privacy-editor.component';
import { AdminFaqEditorComponent } from './admin-faq-editor/admin-faq-editor.component';
import { AdminTermsConditionEditorComponent } from './admin-terms-condition-editor/admin-terms-condition-editor.component';

@NgModule({
  imports: [
    CommonModule,
    AdminEditorModuleRoutingModule,
    CKEditorModule,
    FormsModule
  ],
  declarations: [
    WelcomePopupEditorComponent,
    ChatPopupEditorComponent,
    PrivacyEditorComponent,
    AdminFaqEditorComponent,
    AdminTermsConditionEditorComponent
  ],
  providers : [ScriptService]
})
export class AdminEditorModuleModule {
  constructor(private scriptService : ScriptService) {
    this.scriptService.load('ckeditor').then(data => {
      //console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }
}