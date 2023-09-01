export function sontTableauxIdentiques(tab1: string[], tab2: string[]): boolean;
export function sontTableauxIdentiques(tab1: number[], tab2: number[]): boolean;
export function sontTableauxIdentiques(tab1:any[], tab2:any[]):boolean {
  if (tab1.length !== tab2.length) {
    return false;
  }

  for (let i = 0; i < tab1.length; i++) {
    if (tab1[i] !== tab2[i]) {
      return false;
    }
  }

  return true;
}
