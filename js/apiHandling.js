export { getCoordinatesForCity, getMyCoordinates, getWeatherForCoordinates, updateWeather, citiesArray }
const daysOfWeek = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];

async function getMyCoordinates() {
    try {
        let ip = await fetch("https://api.ipify.org/?format=json");
        ip = await ip.json();
        let response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=3aeb776ade0440229cd9b33e5718ace1&ip=${ip.ip}`);
        let coordinates = await response.json();
        return { lon: coordinates.longitude, lat: coordinates.latitude, city: coordinates.city };
    }
    catch (err) {
        console.log(err);
    }
}

async function getWeatherForCoordinates(coordinates) {
    const apiKey = "4ef3fac7a3651fc5237d390e5f60322f";
    const endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    try {
        let weather = await fetch(endpoint);
        weather = await weather.json();
        let result= weather.daily.map((day) => {
            return {
                temp: day.temp.day,
                overview: day.weather[0].main,
                pressure: day.pressure,
                humidity: day.humidity,
                wind: day.wind_speed,
                timestamp: day.dt
            }
        });
        return {days:result, city:coordinates.city}; 
    }
    catch (err) {
        console.log(err);
    }

}
function updateWeather(weatherModule, weatherData) {
    weatherModule.getElementsByClassName("city__name")[0].innerText = weatherData.city;
    weatherModule.getElementsByClassName("main__weather__icon")[0].src = `images/icons/${mapIcon(weatherData.days[0].overview)}.svg`;
    weatherModule.getElementsByClassName("temperature__value")[0].innerText = weatherData.days[0].temp;
    weatherModule.getElementsByClassName("pressure__value")[0].innerText = weatherData.days[0].pressure + "hPa";
    weatherModule.getElementsByClassName("humidity__value")[0].innerText = weatherData.days[0].humidity + "%";
    weatherModule.getElementsByClassName("wind-speed__value")[0].innerText = weatherData.days[0].wind + "m/s";
    const weatherForecast = Array.from(weatherModule.querySelector(".weather__forecast").children);
    weatherForecast.forEach((listElement, index) => {
        listElement.getElementsByClassName("day")[0].innerText = daysOfWeek[new Date(weatherData.days[index + 1].timestamp * 1000).getDay()];
        listElement.querySelector("img").setAttribute("src", `images/icons/${mapIcon(weatherData.days[index + 1].overview)}.svg`)
        listElement.querySelector(".temperature__value").innerText = weatherData.days[index + 1].temp;
    })
    let deleteButton = weatherModule.querySelector(".btn--close");
    deleteButton.addEventListener("click", function () {
        if (document.querySelectorAll("module__weather").length > 1) {
            this.parentNode.remove();
        }
        else {
            this.parentNode.toggleAttribute("hidden");
        }

    })
    weatherModule.removeAttribute("hidden");
}

function mapIcon(originalName) {
    switch (originalName) {
        case "Thunderstorm":
            return "thunderstorm";
        case "Drizzle":
            return "rain";
        case "Rain":
            return "rain";
        case "Snow":
            return "snow";
        case "Mist":
            return "fog";
        case "Haze":
            return "sleet";
        case "Fog":
            return "fog";
        case "Tornado":
            return "tornado";
        case "Clear":
            return "clear-day";
        case "Clouds":
            return "cloudy";

        default:
            return "clear-day";
    }
}

async function getCoordinatesForCity(givenCity) {
    const endpoint = `https://graphhopper.com/api/1/geocode?key=689cd3ff-cd18-4802-8677-d3b08fd39642&q=${givenCity}`;
    let coordinates = await fetch(endpoint);
    coordinates = await coordinates.json();
    return { lon: coordinates.hits[0].point.lng, lat: coordinates.hits[0].point.lat, city: givenCity };

}

let citiesArray = [
"Gromadka",
"Nowogrodziec",
"Osiecznica",
"Warta Bolesławiecka",
"dzierżoniowski",
"Bielawa",
"Pieszyce",
"Piława Górna",
"Dzierżoniów",
"Łagiewniki",
"Niemcza",
"głogowski",
"Głogów",
"Jerzmanowa",
"Kotla",
"Pęcław",
"Żukowice",
"górowski",
"Góra",
"Jemielno",
"Niechlów",
"jaworski",
"Jawor",
"Bolków",
"Męcinka",
"Mściwojów",
"Paszowice",
"Wądroże Wielkie",
"jeleniogórski",
"Karpacz",
"Kowary",
"Piechowice",
"Szklarska Poręba",
"Janowice Wielkie",
"Jeżów Sudecki",
"Mysłakowice",
"Podgórzyn",
"Stara Kamienica",
"kamiennogórski",
"Kamienna Góra",
"Lubawka",
"Marciszów",
"kłodzki",
"Duszniki-Zdrój",
"Kudowa-Zdrój",
"Polanica-Zdrój",
"Bystrzyca Kłodzka",
"Kłodzko",
"Lądek-Zdrój",
"Lewin Kłodzki",
"Międzylesie",
"Nowa Ruda",
"Stronie Śląskie",
"Szczytna",
"legnicki",
"Chojnów",
"Krotoszyce",
"Kunice",
"Legnickie Pole",
"Miłkowice",
"Prochowice",
"Ruja",
"lubański",
"Świeradów-Zdrój",
"Leśna",
"Lubań",
"Olszyna",
"Platerówka",
"Siekierczyn",
"lubiński",
"Lubin",
"Rudna",
"Ścinawa",
"lwówecki",
"Gryfów Śląski",
"Lubomierz",
"Lwówek Śląski",
"Mirsk",
"Wleń",
"milicki",
"Cieszków",
"Krośnice",
"Milicz",
"oleśnicki",
"Bierutów",
"Dobroszyce",
"Dziadowa Kłoda",
"Międzybórz",
"Syców",
"Twardogóra",
"oławski",
"Domaniów",
"Jelcz-Laskowice",
"Oława",
"polkowicki",
"Chocianów",
"Gaworzyce",
"Grębocice",
"Polkowice",
"Przemków",
"Radwanice",
"strzeliński",
"Borów",
"Kondratowice",
"Przeworno",
"Strzelin",
"Wiązów",
"Kostomłoty",
"Malczyce",
"Miękinia",
"Środa Śląska",
"Udanin",
"Świebodzice",
"Dobromierz",
"Jaworzyna Śląska",
"Marcinowice",
"Strzegom",
"Żarów",
"trzebnicki",
"Oborniki Śląskie",
"Prusice",
"Trzebnica",
"Wisznia Mała",
"Zawonia",
"Żmigród",
"wałbrzyski",
"Boguszów-Gorce",
"Jedlina-Zdrój",
"Szczawno-Zdrój",
"Czarny Bór",
"Głuszyca",
"Mieroszów",
"Stare Bogaczowice",
"Walim",
"wołowski",
"Brzeg Dolny",
"Wińsko",
"Wołów",
"wrocławski",
"Czernica",
"Długołęka",
"Jordanów Śląski",
"Kąty Wrocławskie",
"Kobierzyce",
"Mietków",
"Sobótka",
"Siechnice",
"Żórawina",
"ząbkowicki",
"Bardo",
"Ciepłowody",
"Kamieniec Ząbkowicki",
"Stoszowice",
"Ząbkowice Śląskie",
"Ziębice",
"Złoty Stok",
"zgorzelecki",
"Zawidów",
"Bogatynia",
"Pieńsk",
"Sulików",
"Węgliniec",
"Zgorzelec",
"złotoryjski",
"Wojcieszów",
"Pielgrzymka",
"Świerzawa",
"Zagrodno",
"Złotoryja",
"Jelenia Góra",
"Legnica",
"Wrocław",
"Wrocław-Fabryczna",
"Wrocław-Krzyki",
"Wrocław-Psie Pole",
"Wrocław-Stare Miasto",
"Wrocław-Śródmieście",
"Wałbrzych",
"KUJAWSKO-POMORSKIE",
"aleksandrowski",
"Ciechocinek",
"Nieszawa",
"Aleksandrów Kujawski",
"Bądkowo",
"Koneck",
"Raciążek",
"Waganiec",
"brodnicki",
"Bobrowo",
"Brzozie",
"Bartniczka",
"Jabłonowo Pomorskie",
"Świedziebnia",
"Zbiczno",
"bydgoski",
"Białe Błota",
"Dąbrowa Chełmińska",
"Dobrcz",
"Koronowo",
"Nowa Wieś Wielka",
"Osielsko",
"Sicienko",
"Solec Kujawski",
"chełmiński",
"Chełmno",
"Kijewo Królewskie",
"Lisewo",
"Papowo Biskupie",
"Stolno",
"Unisław",
"golubsko-dobrzyński",
"Ciechocin",
"Golub-Dobrzyń",
"Kowalewo Pomorskie",
"Radomin",
"Zbójno",
"grudziądzki",
"Gruta",
"Łasin",
"Radzyń Chełmiński",
"Rogóźno",
"Świecie nad Osą",
"inowrocławski",
"Dąbrowa Biskupia",
"Gniewkowo",
"Inowrocław",
"Janikowo",
"Kruszwica",
"Pakość",
"Rojewo",
"Złotniki Kujawskie",
"lipnowski",
"Chrostkowo",
"Dobrzyń nad Wisłą",
"Kikół",
"Skępe",
"Tłuchowo",
"Wielgie",
"mogileński",
"Jeziora Wielkie",
"Mogilno",
"Strzelno",
"nakielski",
"Kcynia",
"Mrocza",
"Nakło nad Notecią",
"Sadki",
"Szubin",
"radziejowski",
"Bytoń",
"Osięciny",
"Piotrków Kujawski",
"Radziejów",
"Topólka",
"rypiński",
"Brzuze",
"Rypin",
"Skrwilno",
"Wąpielsk",
"sępoleński",
"Kamień Krajeński",
"Sępólno Krajeńskie",
"Sośno",
"Więcbork",
"świecki",
"Bukowiec",
"Dragacz",
"Drzycim",
"Jeżewo",
"Lniano",
"Nowe",
"Osie",
"Pruszcz",
"Świecie",
"Świekatowo",
"Warlubie",
"toruński",
"Chełmża",
"Czernikowo",
"Lubicz",
"Łubianka",
"Łysomice",
"Obrowo",
"Wielka Nieszawka",
"Zławieś Wielka",
"tucholski",
"Cekcyn",
"Gostycyn",
"Kęsowo",
"Lubiewo",
"Śliwice",
"Tuchola",
"wąbrzeski",
"Wąbrzeźno",
"Dębowa Łąka",
"Książki",
"Płużnica",
"Ryńsk",
"włocławski",
"Baruchowo",
"Boniewo",
"Brześć Kujawski",
"Choceń",
"Chodecz",
"Fabianki",
"Izbica Kujawska",
"Kowal",
"Lubanie",
"Lubień Kujawski",
"Lubraniec",
"żniński",
"Barcin",
"Gąsawa",
"Janowiec Wielkopolski",
"Łabiszyn",
"Rogowo",
"Żnin",
"Bydgoszcz",
"Grudziądz",
"Toruń",
"Włocławek",
"LUBELSKIE",
"bialski",
"Drelów",
"Janów Podlaski",
"Kodeń",
"Konstantynów",
"Leśna Podlaska",
"Łomazy",
"Międzyrzec Podlaski",
"Piszczac",
"Rokitno",
"Rossosz",
"Sławatycze",
"Sosnówka",
"Terespol",
"Tuczna",
"Wisznice",
"Zalesie",
"biłgorajski",
"Biłgoraj",
"Biszcza",
"Frampol",
"Goraj",
"Księżpol",
"Łukowa",
"Obsza",
"Potok Górny",
"Tarnogród",
"Tereszpol",
"Turobin",
"chełmski",
"Białopole",
"Dorohusk",
"Dubienka",
"Leśniowice",
"Rejowiec Fabryczny",
"Ruda-Huta",
"Sawin",
"Siedliszcze",
"Wojsławice",
"Żmudź",
"Rejowiec",
"hrubieszowski",
"Dołhobyczów",
"Horodło",
"Hrubieszów",
"Mircze",
"Trzeszczany",
"Uchanie",
"Werbkowice",
"janowski",
"Batorz",
"Dzwola",
"Godziszów",
"Janów Lubelski",
"Modliborzyce",
"Potok Wielki",
"krasnostawski",
"Fajsławice",
"Gorzków",
"Izbica",
"Krasnystaw",
"Kraśniczyn",
"Łopiennik Górny",
"Siennica Różana",
"Żółkiewka",
"kraśnicki",
"Annopol",
"Dzierzkowice",
"Gościeradów",
"Kraśnik",
"Szastarka",
"Trzydnik Duży",
"Urzędów",
"Wilkołaz",
"Zakrzówek",
"lubartowski",
"Abramów",
"Firlej",
"Jeziorzany",
"Kamionka",
"Kock",
"Lubartów",
"Michów",
"Niedźwiada",
"Ostrów Lubelski",
"Serniki",
"Uścimów",
"lubelski",
"Bełżyce",
"Borzechów",
"Bychawa",
"Garbów",
"Głusk",
"Jastków",
"Krzczonów",
"Niedrzwica Duża",
"Niemce",
"Strzyżewice",
"Wojciechów",
"Wólka",
"Wysokie",
"łęczyński",
"Cyców",
"Ludwin",
"Łęczna",
"Milejów",
"Puchaczów",
"Spiczyn",
"łukowski",
"Krzywda",
"Łuków",
"Serokomla",
"Stanin",
"Stoczek Łukowski",
"Trzebieszów",
"Wojcieszków",
"Wola Mysłowska",
"Chodel",
"Józefów nad Wisłą",
"Karczmiska",
"Łaziska",
"Opole Lubelskie",
"Poniatowa",
"parczewski",
"Dębowa Kłoda",
"Jabłoń",
"Milanów",
"Parczew",
"Podedwórze",
"Siemień",
"Sosnowica",
"puławski",
"Janowiec",
"Kazimierz Dolny",
"Końskowola",
"Kurów",
"Markuszów",
"Nałęczów",
"Puławy",
"Wąwolnica",
"Żyrzyn",
"radzyński",
"Borki",
"Czemierniki",
"Kąkolewnica",
"Komarówka Podlaska",
"Radzyń Podlaski",
"Ulan-Majorat",
"Wohyń",
"rycki",
"Dęblin",
"Kłoczew",
"Nowodwór",
"Ryki",
"Ułęż",
"świdnicki",
"Świdnik",
"Mełgiew",
"Rybczewice",
"Trawniki",
"Bełżec",
"Jarczów",
"Krynice",
"Lubycza Królewska",
"Łaszczów",
"Rachanie",
"Susiec",
"Tarnawatka",
"Telatyn",
"Tomaszów Lubelski",
"Tyszowce",
"Ulhówek",
"włodawski",
"Hanna",
"Hańsk",
"Stary Brus",
"Urszulin",
"Włodawa",
"Wola Uhruska",
"Wyryki",
"zamojski",
"Adamów",
"Grabowiec",
"Komarów-Osada",
"Krasnobród",
"Łabunie",
"Miączyn",
"Nielisz",
"Radecznica",
"Sitno",
"Skierbieszów",
"Stary Zamość",
"Sułów",
"Szczebrzeszyn",
"Zwierzyniec",
"Biała Podlaska",
"Chełm",
"Lublin",
"Zamość",
"LUBUSKIE",
"gorzowski",
"Kostrzyn nad Odrą",
"Bogdaniec",
"Deszczno",
"Lubiszyn",
"Santok",
"Witnica",
"Bobrowice",
"Bytnica",
"Gubin",
"Krosno Odrzańskie",
"międzyrzecki",
"Bledzew",
"Międzyrzecz",
"Przytoczna",
"Pszczew",
"Skwierzyna",
"Trzciel",
"nowosolski",
"Bytom Odrzański",
"Kolsko",
"Kożuchów",
"Nowa Sól",
"Nowe Miasteczko",
"Otyń",
"Siedlisko",
"słubicki",
"Cybinka",
"Górzyca",
"Ośno Lubuskie",
"Rzepin",
"strzelecko-drezdenecki",
"Dobiegniew",
"Drezdenko",
"Stare Kurowo",
"Strzelce Krajeńskie",
"Zwierzyn",
"sulęciński",
"Krzeszyce",
"Lubniewice",
"Słońsk",
"Sulęcin",
"Torzym",
"świebodziński",
"Skąpe",
"Szczaniec",
"Świebodzin",
"Zbąszynek",
"zielonogórski",
"Babimost",
"Bojadła",
"Czerwieńsk",
"Kargowa",
"Nowogród Bobrzański",
"Sulechów",
"Świdnica",
"Trzebiechów",
"Zabór",
"żagański",
"Gozdnica",
"Iłowa",
"Małomice",
"Niegosławice",
"Szprotawa",
"Wymiarki",
"Żagań",
"żarski",
"Łęknica",
"Jasień",
"Lipinki Łużyckie",
"Lubsko",
"Przewóz",
"Trzebiel",
"Tuplice",
"Żary",
"wschowski",
"Sława",
"Szlichtyngowa",
"Wschowa",
"Gorzów Wielkopolski",
"Zielona Góra",
"ŁÓDZKIE",
"bełchatowski",
"Bełchatów",
"Drużbice",
"Kleszczów",
"Kluki",
"Rusiec",
"Szczerców",
"Zelów",
"kutnowski",
"Bedlno",
"Dąbrowice",
"Krośniewice",
"Krzyżanów",
"Kutno",
"Łanięta",
"Nowe Ostrowy",
"Oporów",
"Strzelce",
"Żychlin",
"łaski",
"Buczek",
"Łask",
"Sędziejowice",
"Widawa",
"Wodzierady",
"łęczycki",
"Daszyna",
"Góra Świętej Małgorzaty",
"Grabów",
"Łęczyca",
"Piątek",
"Świnice Warckie",
"Witonia",
"łowicki",
"Bielawy",
"Chąśno",
"Domaniewice",
"Kiernozia",
"Kocierzew Południowy",
"Łowicz",
"Łyszkowice",
"Nieborów",
"łódzki wschodni",
"Andrespol",
"Brójce",
"Koluszki",
"Nowosolna",
"Tuszyn",
"opoczyński",
"Białaczów",
"Drzewica",
"Mniszków",
"Opoczno",
"Paradyż",
"Żarnów",
"pabianicki",
"Konstantynów Łódzki",
"Dłutów",
"Dobroń",
"Ksawerów",
"Lutomiersk",
"Pabianice",
"pajęczański",
"Działoszyn",
"Kiełczygłów",
"Nowa Brzeźnica",
"Pajęczno",
"Rząśnia",
"Siemkowice",
"Strzelce Wielkie",
"piotrkowski",
"Aleksandrów",
"Gorzkowice",
"Grabica",
"Łęki Szlacheckie",
"Ręczno",
"Rozprza",
"Sulejów",
"Wola Krzysztoporska",
"Wolbórz",
"poddębicki",
"Dalików",
"Pęczniew",
"Poddębice",
"Uniejów",
"Wartkowice",
"Zadzim",
"radomszczański",
"Dobryszyce",
"Gidle",
"Gomunice",
"Kamieńsk",
"Kobiele Wielkie",
"Kodrąb",
"Lgota Wielka",
"Ładzice",
"Masłowice",
"Przedbórz",
"Radomsko",
"Wielgomłyny",
"Żytno",
"rawski",
"Biała Rawska",
"Cielądz",
"Rawa Mazowiecka",
"Regnów",
"Sadkowice",
"sieradzki",
"Błaszki",
"Brąszewice",
"Brzeźnio",
"Burzenin",
"Goszczanów",
"Klonowa",
"Sieradz",
"Warta",
"Wróblew",
"Złoczew",
"skierniewicki",
"Bolimów",
"Głuchów",
"Godzianów",
"Kowiesy",
"Lipce Reymontowskie",
"Maków",
"Nowy Kawęczyn",
"tomaszowski",
"Będków",
"Budziszewice",
"Czerniewice",
"Inowłódz",
"Lubochnia",
"Rokiciny",
"Rzeczyca",
"Tomaszów Mazowiecki",
"Żelechlinek",
"wieluński",
"Czarnożyły",
"Konopnica",
"Mokrsko",
"Osjaków",
"Ostrówek",
"Pątnów",
"Skomlin",
"Wieluń",
"Wierzchlas",
"wieruszowski",
"Bolesławiec",
"Czastary",
"Galewice",
"Lututów",
"Sokolniki",
"Wieruszów",
"zduńskowolski",
"Szadek",
"Zapolice",
"Zduńska Wola",
"zgierski",
"Aleksandrów Łódzki",
"Głowno",
"Ozorków",
"Parzęczew",
"Stryków",
"Zgierz",
"brzeziński",
"Dmosin",
"Jeżów",
"Rogów",
"Łódź",
"Łódź-Bałuty",
"Łódź-Górna",
"Łódź-Polesie",
"Łódź-Śródmieście",
"Łódź-Widzew",
"Piotrków Trybunalski",
"Skierniewice",
"MAŁOPOLSKIE",
"bocheński",
"Bochnia",
"Drwinia",
"Lipnica Murowana",
"Łapanów",
"Nowy Wiśnicz",
"Rzezawa",
"Trzciana",
"Żegocina",
"Borzęcin",
"Brzesko",
"Czchów",
"Gnojnik",
"Iwkowa",
"Szczurowa",
"chrzanowski",
"Alwernia",
"Babice",
"Chrzanów",
"Libiąż",
"Trzebinia",
"dąbrowski",
"Dąbrowa Tarnowska",
"Gręboszów",
"Mędrzechów",
"Radgoszcz",
"Szczucin",
"gorlicki",
"Biecz",
"Bobowa",
"Gorlice",
"Lipinki",
"Łużna",
"Moszczenica",
"Ropa",
"Sękowa",
"Uście Gorlickie",
"krakowski",
"Igołomia-Wawrzeńczyce",
"Iwanowice",
"Jerzmanowice-Przeginia",
"Kocmyrzów-Luborzyca",
"Krzeszowice",
"Liszki",
"Mogilany",
"Skała",
"Skawina",
"Słomniki",
"Sułoszowa",
"Świątniki Górne",
"Wielka Wieś",
"Zabierzów",
"Zielonki",
"limanowski",
"Jodłownik",
"Kamienica",
"Laskowa",
"Limanowa",
"Łukowica",
"Mszana Dolna",
"Niedźwiedź",
"Słopnice",
"Tymbark",
"miechowski",
"Charsznica",
"Gołcza",
"Kozłów",
"Książ Wielki",
"Miechów",
"Racławice",
"Słaboszów",
"myślenicki",
"Dobczyce",
"Lubień",
"Myślenice",
"Pcim",
"Raciechowice",
"Siepraw",
"Sułkowice",
"Tokarnia",
"nowosądecki",
"Chełmiec",
"Gródek nad Dunajcem",
"Grybów",
"Kamionka Wielka",
"Korzenna",
"Krynica-Zdrój",
"Łabowa",
"Łącko",
"Łososina Dolna",
"Muszyna",
"Nawojowa",
"Piwniczna-Zdrój",
"Podegrodzie",
"Rytro",
"Stary Sącz",
"nowotarski",
"Szczawnica",
"Czarny Dunajec",
"Czorsztyn",
"Jabłonka",
"Krościenko nad Dunajcem",
"Lipnica Wielka",
"Łapsze Niżne",
"Nowy Targ",
"Ochotnica Dolna",
"Raba Wyżna",
"Rabka-Zdrój",
"Szaflary",
"olkuski",
"Bukowno",
"Bolesław",
"Klucze",
"Olkusz",
"Trzyciąż",
"Wolbrom",
"oświęcimski",
"Brzeszcze",
"Chełmek",
"Kęty",
"Oświęcim",
"Polanka Wielka",
"Przeciszów",
"Zator",
"proszowicki",
"Koniusza",
"Koszyce",
"Nowe Brzesko",
"Pałecznica",
"Proszowice",
"Radziemice",
"suski",
"Sucha Beskidzka",
"Budzów",
"Bystra-Sidzina",
"Jordanów",
"Maków Podhalański",
"Stryszawa",
"Zawoja",
"Zembrzyce",
"tarnowski",
"Ciężkowice",
"Gromnik",
"Lisia Góra",
"Pleśna",
"Ryglice",
"Rzepiennik Strzyżewski",
"Skrzyszów",
"Tuchów",
"Wierzchosławice",
"Wietrzychowice",
"Wojnicz",
"Zakliczyn",
"Żabno",
"Szerzyny",
"tatrzański",
"Zakopane",
"Biały Dunajec",
"Bukowina Tatrzańska",
"Kościelisko",
"Poronin",
"wadowicki",
"Andrychów",
"Brzeźnica",
"Kalwaria Zebrzydowska",
"Lanckorona",
"Mucharz",
"Spytkowice",
"Stryszów",
"Tomice",
"Wadowice",
"Wieprz",
"wielicki",
"Biskupice",
"Gdów",
"Kłaj",
"Niepołomice",
"Wieliczka",
"Kraków",
"Kraków-Krowodrza",
"Kraków-Nowa Huta",
"Kraków-Podgórze",
"Kraków-Śródmieście",
"Nowy Sącz",
"Tarnów",
"MAZOWIECKIE",
"białobrzeski",
"Promna",
"Stara Błotnica",
"Stromiec",
"Wyśmierzyce",
"ciechanowski",
"Ciechanów",
"Glinojeck",
"Gołymin-Ośrodek",
"Grudusk",
"Ojrzeń",
"Opinogóra Górna",
"Regimin",
"Sońsk",
"garwoliński",
"Borowie",
"Garwolin",
"Górzno",
"Łaskarzew",
"Maciejowice",
"Miastków Kościelny",
"Parysów",
"Pilawa",
"Sobolew",
"Trojanów",
"Wilga",
"Żelechów",
"gostyniński",
"Gostynin",
"Pacyna",
"Sanniki",
"Szczawin Kościelny",
"Milanówek",
"Podkowa Leśna",
"Grodzisk Mazowiecki",
"Jaktorów",
"Żabia Wola",
"grójecki",
"Belsk Duży",
"Błędów",
"Chynów",
"Goszczyn",
"Grójec",
"Jasieniec",
"Mogielnica",
"Nowe Miasto nad Pilicą",
"Warka",
"kozienicki",
"Garbatka-Letnisko",
"Głowaczów",
"Gniewoszów",
"Grabów nad Pilicą",
"Kozienice",
"Magnuszew",
"Sieciechów",
"legionowski",
"Legionowo",
"Jabłonna",
"Nieporęt",
"Serock",
"Wieliszew",
"lipski",
"Chotcza",
"Ciepielów",
"Lipsko",
"Rzeczniów",
"Sienno",
"Solec nad Wisłą",
"łosicki",
"Huszlew",
"Łosice",
"Platerów",
"Sarnaki",
"Stara Kornica",
"makowski",
"Maków Mazowiecki",
"Czerwonka",
"Karniewo",
"Krasnosielc",
"Młynarze",
"Płoniawy-Bramura",
"Różan",
"Rzewnie",
"Sypniewo",
"Szelków",
"miński",
"Cegłów",
"Dębe Wielkie",
"Dobre",
"Halinów",
"Jakubów",
"Kałuszyn",
"Latowicz",
"Mińsk Mazowiecki",
"Mrozy",
"Siennica",
"Stanisławów",
"Sulejówek",
"mławski",
"Mława",
"Dzierzgowo",
"Lipowiec Kościelny",
"Radzanów",
"Strzegowo",
"Stupsk",
"Szreńsk",
"Wieczfnia Kościelna",
"Wiśniewo",
"Nowy Dwór Mazowiecki",
"Czosnów",
"Leoncin",
"Nasielsk",
"Pomiechówek",
"Zakroczym",
"ostrołęcki",
"Baranowo",
"Czarnia",
"Czerwin",
"Goworowo",
"Kadzidło",
"Lelis",
"Łyse",
"Myszyniec",
"Olszewo-Borki",
"Rzekuń",
"Troszyn",
"Andrzejewo",
"Boguty-Pianki",
"Brok",
"Małkinia Górna",
"Nur",
"Ostrów Mazowiecka",
"Stary Lubotyń",
"Szulborze Wielkie",
"Wąsewo",
"Zaręby Kościelne",
"otwocki",
"Józefów",
"Otwock",
"Celestynów",
"Karczew",
"Kołbiel",
"Osieck",
"Sobienie-Jeziory",
"Wiązowna",
"piaseczyński",
"Góra Kalwaria",
"Konstancin-Jeziorna",
"Lesznowola",
"Piaseczno",
"Prażmów",
"Tarczyn",
"płocki",
"Bielsk",
"Bodzanów",
"Brudzeń Duży",
"Bulkowo",
"Drobin",
"Gąbin",
"Łąck",
"Mała Wieś",
"Nowy Duninów",
"Radzanowo",
"Słubice",
"Słupno",
"Stara Biała",
"Staroźreby",
"Wyszogród",
"płoński",
"Baboszewo",
"Czerwińsk nad Wisłą",
"Dzierzążnia",
"Joniec",
"Naruszewo",
"Nowe Miasto",
"Płońsk",
"Raciąż",
"Sochocin",
"Załuski",
"pruszkowski",
"Piastów",
"Pruszków",
"Brwinów",
"Michałowice",
"Nadarzyn",
"Raszyn",
"przasnyski",
"Chorzele",
"Czernice Borowe",
"Jednorożec",
"Krzynowłoga Mała",
"Przasnysz",
"przysuski",
"Borkowice",
"Gielniów",
"Klwów",
"Odrzywół",
"Potworów",
"Przysucha",
"Rusinów",
"Wieniawa",
"pułtuski",
"Gzy",
"Obryte",
"Pokrzywnica",
"Pułtusk",
"Świercze",
"Winnica",
"Zatory",
"radomski",
"Gózd",
"Iłża",
"Jastrzębia",
"Jedlińsk",
"Jedlnia-Letnisko",
"Kowala",
"Pionki",
"Przytyk",
"Skaryszew",
"Wierzbica",
"Wolanów",
"Zakrzew",
"siedlecki",
"Domanice",
"Korczew",
"Kotuń",
"Mokobody",
"Mordy",
"Paprotnia",
"Przesmyki",
"Skórzec",
"Suchożebry",
"Wiśniew",
"Wodynie",
"Zbuczyn",
"sierpecki",
"Gozdowo",
"Mochowo",
"Rościszewo",
"Sierpc",
"Szczutowo",
"Zawidz",
"sochaczewski",
"Brochów",
"Iłów",
"Młodzieszyn",
"Nowa Sucha",
"Sochaczew",
"Teresin",
"sokołowski",
"Ceranów",
"Jabłonna Lacka",
"Kosów Lacki",
"Repki",
"Sabnie",
"Sokołów Podlaski",
"Sterdyń",
"szydłowiecki",
"Chlewiska",
"Jastrząb",
"Mirów",
"Orońsko",
"Szydłowiec",
"warszawski zachodni",
"Błonie",
"Izabelin",
"Kampinos",
"Łomianki",
"Ożarów Mazowiecki",
"Stare Babice",
"węgrowski",
"Węgrów",
"Grębków",
"Korytnica",
"Liw",
"Łochów",
"Miedzna",
"Sadowne",
"Stoczek",
"Wierzbno",
"wołomiński",
"Kobyłka",
"Marki",
"Ząbki",
"Zielonka",
"Dąbrówka",
"Jadów",
"Klembów",
"Radzymin",
"Strachówka",
"Tłuszcz",
"Wołomin",
"wyszkowski",
"Brańszczyk",
"Długosiodło",
"Rząśnik",
"Somianka",
"Wyszków",
"Zabrodzie",
"zwoleński",
"Kazanów",
"Policzna",
"Przyłęk",
"Tczów",
"Zwoleń",
"żuromiński",
"Bieżuń",
"Kuczbork-Osada",
"Lubowidz",
"Lutocin",
"Siemiątkowo",
"Żuromin",
"żyrardowski",
"Żyrardów",
"Mszczonów",
"Puszcza Mariańska",
"Radziejowice",
"Wiskitki",
"Ostrołęka",
"Płock",
"Radom",
"Siedlce",
"Warszawa",
"Bemowo",
"Białołęka",
"Bielany",
"Mokotów",
"Ochota",
"Praga-Południe",
"Praga-Północ",
"Rembertów",
"Śródmieście",
"Targówek",
"Ursus",
"Ursynów",
"Wawer",
"Wesoła",
"Wilanów",
"Włochy",
"Wola",
"Żoliborz",
"OPOLSKIE",
"brzeski",
"Brzeg",
"Skarbimierz",
"Grodków",
"Lewin Brzeski",
"Lubsza",
"Olszanka",
"głubczycki",
"Baborów",
"Branice",
"Głubczyce",
"Kietrz",
"kędzierzyńsko-kozielski",
"Kędzierzyn-Koźle",
"Bierawa",
"Cisek",
"Pawłowiczki",
"Polska Cerekiew",
"Reńska Wieś",
"kluczborski",
"Byczyna",
"Kluczbork",
"Lasowice Wielkie",
"Wołczyn",
"krapkowicki",
"Gogolin",
"Krapkowice",
"Strzeleczki",
"Walce",
"Zdzieszowice",
"namysłowski",
"Domaszowice",
"Namysłów",
"Pokój",
"Świerczów",
"Wilków",
"nyski",
"Głuchołazy",
"Kamiennik",
"Korfantów",
"Łambinowice",
"Nysa",
"Otmuchów",
"Paczków",
"Pakosławice",
"Skoroszyce",
"oleski",
"Dobrodzień",
"Gorzów Śląski",
"Olesno",
"Praszka",
"Radłów",
"Rudniki",
"Zębowice",
"opolski",
"Chrząstowice",
"Dąbrowa",
"Dobrzeń Wielki",
"Komprachcice",
"Łubniany",
"Murów",
"Niemodlin",
"Ozimek",
"Popielów",
"Prószków",
"Tarnów Opolski",
"Tułowice",
"Turawa",
"prudnicki",
"Biała",
"Głogówek",
"Lubrza",
"Prudnik",
"strzelecki",
"Izbicko",
"Jemielnica",
"Kolonowskie",
"Leśnica",
"Strzelce Opolskie",
"Ujazd",
"Zawadzkie",
"Opole",
"PODKARPACKIE",
"bieszczadzki",
"Lutowiska",
"Ustrzyki Dolne",
"brzozowski",
"Brzozów",
"Domaradz",
"Dydnia",
"Haczów",
"Jasienica Rosielna",
"Nozdrzec",
"dębicki",
"Brzostek",
"Dębica",
"Jodłowa",
"Pilzno",
"Żyraków",
"jarosławski",
"Chłopice",
"Jarosław",
"Laszki",
"Pawłosiów",
"Pruchnik",
"Radymno",
"Roźwienica",
"Wiązownica",
"jasielski",
"Brzyska",
"Jasło",
"Kołaczyce",
"Krempna",
"Nowy Żmigród",
"Osiek Jasielski",
"Skołyszyn",
"Tarnowiec",
"kolbuszowski",
"Cmolas",
"Kolbuszowa",
"Majdan Królewski",
"Niwiska",
"Raniżów",
"Dzikowiec",
"krośnieński",
"Chorkówka",
"Dukla",
"Iwonicz-Zdrój",
"Jedlicze",
"Korczyna",
"Krościenko Wyżne",
"Miejsce Piastowe",
"Rymanów",
"Wojaszówka",
"Jaśliska",
"leżajski",
"Grodzisko Dolne",
"Kuryłówka",
"Leżajsk",
"Nowa Sarzyna",
"lubaczowski",
"Cieszanów",
"Horyniec-Zdrój",
"Lubaczów",
"Narol",
"Oleszyce",
"Stary Dzików",
"Wielkie Oczy",
"łańcucki",
"Białobrzegi",
"Czarna",
"Łańcut",
"Markowa",
"Rakszawa",
"Żołynia",
"mielecki",
"Borowa",
"Gawłuszowice",
"Mielec",
"Padew Narodowa",
"Przecław",
"Radomyśl Wielki",
"Tuszów Narodowy",
"Wadowice Górne",
"niżański",
"Harasiuki",
"Jeżowe",
"Krzeszów",
"Nisko",
"Rudnik nad Sanem",
"Ulanów",
"przemyski",
"Bircza",
"Dubiecko",
"Fredropol",
"Krasiczyn",
"Krzywcza",
"Medyka",
"Orły",
"Stubno",
"Żurawica",
"przeworski",
"Adamówka",
"Gać",
"Jawornik Polski",
"Kańczuga",
"Przeworsk",
"Sieniawa",
"Tryńcza",
"Zarzecze",
"ropczycko-sędziszowski",
"Iwierzyce",
"Ostrów",
"Ropczyce",
"Sędziszów Małopolski",
"Wielopole Skrzyńskie",
"rzeszowski",
"Błażowa",
"Boguchwała",
"Dynów",
"Głogów Małopolski",
"Hyżne",
"Kamień",
"Krasne",
"Lubenia",
"Sokołów Małopolski",
"Świlcza",
"Trzebownisko",
"Tyczyn",
"sanocki",
"Besko",
"Bukowsko",
"Komańcza",
"Sanok",
"Tyrawa Wołoska",
"Zagórz",
"Zarszyn",
"stalowowolski",
"Stalowa Wola",
"Bojanów",
"Pysznica",
"Radomyśl nad Sanem",
"Zaklików",
"Zaleszany",
"strzyżowski",
"Czudec",
"Frysztak",
"Niebylec",
"Strzyżów",
"Wiśniowa",
"tarnobrzeski",
"Baranów Sandomierski",
"Grębów",
"Nowa Dęba",
"leski",
"Baligród",
"Cisna",
"Lesko",
"Olszanica",
"Solina",
"Krosno",
"Przemyśl",
"Rzeszów",
"Tarnobrzeg",
"PODLASKIE",
"augustowski",
"Augustów",
"Bargłów Kościelny",
"Lipsk",
"Nowinka",
"Płaska",
"Sztabin",
"białostocki",
"Choroszcz",
"Czarna Białostocka",
"Dobrzyniewo Duże",
"Gródek",
"Juchnowiec Kościelny",
"Łapy",
"Michałowo",
"Poświętne",
"Supraśl",
"Suraż",
"Turośń Kościelna",
"Tykocin",
"Wasilków",
"Zabłudów",
"Zawady",
"Bielsk Podlaski",
"Boćki",
"Brańsk",
"Orla",
"Rudka",
"Wyszki",
"grajewski",
"Grajewo",
"Radziłów",
"Rajgród",
"Szczuczyn",
"Wąsosz",
"hajnowski",
"Białowieża",
"Czeremcha",
"Czyże",
"Dubicze Cerkiewne",
"Hajnówka",
"Kleszczele",
"Narew",
"Narewka",
"kolneński",
"Grabowo",
"Mały Płock",
"Stawiski",
"Turośl",
"łomżyński",
"Jedwabne",
"Miastkowo",
"Nowogród",
"Piątnica",
"Przytuły",
"Śniadowo",
"Wizna",
"Zbójna",
"moniecki",
"Goniądz",
"Jasionówka",
"Jaświły",
"Knyszyn",
"Krypno",
"Mońki",
"Trzcianne",
"sejneński",
"Giby",
"Krasnopol",
"Puńsk",
"Sejny",
"siemiatycki",
"Drohiczyn",
"Dziadkowice",
"Grodzisk",
"Mielnik",
"Milejczyce",
"Nurzec-Stacja",
"Perlejewo",
"Siemiatycze",
"sokólski",
"Dąbrowa Białostocka",
"Korycin",
"Krynki",
"Kuźnica",
"Nowy Dwór",
"Sidra",
"Sokółka",
"Suchowola",
"Szudziałowo",
"suwalski",
"Bakałarzewo",
"Filipów",
"Jeleniewo",
"Przerośl",
"Raczki",
"Rutka-Tartak",
"Szypliszki",
"Wiżajny",
"wysokomazowiecki",
"Ciechanowiec",
"Czyżew",
"Klukowo",
"Kobylin-Borzymy",
"Kulesze Kościelne",
"Nowe Piekuty",
"Sokoły",
"Szepietowo",
"Wysokie Mazowieckie",
"zambrowski",
"Kołaki Kościelne",
"Rutki",
"Szumowo",
"Zambrów",
"Białystok",
"Łomża",
"Suwałki",
"POMORSKIE",
"bytowski",
"Borzytuchom",
"Bytów",
"Czarna Dąbrówka",
"Kołczygłowy",
"Lipnica",
"Miastko",
"Parchowo",
"Studzienice",
"Trzebielino",
"Tuchomie",
"chojnicki",
"Brusy",
"Chojnice",
"Czersk",
"Konarzyny",
"człuchowski",
"Czarne",
"Człuchów",
"Debrzno",
"Koczała",
"Przechlewo",
"Rzeczenica",
"gdański",
"Cedry Wielkie",
"Kolbudy",
"Pruszcz Gdański",
"Przywidz",
"Pszczółki",
"Suchy Dąb",
"Trąbki Wielkie",
"kartuski",
"Chmielno",
"Kartuzy",
"Przodkowo",
"Sierakowice",
"Somonino",
"Stężyca",
"Sulęczyno",
"Żukowo",
"kościerski",
"Dziemiany",
"Karsin",
"Kościerzyna",
"Liniewo",
"Lipusz",
"Nowa Karczma",
"Stara Kiszewa",
"kwidzyński",
"Gardeja",
"Kwidzyn",
"Prabuty",
"Ryjewo",
"Sadlinki",
"lęborski",
"Lębork",
"Łeba",
"Cewice",
"Nowa Wieś Lęborska",
"Wicko",
"malborski",
"Lichnowy",
"Malbork",
"Miłoradz",
"Nowy Staw",
"Stare Pole",
"nowodworski",
"Krynica Morska",
"Nowy Dwór Gdański",
"Ostaszewo",
"Stegna",
"Sztutowo",
"pucki",
"Hel",
"Jastarnia",
"Władysławowo",
"Kosakowo",
"Krokowa",
"Puck",
"słupski",
"Damnica",
"Dębnica Kaszubska",
"Główczyce",
"Kępice",
"Kobylnica",
"Potęgowo",
"Smołdzino",
"Ustka",
"starogardzki",
"Czarna Woda",
"Bobowo",
"Kaliska",
"Lubichowo",
"Skarszewy",
"Skórcz",
"Smętowo Graniczne",
"Starogard Gdański",
"Zblewo",
"tczewski",
"Gniew",
"Morzeszczyn",
"Pelplin",
"Subkowy",
"Tczew",
"wejherowski",
"Reda",
"Rumia",
"Choczewo",
"Gniewino",
"Linia",
"Luzino",
"Łęczyce",
"Szemud",
"Wejherowo",
"sztumski",
"Dzierzgoń",
"Mikołajki Pomorskie",
"Stary Dzierzgoń",
"Stary Targ",
"Sztum",
"Gdańsk",
"Gdynia",
"Słupsk",
"Sopot",
"ŚLĄSKIE",
"będziński",
"Będzin",
"Czeladź",
"Wojkowice",
"Bobrowniki",
"Mierzęcice",
"Psary",
"Siewierz",
"Sławków",
"bielski",
"Szczyrk",
"Bestwina",
"Buczkowice",
"Czechowice-Dziedzice",
"Jasienica",
"Jaworze",
"Kozy",
"Porąbka",
"Wilamowice",
"Wilkowice",
"cieszyński",
"Cieszyn",
"Ustroń",
"Wisła",
"Brenna",
"Chybie",
"Dębowiec",
"Goleszów",
"Hażlach",
"Istebna",
"Skoczów",
"Strumień",
"Zebrzydowice",
"częstochowski",
"Blachownia",
"Dąbrowa Zielona",
"Janów",
"Kamienica Polska",
"Kłomnice",
"Koniecpol",
"Konopiska",
"Kruszyna",
"Lelów",
"Mstów",
"Mykanów",
"Poczesna",
"Przyrów",
"Rędziny",
"Starcza",
"gliwicki",
"Knurów",
"Pyskowice",
"Gierałtowice",
"Pilchowice",
"Rudziniec",
"Sośnicowice",
"Toszek",
"Wielowieś",
"kłobucki",
"Kłobuck",
"Krzepice",
"Lipie",
"Miedźno",
"Panki",
"Popów",
"Przystajń",
"Wręczyca Wielka",
"lubliniecki",
"Lubliniec",
"Boronów",
"Ciasna",
"Herby",
"Kochanowice",
"Koszęcin",
"Pawonków",
"Woźniki",
"mikołowski",
"Łaziska Górne",
"Mikołów",
"Orzesze",
"Ornontowice",
"Wyry",
"myszkowski",
"Myszków",
"Koziegłowy",
"Niegowa",
"Poraj",
"Żarki",
"pszczyński",
"Goczałkowice-Zdrój",
"Kobiór",
"Miedźna",
"Pawłowice",
"Pszczyna",
"Suszec",
"raciborski",
"Racibórz",
"Kornowac",
"Krzanowice",
"Krzyżanowice",
"Kuźnia Raciborska",
"Nędza",
"Pietrowice Wielkie",
"Rudnik",
"rybnicki",
"Czerwionka-Leszczyny",
"Gaszowice",
"Jejkowice",
"Lyski",
"Świerklany",
"tarnogórski",
"Kalety",
"Miasteczko Śląskie",
"Radzionków",
"Tarnowskie Góry",
"Krupski Młyn",
"Ożarowice",
"Świerklaniec",
"Tworóg",
"Zbrosławice",
"bieruńsko-lędziński",
"Bieruń",
"Imielin",
"Lędziny",
"Bojszowy",
"Chełm Śląski",
"wodzisławski",
"Pszów",
"Radlin",
"Rydułtowy",
"Wodzisław Śląski",
"Godów",
"Gorzyce",
"Lubomia",
"Marklowice",
"Mszana",
"zawierciański",
"Poręba",
"Zawiercie",
"Irządze",
"Kroczyce",
"Łazy",
"Ogrodzieniec",
"Pilica",
"Szczekociny",
"Włodowice",
"Żarnowiec",
"żywiecki",
"Żywiec",
"Czernichów",
"Gilowice",
"Jeleśnia",
"Koszarawa",
"Lipowa",
"Łękawica",
"Łodygowice",
"Milówka",
"Radziechowy-Wieprz",
"Rajcza",
"Ślemień",
"Świnna",
"Ujsoły",
"Węgierska Górka",
"Bielsko-Biała",
"Bytom",
"Chorzów",
"Częstochowa",
"Dąbrowa Górnicza",
"Gliwice",
"Jastrzębie-Zdrój",
"Jaworzno",
"Katowice",
"Mysłowice",
"Piekary Śląskie",
"Ruda Śląska",
"Rybnik",
"Siemianowice Śląskie",
"Sosnowiec",
"Świętochłowice",
"Tychy",
"Zabrze",
"Żory",
"ŚWIĘTOKRZYSKIE",
"buski",
"Busko-Zdrój",
"Gnojno",
"Nowy Korczyn",
"Pacanów",
"Solec-Zdrój",
"Stopnica",
"Tuczępy",
"Wiślica",
"jędrzejowski",
"Imielno",
"Jędrzejów",
"Małogoszcz",
"Nagłowice",
"Oksa",
"Sędziszów",
"Słupia",
"Sobków",
"Wodzisław",
"kazimierski",
"Bejsce",
"Czarnocin",
"Kazimierza Wielka",
"Opatowiec",
"Skalbmierz",
"kielecki",
"Bieliny",
"Bodzentyn",
"Chęciny",
"Chmielnik",
"Daleszyce",
"Górno",
"Łagów",
"Łopuszno",
"Masłów",
"Miedziana Góra",
"Mniów",
"Morawica",
"Nowa Słupia",
"Piekoszów",
"Pierzchnica",
"Raków",
"Sitkówka-Nowiny",
"Strawczyn",
"Zagnańsk",
"konecki",
"Fałków",
"Gowarczów",
"Końskie",
"Radoszyce",
"Ruda Maleniecka",
"Słupia Konecka",
"Smyków",
"Stąporków",
"opatowski",
"Baćkowice",
"Iwaniska",
"Lipnik",
"Opatów",
"Ożarów",
"Sadowie",
"Tarłów",
"Wojciechowice",
"ostrowiecki",
"Ostrowiec Świętokrzyski",
"Bałtów",
"Bodzechów",
"Ćmielów",
"Kunów",
"Waśniów",
"pińczowski",
"Działoszyce",
"Kije",
"Michałów",
"Pińczów",
"Złota",
"sandomierski",
"Sandomierz",
"Dwikozy",
"Klimontów",
"Koprzywnica",
"Łoniów",
"Obrazów",
"Samborzec",
"Wilczyce",
"Zawichost",
"skarżyski",
"Skarżysko-Kamienna",
"Bliżyn",
"Łączna",
"Skarżysko Kościelne",
"Suchedniów",
"starachowicki",
"Starachowice",
"Brody",
"Mirzec",
"Pawłów",
"Wąchock",
"staszowski",
"Bogoria",
"Łubnice",
"Oleśnica",
"Osiek",
"Połaniec",
"Rytwiany",
"Staszów",
"Szydłów",
"włoszczowski",
"Kluczewsko",
"Krasocin",
"Moskorzew",
"Radków",
"Secemin",
"Włoszczowa",
"Kielce",
"WARMIŃSKO-MAZURSKIE",
"bartoszycki",
"Bartoszyce",
"Bisztynek",
"Górowo Iławeckie",
"Sępopol",
"braniewski",
"Braniewo",
"Frombork",
"Lelkowo",
"Pieniężno",
"Płoskinia",
"Wilczęta",
"działdowski",
"Działdowo",
"Iłowo-Osada",
"Lidzbark",
"Płośnica",
"Rybno",
"elbląski",
"Godkowo",
"Gronowo Elbląskie",
"Markusy",
"Milejewo",
"Młynary",
"Pasłęk",
"Rychliki",
"Tolkmicko",
"ełcki",
"Ełk",
"Kalinowo",
"Prostki",
"Stare Juchy",
"giżycki",
"Giżycko",
"Kruklanki",
"Miłki",
"Ryn",
"Wydminy",
"iławski",
"Iława",
"Kisielice",
"Lubawa",
"Susz",
"Zalewo",
"kętrzyński",
"Barciany",
"Kętrzyn",
"Korsze",
"Reszel",
"Srokowo",
"lidzbarski",
"Kiwity",
"Lidzbark Warmiński",
"Lubomino",
"Orneta",
"mrągowski",
"Mikołajki",
"Mrągowo",
"Piecki",
"Sorkwity",
"nidzicki",
"Janowiec Kościelny",
"Janowo",
"Kozłowo",
"Nidzica",
"nowomiejski",
"Grodziczno",
"Kurzętnik",
"Nowe Miasto Lubawskie",
"olecki",
"Kowale Oleckie",
"Olecko",
"Wieliczki",
"olsztyński",
"Barczewo",
"Biskupiec",
"Dobre Miasto",
"Dywity",
"Gietrzwałd",
"Jeziorany",
"Jonkowo",
"Kolno",
"Olsztynek",
"Purda",
"Stawiguda",
"Świątki",
"ostródzki",
"Dąbrówno",
"Grunwald",
"Łukta",
"Małdyty",
"Miłakowo",
"Miłomłyn",
"Morąg",
"Ostróda",
"piski",
"Biała Piska",
"Orzysz",
"Pisz",
"Ruciane-Nida",
"szczycieński",
"Dźwierzuty",
"Jedwabno",
"Pasym",
"Rozogi",
"Szczytno",
"Świętajno",
"Wielbark",
"gołdapski",
"Banie Mazurskie",
"Dubeninki",
"Gołdap",
"węgorzewski",
"Budry",
"Pozezdrze",
"Węgorzewo",
"Elbląg",
"Olsztyn",
"WIELKOPOLSKIE",
"chodzieski",
"Budzyń",
"Chodzież",
"Margonin",
"Szamocin",
"czarnkowsko-trzcianecki",
"Czarnków",
"Drawsko",
"Krzyż Wielkopolski",
"Lubasz",
"Połajewo",
"Trzcianka",
"Wieleń",
"gnieźnieński",
"Czerniejewo",
"Gniezno",
"Kiszkowo",
"Kłecko",
"Łubowo",
"Mieleszyn",
"Niechanowo",
"Trzemeszno",
"Witkowo",
"gostyński",
"Borek Wielkopolski",
"Gostyń",
"Krobia",
"Pępowo",
"Piaski",
"Pogorzela",
"Poniec",
"grodziski",
"Granowo",
"Grodzisk Wielkopolski",
"Kamieniec",
"Rakoniewice",
"Wielichowo",
"jarociński",
"Jaraczewo",
"Jarocin",
"Kotlin",
"Żerków",
"kaliski",
"Blizanów",
"Brzeziny",
"Ceków-Kolonia",
"Godziesze Wielkie",
"Koźminek",
"Lisków",
"Mycielin",
"Opatówek",
"Stawiszyn",
"Szczytniki",
"Żelazków",
"kępiński",
"Baranów",
"Bralin",
"Kępno",
"Łęka Opatowska",
"Perzów",
"Rychtal",
"Trzcinica",
"kolski",
"Babiak",
"Chodów",
"Dąbie",
"Grzegorzew",
"Kłodawa",
"Koło",
"Kościelec",
"Olszówka",
"Osiek Mały",
"Przedecz",
"koniński",
"Golina",
"Grodziec",
"Kazimierz Biskupi",
"Kleczew",
"Kramsk",
"Krzymów",
"Rychwał",
"Rzgów",
"Skulsk",
"Sompolno",
"Stare Miasto",
"Ślesin",
"Wierzbinek",
"Wilczyn",
"kościański",
"Czempiń",
"Kościan",
"Krzywiń",
"Śmigiel",
"krotoszyński",
"Sulmierzyce",
"Kobylin",
"Koźmin Wielkopolski",
"Krotoszyn",
"Rozdrażew",
"Zduny",
"leszczyński",
"Krzemieniewo",
"Lipno",
"Osieczna",
"Rydzyna",
"Święciechowa",
"Wijewo",
"Włoszakowice",
"międzychodzki",
"Chrzypsko Wielkie",
"Kwilcz",
"Międzychód",
"Sieraków",
"nowotomyski",
"Kuślin",
"Lwówek",
"Miedzichowo",
"Nowy Tomyśl",
"Opalenica",
"Zbąszyń",
"obornicki",
"Oborniki",
"Rogoźno",
"Ryczywół",
"ostrowski",
"Nowe Skalmierzyce",
"Odolanów",
"Ostrów Wielkopolski",
"Przygodzice",
"Raszków",
"Sieroszewice",
"Sośnie",
"ostrzeszowski",
"Czajków",
"Doruchów",
"Grabów nad Prosną",
"Kobyla Góra",
"Kraszewice",
"Mikstat",
"Ostrzeszów",
"pilski",
"Piła",
"Białośliwie",
"Kaczory",
"Łobżenica",
"Miasteczko Krajeńskie",
"Szydłowo",
"Ujście",
"Wyrzysk",
"Wysoka",
"pleszewski",
"Chocz",
"Czermin",
"Dobrzyca",
"Gizałki",
"Gołuchów",
"Pleszew",
"poznański",
"Luboń",
"Puszczykowo",
"Buk",
"Czerwonak",
"Dopiewo",
"Kleszczewo",
"Komorniki",
"Kostrzyn",
"Kórnik",
"Mosina",
"Murowana Goślina",
"Pobiedziska",
"Rokietnica",
"Stęszew",
"Suchy Las",
"Swarzędz",
"Tarnowo Podgórne",
"rawicki",
"Bojanowo",
"Jutrosin",
"Miejska Górka",
"Pakosław",
"Rawicz",
"słupecki",
"Lądek",
"Orchowo",
"Ostrowite",
"Powidz",
"Słupca",
"Strzałkowo",
"Zagórów",
"szamotulski",
"Duszniki",
"Kaźmierz",
"Obrzycko",
"Ostroróg",
"Pniewy",
"Szamotuły",
"Wronki",
"średzki",
"Dominowo",
"Krzykosy",
"Nowe Miasto nad Wartą",
"Środa Wielkopolska",
"Zaniemyśl",
"śremski",
"Brodnica",
"Dolsk",
"Książ Wielkopolski",
"Śrem",
"turecki",
"Brudzew",
"Kawęczyn",
"Malanów",
"Przykona",
"Tuliszków",
"Turek",
"Władysławów",
"wągrowiecki",
"Damasławek",
"Gołańcz",
"Mieścisko",
"Skoki",
"Wapno",
"Wągrowiec",
"wolsztyński",
"Przemęt",
"Siedlec",
"Wolsztyn",
"wrzesiński",
"Kołaczkowo",
"Miłosław",
"Nekla",
"Pyzdry",
"Września",
"złotowski",
"Jastrowie",
"Krajenka",
"Lipka",
"Okonek",
"Tarnówka",
"Zakrzewo",
"Złotów",
"Kalisz",
"Konin",
"Leszno",
"Poznań",
"Poznań-Grunwald",
"Poznań-Jeżyce",
"Poznań-Nowe Miasto",
"Poznań-Stare Miasto",
"Poznań-Wilda",
"ZACHODNIOPOMORSKIE",
"białogardzki",
"Białogard",
"Karlino",
"Tychowo",
"choszczeński",
"Bierzwnik",
"Choszczno",
"Drawno",
"Krzęcin",
"Pełczyce",
"Recz",
"drawski",
"Czaplinek",
"Drawsko Pomorskie",
"Kalisz Pomorski",
"Wierzchowo",
"Złocieniec",
"goleniowski",
"Goleniów",
"Maszewo",
"Nowogard",
"Osina",
"Przybiernów",
"Stepnica",
"gryficki",
"Brojce",
"Gryfice",
"Karnice",
"Płoty",
"Rewal",
"Trzebiatów",
"gryfiński",
"Banie",
"Cedynia",
"Chojna",
"Gryfino",
"Mieszkowice",
"Moryń",
"Stare Czarnowo",
"Trzcińsko-Zdrój",
"Widuchowa",
"kamieński",
"Dziwnów",
"Golczewo",
"Kamień Pomorski",
"Międzyzdroje",
"Świerzno",
"Wolin",
"kołobrzeski",
"Dygowo",
"Gościno",
"Kołobrzeg",
"Rymań",
"Siemyśl",
"Ustronie Morskie",
"koszaliński",
"Będzino",
"Biesiekierz",
"Bobolice",
"Manowo",
"Mielno",
"Polanów",
"Sianów",
"Świeszyno",
"myśliborski",
"Barlinek",
"Boleszkowice",
"Dębno",
"Myślibórz",
"Nowogródek Pomorski",
"policki",
"Dobra (Szczecińska)",
"Kołbaskowo",
"Nowe Warpno",
"Police",
"pyrzycki",
"Bielice",
"Kozielice",
"Lipiany",
"Przelewice",
"Pyrzyce",
"Warnice",
"sławieński",
"Darłowo",
"Malechowo",
"Postomino",
"Sławno",
"stargardzki",
"Chociwel",
"Dobrzany",
"Dolice",
"Ińsko",
"Kobylanka",
"Marianowo",
"Stara Dąbrowa",
"Stargard",
"Suchań",
"szczecinecki",
"Barwice",
"Biały Bór",
"Borne Sulinowo",
"Grzmiąca",
"Szczecinek",
"świdwiński",
"Brzeżno",
"Połczyn-Zdrój",
"Rąbino",
"Sławoborze",
"Świdwin",
"wałecki",
"Człopa",
"Mirosławiec",
"Tuczno",
"Wałcz",
"łobeski",
"Dobra",
"Łobez",
"Radowo Małe",
"Resko",
"Węgorzyno",
"Koszalin",
"Szczecin",
"Świnoujście",
];