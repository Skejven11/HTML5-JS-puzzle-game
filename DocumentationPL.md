# Box Quest

#### autor strony, gry i niektórych grafik: [Bartosz Zysk](https://github.com/Skejven11)
#### autor muzyki: [Midori Mizuno](https://www.youtube.com/watch?v=GFXiMfDyexQ&ab_channel=MidoriMizuno)
#### autor większości grafik gry: [0x72](https://0x72.itch.io/dungeontileset-ii)

## 1. Wstęp
Box Quest to gra logiczna napisana na przeglądarki internetowe przy pomocy technologii HTML5, CSS3 oraz Javascript.  
Głównym celem gry jest wepchnięcie wszystkich skrzyń na mapie w odpowiednie miejsce tak, aby zostało wykonanych jak najmniej ruchów.   
Gracz porusza się po mapie złożonej z płytek i musi wytężyć  umysł oraz wykazać się kreatywnością by uzyskać jak najwyższy wynik.  
Do dyspozycji ma jednak specjalne przedmioty które pomogą w osiągnięciu celu.
W grę można zagrać **[tutaj](https://box-quest.glitch.me/)**.

## 2. Demo
###### Pokaz rozgrywki
<img src="https://s6.gifyu.com/images/demo1.gif" width="1000" height="600">

###### Koniec ostatniego poziomu
<img src="https://s6.gifyu.com/images/demo3efb813325a567018.gif" width="1000" height="600">


## 3. Użyte technologie

### 3.1. Javascript
Javascript to skryptowy język programowania, w którym funkcje są obiektami, które można przechowywać w zmiennych jako referencje i przekazywać jak każde inne obiekty. [1]  
Javascript tworzy większość linijek kodu gry Box Quest. Używany jest do wszystkiego związanego z logiką, od stanu całej gry aż po wartość wyniku i miejsce na mapie w którym znajduje się gracz.

### 3.2. HTML5
HTML5 (Hypertext Markup Language 5) to język używany do tworzenia struktury strony oraz jej zawartości opracowana przez grupy WHATWG oraz W3C. Jest to kolejna werjsa standardu języka HTML która wprowadza wiele nowych elementów i przyczynia się do lepszej obsługi błędów względem wcześniejszych standardów (HTML4). [2]  
HTML5 używany jest do tworzenia całej strony projektu, a element **canvas** wprowadzony w HTML5 jest kluczową technologią używaną do renderowania gry Box Quest.

### 3.3. CSS3
CSS3 to specyfikacja języka CSS (Cascading Style Sheets) który służy do opisywania warstwy prezentacji dokumentów napisanych w HTML. CSS opisuje jak elementy powinny być prezentowane na ekranie, przy wydruku lub innych mediach. [3]  
CSS używany jest w tym projekcie do całej warstwy wizualnej poza samą grą. Od tytułu oraz menu po bokach elementu canvas po animacje menu gry.

### 3.4. Visual Studio Code
Visual Studio Code to darmowy edytor kodu źródłowego stworzony przez Microsoft. Jest to najpopularniejsze narzędzie służące wytwarzaniu oprogramowania. [4]  
Wybrałem VSCode jako mój domyślny edytor kodu ponieważ jest to oprogramowanie z którym mam już doświadczenie, jest bardzo szybkie w obsłudze oraz wspiera wszystkie języki użyte do stworzenia gry Box Quest.

## 4. Szczegółowe omówienie elementów gry Box Quest

### 4.1. Główna pętla gry i plik main.js
W pliku main.js zawarte są inicjalizacje wszystkich interaktywnych elementów oraz potrzebnych zmiennych strony takich jak:
- przyciski menu
- muzyka oraz "slider" zarządzający jej głośnością
- pobranie odpowiednich wartości z Local Storage (np. ostatniego poziomu na którym gracz się znajdował)
- inicjalizacja odpowiednich klas takich jak klasa gracza, mapy oraz obiektu odpowiadającego za obsługę wciskanych przycisków przez gracza

#### Game Loop
Pętla gry (game loop) to główna pętla odpowiadająca za ciągły "ruch" gry, odświeżanie animacji, sprawdzanie co chwilę czy gracz nie podejmuje pewniej akcji etc.
```javascript
function gameLoop() {
    ctx.clearRect(0,0,400,400);
    level.drawMap(ctx);
    player.draw();
    level.drawColumns(ctx);
    if (gameState.state===1) nextLevelMenu();
    else if (gameState.state===3) endingScreen();
    else requestAnimationFrame(gameLoop);
}
```
W Box Quest, pętla gry odpowiada za odświeżanie i rysowanie co każdą klatkę mapy, gracza i jego animacji, osobno kolumn (ponieważ muszą być na pierwszym planie) oraz za sprawdzanie stanu gry tak, aby w odpowiednim czasie móc wyświetlić menu, zakończyć bądź wznowić grę.

### 4.2. Obiekt gracza i plik player.js
Plik player.js jest największym plikiem kodu w grze zawierając 223 linie. W pliku tym opisana jest klasa player z wieloma zmiennymi i różnymi metodami. Główne metody tej klasy odpowiadają za poruszanie się. 

###### Poruszanie się gracza
<img src="https://s6.gifyu.com/images/movedb140f341d00ab74.gif" width="400" height="400">

```javascript
moveLeft(){
        if (this.calcColision("l")) return; 
        else this.x -= this.speed; //if there is nothing in the way move the player
        this.drawSmoke();
        this.calcScore();
    }
```
Tak jak w pokazanej przykładowej metodzie, sama metoda poruszania się jest bardzo prosta. Jednak wywołuje ona metodę calcCollision() która jest już o wiele bardziej skomplikowanym kawałkiem kodu.
  
  
```javascript
calcColision(dir){ //calculates if something is in a way and does stuff
        if (dir==="r") {
            var x = (this.x+this.speed)/this.speed;
            var y = this.y/this.speed;
        }
        else if (dir==="u") {
            var x = this.x/this.speed;
            var y = (this.y-this.speed)/this.speed;
        }
```
Na początku metody sprawdza ona w jaki kierunek gracz się udał i kalkuluje miejsce w którym **może** się znaleźć.
  
  
```javascript
if (this.level.finish.x===x&&this.level.finish.y===y) { document.getElementById('error').play(); return true; }

        this.level.items.forEach(function (item, index) { //checks if there is an item in the way, if so pick it up
                if (x===item.x&&y===item.y) { 
                    if(this.item) this.level.items.push(this.item)
                    this.item=item; 
                    this.level.items.splice(index, 1);
                    this.itemView(item);
                }
        }.bind(this));
```
Następnie sprawdza, czy miejscem w które gracz chce się udać nie jest "końcem" poziomu, jeżeli jest to kolizja zwraca wartość prawda, czyli gracz nie poruszy się w tę stronę. Metoda dalej sprawdza, czy w tym miejscu nie znajduje się przedmiot. Jeżeli się znajduje, to gracz go podnosi.
  
  
###### Popchnięcie skrzynki
<img src="https://s6.gifyu.com/images/moveBox.gif" width="400" height="400">

```javascript
        if (this.level.map[y][x]==5) { //checks if movable block is in the way, then calculates if its possible to move it
            switch (dir) {
                case "r":
                    if (this.level.map[y][x+1]>0) { document.getElementById('error').play(); return true; }
                    else {
                        if (y==this.level.finish.y&&x+1==this.level.finish.x) {  //checks if moved block went into the portal
                            this.level.map[y][x]=0;
                            this.level.blocks--; //1 less block, if blocks===0 then win the map
                        }
                        else {
                            this.level.map[y][x]=0;
                            this.level.map[y][x+1]=5;
                        }
                    break;
                    .
                    . // w tym miejscu znajduje się pozostały kod Switch
                    .
                    }
            }
```
Kolejny If to przypadek, gdy w miejscu w które gracz chce się udać znajduje się skrzynia. Jeżeli tak, to sprawdzany jest kierunek w który popchnąć skrzynię oraz to, czy w ogóle da się przepchać skrzynię dalej.
  
    
```javascript
//if blocks == 0 then win map
            if (this.level.blocks===0) { 
                this.currentLevel++; 
                //so far only 6 levels, so if you get past them it's ending screen time
                if (this.currentLevel===6) { this.calcScore(); this.gameState.state=3; return true;}
                this.gameState.state=1;
                this.calcScore(); 
                this.resetPlayer(); 
                drawLevelMenu(this.currentLevel);
                new buttonListener(this);
                return true;
            }
```
Metoda sprawdza również, czy na mapie pozostały jakiekolwiek skrzynki. Jeżeli nie, wywołuje parę funkcji odpowiadających za chociażby przeniesienie gracza na kolejny poziom, obliczenie wyniku, czy zmianę stanu gry.
  
  
```javascript
else if (this.level.map[y][x]!=0&&this.level.map[y][x]!=5) {
            document.getElementById('error').play();
            return true;
        }
else return false;
```
Powyższy kod znajduje się na samym końcu metody. Jeżeli płytka mapy na której chce znaleźć się gracz nie jest pusta (bądź nie ma tam skrzyni), kolizja zwraca wartość prawda, czyli gracz nie może się tam ruszyć.

Skrypt zawiera również parę innych metod, chociażby odpowiadających za parę funkcjonalności przedmiotów czy też za efekt dymu który pozostawia za sobą gracz przy ruchu, jednak są one bardzo proste i nie tak interesujące jak przytoczony kod.
### 4.3. Mapy i plik maps.js

Plik maps.js zawiera klasę maps. Głównym atrybutem tej klasy jest dwuwymiarowa tablica z zapisanymi wartościami 0-13. Wartości te odpowiedzialne są za logikę gry oraz za wyrenderowanie odpowiedniego sprite'u w odpowiednim miejscu.
  
  
```javascript
export class maps {
    constructor() {
        this.map = [
                    [3,3,4,1,1,2,3,3,3,3],
                    [3,3,4,0,0,2,3,3,3,3],
                    [3,3,4,0,0,2,3,3,3,3],
                    [3,3,4,0,0,1,1,1,1,2],
                    [4,1,1,0,0,7,0,0,0,2],
                    [4,0,0,0,5,5,0,5,0,2],
                    [4,0,5,0,0,0,5,0,9,11],
                    [10,8,0,0,7,0,0,0,2,3],
                    [3,10,1,1,8,0,9,1,11,3],
                    [3,3,3,3,10,1,11,3,3,3]
                ]
                this.blocks=5;
                this.finish.x = 5;
                this.finish.y = 8;
                this.items.push(new shovel(7,4));
                this.score=178;
    }
```
Powyżej pokazana jest przykładowa mapa (poziom 3 w grze). Poza tablicą, zawiera ona:
* ilość bloków w poziomie by móc obliczyć kiedy poziom ma się skończyć
* koordynaty miejsca, w które trzeba wpychać skrzynie
* wartość punktów jakie może dostać gracz (maksymalna liczba to 100, każdy ruch odejmuje wartość 1 od atrybutu score) bazująca na najmniejszej możliwej ilości ruchów + 100
* tablica zawierająca przedmioty oraz ich koordynaty

Kolejne metody jakie posiada klasa związane są z rysowaniem mapy.
  
  
```javascript
drawMap(ctx, player) {
        this.columns=[];
        for (var x=0;x<10;x++) //draw blocks
            for (var y=0;y<10;y++) {
                switch (this.map[x][y]) {
                    case 0:
                        ctx.drawImage(this.tileset,16,64,16,16,y*40,x*40,40,40);
                        break;
                        .
                        . // w tym miejscu znajduje się pozostały kod Switch
                        .
                    case 13:
                        ctx.drawImage(this.tileset,32,156,20,20,y*40,x*40,40,40);
                        break;
                }
            }
            ctx.drawImage(this.tileset,80,176,16,16,this.finish.x*40+5,this.finish.y*40+5,28,28); //draw portal (finish) object
            this.items.forEach( function (item) { //draw every item on the map
                item.draw();
            });
        }
```
Metoda drawMap() to nic innego jak zagnieżdżona pętla ze "switch'em" który rysuje kafelki mapy bazując na wartościach dwuwymiarowej tablicy klasy maps, następnie metoda rysuje inne sprite'y, takie jak koniec poziomu czy przedmioty.
  
  
### 4.4. Przedmioty, pliki items.js, hook.js oraz shovel.js
#### items.js
```javascript
export class item { //item class, specific items will inherit stuff from this one
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.itemSprite = new Image();
        this.canvas = document.getElementById('myCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.active = false;
    }
```
Plik items.js to prosta klasa zawierająca parę wartości takich jak sprite przedmiotu i koordynaty. Z tej klasy dziedziczą już odpowiednie przedmioty
  
  
#### shovel.js

###### Użycie młota
<img src="https://s6.gifyu.com/images/hammer.gif" width="400" height="400">

```javascript
export class shovel extends item { //shovel item
    constructor(x, y) {
        super(x, y)
        this.itemSprite.src = "images/items/shovel.png";
        this.itemIconActive = "images/items/shovelIconActive.png";
        this.name = "Hammer";
        this.description = "Destroys selected column"
    }
```
Plik shovel.js to tak naprawdę młot a nie łopata. Pozostałość po wcześniejszym przedmiocie. Posiada ona metodę doThing() która jest uruchamiana gdy gracz chce użyć przedmiotu w swoim ekwipunku, niszczy ona wybraną kolumnę na mapie. Metoda ta sprawdza, w jakim kierunku gracz aktywował przedmiot i sprawdza, czy na tej płytce znajduje się kolumna. Jeżeli tak, to ją niszczy i pozbywa się przedmiotu.
  
  
```javascript
doThing(player, direction) { //"destroys" selected column
        let x = player.x/40;
        let y = player.y/40;
        switch (direction) {
            case "r":
                if (player.level.map[y][x+1]!=7) { document.getElementById('error').play(); }
                else {  
                    player.level.map[y][x+1]=0;
                    player.item="";
                    player.itemView(player.item);
                    player.calcScore();
                }
                break;
                .
                . // w tym miejscu znajduje się pozostały kod Switch
                .
        }
}
```
  
  
#### hook.js
###### Użycie haka
<img src="https://s6.gifyu.com/images/hook.gif" width="400" height="400">

```javascript
export class hook extends item { //hook item
    constructor(x, y) {
        super(x, y)
        this.itemSprite.src = "images/items/hook.png";
        this.itemIconActive = "images/items/hookIconActive.png";
        this.name = "Hook";
        this.description = "Pulls selected box in the opposite direction";
    }
```
Plik hook.js zawiera klasę hook. Tak jak młot, zawiera ona metodę doThing() (dziedziczy ją po klasie item), tym razem jednak przedmiot sprawia, że wybrana skrzynia zostaje odciągnięta w odwrotnym (niż gdyby ją popchnął) kierunku niż wybrał gracz. Metoda ta jest bardzo podobna do metody doThing() młota, lecz sprawdza ona czy w dane miejce można odciągnąć skrzynie i jeżeli to możliwe, przesuwa ją i gracza w odpowiednie miejsce.
  
  
```javascript
doThing(player, direction) { //pulls selected box in the opposite direction 
        let x = player.x/player.speed;
        let y = player.y/player.speed;
        switch (direction) {
            case "r":
                if (player.level.map[y][x+1]!=5) { document.getElementById('error').play(); }
                else {
                    if(player.level.map[y][x-1]!=0) document.getElementById('error').play();
                    else {
                        player.level.map[y][x+1]=0;
                        player.level.map[y][x]=5;
                        player.x-=player.speed; 
                        player.item="";
                        player.itemView(player.item);
                        player.calcScore();
                    }
                }
                break;
                .
                . //w tym miejscu znajduje się pozostały kod Switch
                .
        }
}
```
  
### 4.5. Menu wyboru poziomu i plik level-menu.js
Plik level-menu.js odpowiada za logikę wyboru map. Owe menu znajduje się pod grą i wygląd oraz interkacja opierają się na kodzie HTML oraz CSS. Logika przycisków jest jednak zawarta w tym skrypcie. 
###### Menu wyboru poziomu
<img src="https://s6.gifyu.com/images/levelMenu.gif" width="450" height="600">

```javascript
export class buttonListener {
    constructor(player) {
        var levelButton= document.getElementsByClassName("level-button");
        for (let i=0; i<levelButton.length;i++) {
            levelButton[i].addEventListener("click", function() {
                if (player.gameState.state!=2) return;
                var currentLevel = parseInt(levelButton[i].dataset.level);
                player.currentLevel = currentLevel;
                player.resetPlayer();
                clearBorders(i);
            });
            }
        }
}
```
Klasa buttonListener odpowiada za wszystko co ma się stać gdy gracz naciśnie dostępny przycisk do zmiany poziomu. Pobiera ona wtedy HTML'ową wartość atrybutu data przycisku. Zawiera ona to, który poziom ma być załadowany. Resetuje pozycję gracza i wczytuje odpowiedni poziom.
  
  
```javascript
export function drawLevelMenu(currentLevel) {
    var menu = document.getElementsByClassName("level-menu-container")[0];
    menu.innerHTML = "";
    for (let i=0;i<currentLevel+1;i++) {
        if (i===currentLevel) menu.innerHTML += "<button class='level-button' style='border:2px solid green; height:20px;' data-level='"+i+"'></button>";
        else menu.innerHTML += "<button class='level-button' data-level='"+i+"'></button>";
    }
    for (let i=0;i<5-currentLevel;i++) {
        menu.innerHTML += "<div class='fake-level-button'></div>";
    }
}
```
Funkcja drawLevelMenu() "dodaje" do HTML'a strony odpowiednią ilość przycisków aktywnych, bazując na tym, na którym poziomie gracz się aktualnie znajduje.
  
  
### 4.6. Menu gry
Menu gry opiera się głównie na HTML'u oraz CSSie. Logika menu zawarta jest w pliku main.js.

###### Menu wyboru poziomu
<img src="https://s6.gifyu.com/images/menu.gif" width="400" height="400">

```javascript
function endingScreen() {
    document.getElementsByClassName("canvas-menu")[0].classList.remove("canvas-menu-animated");
    document.getElementById("score").innerHTML = "Congratulations! <br> You've beaten Box Quest! <br> Your score is: <b>"+level.score+"</b>!";
    document.getElementById("start-button").innerHTML = "Start from the beginning"; 
    document.getElementById("steps-score").innerHTML = "Steps done in this level: <b>"+player.steps+"</b>";
}

function nextLevelMenu() {
    document.getElementsByClassName("canvas-menu")[0].classList.remove("canvas-menu-animated");
    document.getElementById("start-button").innerHTML = "Next level";
}
```
Dwie powyższe funkcje odpowiadają za to jaka zawartość ma się pokazać na głównym menu gry. Jeżeli gracz pokonał ostatni poziom, zawartość się zmienia, pojawia się np. przycisk do rozpoczęcia gry od nowa i inny tekst. Z każdym wywołaniem tych funkcji usuwana jest klasa "canvas-menu-animated" która powoduje pokazanie się menu za sprawą animacji przejścia w języku CSS.
  
## 5. Podsumowanie
Box Quest to gra której pisanie sprawiło mi bardzo dużo przyjemności. Dzięki niej poznałem język Javascript w o wiele lepszym stopniu niż przed rozpoczęciem prac nad projektem. Gra wśród osób które miały okazję zagrać była lubiana, a stopień jej skomplikowania jest całkiem wysoki jak na mały projekt tego typu. W przyszłości planuję również rozwinąć projekt o edytor map, który zapisywałby klasę maps do pliku json który byłby możliwy do pobrania. Na pewno zwiększy to atrakcyjność gry oraz będzie ciekawym doświadczeniem programistycznym, które, przez to jak skonstruowane są mapy w Box Quest nie powinna być poza moimi siłami.
  
## 6. Literatura
[1] https://developer.mozilla.org/pl/docs/Web/JavaScript  
[2] https://developer.mozilla.org/pl/docs/orphaned/Web/Guide/HTML/HTML5  
[3] https://developer.mozilla.org/pl/docs/Web/CSS  
[4] https://insights.stackoverflow.com/survey/2018/#development-environments-and-tools  
