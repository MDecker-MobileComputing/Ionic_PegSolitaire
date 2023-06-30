import { Component } from '@angular/core';

import { AlertController, ToastController } from '@ionic/angular';

import { Spielfeldindex } from '../spielfeldindex';

/** Custom Enum für SpielFeldStatus. */
enum Sfs {

    /** Zellen im GridLayout außerhalb des Rands haben diesen Zustand. */
    KEIN_FELD,

    /** Spielfeld hat keinen Spielstein */
    LEER,

    /** Spielfeld hat einen Spielstein */
    BESETZT
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  /** Enum für Status von Spielfeldwerten auch in HTML-Datei sichtbar machen. */
  public readonly SfsEnum : typeof Sfs = Sfs;

  /** Zweidimensionaler Array mit Vorlage für initialer Spielfieldzustand. */
  private readonly SPIELFELD_VORLAGE : Sfs[][] =
  [
      [ Sfs.KEIN_FELD, Sfs.KEIN_FELD, Sfs.BESETZT, Sfs.BESETZT, Sfs.BESETZT, Sfs.KEIN_FELD, Sfs.KEIN_FELD ],
      [ Sfs.KEIN_FELD, Sfs.KEIN_FELD, Sfs.BESETZT, Sfs.BESETZT, Sfs.BESETZT, Sfs.KEIN_FELD, Sfs.KEIN_FELD ],
      [ Sfs.BESETZT  , Sfs.BESETZT  , Sfs.BESETZT, Sfs.BESETZT, Sfs.BESETZT, Sfs.BESETZT  , Sfs.BESETZT   ],
      [ Sfs.BESETZT  , Sfs.BESETZT  , Sfs.BESETZT, Sfs.LEER   , Sfs.BESETZT, Sfs.BESETZT  , Sfs.BESETZT   ],
      [ Sfs.BESETZT  , Sfs.BESETZT  , Sfs.BESETZT, Sfs.BESETZT, Sfs.BESETZT, Sfs.BESETZT  , Sfs.BESETZT   ],
      [ Sfs.KEIN_FELD, Sfs.KEIN_FELD, Sfs.BESETZT, Sfs.BESETZT, Sfs.BESETZT, Sfs.KEIN_FELD, Sfs.KEIN_FELD ],
      [ Sfs.KEIN_FELD, Sfs.KEIN_FELD, Sfs.BESETZT, Sfs.BESETZT, Sfs.BESETZT, Sfs.KEIN_FELD, Sfs.KEIN_FELD ]
  ];

  /**
   * Zweidimensionaler Array mit Vorlage für initialer Spielfieldzustand.
   * Wird in Methode `initialisiereSpielfeld()` gefüllt.
   */
  public spielfeldArray : Sfs[][] = [[]];

  /** Aktuelle Anzahl der Spielsteine auf dem Feld. */
  public anzahlSpielsteine : number = 0;

  /**
   * Startposition eines Spielzugs, nämlich Feld mit Spielstein der "springen" soll;
   * wenn Wert `null` dann wurde kein Spielzug gestartet. */
  private startPosition : Spielfeldindex | null = null;

  /**
   * Konstruktor für Dependency Injection, initialisiert Spielfeld.
   */
  constructor(private alertController: AlertController,
              private toastController: ToastController) {

    this.initialisiereSpielfeld();
  }

  /**
   * Spielfeld in Ausgangszustand versetzen. Kopiert `SPIELFELD_VORLAGE` in`spielfeldArray`.
   * Auch die Variable `anzahlSpielsteine` wird neu gesetzt.
   */
  private initialisiereSpielfeld() {

    this.anzahlSpielsteine = 0;

    this.spielfeldArray = new Array();

    for (let zeile = 0; zeile < this.SPIELFELD_VORLAGE.length; zeile++) {

      this.spielfeldArray[zeile] = new Array();

      for (let spalte = 0; spalte < this.SPIELFELD_VORLAGE[zeile].length; spalte++) {

        this.spielfeldArray[zeile][spalte] = this.SPIELFELD_VORLAGE[zeile][spalte];

        if (this.SPIELFELD_VORLAGE[zeile][spalte] === Sfs.BESETZT) { this.anzahlSpielsteine ++; }
      }
    }

    console.log(`Spielfeld wurde initialisiert, Anzahl Spielsteine: ${this.anzahlSpielsteine}`);
  }

  /**
   * Event-Handler-Methode für Klick auf Spielstein für Start Spielzug.
   */
  public onSpielsteinKlick(indexZeile: number, indexSpalte: number) {

    console.log(`Klick auf Spielstein: indexZeile=${indexZeile}, indexSpalte=${indexSpalte}.`);

    if (this.startPosition) {

      this.zeigeToast("Es wurde schon ein Startfeld gewählt.");
      this.startPosition = null;

    } else {

      this.startPosition = new Spielfeldindex(indexZeile, indexSpalte);
    }
  }

  /**
   * Event-Handler-Methode für Klick auf leeres Spielfeld für Beendigung Spielzug.
   */
  public onLeerFeldKlick(indexZeile: number, indexSpalte: number) {

    console.log(`Klick auf leeres Feld: indexZeile=${indexZeile}, indexSpalte=${indexSpalte}.`);

    if (!this.startPosition) {

      this.zeigeToast("Leeres Feld kann kein Startfeld sein.");

    } else {

      console.log("Sollte jetzt Gültigkeit Spielzug bestimmen.");
    }
  }

  /**
   * Event-Handler für Button "Neues Spiel" in Toolbar.
   */
  public async onNeuesSpielButton() {


    const jaButton = { text: "Ja",
                       handler: () => { this.initialisiereSpielfeld(); }
                     };

    const neinButton = { text: "Nein",
                         role: "Cancel"
                       };

    const alert = await this.alertController.create({
      header: "Sicherheitsabfrage",
      message: "Wollen Sie wirklich ein neues Spiel beginnen?",
      backdropDismiss: false,
      buttons: [ jaButton, neinButton ]
    });
    alert.present();
  }

  /**
   * Hilfsmethode um Toast anzuzeigen.
   * @param nachricht  Nachricht auf Toast.
   */
  private async zeigeToast(nachricht: string) {

    const toast =
          await this.toastController.create({
              message : nachricht,
              duration: 2000  // 2000 ms = 2 Sekunden
          });

    await toast.present();
  }

}
