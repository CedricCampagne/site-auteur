import { slugify } from "../../utils/slugify";

describe("slugify()", () => { 
    it("retire les accents", () => { 
        expect(slugify("Éléphant")).toBe("elephant"); 
    });
    it("Mettre en minuscule", ()=>{
        expect(slugify("BONJOUR")).toBe('bonjour');
    });
    it("remplace les espaces par des tirets", () => {
        expect(slugify("Hello World")).toBe("hello-world"); 
    });
    it("Suprrime les caractères spéciaux",()=> {
        expect(slugify("C'est l'été")).toBe("c-est-l-ete");
    })
    it("Supprime les tirets en trop",()=>{
        expect(slugify("---Hello---")).toBe("hello");
    });
    it("Gère les espaces multiples", ()=>{
        expect(slugify("Espaces     mulTiples")).toBe("espaces-multiples");
    });
    it("retourne une chaîne vide si entrée vide", () => {
        expect(slugify("")).toBe("");
    });
    it("convertit les nombres en string", () => {
        expect(slugify(123 as any)).toBe("123");
    });
    it("Supprime les espaces au début et fin de chaine", ()=> {
        expect(slugify(" Test ")).toBe("test");
    })
});