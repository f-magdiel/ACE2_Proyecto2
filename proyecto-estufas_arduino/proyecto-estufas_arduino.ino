
// Incluimos librería
#include <DHT.h>
#include <SoftwareSerial.h>   // Incluimos la librería  SoftwareSerial  
SoftwareSerial mySerial(10,11); 
int chispa = 0;
int gas = 0;
int aux = 0;

String dato;
char bltchispa; 
// Definimos el pin digital donde se conecta el sensor
#define DHTPIN 2
// Dependiendo del tipo de sensor
#define DHTTYPE DHT11
 
// Inicializamos el sensor DHT11
DHT dht(DHTPIN, DHTTYPE);
int valorCO2;  //Define la variable Valor que almacenará un número entero

int led_1 = 22;
int led_2 = 23;

void setup()  
{
  Serial.begin(9600);
  mySerial.begin(38400); 
  dht.begin();
  pinMode(led_1,OUTPUT);
  pinMode(led_2,OUTPUT);
  digitalWrite(led_1,LOW);
}

void loop() 
{

  if(aux == 1){
      delay(500);
      chispa = 0;
     }
    
  if (mySerial.available()){
    bltchispa = mySerial.read();
    if(bltchispa == 'A'){
      gas = 1;
    }else if(bltchispa == 'B'){
      gas = 0;
    }else if(bltchispa == 'C'){
      
     chispa =1 ;
     aux = 1;
      
      // chispa = 0
    }

  }


  
 
  
  // Esperamos 5 segundos entre medidas
  delay(1000);
 
  // Leemos la humedad relativa
  float h = dht.readHumidity();
  // Leemos la temperatura en grados centígrados (por defecto)
  float t = dht.readTemperature();
  // Leemos la temperatura en grados Fahrenheit
  float f = dht.readTemperature(true);
 
  // Comprobamos si ha habido algún error en la lectura
  if (isnan(h) || isnan(t) || isnan(f)) {
    //Serial.println("Error obteniendo los datos del sensor DHT11");
    return;
  }
 
  // Calcular el índice de calor en Fahrenheit
  float hif = dht.computeHeatIndex(f, h);
  // Calcular el índice de calor en grados centígrados
  float hic = dht.computeHeatIndex(t, h, false);
  valorCO2 = analogRead(A0); // lee el valor que llega por la entrada A0 y lo asigna a la variable valorCO2
  
  delay(500);     //Espera medio segundo (500 ms) y vuelve a hacer el ciclo
  
  Serial.print("{");
  Serial.print("\"Metano\":");
  Serial.print(valorCO2);  // imprime el valor de valorCO2 en la consola serial
  Serial.print(",");
  //Serial.print(" *C ");
  Serial.print("\"Temperatura\":");
  Serial.print(t);
  Serial.print(",");
  Serial.print("\"Gas\":");
  Serial.print(gas);  // imprime el valor de valorCO2 en la consola serial
  Serial.print(",");
  Serial.print("\"GeneradorChispa\":");
  Serial.print(chispa);  
  Serial.print(",");
  Serial.print("\"Tiempo\":");
  Serial.print(0);
  Serial.print(",");
  Serial.print("\"Fecha\":");
  Serial.print("\"\"");
  
    
  Serial.println("}");

  
  
  //Serial.print(f);
  

}

void encenderchispa(){
  
  }
