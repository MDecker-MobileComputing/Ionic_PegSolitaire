import { Component } from '@angular/core';

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

  /**
   * Konstruktor, initialisiert Spielfeld.
   */

  constructor() {

    this.initialisiereSpielfeld();
  }

  /**
   * Spielfeld in Ausgangszustand versetzen. Kopiert `SPIELFELD_VORLAGE` in`spielfeldArray`.
   */
  private initialisiereSpielfeld() {

    this.spielfeldArray = new Array();

    for (let zeile = 0; zeile < this.SPIELFELD_VORLAGE.length; zeile++) {

      this.spielfeldArray[zeile] = new Array();

      for (let spalte = 0; spalte < this.SPIELFELD_VORLAGE[zeile].length; spalte++) {

        this.spielfeldArray[zeile][spalte] = this.SPIELFELD_VORLAGE[zeile][spalte];
      }
    }
  }

  /**
   * Event-Handler-Methode für Klick auf Spielstein.
   */
  public onSpielsteinKlick(indexZeile: number, indexSpalte: number) {

    console.log(`Klick auf Spielstein: indexZeile=${indexZeile}, indexSpalte=${indexSpalte}.`);
  }

  /**
   * Event-Handler-Methode für Klick auf leeres Spielfeld.
   */
  public onLeerFeldKlick(indexZeile: number, indexSpalte: number) {

    console.log(`Klick auf leeres Feld: indexZeile=${indexZeile}, indexSpalte=${indexSpalte}.`);
  }

  /**
   * Event-Handler für Button "Neues Spiel" in Toolbar.
   */
  public onNeuesSpielButton() {

    console.log("Klick auf Button >leeres Spiel<.");
  }

}
