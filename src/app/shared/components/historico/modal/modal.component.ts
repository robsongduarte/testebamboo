import { Component, Input } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {

  @Input() title: string = ''
  @Input() older: string = ''
  @Input() newer: string = ''

  constructor(public activeModal: NgbActiveModal) {}

}
