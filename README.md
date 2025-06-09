# System Zarządzania Zadaniami Domowymi

Internetowy system zarządzania zadaniami domowymi zbudowany w Node.js, Express.js i EJS z wykorzystaniem wzorca architektonicznego MVC i SSR.

## Opis Projektu

Ta aplikacja pomaga użytkownikom efektywnie zarządzać zadaniami domowymi poprzez:

- Tworzenie zadań z terminami wykonania  
- Śledzenie statusu zadań (oczekujące, ukończone, przeterminowane)  
- Wizualne wyróżnianie przeterminowanych zadań  
- Sortowanie zadań według różnych kryteriów  
- Uwierzytelnianie użytkowników i zarządzanie sesjami  
- Tryb ciemny/jasny z przełączaniem motywów  

### Zarządzanie Użytkownikami

- **Rejestracja Użytkowników** - Tworzenie nowych kont z bezpiecznym hashowaniem haseł  
- **Uwierzytelnianie** - Bezpieczna funkcjonalność logowania/wylogowywania  
- **Zarządzanie Sesjami** - Utrzymywanie sesji użytkowników między żądaniami  
- **Bezpieczeństwo Haseł** - Hasła są hashowane przy użyciu bcryptjs  

### Zarządzanie Zadaniami

- **Dodawanie Zadań** - Tworzenie nowych zadań z tytułem, opisem i terminem wykonania  
- **Oznaczanie jako Ukończone** - Przełączanie statusu ukończenia zadania  
- **Usuwanie Zadań** - Trwałe usuwanie zadań  
- **Automatyczne Wykrywanie Przeterminowanych** - Zadania po terminie są automatycznie oznaczane jako przeterminowane  
- **Wyszukiwanie Zadań** - Wyszukiwanie zadań po tytule i opisie  
- **Sortowanie Zadań według:**
  - Daty  
  - Statusu  
  - Tytułu  

## Instalacja i Konfiguracja

1. **Sklonuj repozytorium:**
   ```bash
   git clone https://github.com/m0isey-k/mvc-project.git
   cd mvc-project
   ```

2. **Zainstaluj zależności:**
   ```bash
   npm install
   ```

3. **Skonfiguruj zmienne środowiskowe:**
   Utwórz plik `.env` w katalogu głównym:
   ```env
   PORT=3000
   SESSION_SECRET=your-secret-key
   NODE_ENV=development
   ```

4. **Uruchom aplikację:**
   ```bash
   npm start
   ```

5. **Uzyskaj dostęp do aplikacji:**
   Otwórz przeglądarkę i przejdź do `http://localhost:3000`

## Zależności

### Główne Zależności

- **express** (^4.18.2) - Framework webowy dla Node.js  
- **ejs** (^3.1.9) - Silnik szablonów Embedded JavaScript  
- **bcryptjs** (^2.4.3) - Biblioteka do hashowania haseł  
- **express-session** (^1.17.3) - Middleware sesji dla Express  
- **body-parser** (^1.20.2) - Parsowanie przychodzących treści żądań  
- **dotenv** (^16.3.1) - Zarządzanie zmiennymi środowiskowymi  

## Przykładowe Dane

Aplikacja zawiera przykładowe dane do testowania:

### Testowe Konto Użytkownika

- **Email:** admin@example.com  
- **Hasło:** password

## Struktura Projektu

```
mvc-project/
├── constants/           
│   ├── navigation.js
│   ├── sortOptions.js
│   ├── statusCode.js
│   └── taskStatus.js
├── controllers/        
│   ├── authController.js
│   └── taskController.js
├── models/             
│   ├── Task.js
│   └── User.js
├── public/             
│   └── css/
│       └── style.css
├── routing/            
│   ├── authRoutes.js
│   └── taskRoutes.js
├── store/              
│   ├── data/          
│   └── dataStore.js
├── utils/             
│   ├── authMiddleware.js
│   └── dateHelpers.js
├── views/             
│   ├── auth/
│   │   ├── login.ejs
│   │   └── register.ejs
│   ├── tasks/
│   │   ├── create.ejs
│   │   └── index.ejs
│   └── error.ejs
├── .env                
├── .gitignore
├── config.js           
├── package.json
├── README.md
└── server.js           
```
