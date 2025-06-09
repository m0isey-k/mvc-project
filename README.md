# System Zarządzania Zadaniami Domowymi

Internetowy system zarządzania zadaniami domowymi zbudowany w Node.js, Express.js i EJS z wykorzystaniem wzorca architektonicznego MVC i renderowania po stronie serwera (SSR).

## 📋 Opis Projektu

Ta aplikacja pomaga użytkownikom efektywnie zarządzać zadaniami domowymi poprzez:

- ✅ Tworzenie zadań z terminami wykonania
- 🔄 Śledzenie statusu zadań (oczekujące, ukończone, przeterminowane)
- 🎨 Wizualne wyróżnianie przeterminowanych zadań
- 📊 Sortowanie zadań według różnych kryteriów
- 🔐 Uwierzytelnianie użytkowników i zarządzanie sesjami
- 🌙 Tryb ciemny/jasny z przełączaniem motywów

## ⭐ Funkcjonalności

### 👥 Zarządzanie Użytkownikami
- **Rejestracja Użytkowników** - Tworzenie nowych kont z bezpiecznym hashowaniem haseł
- **Uwierzytelnianie** - Bezpieczna funkcjonalność logowania/wylogowywania
- **Zarządzanie Sesjami** - Utrzymywanie sesji użytkowników między żądaniami
- **Bezpieczeństwo Haseł** - Hasła są hashowane przy użyciu bcryptjs

### 📝 Zarządzanie Zadaniami
- **Dodawanie Zadań** - Tworzenie nowych zadań z tytułem, opisem i terminem wykonania
- **Oznaczanie jako Ukończone** - Przełączanie statusu ukończenia zadania
- **Usuwanie Zadań** - Trwałe usuwanie zadań
- **Automatyczne Wykrywanie Przeterminowanych** - Zadania po terminie są automatycznie oznaczane jako przeterminowane
- **Wyszukiwanie Zadań** - Wyszukiwanie zadań po tytule i opisie
- **Sortowanie Zadań według:**
  - Daty (rosnąco/malejąco)
  - Statusu (przeterminowane → oczekujące → ukończone)
  - Tytułu (alfabetycznie)

### 🎨 Interfejs Użytkownika
- **Responsywny Design** - Działa na komputerach, tabletach i urządzeniach mobilnych
- **Wizualne Wskaźniki Statusu** - Różne kolory i style dla statusów zadań
- **Intuicyjna Nawigacja** - Łatwy w użyciu interfejs z przejrzystą nawigacją
- **Płynne Animacje** - Przejścia CSS i efekty hover
- **Nowoczesny Styl** - Czysty, profesjonalny wygląd z gradientami i cieniami
- **Tryb Ciemny/Jasny** - Przełączanie między motywami jasnym i ciemnym
- **Statystyki Zadań** - Przegląd liczby zadań według statusu

## 🚀 Instalacja i Konfiguracja

### Wymagania Wstępne
- Node.js w wersji 14.0 lub wyższej
- npm (Node Package Manager)

### Kroki Instalacji

1. **Sklonuj repozytorium:**
   \`\`\`bash
   git clone https://github.com/m0isey-k/mvc-project.git
   cd mvc-project
   \`\`\`

2. **Zainstaluj zależności:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Skonfiguruj zmienne środowiskowe:**
   Utwórz plik `.env` w katalogu głównym:
   \`\`\`env
   PORT=3000
   SESSION_SECRET=twoj-sekretny-klucz-tutaj
   NODE_ENV=development
   \`\`\`

4. **Uruchom aplikację:**
   
   **Tryb produkcyjny:**
   \`\`\`bash
   npm start
   \`\`\`
   
   **Tryb deweloperski (z automatycznym restartowaniem):**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Uzyskaj dostęp do aplikacji:**
   Otwórz przeglądarkę i przejdź do `http://localhost:3000`

## 📦 Zależności

### Główne Zależności
- **express** (^4.18.2) - Framework webowy dla Node.js
- **ejs** (^3.1.9) - Silnik szablonów Embedded JavaScript
- **bcryptjs** (^2.4.3) - Biblioteka do hashowania haseł
- **express-session** (^1.17.3) - Middleware sesji dla Express
- **body-parser** (^1.20.2) - Parsowanie przychodzących treści żądań
- **dotenv** (^16.3.1) - Zarządzanie zmiennymi środowiskowymi

### Zależności Deweloperskie
- **nodemon** (^3.0.1) - Automatyczny restart serwera podczas rozwoju

## 🏗️ Struktura Aplikacji

### Architektura MVC

#### Modele (`models/`)
- **User.js** - Model użytkownika z metodami uwierzytelniania, rejestracji i walidacji
- **Task.js** - Model zadania z operacjami CRUD, sortowaniem i zarządzaniem statusem

#### Widoki (`views/`)
- **auth/login.ejs** - Formularz logowania użytkownika z nowoczesnym stylem
- **auth/register.ejs** - Formularz rejestracji użytkownika
- **tasks/index.ejs** - Lista zadań z opcjami sortowania i wskaźnikami statusu
- **tasks/create.ejs** - Formularz tworzenia nowego zadania z walidacją
- **error.ejs** - Strona błędu z obsługą motywów

#### Kontrolery (`controllers/`)
- **authController.js** - Obsługuje uwierzytelnianie (logowanie, rejestracja, wylogowywanie)
- **taskController.js** - Zarządza operacjami zadań (CRUD, sortowanie, aktualizacje statusu)

### Dodatkowe Komponenty

#### Routing (`routing/`)
- **authRoutes.js** - Trasy związane z uwierzytelnianiem
- **taskRoutes.js** - Trasy zarządzania zadaniami z middleware uwierzytelniania

