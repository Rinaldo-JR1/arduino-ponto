#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <HTTPClient.h>
// #include <ArduinoJson.h>

#define SS_PIN 5
#define RST_PIN 17

MFRC522 mfrc522(SS_PIN, RST_PIN);  // Create MFRC522 instance.

// const char* ssid = "********";
// const char* password = "*******";
// const char* apiUrl = "******";  // API URL
const String validUID = "D1 06 2E 02";  // UID do cartão válido

void setup() {
    Serial.begin(9600);  // Inicia a serial
    SPI.begin();         // Inicia SPI bus
    mfrc522.PCD_Init();  // Inicia MFRC522
    Serial.println("Aproxime o seu cartão do leitor...");
    Serial.println();

    pinMode(21, OUTPUT);
    pinMode(22, OUTPUT);

    // connectToWiFi();
}

void loop() {
    if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) {
        return;
    }

    String uid = readCardUID();
    handleCard(uid);
}

// void connectToWiFi() {
//     Serial.println("Tentando entrar no Wi-Fi");
//     WiFi.begin(ssid, password);
    
//     while (WiFi.status() != WL_CONNECTED) {
//         Serial.print(".");
//         delay(500);
//     }
    
//     Serial.println("\nEntrou no Wi-Fi");
//     Serial.println("IP: " + WiFi.localIP().toString());
// }

String readCardUID() {
    String uid = "";
    for (byte i = 0; i < mfrc522.uid.size; i++) {
        uid += String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ") + String(mfrc522.uid.uidByte[i], HEX);
    }
    uid.toUpperCase();
    return uid;
}

void handleCard(const String& uid) {
    Serial.print("UID da tag: " + uid);
    
    if (uid == validUID) {
        Serial.println("Bem-vindo!");
        activateRelay(21);
        // sendHttpRequest();
    } else {
        Serial.println("Tag não cadastrada!");
        activateRelay(22);
    }
}

void activateRelay(int pin) {
    digitalWrite(pin, HIGH);  // ativa relé
    delay(3000);              // espera 3 segundos
    digitalWrite(pin, LOW);   // desativa relé
}

// void sendHttpRequest() {
//     if (WiFi.status() != WL_CONNECTED) {
//         Serial.println("Wi-Fi desconectado.");
//         return;
//     }

//     HTTPClient client;
//     client.begin(apiUrl);
//     int httpCode = client.GET();

//     if (httpCode > 0) {
//         String payload = client.getString();
//         Serial.println("\nStatusCode: " + String(httpCode));
//         Serial.println(payload);
//     } else {
//         Serial.println("Erro na requisição: " + String(httpCode));
//     }
    
//     client.end();
// }
