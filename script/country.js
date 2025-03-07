import Country from "../data.json" with {type: "json"}

let name = document.querySelector(".countrydata .name"),
    native = document.querySelector(".countrydata .detail div:nth-of-type(1) span:not(.main)"),
    population = document.querySelector(".countrydata .detail div:nth-of-type(2) span:not(.main)"),
    region = document.querySelector(".countrydata .detail div:nth-of-type(3) span:not(.main)"),
    subreg = document.querySelector(".countrydata .detail div:nth-of-type(4) span:not(.main)"),
    capital = document.querySelector(".countrydata .detail div:nth-of-type(5) span:not(.main)"),
    topdoamin = document.querySelector(".countrydata .detail div:nth-of-type(6) span:not(.main)"),
    currency = document.querySelector(".countrydata .detail div:nth-of-type(7) span:not(.main)"),
    lang = document.querySelector(".countrydata .detail div:nth-of-type(8) span:not(.main)"),
    flag = document.querySelector(".countrydata .flag img"),

    id = location.search.substring(1).split("=")[1]

flag.src = Country[id]["flags"]["svg"]

name.innerHTML = Country[id]["name"]
native.innerHTML = Country[id]["nativeName"]
population.innerHTML = Country[id]["population"].toLocaleString()
region.innerHTML = Country[id]["region"]
subreg.innerHTML = Country[id]["subregion"]
capital.innerHTML = Country[id]["capital"] === undefined ? "None" : Country[id]["capital"]
topdoamin.innerHTML = Country[id]["topLevelDomain"].join(",")

let cur = ""
if (Country[id]["currencies"] === undefined) cur = "None"
else {
    Country[id]["currencies"].forEach(c => {
        if (cur.length > 0) cur += ", "
        cur += c["name"] + " ( " + c["symbol"] + " )"
    })
}
currency.innerHTML = cur

let lan = ""
Country[id]["languages"].forEach(l => {
    if (lan.length > 0) lan += ", "
    lan += l["name"]
})
lang.innerHTML = lan

if (Country[id]["borders"] === undefined) {
    document.querySelector(".other .main").innerHTML = "No Data Provided For Border Countries"
}
else {
    let border = document.querySelector(".countrydata .pop")

    Country[id]["borders"].forEach(count => {
        let div = document.createElement("div")
        let data = GetFullName(count)
        div.innerHTML = data[0]
        div.addEventListener("click", _ => window.open("./country.html?id=" + data[1], "_self"))
        border.append(div)
    })
}

function GetFullName(abr) {
    for (let i = 0; i < Country.length; i++) {
        if (Country[i]["alpha3Code"] == abr) {
            return [Country[i]["name"], i]
        }
    }
}