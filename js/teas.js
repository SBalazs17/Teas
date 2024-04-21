"use strict"
const teas =document.querySelector("#teas")
displayTable()
function generateTable(teas)
{
    const table =document.createElement("table");
table.classList.add("table" ,"table-striped");
const thead =document.createElement("thead");
const tr=document.createElement("tr")
const titles =[
    "Megnevezés","Gyártó", "Fajta", "Kiszerelés" , "Mennyiség" , "Ár"
]
for (const title of titles) 
{
    const th =document.createElement("th")
    th.append(document.createTextNode(titl))
    tr.appendChild(th)
    thead.append(tr)
    table.append(thead)

}

const tbody=document.createElement("tbody")
for (const tea of teas)
{
    const tr =generateRow(tea)
    tbody.appendChild(tr)
}
table.append(tbody)



return table
}
function displayTable(teas)
{
    document.getElementById("teas").append(generateTable())
    const tbody=document.createElement("tbody")
    for (const tea of teas)
    {
        const tr =generateRow(tea)
        tbody.appendChild(tr)
    }
}
function generateRow(tea)
{
    const tr=document.createElement("tr")
    const contents =
    [
    tea.name,
    tea.brand.name,
    tea.range,
    tea.format,
    `${tea.qty} ${tea.unit}`,
    `${tea.price} Ft`
    ]
    for (const content of contents)
    {
        const td=document.createElement("td")
        td.innerText = content
        tr.append(td)

    }
    return tr
}
function displayTable()
{
    const teas=[
        {
            "name": "English Breakfast",
            "brand": {
            "id": 3,
            "name": "Twinings",
            "country": "Egyesült Királyság",
            },
            "range" : "black",
            "format": "tea bag",
            "qty": 25,
            "unit" : "db",
            "price": 1469,
        },
        {
            "name": "Earl Grey",
            "brand": {
            "id": 3,
            "name": "Twinings",
            "country": "Egyesült Királyság",
            },
            "range" : "black",
            "format": "tea bag",
            "qty": 25,
            "unit" : "db",
            "price": 1469,
        }

    ]
    const baseUrl ="http://172.19.0.12:8761/api";
    fetch(baseUrl+"/teas")
    .then(response => {
        if (!response.ok) {
        throw Error("Hálózati hiba!")
        }
        return response.json()
        })
        .then(teas => {
            document.getElementById("teas").append(generateTable(teas))
            })
            .catch(err => {
                console.error(err)
                alert("A teák betöltése sikertelen")
                })

}
function sendNewTea()
{
    evt.preventDefault()
    const nameInput = document.getElementById("name")
    const brandIdInput = document.getElementById("brand_id")
    const rangeInput = document.getElementById("range")
    const formatInput = document.getElementById("format")
    const qtyInput = document.getElementById("qty")
    const unitInput = document.getElementById("unit")
    const priceInput = document.getElementById("price")
    const newTea = {
        name: nameInput.value,
        brand_id: brandIdInput.value,
        range: rangeInput.value,
        format: formatInput.value,
        qty: qtyInput.value,
        unit: unitInput.value,
        price: priceInput.value,
        }
        fetch(`${baseUrl}/teas`, {
            "method": "post"
            })
            fetch(`${baseUrl}/teas`, {
                "method": "post",
                "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json"
                }
                })
                fetch(`${baseUrl}/teas`, {
                    "method": "post",
                    "headers": {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                    },
                    "body": JSON.stringify(newTea)
                    })
                    .then(response => {
                        if (!response.ok) {
                        if (422 == response.status) {
                        alert("Az elküldött adatok helytelenek")
                        throw Error("Az elküldött adatok helytelenek")
                        }
                        throw Error("Hiba!")
                        }
                        return response.json()
                        })
                        .then(tea => {
                            // console.table("visszajött",tea)
                            const row = generateRow(tea)
                            document.querySelector("#teas > table > tbody").appendChild(row)
                            })
                            .catch(error => {
                                console.error(error)
                                })
                                const form = document.querySelector("form")
                                form.addEventListener("submit", sendNewTea)
}