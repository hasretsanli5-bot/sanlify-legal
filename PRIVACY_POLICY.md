# Datenschutzerklärung für die App „Sanlify"

**Stand: 18.05.2026**

Mit dieser Datenschutzerklärung informieren wir Sie als Nutzer der mobilen
Anwendung **Sanlify** (im Folgenden „App") über die Verarbeitung
personenbezogener Daten im Sinne von Art. 4 Nr. 1 DSGVO. Die Erklärung
erfüllt die Informationspflichten nach Art. 13 und 14 DSGVO sowie
ergänzende Vorgaben des Bundesdatenschutzgesetzes (BDSG) und des
Telekommunikation-Digitale-Dienste-Datenschutz-Gesetzes (TDDDG).

---

## 1. Verantwortlicher

Verantwortlicher im Sinne von Art. 4 Nr. 7 DSGVO:

```
Hasret Gültekin Sanli
Westendweg 4
86845 Großaitingen
Deutschland

E-Mail: hasretsanli5@gmail.com
```

Für sämtliche Anfragen zu dieser Datenschutzerklärung, zur Ausübung
Ihrer Betroffenenrechte (Ziffer 8) oder zur Geltendmachung eines
Widerrufs einer Einwilligung wenden Sie sich bitte an die vorstehend
genannte E-Mail-Adresse.

---

## 2. Übersicht der Datenverarbeitung in der App

Sanlify ist konsequent darauf ausgelegt, möglichst wenige Daten zu
verarbeiten („Privacy by Default", Art. 25 DSGVO). Die App speichert
sämtliche von ihr erhobenen Inhalte **ausschließlich lokal auf dem Gerät
des Nutzers**. Eine Übertragung dieser Inhalte an Server des Anbieters,
an Cloud-Speicher oder an sonstige Empfänger findet **zu keinem Zeitpunkt**
statt. Die App nutzt zur Finanzierung Werbeanzeigen über die Plattform
Google AdMob (Ziffer 5); insoweit findet eine Datenverarbeitung durch
Google statt.

---

## 3. Lokale Datenverarbeitung auf dem Gerät

### 3.1 Zweck

Sanlify nutzt den Android-Benachrichtigungszugriff
(`BIND_NOTIFICATION_LISTENER_SERVICE`), um eingehende Textnachrichten
des Messengers WhatsApp mitzuschneiden. Ziel ist, dass Nutzer den
Inhalt einer Nachricht auch dann noch einsehen können, wenn der Absender
die Nachricht später für alle Beteiligten löscht.

### 3.2 Verarbeitete Daten

Die App speichert in der lokalen Android-Sandbox
(`/data/data/com.sanlify.app/databases/`) die folgenden Daten:

- **Absender** der Benachrichtigung (in der Regel ein in WhatsApp
  hinterlegter Kontaktname oder eine Telefonnummer)
- **Textinhalt** der Benachrichtigung (Textnachrichten)
- **Zeitstempel** des Empfangs
- **Lösch-Status** und ggf. Zeitstempel der Lösch-Erkennung

**Nicht verarbeitet werden**: Bilder, Videos, Audionachrichten, Dokumente,
Standortinformationen, Anrufdaten oder andere Mediendaten. Status-
und System-Benachrichtigungen werden algorithmisch herausgefiltert und
verworfen.

### 3.3 Notification Listener — Hinweis zum technischen Berechtigungsumfang

Die Berechtigung `BIND_NOTIFICATION_LISTENER_SERVICE` erlaubt
technisch das Lesen **aller** Benachrichtigungen auf dem Gerät. Sanlify
verwertet jedoch ausschließlich Benachrichtigungen der Pakete
`com.whatsapp` und `com.whatsapp.w4b` (WhatsApp Business). Alle anderen
Benachrichtigungen werden vom Code geprüft und sofort verworfen, ohne
in der Datenbank gespeichert zu werden.

### 3.4 Speicherort und Schutz

Die Daten verbleiben in der Android-App-Sandbox des Geräts. Der Zugriff
durch andere Apps ist durch das Android-Betriebssystem unterbunden
(Sandbox-Isolation). Auf modernen Android-Geräten mit aktivem Bildschirm-
Sperrmechanismus sind die Daten zusätzlich durch die File-Based
Encryption des Betriebssystems (Android 7+, Standard ab Android 10) bei
gesperrtem Gerät geschützt.

**Hinweis:** Auf gerooteten Geräten oder bei Verwendung von Forensik-
Werkzeugen kann die Sandbox-Isolation umgangen werden. Eine zusätzliche
applikationsseitige Verschlüsselung der lokalen Datenbank findet
derzeit nicht statt.

Eine Übertragung an externe Server oder Cloud-Dienste findet nicht
statt. Sanlify nutzt die `INTERNET`-Berechtigung ausschließlich für
Werbung und das UMP-Consent-Management (Ziffer 5).

### 3.5 Rechtsgrundlage

Die Verarbeitung erfolgt aufgrund Ihrer ausdrücklichen Einwilligung,
die Sie aktiv über die System-Einstellung „Zugriff auf Benachrichtigungen"
des Android-Betriebssystems erteilen müssen
(Art. 6 Abs. 1 lit. a DSGVO). Ohne diese Einwilligung verarbeitet
Sanlify keine Benachrichtigungs-Inhalte. Sie können die Einwilligung
jederzeit über dieselbe System-Einstellung widerrufen.

### 3.6 Speicherdauer

Die Speicherdauer bestimmen Sie selbst in den App-Einstellungen
(Aufbewahrungsdauer: 7 / 30 / 90 Tage oder unbegrenzt; Standard: 30 Tage).
Ein nächtlicher Hintergrund-Prozess (WorkManager-Job, täglich gegen
03:00 Uhr lokaler Zeit) löscht abgelaufene Einträge.

Sie können sämtliche gespeicherten Inhalte zudem jederzeit manuell
löschen — entweder einzeln, vollständig über die App-Einstellung „Alle
Nachrichten löschen" oder durch Deinstallation der App. Die
Android-Sandbox stellt sicher, dass alle Daten beim Deinstallieren
restlos entfernt werden.

### 3.7 Angeforderte App-Berechtigungen im Überblick

Sanlify fordert die folgenden Android-Berechtigungen an und nutzt sie
ausschließlich für die jeweils angegebenen Zwecke:

| Berechtigung | Zweck |
|---|---|
| `BIND_NOTIFICATION_LISTENER_SERVICE` (System-Schalter) | Mitschneiden der WhatsApp-Benachrichtigungen — siehe Ziffer 3.1–3.3 |
| `INTERNET`, `ACCESS_NETWORK_STATE` | Werbung und UMP-Consent (Ziffer 5). Wird ausschließlich für die Kommunikation mit Google-Servern verwendet — niemals für die Übertragung mitgeschnittener Inhalte |
| `POST_NOTIFICATIONS` (Runtime-Permission, Android 13+) | Eigene Hinweis-Benachrichtigung „Gelöschte Nachricht von …" — enthält den Absender-Namen, jedoch keinen Inhaltstext |
| `REQUEST_IGNORE_BATTERY_OPTIMIZATIONS` | Akku-Optimierung deaktivieren, damit der Notification-Listener nicht vom System gestoppt wird. Wird optional erteilt; keine Datenverarbeitung |
| `RECEIVE_BOOT_COMPLETED` | WorkManager-Cleanup-Job nach Neustart des Geräts wieder einplanen. Keine Datenverarbeitung |

Sanlify fordert **keine** weiteren sensiblen Berechtigungen wie Standort,
Kamera, Mikrofon, Kontakte, SMS, Telefon, Speicher oder ähnliches an.

---

## 4. Hinweis zur Nutzung in einem privaten Kontext

Mit Sanlify werden Inhalte erfasst, die Dritte (typischerweise
Kontaktpersonen des Nutzers in WhatsApp) Ihnen zugesandt haben. Soweit
Sie Sanlify ausschließlich für **persönliche oder familiäre Zwecke**
nutzen, gilt für diese Verarbeitung das sogenannte Haushaltsprivileg
nach Art. 2 Abs. 2 lit. c DSGVO — die DSGVO findet auf diese
Verarbeitung keine Anwendung.

Bei einer beruflichen, gewerblichen oder anderweitig **nicht-privaten**
Nutzung sind Sie hingegen selbst datenschutzrechtlich Verantwortlicher
für die Inhalte und unterliegen den Pflichten der DSGVO gegenüber den
betroffenen Personen. Insbesondere müssen Sie in diesem Fall selbst
für eine Rechtsgrundlage sorgen und Betroffenenrechte erfüllen können.
Der Anbieter dieser App ist hierfür **nicht** Verantwortlicher.

---

## 5. Werbung — Google AdMob (Google Ireland Limited)

### 5.1 Anbieter

Zur Finanzierung der kostenfreien Bereitstellung der App nutzt Sanlify
das Werbenetzwerk **Google AdMob** der

```
Google Ireland Limited
Gordon House, Barrow Street
Dublin 4, Irland
```

Datenschutzerklärung von Google: <https://policies.google.com/privacy>
AdMob-Datenschutz: <https://support.google.com/admob/answer/6128543>

### 5.2 Verarbeitete Daten

Bei der Auslieferung von Werbeanzeigen verarbeitet Google Ireland
Limited als eigenständig Verantwortlicher (Art. 4 Nr. 7 DSGVO)
insbesondere folgende Daten:

- **Werbe-ID** (Android Advertising ID, AAID) Ihres Geräts. Sie können
  diese ID jederzeit in den Android-System­einstellungen zurücksetzen
  oder vollständig deaktivieren (Einstellungen → Datenschutz →
  Werbung → „Werbe-ID zurücksetzen" / „Personalisierte Werbung
  ausschalten").
- **IP-Adresse** (wird zur Region-Bestimmung und Betrugserkennung verarbeitet,
  von Google in der Regel gekürzt)
- **Geräteinformationen** (Hersteller, Modell, Betriebssystem-Version,
  Sprache, Spracheinstellung, grobe Region)
- **Anzeigen-Interaktionsdaten** (Impressionen, Klicks, Sitzungs-IDs)
- **App-Identifikator** (Paketname `com.sanlify.app`)

Google kann diese Daten mit eigenen Cookies / lokalen Identifiern
verknüpfen, soweit der Nutzer zugestimmt hat. Sanlify selbst erhält
**keine** dieser personenbezogenen Daten zurück und kann den Nutzer
nicht identifizieren.

### 5.3 Einwilligungs­management (UMP / Consent)

Vor der ersten Auslieferung von Werbung holt Sanlify Ihre Einwilligung
über die **Google User Messaging Platform (UMP)** ein (Consent
Management Platform gemäß IAB TCF v2.2). In diesem Dialog können Sie:

- Einer **personalisierten Werbung** zustimmen (umfasst Profilbildung,
  Frequency-Capping, Werbung auf Basis von Werbe-ID-Profilen),
- Personalisierung **ablehnen** (in diesem Fall werden ausschließlich
  nicht-personalisierte Anzeigen ausgeliefert; eine eingeschränkte
  Verarbeitung technisch notwendiger Daten — IP, Geräteinfos — findet
  trotzdem statt, weil sie für jede Form von Werbung unerlässlich ist).

Sie können Ihre Entscheidung jederzeit ändern über
**Einstellungen → Werbe-Einwilligung verwalten** in der App.

### 5.4 Rechtsgrundlage

- Personalisierte Werbung und Verarbeitung von Endgeräte-Informationen
  im Sinne von § 25 Abs. 1 TDDDG: ausdrückliche Einwilligung
  (Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1 TDDDG).
- Nicht-personalisierte Werbung: berechtigtes Interesse (Art. 6 Abs. 1
  lit. f DSGVO — wirtschaftliche Bereitstellung der App) sowie
  unbedingt erforderliche Verarbeitung (§ 25 Abs. 2 Nr. 2 TDDDG).

### 5.5 Datenübermittlung in Drittländer (USA)

Google überträgt Daten an die USA und weitere Konzerngesellschaften.
Die Übermittlung erfolgt auf Grundlage des EU-US Data Privacy Framework
(Angemessenheitsbeschluss der EU-Kommission vom 10. Juli 2023). Google
LLC ist unter dem DPF zertifiziert; eine aktuelle Bestätigung finden Sie
unter <https://www.dataprivacyframework.gov/list>.

Sollte die DPF-Zertifizierung wegfallen, gelten ergänzend die EU-
Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO) zwischen Google
Ireland Limited und Google LLC.

---

## 6. Keine sonstige Datenerhebung durch den Anbieter

Sanlify enthält **kein** App-Analyse-SDK (z. B. Firebase Analytics,
Mixpanel), **kein** Crash-Reporting (z. B. Firebase Crashlytics,
Sentry), **kein** Push-Notification-SDK und **keinen** Funnel-Tracker.
Der Anbieter erhält keinerlei Nutzungsdaten, Crash-Reports oder
Telemetrie.

Sanlify legt keine Nutzerkonten an und benötigt für die Verwendung
keine Registrierung.

---

## 7. Daten­sicherheit und Schutzmaßnahmen

- Lokale Daten leben in der von Android bereitgestellten App-Sandbox.
  Andere Apps haben darauf keinen Zugriff.
- Sanlify hat `android:allowBackup="false"` gesetzt — automatische
  Cloud-Backups Ihrer App-Daten (z. B. nach Google Drive) sind
  ausgeschlossen.
- Die App verlangt keine Berechtigungen, die über das technisch
  Notwendige hinausgehen.

Bitte beachten Sie, dass Sicherheit auf dem Endgerät auch durch das
Verhalten des Nutzers bedingt ist (Bildschirmsperre setzen, gerootete
Geräte sind kein sicherer Speicher, gemeinsam genutzte Geräte machen
Inhalte allen Nutzern zugänglich).

---

## 8. Ihre Rechte als betroffene Person

Sie haben gegenüber dem Verantwortlichen (Ziffer 1) hinsichtlich der
Sie betreffenden personenbezogenen Daten folgende Rechte:

| Recht | Norm |
|---|---|
| Auskunft | Art. 15 DSGVO |
| Berichtigung | Art. 16 DSGVO |
| Löschung („Recht auf Vergessenwerden") | Art. 17 DSGVO |
| Einschränkung der Verarbeitung | Art. 18 DSGVO |
| Datenübertragbarkeit | Art. 20 DSGVO |
| Widerspruch | Art. 21 DSGVO |
| Widerruf einer Einwilligung mit Wirkung für die Zukunft | Art. 7 Abs. 3 DSGVO |

**Hinweis zur praktischen Umsetzung:** Da der Anbieter selbst keinerlei
personenbezogene Daten erhält oder speichert (Ziffer 6), liegen
Auskunfts- und Löschungsanfragen nur in der lokalen App-Datenbank vor —
und damit ausschließlich in Ihrem Zugriffsbereich. Sie können diese
Daten jederzeit selbst über die App-Einstellungen einsehen, exportieren
(JSON/CSV) und löschen.

Für Daten, die Google im Rahmen von AdMob verarbeitet, wenden Sie sich
bitte unmittelbar an Google (Datenschutzerklärung in Ziffer 5).

---

## 9. Beschwerderecht bei der Aufsichtsbehörde

Unbeschadet eines anderweitigen Rechtsbehelfs steht Ihnen das Recht zu,
Beschwerde bei einer Datenschutz-Aufsichtsbehörde einzulegen
(Art. 77 DSGVO), insbesondere in dem EU-Mitgliedstaat Ihres
Aufenthaltsorts oder des Orts des mutmaßlichen Verstoßes.

Eine Übersicht der zuständigen deutschen Aufsichtsbehörden:
<https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html>

---

## 10. Minderjährige

Die App richtet sich nicht gezielt an Kinder unter 16 Jahren. Sofern
Sie das 16. Lebensjahr noch nicht vollendet haben, dürfen Sie die für
die Werbeanzeige notwendige Einwilligung (Ziffer 5.3) nur mit Zustimmung
des/der Erziehungsberechtigten erteilen (Art. 8 DSGVO).

---

## 11. Änderungen dieser Datenschutzerklärung

Wir behalten uns vor, diese Datenschutzerklärung anzupassen, sofern
sich Rechtsvorschriften, Funktionalitäten der App oder eingesetzte
Drittdienste ändern. Die jeweils aktuelle Fassung ist in der App über
**Einstellungen → Datenschutzerklärung** abrufbar.

---

*Diese Datenschutzerklärung wurde zuletzt am 18.05.2026 aktualisiert.*
