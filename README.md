# mObywatel „Załatwione” – clickable prototype

A concept for the **mObywatel Challenge**. The app prepares official matters based on life events, shows where every piece of data comes from, and lets you check exactly what will be shared before you confirm.

[Open the prototype](https://yushawnchen.github.io/mobywatel-zalatwione/). No login, installation or permissions are needed in the browser. On a phone, the **Scenariusze** button in the header opens the list of paths. The guide also has a **Zacznij demo od nowa** (restart demo) button. The prototype's interface is in Polish.

Promo video (80 s): https://youtu.be/onUIKGG8pd0

## Demo paths

1. **A baby is born** – enter the name, simulate the other parent's consent, review what the application covers, sign and track its status.
2. **Moving house** – pick a sample address, choose the type of stay, review the recipients and sign.
3. **Letter from the tax office** – compare the original with the plain-language explanation, edit the reply, review the text and three sample invoices, sign and see the delivery confirmation.
4. **Age verification** – share only the fact that you are over 18, simulate a scan and check the access history.
5. **Access history** – view the details, then report a suspicious attempt to use your data.
6. **Lost wallet** – review and confirm cancelling the ID card and freezing the PESEL number.
7. **New ID card** – simulate taking a photo, choose a pickup time and sign.
8. **Buying a used car** – use a sample contract, confirm a simulated payment and see the temporary registration permit in Documents.
9. **Helping a family member** – prepare an application as Anna, switch to Halina and decide whether to send it.
10. **Simple mode** – change the text size and contrast for Halina and use the large buttons.
11. **Assistant** – type e.g. „przeprowadzam się” (I'm moving) and go from the conversation straight to the application. The microphone is optional.

## Technology and data

HTML, CSS and JavaScript with no libraries, API keys or application server. The text assistant answers based on rules. Bielik and PLLuM are candidate models for a future version. Text-to-speech and speech recognition use the Web Speech API and depend on the browser; recognition requires microphone access.

All scenarios use fictional data. Applications, signatures, payments, photos and scans are simulated. The demo state is saved in the current browser. This is an independent concept prototype with no connection to any public administration services.

## Running locally

Open `index.html` in a browser, or run `python3 -m http.server` in the repository folder.
