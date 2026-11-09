# Teste pentru Saucedemo, UI Testing Playground si DummyJSON API

## Instructiuni instalare

```bash
git clone https://github.com/nairod010/PlaywrightUIandAPITesting.git
cd PlaywrightUIandAPITesting
npm install
npx playwright install chromium
```

## Configurare

Nu este necesara configurarea suplimentara.
Url-urile aplicatiilor sunt definitee in `playwright.config.ts`
Date fiind cazurile primite am preferat sa preiau din interfata datele de autentificare pentru scenariile folosite in Sauce Demo.

Intr-un caz real as fi folosit un fisier `.env` de unde as fi preluat datele.

## Rulare teste
| Comanda                   | Descriere                                     |
| ------------------------- | --------------------------------------------- |
| `npm test`                | Ruleaza toate testele                         |
| `npm run test:sauce`      | Scenariile 1-2 (Sauce Demo)                   |
| `npm run test:playground` | Scenariile 3-6 (UI Testing Playground)        |
| `npm run test:api`        | Scenariul 7 (DummyJSON)                       |
| `npm run test:headed`     | Ruleaza testele cu browserul vizibil (l-am folosit in mici situatii de debug)         |
| `npm run report`          | Deschide raportul HTML al ultimei rulari      |

## Structura proiectului

Proiectul este structurat in douce parti: `src/` care contine paginile, selectori pentru fiecare pagina, date de test si helpere, iar `tests/` contine doar scenariile de test.

- **Radacina proiectului** contine configurarea:
    - `playwright.config.ts` defineste trei proiecte (`sauce`, `playground`, `api`), fiecare cu URL-ul aplicatiei testate.
    - `package.json`, `tsconfig.json` si `.prettierrc` contin dependintele si scripturile, setarile TypeScript si regulile de formatare.
- **`src/fixtures.ts`** creeaza obiectele de pagina si clientul API si le ofera testelor ca parametri (de exemplu `async ({loginPage, inventoryPage}) => ...`). Testele nu construiesc singure aceste obiecte.
- **`src/pages/`** contine cate o clasa pentru fiecare pagina (Page Object Model), grupate pe aplicatie:
    - `saucedemo/`: login, inventar, cos si checkout, plus doua componente comune: `Header` (cosul) si `ProductList` (lista de produse, refolosita in inventar, cos si checkout).
    - `playground/`: cate o clasa pentru Scroll To Click, Upload, Select si Frames.
- **`src/api/AuthApi.ts`** grupeaza cererile catre DummyJSON: login, `/auth/me` si citirea cookie-urilor.
- **`src/data/`** contine datele:
    - `testData.ts`: tipurile, optiunile de sortare si datele de test (clientul pentru checkout, utilizatorul API, fisierele pentru upload).
    - `schemas.ts`: structura asteptata a raspunsului `/auth/me`.
    - `upload/`: fisierele folosite la upload.
- **`src/utils/`** contine functii ajutatoare fara legatura cu o pagina anume: calculul preturilor, decodarea JWT, logarea in raport si tipul MIME al fisierelor.
- **`tests/`** contine cate un fisier pentru fiecare scenariu din cerinta, grupate la fel ca paginile:
    - `saucedemo/`: `order.spec.ts` (scenariul 1) si `sortByPrice.spec.ts` (scenariul 2).
    - `playground/`: `scrollToClick.spec.ts`, `upload.spec.ts`, `select.spec.ts` si `frames.spec.ts` (scenariile 3-6).
    - `api/`: `auth.spec.ts` (scenariul 7).