#### Przechowywanie Danych (`store/`)
- **dataStore.js** - Przechowywanie danych w plikach JSON z przykładowymi danymi

#### Narzędzia (`utils/`)
- **authMiddleware.js** - Middleware uwierzytelniania dla chronionych tras
- **dateHelpers.js** - Narzędzia do formatowania i manipulacji dat

#### Stałe (`constants/`)
- **statusCode.js** - Kody statusu HTTP i stałe statusu aplikacji
- **navigation.js** - Elementy menu nawigacji i definicje breadcrumb
- **taskStatus.js** - Definicje statusu zadań i etykiety wyświetlania
- **sortOptions.js** - Opcje sortowania i ich etykiety wyświetlania

#### Zasoby Statyczne (`public/`)
- **css/style.css** - Kompleksowy CSS z responsywnym designem, animacjami i nowoczesnym stylem

## 📊 Przykładowe Dane

Aplikacja zawiera przykładowe dane do testowania:

### Testowe Konto Użytkownika
- **Email:** admin@example.com
- **Hasło:** password

### Przykładowe Zadania
1. **Odkurzanie salonu** - Termin jutro (Status: Oczekujące)
2. **Zmywanie naczyń** - Zadanie przeterminowane (Status: Przeterminowane)
3. **Pranie** - Zadanie ukończone (Status: Ukończone)

## 🔒 Funkcje Bezpieczeństwa

- **Hashowanie Haseł** - Wszystkie hasła są bezpiecznie hashowane przy użyciu bcryptjs
- **Zarządzanie Sesjami** - Bezpieczna obsługa sesji z konfigurowalnymi opcjami
- **Walidacja Wejścia** - Walidacja po stronie serwera dla wszystkich danych wejściowych użytkownika
- **Middleware Uwierzytelniania** - Chronione trasy wymagają ważnego uwierzytelnienia
- **Ochrona CSRF** - Żądania oparte na formularzach są chronione
- **Zmienne Środowiskowe** - Wrażliwa konfiguracja przechowywana w zmiennych środowiskowych

## 🛠️ Endpointy API

### Trasy Uwierzytelniania
- `GET /auth/login` - Wyświetl formularz logowania
- `POST /auth/login` - Przetwórz logowanie
- `GET /auth/register` - Wyświetl formularz rejestracji
- `POST /auth/register` - Przetwórz rejestrację
- `POST /auth/logout` - Wyloguj użytkownika
- `POST /auth/toggle-theme` - Przełącz motyw (dostępne bez uwierzytelniania)

### Trasy Zadań (Chronione)
- `GET /tasks` - Wyświetl listę zadań
- `GET /tasks/create` - Wyświetl formularz tworzenia zadania
- `POST /tasks/create` - Utwórz nowe zadanie
- `POST /tasks/:id/toggle` - Przełącz status ukończenia zadania
- `POST /tasks/:id/delete` - Usuń zadanie
- `POST /tasks/toggle-theme` - Przełącz motyw (dla uwierzytelnionych użytkowników)

## 🎯 Rozwój

### Struktura Projektu
\`\`\`
mvc-project/
├── constants/           # Stałe aplikacji
│   ├── navigation.js
│   ├── sortOptions.js
│   ├── statusCode.js
│   └── taskStatus.js
├── controllers/         # Kontrolery MVC
│   ├── authController.js
│   └── taskController.js
├── models/             # Modele MVC
│   ├── Task.js
│   └── User.js
├── public/             # Zasoby statyczne
│   └── css/
│       └── style.css
├── routing/            # Definicje tras
│   ├── authRoutes.js
│   └── taskRoutes.js
├── store/              # Przechowywanie danych
│   ├── data/           # Pliki danych JSON
│   └── dataStore.js
├── utils/              # Funkcje narzędziowe
│   ├── authMiddleware.js
│   └── dateHelpers.js
├── views/              # Szablony EJS
│   ├── auth/
│   │   ├── login.ejs
│   │   └── register.ejs
│   ├── tasks/
│   │   ├── create.ejs
│   │   └── index.ejs
│   └── error.ejs
├── .env                # Zmienne środowiskowe
├── .gitignore
├── config.js           # Konfiguracja aplikacji
├── package.json
├── README.md
└── server.js           # Główny plik aplikacji
\`\`\`

### Styl Kodu
- Funkcje JavaScript ES6+
- Architektura modularna z wyraźnym rozdzieleniem obowiązków
- Spójne konwencje nazewnictwa
- Kompleksowa obsługa błędów
- Responsywny CSS z nowoczesnymi funkcjami

## 🚀 Przyszłe Ulepszenia

- Integracja z bazą danych (MongoDB, PostgreSQL)
- Kategorie i tagi zadań
- Udostępnianie zadań i współpraca
- Powiadomienia e-mail o terminach
- Aplikacja mobilna
- REST API dla integracji z zewnętrznymi systemami
- Szablony zadań i zadania cykliczne
- Załączniki plików do zadań
- Poziomy priorytetów zadań
- Zaawansowane filtrowanie i wyszukiwanie
- Eksport zadań do CSV/PDF
- Statystyki i raporty użytkowników

## 📄 Licencja

Ten projekt jest licencjonowany na licencji GPL-3.0 - zobacz plik LICENSE, aby uzyskać szczegóły.

## 👨‍💻 Autor

Stworzony jako projekt kursowy do nauki tworzenia aplikacji webowych przy użyciu Node.js i architektury MVC.

---

**Uwaga:** Ta aplikacja używa przechowywania danych w pamięci z plikami JSON. Dane są zachowywane między restartami serwera, ale dla zastosowań produkcyjnych zaleca się integrację z odpowiednią bazą danych.
