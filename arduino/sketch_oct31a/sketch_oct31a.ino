#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <HTTPClient.h>

#define SS_PIN 5
#define RST_PIN 17

MFRC522 mfrc522(SS_PIN, RST_PIN);  // Create MFRC522 instance.

const char* ssid = "*******";      // Substitua pelo seu SSID
const char* password = "*******";  // Substitua pela sua senha

const String apiUrlBase = "http://localhost:3002/register/";  // Base URL

unsigned long ledTimer = 0;  // Timer para controlar a duração do LED
int activeLedPin = -1;       // LED atualmente ativo

void setup() {
    Serial.begin(9600);  // Inicia a serial
    SPI.begin();         // Inicia SPI bus
    mfrc522.PCD_Init();  // Inicia MFRC522
    Serial.println("Aproxime o seu cartão do leitor...");
    Serial.println();

    pinMode(21, OUTPUT);  // LED verde
    pinMode(22, OUTPUT);  // LED vermelho

    connectToWiFi();
}

void loop() {
    if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) {
        handleLedTiming();
        return;
    }

    String uid = readCardUID();
    handleCard(uid);
    handleLedTiming();  // Continua verificando o timer do LED
}

void connectToWiFi() {
    Serial.println("Tentando entrar no Wi-Fi");
    WiFi.begin(ssid, password);
    
    while (WiFi.status() != WL_CONNECTED) {
        Serial.print(".");
        delay(500);
    }
    
    Serial.println("\nEntrou no Wi-Fi");
    Serial.println("IP: " + WiFi.localIP().toString());
}

String readCardUID() {
    String uid = "";
    for (byte i = 0; i < mfrc522.uid.size; i++) {
        uid += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "") + String(mfrc522.uid.uidByte[i], HEX);
    }
    uid.toUpperCase();
    return uid;
}

void handleCard(const String& uid) {
    Serial.println("UID da tag: " + uid);
    sendHttpRequest(uid);
}

void sendHttpRequest(const String& uid) {
    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("Wi-Fi desconectado.");
        activateLed(22);  // Acende LED vermelho
        return;
    }

    HTTPClient client;
    String fullUrl = apiUrlBase + uid;
    client.begin(fullUrl);

    int httpCode = client.GET();

    if (httpCode > 0) {
        Serial.println("\nStatusCode: " + String(httpCode));
        String payload = client.getString();
        Serial.println("Resposta: " + payload);

        if (httpCode == 200) {
            activateLed(21);  // Acende LED verde
        } else {
            activateLed(22);  // Acende LED vermelho
        }
    } else {
        Serial.println("Erro na requisição: " + String(httpCode));
        activateLed(22);  // Acende LED vermelho em caso de erro
    }
    
    client.end();
}

void activateLed(int pin) {
    if (activeLedPin != -1) {
        digitalWrite(activeLedPin, LOW);  // Garante que nenhum LED anterior fique ligado
    }

    activeLedPin = pin;
    digitalWrite(activeLedPin, HIGH);
    ledTimer = millis();  // Inicia o temporizador
}

void handleLedTiming() {
    if (activeLedPin != -1 && millis() - ledTimer >= 3000) {  // Verifica se o tempo do LED ativo expirou
        digitalWrite(activeLedPin, LOW);  // Desliga o LED
        activeLedPin = -1;  // Reseta o LED ativo
    }
}
