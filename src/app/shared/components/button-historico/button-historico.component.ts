import { Component, OnInit, Input } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-button-historico',
  templateUrl: './button-historico.component.html'
})
export class ButtonHistoricoComponent implements OnInit {

  @Input() label: string
  @Input() link: string
  @Input() desabilitar: boolean

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirectHistory(){
    this.router.navigate([this.link])
  }

}
