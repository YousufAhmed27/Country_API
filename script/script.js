import Countries from "../data.json" with {type: "json"}

let countryholder = document.querySelector("#countryholder"),
    filter = document.querySelector("select"),
    input = document.querySelector("input")

filter.addEventListener("change", _ => FilterRegion())

function SetCountry() {
    for (let i = 0; i < Countries.length; i++) {
        let count = Countries[i]

        if (filter.value.toLowerCase() !== "filter by region" && count["region"] !== filter.value) return

        let holder = document.createElement("div")
        holder.classList.add("holder")
        holder.setAttribute("data-region", count["region"])
        holder.addEventListener("click", _ => window.open("./country.html?id=" + i, "_self"))

        let flag = document.createElement("div")
        flag.classList.add("flag")

        let img = document.createElement("img")
        img.src = count["flags"]["svg"]
        img.alt = "Flag"

        let datas = document.createElement("div")
        datas.classList.add("data", "flexC")

        let Cname = document.createElement("div")
        Cname.classList.add("name")
        Cname.innerHTML = count["name"]

        let Cpop = document.createElement("div")
        Cpop.classList.add("pop", "flex")

        let Creg = document.createElement("div")
        Creg.classList.add("reg", "flex")

        let Ccap = document.createElement("div")
        Ccap.classList.add("cap", "flex")

        let span1 = document.createElement("span")
        span1.innerHTML = "Population:"
        let span2 = document.createElement("span")
        span2.innerHTML = count["population"].toLocaleString()
        let span3 = document.createElement("span")
        span3.innerHTML = "Region:"
        let span4 = document.createElement("span")
        span4.innerHTML = count["region"]
        let span5 = document.createElement("span")
        span5.innerHTML = "Capital:"
        let span6 = document.createElement("span")
        span6.innerHTML = count["capital"] === undefined ? "None" : count["capital"];

        flag.append(img)

        Cpop.append(span1, span2)
        Creg.append(span3, span4)
        Ccap.append(span5, span6)

        datas.append(Cname, Cpop, Creg, Ccap)
        holder.append(flag, datas)
        countryholder.append(holder)
    }
}

SetCountry()

let All = document.querySelectorAll(".holder")
function FilterRegion() {
    All.forEach(one => {
        if (filter.value.toLowerCase() !== "filter by region" &&
            filter.value.toLocaleLowerCase() !== "any" &&
            one.getAttribute("data-region") !== filter.value) {
            one.style.display = "none"
        }
        else {
            one.style.display = "block"
        }
    })
}

input.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        Filtername(input.value)
        input.blur()
    }
})

function Filtername(name) {
    All.forEach(one => {
        if (name.trim() !== "") {
            if (!one.children[1].children[0].innerHTML.toLowerCase().includes(name)) {
                one.style.display = "none"
            }
            else {
                one.style.display = "block"
            }
        }
        else {
            one.style.display = "Block"
        }
    })
}