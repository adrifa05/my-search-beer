export interface Beer {
  id?: number;
  name?: string;
  tagline?: string;
  firstBrewed?: string;
  description?: string;
  imageURL?: string;
  abv?: number;
  ibu?: number;
  targetFg?: number;
  targetOg?: number;
  ebc?: number;
  srm?: number;
  ph?: number;
  attenuationLevel?: number;
  volume?: BoilVolume;
  boilVolume?: BoilVolume;
  method?: Method;
  ingredients?: Ingredients;
  foodPairing?: string[];
  brewersTips?: string;
  contributedBy?: string;
}

export interface BoilVolume {
  value?: number;
  unit?: string;
}

export interface Ingredients {
  malt?: Malt[];
  hops?: Hop[];
  yeast?: string;
}

export interface Hop {
  name?: string;
  amount?: BoilVolume;
  add?: string;
  attribute?: string;
}

export interface Malt {
  name?: string;
  amount?: BoilVolume;
}

export interface Method {
  mashTemp?: MashTemp[];
  fermentation?: Fermentation;
  twist?: null;
}

export interface Fermentation {
  temp?: BoilVolume;
}

export interface MashTemp {
  temp?: BoilVolume;
  duration?: number;
}

export interface Options {
  per_page: number;
  page: number;
}
