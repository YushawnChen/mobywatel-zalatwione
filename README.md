# mObywatel „Załatwione” – klikalny prototyp

Koncepcja na **mObywatel Challenge**. Aplikacja przygotowuje sprawy na podstawie zdarzeń życiowych, pokazuje źródła danych i pozwala sprawdzić, co zostanie przekazane, przed potwierdzeniem.

[Otwórz prototyp](https://yushawnchen.github.io/mobywatel-zalatwione/). W przeglądarce nie trzeba się logować, niczego instalować ani nadawać uprawnień. Na telefonie listę ścieżek otwiera przycisk **Scenariusze** w nagłówku. W przewodniku jest też przycisk **Zacznij demo od nowa**.

## Ścieżki demonstracyjne

1. **Urodziło się dziecko** – wpisz imię, zasymuluj zgodę drugiego rodzica, sprawdź zakres wniosku, podpisz i śledź status.
2. **Przeprowadzka** – wybierz przykładowy adres, określ typ pobytu, sprawdź odbiorców i podpisz.
3. **Pismo z urzędu skarbowego** – porównaj oryginał z objaśnieniem, zmień odpowiedź, sprawdź treść i trzy przykładowe faktury, podpisz i zobacz potwierdzenie doręczenia.
4. **Potwierdzenie wieku** – udostępnij tylko informację o pełnoletności, zasymuluj skan i sprawdź historię dostępu.
5. **Historia dostępu** – sprawdź szczegóły, a następnie zgłoś podejrzaną próbę użycia danych.
6. **Zgubiony portfel** – sprawdź i potwierdź unieważnienie dowodu oraz zastrzeżenie PESEL.
7. **Nowy dowód** – zasymuluj zrobienie zdjęcia, wybierz godzinę odbioru i podpisz.
8. **Kupno używanego auta** – użyj przykładowej umowy, potwierdź symulowaną opłatę i zobacz pozwolenie czasowe w Dokumentach.
9. **Pomoc bliskiej osoby** – przygotuj wniosek jako Anna, przełącz się na Halinę i zdecyduj o jego wysłaniu.
10. **Tryb prosty** – zmień wielkość tekstu i kontrast u Haliny i skorzystaj z dużych przycisków.
11. **Asystent** – wpisz np. „przeprowadzam się” i przejdź z rozmowy do wniosku. Mikrofon jest opcjonalny.

## Technologia i dane

HTML, CSS i JavaScript bez bibliotek, kluczy API i serwera aplikacji. Asystent tekstowy odpowiada na podstawie reguł. Bielik i PLLuM to potencjalne modele dla przyszłej wersji. Odczyt i rozpoznawanie mowy korzystają z Web Speech API i zależą od przeglądarki, a rozpoznawanie wymaga dostępu do mikrofonu.

Wszystkie scenariusze używają fikcyjnych danych. Wnioski, podpisy, płatności, zdjęcia i skanowanie są symulowane. Stan demonstracji jest zapisywany w bieżącej przeglądarce. Używaj danych testowych. Jest to niezależny prototyp koncepcyjny, bez połączenia z usługami administracji publicznej.

## Uruchomienie lokalnie

Otwórz `index.html` w przeglądarce lub uruchom `python3 -m http.server` w katalogu repozytorium.
