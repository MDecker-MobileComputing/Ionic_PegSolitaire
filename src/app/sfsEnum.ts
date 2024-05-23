
/**
 * Eigener Aufzählungstyp für SpielFeldStatus.
 */
export enum Sfs {

    KEIN_FELD, /** Zellen im GridLayout außerhalb des Rands haben diesen Zustand. */

    LEER, /** Spielfeld hat keinen Spielstein */

    BESETZT /** Spielfeld hat einen Spielstein */
}

