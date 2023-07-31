let intervalId
async function handleKilp(){
    let key
    await fetch("https://a2a-api.klipwallet.com/v2/a2a/prepare", {
        method:'post',
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({
            bapp: {name:'sheepfarm'},
            type: 'auth'
        })
    })
    .then(res => res.json())
    .then(res => {
        key = res.request_key;
        resetKlip()
        makeQR(key)
    })
}

function makeQR(key){
    let qrOptions = {
        width: 128,
        height: 128
    }
    let qrContainer = document.getElementById('qr-container')
    new QRCode(qrContainer, `https://klipwallet.com/?target=/a2a?request_key=${key}`, qrOptions);
    intervalId = setInterval(()=>{
        poll(key)
    },2000)
}

function resetKlip(){
    let qrContainer = document.getElementById('qr-container')
    qrContainer.innerHTML = ''
    document.getElementById('address').innerText = ''
    clearInterval(intervalId)
}

async function poll(key){
    let address = ''
    let data = await fetch(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${key}`, {
        method:"GET",
        headers: { "Content-Type": "application/json" },
    }).then(res => res.json())

    if(data.status === 'completed'){
        resetKlip()
        address = data.result.klaytn_address
        document.getElementById('address').innerText = address
    }
 }

const btnKlip = document.querySelector('#handleKilp')

btnKlip.addEventListener('click',()=>{
    handleKilp()
})