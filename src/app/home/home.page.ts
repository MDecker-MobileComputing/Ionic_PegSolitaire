import { Component } from '@angular/core';

import { AlertController, ToastController } from '@ionic/angular';

import { Spielfeldindex } from '../spielfeldindex';
import { Sfs } from '../sfsEnum';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage {

  /** Enum für Status von Spielfeldwerten auch in HTML-Datei sichtbar machen. */
  public readonly SfsEnum : typeof Sfs = Sfs;

  /** Zweidimensionaler Array mit Vorlage für initialen Spielfieldzustand. */
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

  // Zum Testen für Erkennung von "Spiel gewonnen"
  /*
  private readonly SPIELFELD_VORLAGE : Sfs[][] =
  [
    [ Sfs.KEIN_FELD, Sfs.KEIN_FELD, Sfs.LEER   , Sfs.LEER, Sfs.LEER, Sfs.KEIN_FELD, Sfs.KEIN_FELD ],
    [ Sfs.KEIN_FELD, Sfs.KEIN_FELD, Sfs.LEER   , Sfs.LEER, Sfs.LEER, Sfs.KEIN_FELD, Sfs.KEIN_FELD ],
    [ Sfs.LEER     , Sfs.LEER     , Sfs.LEER   , Sfs.LEER, Sfs.LEER, Sfs.LEER     , Sfs.LEER      ],
    [ Sfs.LEER     , Sfs.BESETZT  , Sfs.BESETZT, Sfs.LEER, Sfs.LEER, Sfs.LEER     , Sfs.LEER      ],
    [ Sfs.LEER     , Sfs.LEER     , Sfs.LEER   , Sfs.LEER, Sfs.LEER, Sfs.LEER     , Sfs.LEER      ],
    [ Sfs.KEIN_FELD, Sfs.KEIN_FELD, Sfs.LEER   , Sfs.LEER, Sfs.LEER, Sfs.KEIN_FELD, Sfs.KEIN_FELD ],
    [ Sfs.KEIN_FELD, Sfs.KEIN_FELD, Sfs.LEER   , Sfs.LEER, Sfs.LEER, Sfs.KEIN_FELD, Sfs.KEIN_FELD ]
  ]; */


  /**
   * Zweidimensionaler Array mit Vorlage für initialer Spielfieldzustand;
   * Wird in Methode `initialisiereSpielfeld()` gefüllt.
   * Erster Index ist Zeile, zweiter Index ist Spalte.
   */
  public spielfeldArray : Sfs[][] = [[]];

  /**
   * Zweidim-Array für Bool-Werte: Die Werte steuern, ob die Buttons disabled sind oder nicht.
   * Es ist nur der Start-Button für den aktuellen Zug disabled, es kann also höchstens ein
   * `true`-Wert enthalten sein.
   */
  public disabledArray : boolean[][] = [[]];


  /** Aktuelle Anzahl der Spielsteine auf dem Feld. */
  public anzahlSpielsteine : number = 0;


  /**
   * Startposition eines Spielzugs, nämlich Feld mit Spielstein der "springen" soll;
   * wenn Wert `null` dann wurde kein Spielzug gestartet. */
  private startPosition : Spielfeldindex | null = null;


  /**
   * Konstruktor für Dependency Injection, initialisiert Spielfeld.
   */
  constructor( private alertController: AlertController,
               private toastController: ToastController ) {

    this.initialisiereSpielfeld();
  }


  /**
   * Spielfeld in Ausgangszustand versetzen. Kopiert `SPIELFELD_VORLAGE` in`spielfeldArray`.
   * Auch die Variable `anzahlSpielsteine` wird neu gesetzt.
   */
  private initialisiereSpielfeld() {

    this.anzahlSpielsteine = 0;

    this.spielfeldArray = new Array();
    this.disabledArray = new Array();

    for ( let zeile = 0; zeile < this.SPIELFELD_VORLAGE.length; zeile++ ) {

      this.spielfeldArray[ zeile ] = new Array();
      this.disabledArray[  zeile]  = new Array();

      for ( let spalte = 0; spalte < this.SPIELFELD_VORLAGE[zeile].length; spalte++ ) {

        this.spielfeldArray[ zeile ][ spalte ] = this.SPIELFELD_VORLAGE[zeile][spalte];
        this.disabledArray[ zeile ][  spalte ]  = false;

        if ( this.SPIELFELD_VORLAGE[zeile][spalte] === Sfs.BESETZT ) { this.anzahlSpielsteine ++; }
      }
    }

    this.resetStartPosition();

    console.log( `Spielfeld wurde initialisiert, Anzahl Spielsteine: ${this.anzahlSpielsteine}` );
  }


  /**
   * Setzt Startposition nach erfolgreichem oder abgebrochenem Spielzug zurück
   * (inkl. Array für disabled Button).
   */
  private resetStartPosition() {

    if ( this.startPosition !== null ) {

      this.disabledArray[this.startPosition.indexZeile][this.startPosition.indexSpalte] = false;
    }

    this.startPosition = null;
  }


  /**
   * Event-Handler-Methode für Klick auf Spielstein für Start Spielzug.
   */
  public async onSpielsteinKlick( indexZeile: number, indexSpalte: number ) {

    console.log( `Klick auf Spielstein: indexZeile=${indexZeile}, indexSpalte=${indexSpalte}.` );

    if ( this.startPosition ) {

      this.zeigeToast( "Es wurde schon ein Startfeld gewählt." );
      this.resetStartPosition();

    } else {

      this.startPosition = new Spielfeldindex( indexZeile, indexSpalte );
      this.disabledArray[indexZeile][indexSpalte] = true;
    }
  }


  /**
   * Event-Handler-Methode für Klick auf leeres Spielfeld für Beendigung Spielzug.
   */
  public async onLeerFeldKlick( indexZeile: number, indexSpalte: number ) {

    console.log( `Klick auf leeres Feld: indexZeile=${indexZeile}, indexSpalte=${indexSpalte}.` );

    if ( this.startPosition === null ) {

      this.zeigeToast( "Leeres Feld kann kein Startfeld sein." );

    } else {

      const zielPosition = new Spielfeldindex( indexZeile, indexSpalte );

      const uebersprungenPos = this.bestimmeUebersprungenePosition( this.startPosition, zielPosition );
      if ( uebersprungenPos === null ) {

        this.zeigeToast( "Ungültiger Zug." );
        this.resetStartPosition();
        return;
      }

      const statusUebersprungenePos = this.spielfeldArray[uebersprungenPos.indexZeile][uebersprungenPos.indexSpalte];
      if ( statusUebersprungenePos === Sfs.BESETZT ) {

        this.sprungDurchfuehren( this.startPosition, uebersprungenPos, zielPosition );

      } else {

        console.log( "Übersprungene Position enthält keinen Spielstein." );
        this.resetStartPosition();
        this.zeigeToast( "Ungültiger Zug." );
      }
    }
  }


  /**
   * Führt Sprung durch. Diese Methode darf nur für gültige Züge aufgerufen werden!
   * Es wird auch überprüft, ob das Spiel gewonnen wurde, also nur ein Stein übrigt
   * ist.
   */
  private sprungDurchfuehren( startPos: Spielfeldindex,
                              uebersprungPos: Spielfeldindex,
                              zielPos: Spielfeldindex) {

    this.spielfeldArray[startPos.indexZeile][startPos.indexSpalte]             = Sfs.LEER;
    this.spielfeldArray[uebersprungPos.indexZeile][uebersprungPos.indexSpalte] = Sfs.LEER;
    this.spielfeldArray[zielPos.indexZeile][zielPos.indexSpalte]               = Sfs.BESETZT;

    this.resetStartPosition();
    this.anzahlSpielsteine--;

    if ( this.anzahlSpielsteine === 1 ) {

      this.zeigeDialog( "Erfolg", "Sie haben das Spiel gewonnen!" );
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
   * Gültigkeit des Zugs und übersprungenen Spielstein bestimmen.
   * Es muss danach noch überprüft werden, ob an der übersprüngenen
   * Position sich tatsächlich ein Spielstein befindet.
   *
   * @returns Übersprungenes Spielfeld mit Stein, oder `null` wenn
   *          kein gültiger Zug.
   */
  private bestimmeUebersprungenePosition( start: Spielfeldindex,
                                          ziel : Spielfeldindex ): Spielfeldindex | null {

    if (start.indexSpalte === ziel.indexSpalte) { // vertikaler Zug?

      const deltaZeile = ziel.indexZeile - start.indexZeile;
      if ( Math.abs(deltaZeile) != 2 ) {

        console.log( `Vertikaler Sprung mit unzulässiger Sprungweite ${deltaZeile}.` );
        return null;
      }

      const uebersprungeneZeile = start.indexZeile + deltaZeile/2;

      return new Spielfeldindex( uebersprungeneZeile, start.indexSpalte );

    } else if ( start.indexZeile === ziel.indexZeile ) { // horizontaler Zug?

      const deltaSpalte = ziel.indexSpalte - start.indexSpalte;
      if ( Math.abs( deltaSpalte ) != 2 ) {

        console.log( `Horizontaler Sprung mit unzulässiger Sprungweite ${deltaSpalte}.` );
        return null;
      }

      const uebersprungenSpalte = start.indexSpalte + deltaSpalte/2;

      return new Spielfeldindex( start.indexZeile, uebersprungenSpalte );

    } else { // diagonaler Zug?

      console.log( "Diagonale Züge sind nicht zulässig." );
      return null;
    }
  }


  /**
   * Hilfsmethode um Toast anzuzeigen.
   *
   * @param nachricht  Nachricht auf Toast.
   */
  private async zeigeToast( nachricht: string ) {

    const toast =
          await this.toastController.create({
              message : nachricht,
              duration: 2000  // 2000 ms = 2 Sekunden
          });

    await toast.present();
  }


  /**
   * Hilfsmethode um Dialog anzuzeigen.
   *
   * @param titel Titel von Dialog
   *
   * @param nachricht  Nachricht auf Dialog
   */
  private async zeigeDialog( titel: string, nachricht: string ) {

    const meinAlert =
          await this.alertController.create({
              header  : titel,
              message : nachricht,
              buttons : [ "Ok" ]
          });

    await meinAlert.present();
  }

}
