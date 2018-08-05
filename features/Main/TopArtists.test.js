import { getArtistNames } from './TopTracks';


test('TopArtists.getArtistNames: Should present a string from the array of artists in the right manner', () => {
  expect(getArtistNames([{name :"Coone"}])).toBe("Coone")
  expect(getArtistNames([{name :"Coone"}, {name: "Headhunterz"}])).toBe("Coone & Headhunterz")
  expect(getArtistNames([{name :"Coone"}, {name: "Headhunterz"}, {name: "KSHMR"}])).toBe("Coone, Headhunterz & KSHMR")
  expect(getArtistNames([{name :"Coone"}, {name: "Headhunterz"}, {name: "KSHMR"}, {name: "Die Ärzte"}])).toBe("Coone, Headhunterz and others")
  expect(getArtistNames([{name :"Coone"}, {name: "Headhunterz"}, {name: "KSHMR"}, {name: "Die Ärzte"}, {name: "Hagen Rether"}])).toBe("Coone, Headhunterz and others")
})